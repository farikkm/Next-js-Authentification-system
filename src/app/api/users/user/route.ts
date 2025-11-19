import { connect } from "@/configs/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { ApiError, ApiResponse } from "@/shared";
import { getDataFromToken } from "@/helpers/token";

export async function GET(request: NextRequest) {
  try {
    const userData = getDataFromToken(request);
    const user = await User.findOne({ _id: userData.id }).select("-password -isVerified -isAdmin");

    if (!user) {
      return NextResponse.json(new ApiError("User doesn't exist"), { status: 400 });
    }

    return NextResponse.json(new ApiResponse("User found.", user), { status: 200 });
  } catch (error: any) {
    return NextResponse.json(new ApiError(`Internal Server Error: ${error}`), { status: 500 });
  }
}

connect();
