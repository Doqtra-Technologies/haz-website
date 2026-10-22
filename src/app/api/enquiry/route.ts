import { NextResponse } from "next/server";
import { container } from "@/infrastructure/container";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const result = await container.submitGroupEnquiry.execute(body);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
