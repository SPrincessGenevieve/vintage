"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { getAllPosts } from "./graphqlSdk.js"; // Import the function to fetch posts
import { useUserContext } from "@/app/context/UserContext";
import withAuth from "@/app/withAuth";
import insightsIconB from "@/images/insight-icon-b.png";
import { Button } from "@/components/ui/button";
import "@/app/globals.css";
import Image, { StaticImageData } from "next/image.js";
import { ChevronRight, ListFilter } from "lucide-react";


// Define a type for the post structure
interface Post {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  createdAt: string;
  thumbnail: {
    title: string;
    description: string;
    fileName: string;
    url: string;
    width: number;
    height: number;
  };
  author: string;
  publishedBy: string;
  publishedAt: string;
  coverImage: string | StaticImageData; // Allow both string and StaticImageData
  description: string;
  postImage: string | StaticImageData; // Allow both string and StaticImageData
}

function Page() {
  const [posts, setPosts] = useState<Post[]>([]); // Array of Post objects
  const router = useRouter(); // Initialize the router for navigation
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchInput.toLowerCase())
  );
  // Fetch all posts with slug and title when the component mounts
  useEffect(() => {
    async function fetchSlugsAndTitles() {
      try {
        const allPosts = await getAllPosts(); // Fetch posts from GraphQL
        if (allPosts) {
          setPosts(allPosts); // Update the posts state
        } else {
          setPosts([]); // Set an empty array if no posts
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]); // Set an empty array if there's an error
      }
    }

    fetchSlugsAndTitles();
  }, []);

  // Function to handle navigation when a post is clicked
  const handlePostClick = (slug: string) => {
    router.push(`/dashboard/insights/${slug}`); // Navigate to the post page
  };

  // Get the latest posts
  const latestPosts = Array.isArray(posts) ? posts.slice(0, 3) : [];
  return (
    <div className="w-full h-full p-2">
      {/* If there are 3 or more than 3 posts */}
      {latestPosts.length >= 3 && (
        <div className="w-full h-[300px] bg-[#F8F8F8] border-none flex gap-2">
          <div
            onClick={() => handlePostClick(latestPosts[0].slug)}
            className="text-white w-1/2 h-auto bg-[#2E5257] rounded-3xl flex cursor-pointer"
          >
            <div className="w-[30%] p-2 h-full flex items-center justify-center">
              <Image alt="" width={400} height={400} className="rounded-2xl  w-full h-full object-cover" src={latestPosts[0].thumbnail.url}></Image>
            </div>
            <div className="flex flex-col h-full w-[70%] justify-center ">
              {latestPosts[0] && (
                <div>
                  <p className="text-[16px] text-white">
                    {latestPosts[0].title}
                  </p>
                  <p className="text-[12px] text-white font-extralight">
                    {latestPosts[0].subtitle}
                  </p>
                  <p className="text-[12px] mt-5 text-white font-extralight">
                    {latestPosts[0].description}
                  </p>
                </div>
              )}
              <Button className="mt-5 text-insight h-[25px] py-[1%] insight-p text-[0.7vw] rounded-full w-[90px] text-[#2A2C2D] bg-[#F4F6F8] hover:bg-white">
                <p className="text-insight">Read</p>{" "}
                <ChevronRight color="#2A2C2D" />
              </Button>
            </div>
          </div>
          <div className="flex w-1/2 h-auto flex-col gap-2">
            <div
              onClick={() => handlePostClick(latestPosts[1].slug)}
              className="w-full h-1/2 bg-[#2E5257] flex rounded-3xl   cursor-pointer"
            >
              <div className="w-[20%] h-full flex items-center justify-center p-2">
                <Image alt=""  width={400} height={400} className="rounded-2xl  w-full h-full object-cover" src={latestPosts[1].thumbnail.url}></Image>
              </div>
              <div className="flex flex-col h-full w-[70%] justify-center ">
                {latestPosts[1] && (
                  <div>
                    <p className="text-[16px] text-white">
                      {latestPosts[1].title}
                    </p>
                    <p className="text-[12px] text-white font-extralight">
                      {latestPosts[1].subtitle}
                    </p>
                  </div>
                )}
                <Button className="mt-5 text-insight h-[25px] py-[1%] insight-p text-[0.7vw] rounded-full w-[90px] text-[#2A2C2D] bg-[#F4F6F8] hover:bg-white">
                  <p className="text-insight">Read</p>{" "}
                  <ChevronRight color="#2A2C2D" />
                </Button>
              </div>
            </div>
            <div
              onClick={() => handlePostClick(latestPosts[2].slug)}
              className="w-full h-1/2 bg-[#2E5257] flex rounded-3xl  cursor-pointer"
            >
              <div className="w-[20%] h-full flex items-center justify-center p-2">
                <Image alt=""  width={400} height={400} className="rounded-2xl w-full h-full object-cover" src={latestPosts[2].thumbnail.url}></Image>
              </div>
              <div className="flex flex-col h-full w-[70%] justify-center ">
                {latestPosts[2] && (
                  <div>
                    <p className="text-[16px] text-white">
                      {latestPosts[2].title}
                    </p>
                    <p className="text-[12px] text-white font-extralight">
                      {latestPosts[2].subtitle}
                    </p>
                  </div>
                )}{" "}
                <Button className="mt-5 text-insight h-[25px] py-[1%] insight-p text-[0.7vw] rounded-full w-[90px] text-[#2A2C2D] bg-[#F4F6F8] hover:bg-white">
                  <p className="text-insight">Read</p>{" "}
                  <ChevronRight color="#2A2C2D" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* If there are only two posts */}
      {latestPosts.length === 2 && (
        <div className="p-2 w-full h-[300px] bg-[#F8F8F8] border-none flex gap-2">
          <div
            onClick={() => handlePostClick(latestPosts[0].slug)}
            className="text-white w-1/2 h-auto bg-[#2E5257] rounded-3xl flex cursor-pointer"
          >
            <div className="w-[30%] h-full flex items-center justify-center">
              <Image alt=""  width={400} height={400} className="rounded-2xl  w-full h-full object-cover" src={latestPosts[0].thumbnail.url}></Image>
            </div>
            <div className="flex flex-col h-full w-[70%] justify-center ">
              {latestPosts[0] && (
                <div>
                  <p className="text-[16px] text-white">
                    {latestPosts[0].title}
                  </p>
                  <p className="text-[12px] text-white font-extralight">
                    {latestPosts[0].subtitle}
                  </p>
                  <p className="text-[12px] mt-5 text-white font-extralight">
                    {latestPosts[0].description}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => handlePostClick(latestPosts[1].slug)}
            className="text-white w-1/2 h-auto bg-[#2E5257] rounded-3xl flex cursor-pointer"
          >
            <div className="w-[30%] h-full flex items-center justify-center">
              <Image alt=""  width={400} height={400} className="rounded-2xl  w-full h-full object-cover" src={latestPosts[1].thumbnail.url}></Image>
            </div>
            <div className="flex flex-col h-full w-[70%] justify-center ">
              {latestPosts[1] && (
                <div>
                  <p className="text-[16px] text-white">
                    {latestPosts[1].title}
                  </p>
                  <p className="text-[12px] text-white font-extralight">
                    {latestPosts[1].subtitle}
                  </p>
                  <p className="text-[12px] mt-5 text-white font-extralight">
                    {latestPosts[1].description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* If there is only one post */}
      {latestPosts.length === 1 && (
        <div  onClick={() => handlePostClick(latestPosts[0].slug)} className="text-white w-full h-auto bg-[#2E5257] rounded-3xl flex cursor-pointer">
          <div className="w-[30%] h-full flex items-center justify-center">
            <Image alt=""  width={400} height={400} className="rounded-2xl  w-full h-full object-cover" src={latestPosts[0].thumbnail.url}></Image>
          </div>
          <div className="flex flex-col h-full w-[70%] justify-center ">
            {latestPosts[0] && (
              <div>
                <p className="text-[16px] text-white">{latestPosts[0].title}</p>
                <p className="text-[12px] text-white font-extralight">
                  {latestPosts[0].subtitle}
                </p>
                <p className="text-[12px] mt-5 text-white font-extralight">
                  {latestPosts[0].description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Render the rest of the posts if there are more than 3 */}

      <div>
        <div className="flex flex-col mt-4">
          <div className="w-full flex justify-between items-center">
            <div>
              <p className="text-[14px] font-semibold">All</p>
              <p className="text-[12px] font-light">
                Get new tailored market and news update.
              </p>
            </div>
            <div className="flex gap-2 items-center mb-4">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="border w-full min-w-[300px] h-8 rounded-full bg-white pl-8 text-[10px] search-input"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {filteredPosts &&
              Array.isArray(filteredPosts) &&
              filteredPosts.map((post) => (
                <div key={post.slug}>
                  <button
                    onClick={() => handlePostClick(post.slug)}
                    className="p-2 flex w-full items-center justify-between hover:bg-[#e7e7e7] rounded-2xl transition duration-700 ease-in-out"
                  >
                    <div className="flex gap-2">
                      <div className="border rounded-xl w-[90px] h-[90px] flex justify-center items-center">
                        <Image
                          width={400}
                          height={400}
                          className="h-full w-auto rounded-xl object-cover"
                          src={post.thumbnail.url}
                          alt=""
                        ></Image>
                      </div>
                      <div className="flex flex-col text-left">
                        <p className="text-sm font-medium">{post.title}</p>
                        <p className="text-xs text-gray-500">
                          by {post.author}
                        </p>
                        <p className="text-xs text-gray-500">
                          {!post.createdAt ? "" : "Published on"}{" "}
                          {post.createdAt || ""}
                        </p>
                      </div>
                    </div>
                    <Button className="text-xs rounded-full">
                      View Details
                    </Button>
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Page)