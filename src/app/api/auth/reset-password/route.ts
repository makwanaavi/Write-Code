/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/app/config/connectDB";
import { request } from "http";
import { error } from "console";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST() {
  try {
    const { userID, password } = await request.json();

    if (!userID && !password) {
      return NextResponse.json({ error: "Required UserID and Password" });
    }

    await ConnectDB();
    const hashPassword = await bcrypt.hash(password, 10) 
    const updateUser = await UserModel.findByIdAndUpdate(userID, {
      password: hashPassword,
    });
console.log(updateUser)
    return NextResponse.json(
      { message: "Password Updated SuccessFully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something When Wrong" },
      { status: 500 }
    );
  }
}
