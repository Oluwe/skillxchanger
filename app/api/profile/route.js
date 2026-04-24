import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

const profilesCollection = adminDb.collection("profiles");

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profileDoc = await profilesCollection.doc(session.user.email).get();
    if (!profileDoc.exists) {
      return NextResponse.json({ customName: null }, { status: 200 });
    }

    return NextResponse.json(profileDoc.data(), { status: 200 });
  } catch (error) {
    console.error("/api/profile GET error:", error);
    return NextResponse.json(
      { error: "Unable to fetch profile." },
      { status: 500 },
    );
  }
}

export async function PATCH(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const customName =
      typeof body.customName === "string" ? body.customName.trim() : "";

    if (!customName || customName.length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid name with at least 2 characters." },
        { status: 400 },
      );
    }

    const profileRef = profilesCollection.doc(session.user.email);
    await profileRef.set(
      {
        customName,
        email: session.user.email,
        image: session.user.image || "",
        updatedAt: new Date(),
      },
      { merge: true },
    );

    return NextResponse.json({ customName }, { status: 200 });
  } catch (error) {
    console.error("/api/profile PATCH error:", error);
    return NextResponse.json(
      { error: "Unable to update profile." },
      { status: 500 },
    );
  }
}
