import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { revalidatePath } from "next/cache";
export const PATCH = async (request) => {
  const { postId, loggedInUserId, likes, isLiked } = await request.json();

  try {
    await connectToDB();

    // Find the existing prompt by ID

    // if (!existingPrompt) {
    //     return new Response("Prompt not found", { status: 404 });
    // }
    // // Update the prompt with new data
    const existingPrompt = await Prompt.findById(postId);
    !isLiked
      ? existingPrompt.likedBy.push(loggedInUserId)
      : existingPrompt.likedBy.pull(loggedInUserId);
    existingPrompt.likes = likes;

    // // Update the prompt with new data
    // existingPrompt.prompt = prompt;
    // existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};
