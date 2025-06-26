/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../config/resendemail";
import { ForgotPasswordeEmail } from "@/components/templete/forgotpasswordemail";
import ConnectDB from "../../../config/connectDB";

export async function POST(request: NextRequest) {
  const host = request.headers.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const DOMAIN = `${protocol}://${host}`;
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email required" },
        {
          status: 400,
        }
      );
    }

    await ConnectDB();
    const existuser = await UserModel.findOne({ email });
    // console.log(existuser)

    if (!existuser) {
      return NextResponse.json({ error: "User Not Found" }, { status: 400 });
    }

    const payload = {
      id: existuser._id.toString(),
    };
    // Use the correct env variable name
    var token = jwt.sign(payload, process.env.FORGOT_PASSWORD_SECRET_KEY!, {
      expiresIn: 60 * 60,
    });

    // Add '=' after 'token'
    const URL = `${DOMAIN}/reset-password?token${token}`;

    //sending email
    await sendEmail(
      existuser.email,
      "Forgot Password From Write Code",
      ForgotPasswordeEmail({ name: existuser.name, url: URL })
    );

    return NextResponse.json({ message: "Check Your Email" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something Went Wrong",
      },
      {
        status: 500,
      }
    );
  }
}
