import { getToken } from "@/actions/messenger.action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken();
    if (token) {
      return NextResponse.json(token);
    } else {
      return NextResponse.json(
        { error: "Failed to get token" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to get token" }, { status: 500 });
  }
}
