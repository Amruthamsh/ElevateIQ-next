import React from "react";
import SignOut from "../../components/ui/signout";
import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/post";
import CreatePost from "../../STUDENT/_components/CreatePost";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const page = async () => {
  const session = await getServerSession(options);
  const userId = session.user.id;
  await connectMongoDB();
  const posts = await Post.find({})
    .populate("createdBy", "username fullname") // Populate creator details
    .select("_id title content createdAt createdBy"); // Select required fields

  console.log(posts);

  return (
    <div className="bg-white">
      <h1>COLLEGE PROFILE</h1>
      <SignOut />
      <CreatePost userId={userId} authorRole="college" />
      <div>
        {posts.map((post) => (
          <div key={post._id} className="py-4">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Author: {post.createdBy.fullname}</p>
            <p>Created at: {post.createdAt.toString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
