/* eslint-disable no-var */
import UserModel from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
// import { sendEmail } from "@/config/resendemail";
import { ForgotPasswordeEmail } from "../../../../components/templete/forgotpasswordemail";
import { ConnectDB } from "../../../config/connectDB";
import { sendEmail } from "@/app/config/resendemail";
// import { ForgotPasswordeEmail } from "@/components/templete/forgotpasswordemail";
// import ConnectDB from "@/app/config/connectDB";

export async function POST(request: NextRequest) {
  const host = request.headers.get("host"); //domain
  const protocol = host?.includes("localhost") ? "http" : "https";
  const DOMAIN = `${protocol}://${host}`;
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await ConnectDB();

    const exituser = await UserModel.findOne({ email });

    if (!exituser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const payload = {
      id: exituser?._id?.toString(),
    };

    var token = jwt.sign(payload, process.env.FORGOT_PASSWORD_SECRET_KEY!, {
      expiresIn: 60 * 60, //1hr expired
    });

    const URL = `${DOMAIN}/reset-password?token=${token}`;

    //sending email
    const emailResult = await sendEmail(
      exituser.email,
      "Forgot Password from one Editor",
      ForgotPasswordeEmail({
        name: exituser.name,
        url: URL,
      })
    );
    console.log("Email send result:", emailResult);

    if (emailResult && emailResult.name === "Error") {
      return NextResponse.json(
        {
          error: "Failed to send email. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Check your email.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
