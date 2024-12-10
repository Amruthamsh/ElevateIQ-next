import React from "react";
import {
  Bell,
  Home,
  MessageCircle,
  Search,
  User,
  Users,
  Video,
  Menu,
  X,
  ThumbsUp,
  MessageSquare,
  Share2,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import signout from "../../components/ui/signout";
import SignOut from "../../components/ui/signout";
import CreatePost from "../_components/CreatePost";
import MobileMenu from "../_components/MobileMenu";

import Post from "@/models/post";
import dbConnect from "@/libs/mongodb";
import { getServerSession } from "next-auth";
import { options } from "../../../api/auth/[...nextauth]/options";

const ProfilePage = async () => {
  await dbConnect();
  const session = await getServerSession(options);
  const userId = session.user.id;
  //const posts = await Post.find({ createdBy: userId }).lean();
  const posts = await Post.find({})
    .populate("createdBy", "username fullname") // Populate creator details
    .select("_id title content createdAt createdBy imagePath"); // Select required fields

  console.log(posts);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-gray-800 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-blue-500 rounded-full p-2 mr-2">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
              </div>
              <div className="hidden md:block">
                <Input
                  className="w-64 bg-gray-700 text-white placeholder-gray-400"
                  placeholder="Search Clonedbook"
                />
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Home className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Video className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Users className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>PK</AvatarFallback>
              </Avatar>
            </div>
            <div className="md:hidden">
              <MobileMenu />
            </div>
            <SignOut />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="hidden md:flex w-64 bg-gray-800 p-4 flex-col">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Friends
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Groups
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Pages
            </Button>
            {/* Add more navigation items here */}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-gray-800 rounded-lg shadow-md p-4">
              <CreatePost userId={userId} authorRole="student" />
              <div className="flex justify-between mt-4">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Live video
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Photo/video
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Live event
                </Button>
              </div>
            </div>
            {posts.map((post) => (
              <div
                key={String(post._id)}
                className="bg-gray-800 rounded-lg shadow-md p-4"
              >
                <div className="flex items-center mb-4">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>{post.createdBy[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{post.title}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <p>{post.content}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-700 pt-3">
                  <div className="flex items-center">
                    <span className="bg-blue-500 text-white rounded-full p-1 mr-1">
                      <ThumbsUp className="h-3 w-3" />
                    </span>
                    <span>{post?.likes?.length} likes</span>
                  </div>
                  <span>{post?.comments?.length} comments</span>
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="ghost"
                    className="flex-1 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Like
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Comment
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-64 bg-gray-800 p-4 overflow-y-auto">
          <h2 className="font-semibold mb-4 text-lg">Contacts</h2>
          <div className="space-y-3">
            {["Gus Botsford", "Oleta O'Hara", "Kennedi Reynolds-Heller"].map(
              (name) => (
                <div key={name} className="flex items-center">
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{name}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
