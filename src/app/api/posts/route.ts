import { NextResponse } from "next/server";
import Post from "@/models/post";
import dbConnect from "@/libs/mongodb";
import { revalidatePath } from "next/cache";

export const POST = async (req: Request) => {
  const { title, content, createdBy, authorRole } = await req.json();
  console.log("Request body:", { title, content, createdBy, authorRole });
  if (!title || !content || !createdBy || !authorRole) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
  await dbConnect();
  const post = await Post.create({ title, content, createdBy, authorRole });
  console.log("Post created successfully:", post);
  revalidatePath("/skillhive/STUDENT/profile");
  return NextResponse.json({ message: "success" });
};
