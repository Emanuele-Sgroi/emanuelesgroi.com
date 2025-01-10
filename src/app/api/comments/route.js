import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    // Log request data for debugging
    console.log("POST Request Body:", {
      name,
      avatar,
      content,
      parentId,
      reactions,
      isAuthor,
      isTopComment,
    });

    const newComment = await prisma.comment.create({
      data: {
        name,
        avatar: avatar || null,
        content,
        parentId: parentId || null, // Assign parentId for replies
        reactions: reactions || {},
        isAuthor: isAuthor || false,
        isTopComment: isTopComment || false,
      },
    });

    console.log("New Comment Created:", newComment);

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

export async function GET(request) {
  try {
    const comments = await prisma.comment.findMany({
      // include: {
      //   children: true, // Fetch all replies (nested comments)
      // },
      orderBy: {
        createdAt: "desc", // Sort comments by creation date
      },
    });

    console.log(JSON.stringify(comments));

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

export async function PATCH(request) {
  try {
    const { id, reactions } = await request.json();

    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { reactions },
    });

    //console.log("Updated Comment:", updatedComment);

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
