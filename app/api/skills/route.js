import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

const skillsCollection = adminDb.collection("skills");

// GET: Fetch all skills from Firebase
export async function GET() {
  try {
    const querySnapshot = await skillsCollection
      .orderBy("createdAt", "desc")
      .get();

    const skills = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const likedBy = Array.isArray(data.likedBy) ? data.likedBy : [];
      const comments = Array.isArray(data.comments) ? data.comments : [];
      const normalizedComments = comments.map((comment) => ({
        ...comment,
        createdAt: comment?.createdAt
          ? comment.createdAt.toDate
            ? comment.createdAt.toDate().toISOString()
            : new Date(comment.createdAt).toISOString()
          : null,
      }));
      const commentCount =
        typeof data.commentCount === "number"
          ? data.commentCount
          : normalizedComments.length;

      return {
        id: doc.id,
        type: data.type,
        skillName: data.skillName,
        description: data.description,
        category: data.category,
        userContact: data.userContact || {},
        likes: typeof data.likes === "number" ? data.likes : likedBy.length,
        likedBy,
        commentCount,
        comments: normalizedComments,
        createdAt: data.createdAt
          ? data.createdAt.toDate
            ? data.createdAt.toDate().toISOString()
            : new Date(data.createdAt).toISOString()
          : null,
      };
    });
    return NextResponse.json(skills, { status: 200 });
  } catch (error) {
    console.error("/api/skills GET error:", error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST: Create new skill in Firebase
export async function POST(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      type,
      skillName,
      description,
      category,
      youtube,
      whatsapp,
      linkedin,
      instagram,
    } = body;

    // Validation
    if (!type || !skillName || !description || !category) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }
    if (typeof type !== "string" || (type !== "offer" && type !== "wanted")) {
      return NextResponse.json(
        { error: 'Type must be either "offer" or "wanted".' },
        { status: 400 },
      );
    }
    if (typeof skillName !== "string" || skillName.trim().length < 3) {
      return NextResponse.json(
        { error: "Skill name must be at least 3 characters." },
        { status: 400 },
      );
    }
    if (typeof description !== "string" || description.trim().length < 10) {
      return NextResponse.json(
        { error: "Description must be at least 10 characters." },
        { status: 400 },
      );
    }
    if (typeof category !== "string" || !category.trim()) {
      return NextResponse.json(
        { error: "Category is required." },
        { status: 400 },
      );
    }

    const newSkill = {
      userId: session.user.email || session.user.name || "anonymous",
      type,
      skillName,
      description,
      category,
      userContact: {
        name: session.user.name || session.user.email || "Unknown",
        email: session.user.email || "",
        phone: body.phone || "",
        youtube: youtube || "",
        whatsapp: whatsapp || "",
        linkedin: linkedin || "",
        instagram: instagram || "",
      },
      likes: 0,
      likedBy: [],
      comments: [],
      commentCount: 0,
      createdAt: new Date(),
    };

    const docRef = await skillsCollection.add(newSkill);
    return NextResponse.json(
      {
        id: docRef.id,
        ...newSkill,
        createdAt: newSkill.createdAt.toISOString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("/api/skills POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
