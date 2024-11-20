import React from "react";
import SignOut from "../../components/ui/signout";
import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/post";

const page = async () => {
  await connectMongoDB();
  const posts = await Post.find({}).lean();
  console.log(posts);

  return (
    <div>
      <h1>COMPANY PROFILE</h1>
      <SignOut />
      <div></div>
    </div>
  );
};

export default page;
