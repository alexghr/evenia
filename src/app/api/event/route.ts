import prismaClient from "@/prismaClient";
import { Prisma } from "@prisma/client";
import { UploadClient } from "@uploadcare/upload-client";
import argon2 from "argon2";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req: NextRequest) => {
  const sess = await getServerSession(authOptions);
  console.log({ sess });
  if (!sess) {
    return new NextResponse(null, {
      status: 401,
    });
  }

  const { name, description, date, location, image } = await req.json();

  if (!name || !date || !location) {
    return new NextResponse(null, {
      status: 400,
    });
  }

  try {
    const client = new UploadClient({
      publicKey: process.env.UPLOADCARE_API_KEY ?? "",
    });

    let imageUrl: string | null = null;

    if (image) {
      console.debug("Uploading logo");
      const parts = image.split(",");
      const mimeType = parts[0].match(/^data:(image\/\w+);base64$/)?.[1];
      if (!mimeType) {
        console.warn("Invalid logo format: '%s'", mimeType);
      } else {
        console.log("Uploading logo of type '%s'", mimeType);
        const uploadResp = await client.uploadFile(
          Buffer.from(parts[1], "base64"),
          {
            store: true,
            contentType: mimeType,
          }
        );

        imageUrl = uploadResp.cdnUrl;
      }
    }

    const event = await prismaClient.event.create({
      data: {
        date: new Date(date),
        description,
        location,
        name,
        imageUrl,
      },
    });

    return new NextResponse(JSON.stringify(event), {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(null, {
      status: 500,
    });
  }
};
