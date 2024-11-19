import User from "@/models/user";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fullname, username, password, role } = await req.json();
    const user = User.create({ fullname, username, password, role });
    console.log("Registering user:", { fullname, username, role });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
  return NextResponse.json({ message: "success" });
}
