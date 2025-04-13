"use client";
import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import dayjs from "dayjs";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react";

import PostAuthor from "./postAuthor";

const findAsset = (id, assets) => assets?.find((asset) => asset.sys.id == id);

const options = (links) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const asset = findAsset(node.data.target.sys.id, links?.assets?.block);
      if (!asset) return <p>Image not found</p>;

      return (
        <img
          src={asset.url ?? ""}
          alt={asset.title || "Contentful Image"}
          className="max-w-full h-auto my-6" // ✅ Mobile-responsive image
        />
      );
    },
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="text-base space-y-4">
        {/* Ensure line breaks are rendered properly */}
        {children.map((child, index) =>
          typeof child === "string"
            ? child.split("\n").map((text, i) => (
                <React.Fragment key={i}>
                  {text}
                  {i < child.split("\n").length - 1 && <br />} {/* Render <br> for line breaks */}
                </React.Fragment>
              ))
            : child
        )}
      </p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">{children}</h1> // ✅ Adjust font size for different screen sizes
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-4xl font-bold sm:text-4xl">{children}</h2> // ✅ Responsive heading sizes
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="text-xl font-medium sm:text-2xl">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4 className="text-lg sm:text-xl">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <h5 className="text-md sm:text-lg">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <h6 className="text-sm sm:text-base">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc ml-5 sm:ml-8">{children}</ul> // ✅ Adjust for mobile-friendly lists
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="list-decimal ml-5 sm:ml-8">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    [INLINES.BREAK]: () => <br />,
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className=" text-[16px]">
        {children.map((child, index) =>
          typeof child === "string"
            ? child.split("\n").map((text, i) => (
                <React.Fragment key={i}>
                  {text}
                  {i < child.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))
            : child
        )}
      </p>
    ),
  },
});

export const Post = ({ post }) => {
  const livePost = useContentfulLiveUpdates(post);
  const inspectorProps = useContentfulInspectorMode({ entryId: post.id });

  console.log(livePost.body.json);

  const postDate = dayjs(post.date).format(" dddd D MMMM, YYYY");

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 bg-white">
      <section className="w-full">
        <div className="container space-y-12 px-4 sm:px-6 md:px-8">
          <div className="space-y-4">
            <p
              className="text-4xl font-bold tracking-tighter text-[60px] leading-[70px]"
              {...inspectorProps({ fieldId: "title" })}
            >
              {livePost.title}
            </p>
            <PostAuthor
              author={livePost.author}
              date={postDate}
              inspectorProps={inspectorProps}
            />

            <div className="mb-8 md:mb-16 sm:mx-0"></div>

            <div className="flex justify-between flex-col md:flex-row">
              <p
                className="max-w-[900px] text-zinc-500 md:text-xl lg:text-base xl:text-xl dark:text-zinc-400"
                {...inspectorProps({ fieldId: "description" })}
              >
                {livePost.description}
              </p>
            </div>
          </div>
          <div>
          <div className="post-body mt-4 space-y-4 text-[12px] text-gray-800 ">
            {documentToReactComponents(livePost.body.json, options(livePost.body.links))}
          </div>
          </div>
          <div
            className="mb-5 truncate"
            {...inspectorProps({ fieldId: "excerpt" })}
          >
            {livePost.excerpt}
          </div>
        </div>
      </section>
    </div>
  );
};
