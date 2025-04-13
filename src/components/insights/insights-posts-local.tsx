"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowDownUp, ListFilter } from "lucide-react";
import { Input } from "../ui/input";
import { PostMock } from "@/lib/mock-data";
import { StaticImageData } from "next/image";
// Define TypeScript type for posts
type PostMockType = {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  publishedBy: string;
  publishedAt: string;
  coverImage: string | StaticImageData; // Allow both string and StaticImageData
  description: string;
  postImage: string | StaticImageData; // Allow both string and StaticImageData
};

// Main Component
export default function InsightsPostsLocal() {
  const [posts, setPosts] = useState<PostMockType[]>([]);

  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Mock fetch posts on mount
  useEffect(() => {
    try {
      // Fetch mock posts
      setPosts(PostMock);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter posts based on the search input
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Render loading, error, or post list
  return (
    <div className="">
      <div className="flex justify-between search-insight">
        <div>
          <p className="text-[14px] font-semibold">All</p>
          <p className="text-[12px] font-light">
            Get new tailored market and news update.
          </p>
        </div>
        <div className="flex gap-2 items-center mb-4">
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full min-w-[300px] h-8 rounded-full bg-background pl-8 text-[10px] search-input"
          />
          <Button variant="ghost" className="p-0">
            <ListFilter className="asc-icon" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredPosts.length > 0 ? (
        <ul className="flex flex-col gap-y-4">
          {filteredPosts.map((post) => (
            <li key={post.id} className="hover:underline">
              <Link
                href={`/dashboard/insights/${post.id}`}
                className="hover:bg-gray-200 p-2 rounded flex justify-between items-center"
              >
                <div className="flex gap-4 items-start">
                  {post.coverImage ? (
                    <Image
                      className="rounded-2xl h-[80px] w-[80px] object-cover object-center"
                      src={post.coverImage || ""}
                      alt={post.title}
                      width={500}
                      height={100}
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-300 flex items-center justify-center">
                      <span>No Image</span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{post.title}</p>
                    <p className="text-xs text-gray-500">
                      by {post.publishedBy}
                    </p>
                    <p className="text-xs text-gray-500">
                      Published{" "}
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Button className="text-xs rounded-full">View Details</Button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No posts found</p>
      )}
    </div>
  );
}
