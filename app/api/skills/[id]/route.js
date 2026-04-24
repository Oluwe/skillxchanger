import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

const skillsCollection = adminDb.collection("skills");

export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resolvedParams = await params;
  const { id } = resolvedParams || {};
  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { error: "Valid skill id is required." },
      { status: 400 },
    );
  }

  const skillRef = skillsCollection.doc(id);
  const skillDoc = await skillRef.get();

  if (!skillDoc.exists) {
    return NextResponse.json({ error: "Skill not found." }, { status: 404 });
  }

  const skill = skillDoc.data();
  const ownerEmail = skill?.userContact?.email?.toLowerCase()?.trim();
  const userEmail = session.user.email?.toLowerCase()?.trim();
  if (ownerEmail !== userEmail) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  await skillRef.delete();
  return NextResponse.json({ success: true }, { status: 200 });
}

export async function PATCH(request, { params }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resolvedParams = await params;
  const { id } = resolvedParams || {};
  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { error: "Valid skill id is required." },
      { status: 400 },
    );
  }

  const body = await request.json();
  const { action, comment } = body;

  if (!action) {
    return NextResponse.json({ error: "Action is required." }, { status: 400 });
  }

  const skillRef = skillsCollection.doc(id);
  const skillDoc = await skillRef.get();

  if (!skillDoc.exists) {
    return NextResponse.json({ error: "Skill not found." }, { status: 404 });
  }

  const skill = skillDoc.data();
  const likedBy = Array.isArray(skill.likedBy) ? skill.likedBy : [];
  const comments = Array.isArray(skill.comments) ? skill.comments : [];

  if (action === "like") {
    const userEmail = session.user.email?.toLowerCase()?.trim();
    const normalizedLikedBy = Array.isArray(likedBy)
      ? likedBy
          .map((email) =>
            typeof email === "string" ? email.toLowerCase().trim() : "",
          )
          .filter(Boolean)
      : [];
    const hasLiked = normalizedLikedBy.includes(userEmail);
    const updatedLikedBy = hasLiked
      ? normalizedLikedBy.filter((email) => email !== userEmail)
      : [...normalizedLikedBy, userEmail];

    await skillRef.update({
      likedBy: updatedLikedBy,
      likes: updatedLikedBy.length,
    });

    return NextResponse.json(
      {
        likes: updatedLikedBy.length,
        likedBy: updatedLikedBy,
      },
      { status: 200 },
    );
  }

  if (action === "comment") {
    const text = typeof comment === "string" ? comment.trim() : "";
    if (!text) {
      return NextResponse.json(
        { error: "Comment text is required." },
        { status: 400 },
      );
    }

    const newComment = {
      userEmail: session.user.email,
      userName: session.user.name || session.user.email,
      text,
      createdAt: new Date(),
    };

    const updatedComments = [...comments, newComment];
    await skillRef.update({
      comments: updatedComments,
      commentCount: updatedComments.length,
    });

    return NextResponse.json(
      {
        commentCount: updatedComments.length,
        comments: updatedComments,
      },
      { status: 200 },
    );
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
