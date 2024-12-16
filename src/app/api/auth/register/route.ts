import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    // console.error("Error registering user:", error);
    return NextResponse.json(
      { message: "Error registering user", error: error.message },
      { status: 500 }
    );
  }
}
