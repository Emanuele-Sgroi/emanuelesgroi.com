import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MAX_PROMPT_TOKENS = 100000; // ~100k

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages structure:", messages);
      return new Response(
        JSON.stringify({ error: "Messages must be a valid array" }),
        {
          status: 400,
        }
      );
    }

    // Approximate token usage
    let tokenCount = approximateTokenCount(messages);

    if (tokenCount > MAX_PROMPT_TOKENS) {
      // Summarize if needed
      const shortened = await summarizeIfNeeded(messages);
      tokenCount = approximateTokenCount(shortened);

      if (tokenCount > MAX_PROMPT_TOKENS) {
        return new Response(
          JSON.stringify({
            error: `Even after summarizing, we still exceed ${MAX_PROMPT_TOKENS} tokens.`,
          }),
          { status: 400 }
        );
      }

      const chatCompletion = await openai.chat.completions.create({
        model: "chatgpt-4o-latest",
        messages: shortened,
      });
      return new Response(JSON.stringify(chatCompletion.choices[0].message), {
        status: 200,
      });
    } else {
      // If under limit, just proceed
      const chatCompletion = await openai.chat.completions.create({
        model: "chatgpt-4o-latest",
        messages,
      });
      return new Response(JSON.stringify(chatCompletion.choices[0].message), {
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error in /api/manupilot-summarize:", error);
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

function summarizeIfNeeded(messages) {
  // Placeholder for summarization logic
  // console.log("Summarizing messages:", messages);
  return messages.slice(-20); // Example: Keep only the last 5 messages
}

function approximateTokenCount(messages) {
  if (!Array.isArray(messages)) {
    throw new TypeError("Messages must be an array to count tokens.");
  }

  let totalChars = 0;
  for (const msg of messages) {
    if (msg?.content) {
      totalChars += msg.content.length;
    }
  }
  return Math.floor(totalChars / 4);
}
