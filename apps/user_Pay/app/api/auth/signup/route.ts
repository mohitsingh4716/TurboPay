import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { signupInput } from "@repo/validation/inputValidation";

export async function POST(req: NextRequest) {

    const body = await req.json();

    const {success} = signupInput.safeParse(body);
    if(!success){
        return NextResponse.json(
            {error: "Invalid input"},
            {status: 400}
        )
    }

    const existingUser = await db.user.findFirst({
        where: {
            phone: body.phone
        }
    });

    if(existingUser){
        return NextResponse.json(
            {error: "User already exists"},
            {status: 400}
        )
    }


    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const newuser = await db.user.create({
            data: {
                phone: body.phone,
                password: hashedPassword,
                name: body.name
            }
        })

        return NextResponse.json({
            id: newuser.id,
            name: newuser.name,
            phone: newuser.phone
        })

    }
    catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: 'Error creating user' },
            { status: 500 }
        )
    }
}