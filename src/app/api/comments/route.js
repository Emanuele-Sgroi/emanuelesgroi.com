// Comments API Handler: Handles CRUD operations for comments using Prisma

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle creating a new comment
export async function POST(request) {
  try {
    const {
      name,
      avatar,
      content,
      parentId,
      reactions,
      isAuthor,
      isTopComment,
    } = await request.json();

    const newComment = await prisma.comment.create({
      data: {
        name,
        avatar: avatar || null, // Optional avatar
        content,
        parentId: parentId || null, // Assign parentId for replies
        reactions: reactions || {}, // Default to empty reactions object
        isAuthor: isAuthor || false, // Mark if the author is responding
        isTopComment: isTopComment || false, // Mark if pinned as a top comment
      },
    });

    return new Response(JSON.stringify(newComment), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Handle fetching all comments
export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: {
        createdAt: "desc", // Retrieve comments in descending order
      },
    });

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error Fetching Comments:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Handle updating comment reactions
export async function PATCH(request) {
  try {
    const { id, reactions } = await request.json();

    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { reactions },
    });

    return new Response(JSON.stringify(updatedComment), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
