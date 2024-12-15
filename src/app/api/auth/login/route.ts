import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm"; // Import query operators

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            console.error("Validation error: Missing email or password");
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        console.log("Fetching user from database");
        const user = await db.select().from(users).where(eq(users.email, email)).get();

        if (!user) {
            console.error(`No user found with email: ${email}`);
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.error("Password mismatch for email:", email);
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        console.log("Login successful for email:", email);
        return NextResponse.json(
            { message: "Login successful", user },
            { status: 200 }
        );

    } catch (error) {
        // Log full error for debugging
        console.error("Error during login:", error);
        return NextResponse.json(
            { message: "An unexpected error occurred", error: error.message },
            { status: 500 }
        );
    }
}
