"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

import React, { useEffect, useState } from "react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [totalLikes, setTotalLikes] = useState(post.likes);
  const [isClicked, setIsClicked] = useState(
    post.likedBy.includes(session?.user.id)
  );

  const handleLikes = async (isLiked) => {
    var likes = post.likes;
    if (!isLiked) {
      likes = post.likes + 1;
      console.log("liked");
      setIsClicked(true);
    } else if (isLiked && post.likes > 0) {
      likes = post.likes - 1;
      console.log("Unliked");
      setIsClicked(false);
    } else if (isLiked && post.likes <= 0) {
      likes = 0;
    }
    const postId = post._id;
    const loggedInUserId = session?.user.id;

    try {
      const response = await fetch("/api/prompt/likes", {
        method: "PATCH",
        body: JSON.stringify({ postId, loggedInUserId, likes, isLiked }),
      });

      if (response.ok) {
        console.log("ok", post.likes);
      }
    } catch (error) {
      console.log(error);
    }
    setTotalLikes(likes);
    console.log(post.likes);
  };

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user-image"
            width={40}
            height={35}
            className="rounded-full object-contain"
          ></Image>
          <div className="flex flex-col">
            <h3 className="font.satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm">{post.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            alt="copy.png"
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          ></Image>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => {
          handleTagClick && handleTagClick(post.tag);
        }}
      >
        #{post.tag}
      </p>
      <div className="font-lighter text-sm flex flex-row-reverse font-satoshi gap-2">
        {!post.likedBy.includes(session?.user.id) && (
          <Image
            src={
              isClicked ? "/assets/images/liked.svg" : "/assets/images/like.svg"
            }
            alt="user-image"
            width={20}
            height={20}
            className="rounded-full object-contain cursor-pointer"
            onClick={() => {
              handleLikes(false);
            }}
          ></Image>
        )}
        {post.likedBy.includes(session?.user.id) && (
          <Image
            src={
              isClicked ? "/assets/images/liked.svg" : "/assets/images/like.svg"
            }
            alt="user-image"
            width={20}
            height={20}
            className="rounded-full object-contain cursor-pointer"
            onClick={() => {
              handleLikes(true);
            }}
          ></Image>
        )}

        {totalLikes}
      </div>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-20 border-t border-gray-100 pt-3 font-semibold">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
