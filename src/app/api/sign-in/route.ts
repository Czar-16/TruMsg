import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  const { username, password } = await req.json();

  const user = await UserModel.findOne({ username });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 400 },
    );
  }

  // password check here

  return NextResponse.json({
    success: true,
    message: "Sign in successful",
  });
}
