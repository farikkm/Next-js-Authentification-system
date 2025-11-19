import { connect } from "@/configs/db";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { ApiError, ApiResponse, TokenDataType } from "@/shared";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(new ApiError("Invalid email format."), { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(new ApiError("Password must be at least 6 characters long."), {
        status: 400,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(new ApiError("User doesn't exist"), { status: 400 });
    }

    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(new ApiError("Invalid password"), { status: 400 });
    }

    const tokenData: TokenDataType = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

    const response = NextResponse.json(new ApiResponse("Login successful"), { status: 200 });
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json(new ApiError(`Internal server error: ${error}`), { status: 500 });
  }
}

connect();
