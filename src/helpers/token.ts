import { TokenDataType } from "@/shared";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

    if (typeof decodedToken === "string") {
      throw new Error("Invalid token format");
    }

    return decodedToken as TokenDataType;
  } catch (error: any) {
    throw new Error("An error occured while decoding the jwt token", error);
  }
}
