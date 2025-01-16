import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages must be provided as an array" }),
        { status: 400 }
      );
    }

    // Estimate tokens
    const tokenCount = messages.reduce(
      (total, message) => total + message.content.length,
      0
    );
    if (tokenCount > 2000) {
      return new Response(
        JSON.stringify({
          error: "Your query exceeds the 2,000-token limit. Please shorten it!",
        }),
        { status: 400 }
      );
    }

    // Call the OpenAI chat completion API
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
    });

    return new Response(JSON.stringify(chatCompletion.choices[0].message), {
      status: 200,
    });
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
