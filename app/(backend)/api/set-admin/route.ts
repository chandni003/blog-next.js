import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";

// ONE-TIME endpoint: sets role="admin" for chandniofficial001@gmail.com
// Call: GET /api/set-admin
// DELETE or disable this route after running it once.
export async function GET() {
  const targetEmail = "chandniofficial001@gmail.com";

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", targetEmail));
    const snap = await getDocs(q);

    if (snap.empty) {
      return NextResponse.json(
        {
          error: `No user found with email: ${targetEmail}. Make sure the user has signed in at least once so their profile is created in Firestore.`,
        },
        { status: 404 }
      );
    }

    const updates: string[] = [];
    for (const docSnap of snap.docs) {
      await updateDoc(docSnap.ref, { role: "admin" });
      updates.push(docSnap.id);
    }

    return NextResponse.json({
      success: true,
      message: `Role set to "admin" for ${targetEmail}`,
      updatedDocs: updates,
    });
  } catch (error: any) {
    console.error("set-admin error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
