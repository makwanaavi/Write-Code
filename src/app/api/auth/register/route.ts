/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User";
import { ConnectDB } from "../../../config/connectDB";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, Password and Email is Required" },
        { status: 400 }
      );
    }

    await ConnectDB();
    const existUser = await UserModel.findOne({ email });

    if (existUser) {
      return NextResponse.json({ error: "Alredy User Exist" }, { status: 400 });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User Register SuccessFully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed To Register" }, { status: 500 });
  }
}
