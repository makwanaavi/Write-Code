/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { error } from "console";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token is Required" }, { status: 400 });
    }
    const verifyToken: any = await jwt.verify(
      token,
      process.env.FORGOT_PASSWORD_SECRET_KEY!
    );

    if (!verifyToken) {
      return NextResponse.json({
        error: "Token is expired",
        expired: false,
        userId: verifyToken ? verifyToken?.id : null,
      });
    }

    return NextResponse.json(
      { message: "Token Is Valid", expired: false }
      //   { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went to Wrong" },
      { status: 500 }
    );
  }
}
