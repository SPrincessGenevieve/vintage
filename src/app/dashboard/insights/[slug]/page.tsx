"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams to get the slug from the URL
import { getPost } from "../graphqlSdk";
import { Post } from "../post";
import InsightsSubHeader from "@/components/insights/insights-sub-header";
import withAuth from "@/app/withAuth";
// Define a type for the post structure
interface Post {
  title: string;
  content: string; // Assuming the post has content
}

function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const params = useParams(); // Get the dynamic slug from the URL

  // Log the params to check if it's capturing the slug correctly
  console.log("Params:", params);

  // Fetch post data based on the slug when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const postData = await getPost(params.slug, false); // Fetch post data using the slug
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    }

    if (params.slug) {
      fetchData();
    }
  }, [params.slug]);

  return (
    <div>
      <InsightsSubHeader insightPage={post?.title || ""}></InsightsSubHeader>
     {post ? <Post post={post} /> : <p>Loading post...</p>}
    </div>
  );
}

export default withAuth(PostPage)