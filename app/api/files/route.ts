import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET() {
  const files = await client.query(api.files.getFiles, {
    teamId: "test-team"
  });

  return NextResponse.json({ success: true, data: files });
}

export async function POST(req: Request) {
  const body = await req.json();

  const result = await client.mutation(api.files.createFile, {
    fileName: body.fileName,
    teamId: "test-team",
    createdBy: "api@test.com",
    archive: false,
    document: "",
    whiteboard: ""
  });

  return NextResponse.json({ success: true, fileId: result });
}