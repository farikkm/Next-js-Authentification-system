import { connect } from "@/configs/db";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { ApiError, ApiResponse } from "@/shared";

async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password, username } = reqBody;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(new ApiError("Invalid email format."), { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json(new ApiError("Password must be at least 6 characters long."), {
      status: 400,
    });
  }

  const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
  if (!usernameRegex.test(username)) {
    return NextResponse.json(
      new ApiError(
        "Username must be at least 3 characters long and may contain only letters and digits."
      ),
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(new ApiError("User already exists"), { status: 400 });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await new User({ email, username, password: hashedPassword }).save();

  return NextResponse.json(new ApiResponse("User successfully created"), { status: 201 });
}

connect();
