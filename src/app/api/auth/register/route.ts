import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fullname, username, password, role } = await req.json();
    console.log("Registering user:", { fullname, username, role });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }

  return NextResponse.json({ message: "success" });
}
