import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  try {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };
    if (serviceAccount.projectId && serviceAccount.privateKey) {
       initializeApp({
         credential: cert(serviceAccount),
       });
    } else {
      // Fallback for default initialization if no env vars are strictly set 
      // (e.g. running on GCP or locally with GOOGLE_APPLICATION_CREDENTIALS)
      initializeApp();
    }
  } catch (error: any) {
    console.error("Firebase admin init error", error);
  }
}

export async function POST(req: Request) {
  try {
    const { targetUserId, newRole } = await req.json();

    if (!targetUserId || !newRole) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Set custom user claim
    await getAuth().setCustomUserClaims(targetUserId, { role: newRole });

    // Update Firestore document
    await getFirestore().collection("users").doc(targetUserId).update({
      role: newRole,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Update role error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
