import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { name, avatar, content, parentId, reactions } = await request.json();

    const newComment = await prisma.comment.create({
      data: {
        name,
        avatar,
        content,
        parentId: parentId || null,
        reactions: reactions || {},
      },
    });

    return new Response(JSON.stringify(newComment), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get("parentId") || null;

    const comments = await prisma.comment.findMany({
      where: {
        parentId: parentId ? Number(parentId) : null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
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

    return new Response(JSON.stringify(updatedComment), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
