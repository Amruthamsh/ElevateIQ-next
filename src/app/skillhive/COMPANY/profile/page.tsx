import React from "react";
import SignOut from "../../components/ui/signout";
import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/post";
import Image from "next/image";

const page = async () => {
  await connectMongoDB();
  const posts = await Post.find({})
    .populate("createdBy", "username fullname") // Populate creator details
    .select("_id title content createdAt createdBy imagePath"); // Select required fields

  console.log(posts);

  return (
    <div className="bg-white">
      <h1>COMPANY PROFILE</h1>
      <SignOut />
      <div>
        {posts.map((post) => (
          <div key={post._id} className="py-4">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Author: {post.createdBy.fullname}</p>
            <p>Created at: {post.createdAt.toString()}</p>
            {post.imagePath && (
              <Image
                src={post.imagePath}
                alt="Post image"
                width={500}
                height={500}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
