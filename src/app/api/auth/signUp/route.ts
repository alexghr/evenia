import getPrismaClient from "@/prismaClient";
import { Prisma } from "@prisma/client";
import argon2 from "argon2";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new NextResponse(null, {
      status: 400,
    });
  }

  const hashedPassword = await argon2.hash(password);

  try {
    const user = await getPrismaClient().user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return new NextResponse(null, {
      status: 204,
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      // unique constraint failed, aka duplicate email
      return new NextResponse(null, {
        status: 409,
      });
    }
  }
};
