// API call for openAI used for Manupilot

export const runtime = "nodejs";

import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_TOKENS_FOR_PROMPT = 100000;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages must be provided as an array" }),
        { status: 400 }
      );
    }

    const tokenCount = approximateTokenCount(messages);

    if (tokenCount > MAX_TOKENS_FOR_PROMPT) {
      const summarizeResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/manupilot-summarize`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages }),
        }
      );

      if (!summarizeResponse.ok) {
        const errorData = await summarizeResponse.json();
        return new Response(
          JSON.stringify({ error: errorData.error || "Summarization failed" }),
          { status: summarizeResponse.status }
        );
      }

      const summarizedData = await summarizeResponse.json();
      return new Response(JSON.stringify(summarizedData), {
        status: 200,
      });
    }

    const chatCompletion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages,
      stream: true, // ----> STREAMING
    });

    //  Build a ReadableStream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // for-await loop to grab each chunk
          for await (const part of chatCompletion) {
            // Each part has .choices[n].delta.content (or empty string)
            const chunk = part.choices?.[0]?.delta?.content || "";
            if (chunk) {
              // Enqueue it to the stream
              controller.enqueue(encoder.encode(chunk));
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err);
        } finally {
          // Close the stream when done
          controller.close();
        }
      },
    });

    // Return the Stream response
    return new Response(stream, {
      headers: {
        // text/plain means "raw text streaming"
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
    // ----------------------------------------------------------------------
  } catch (error) {
    console.error("Error with OpenAI API:", error);

    if (error instanceof OpenAI.APIError) {
      return new Response(
        JSON.stringify({
          status: error.status,
          message: error.message,
          code: error.code,
          type: error.type,
        }),
        { status: error.status || 500 }
      );
    }

    return new Response(
      JSON.stringify({ error: "An error occurred", details: error.message }),
      { status: 500 }
    );
  }
}

/** A simple approximation: ~4 characters = 1 token */
function approximateTokenCount(messages) {
  let totalChars = 0;
  for (const msg of messages) {
    if (msg?.content) {
      totalChars += msg.content.length;
    }
  }
  return Math.floor(totalChars / 4);
}

/////

//     return new Response(JSON.stringify(chatCompletion.choices[0].message), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error with OpenAI API:", error);

//     if (error instanceof OpenAI.APIError) {
//       return new Response(
//         JSON.stringify({
//           status: error.status,
//           message: error.message,
//           code: error.code,
//           type: error.type,
//         }),
//         { status: error.status || 500 }
//       );
//     }

//     return new Response(
//       JSON.stringify({ error: "An error occurred", details: error.message }),
//       { status: 500 }
//     );
//   }
// }

// /** A simple approximation: ~4 characters = 1 token */
// function approximateTokenCount(messages) {
//   let totalChars = 0;
//   for (const msg of messages) {
//     if (msg?.content) {
//       totalChars += msg.content.length;
//     }
//   }
//   return Math.floor(totalChars / 4);
// }
