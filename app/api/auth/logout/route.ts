import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Get the cookie store
    const cookieStore = await cookies();

    // Delete the auth token cookie
    cookieStore.delete("auth-token");

    // Return success response
    return NextResponse.json(
      { message: "Logout successful" },
      {
        status: 200,
        headers: {
          // Set cookie with expired date to ensure it's removed
          "Set-Cookie":
            "auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
