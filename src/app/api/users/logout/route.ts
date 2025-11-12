import { NextResponse } from "next/server";
import { ApiError, ApiResponse } from "@/shared";

export async function GET() {
  try {
    const response = NextResponse.json(new ApiResponse("You have logged out"), { status: 200 });

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error) {
    return NextResponse.json(new ApiError(`Internal server error: ${error}`), { status: 500 });
  }
}
