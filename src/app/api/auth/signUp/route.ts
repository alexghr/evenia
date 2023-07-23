import prismaClient from "@/prismaClient";
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

  await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return new NextResponse(null, {
    status: 204,
  });
};
