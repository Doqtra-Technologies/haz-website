import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

const TAGS = ["location", "menuCategory", "event", "blogPost", "siteContent"];

/** Called by a Sanity webhook on publish so edits appear on the site immediately. */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Revalidation is not configured" }, { status: 500 });
  }

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret);
  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const tags = body?._type && TAGS.includes(body._type) ? [body._type] : TAGS;
  tags.forEach((tag) => revalidateTag(tag));
  return NextResponse.json({ revalidated: tags });
}
