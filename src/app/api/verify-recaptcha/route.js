import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 400 }
      );
    }

    // Verify token with Google
    const verifyResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return NextResponse.json(
        {
          success: false,
          message: "reCAPTCHA verification failed",
          details: verifyData,
        },
        { status: 403 }
      );
    }

    if (verifyData.score < 0.5) {
      return NextResponse.json(
        {
          success: false,
          message: "Low score - possible bot",
          score: verifyData.score,
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      score: verifyData.score,
    });
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
