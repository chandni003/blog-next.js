"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/context/AuthContext";

export function useUserRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<"user" | "writer" | "admin" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      if (!user) {
        setRole(null);
        setIsLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const currentRole = docSnap.data().role || "user";
          setRole(currentRole);
        } else {
          // Create default user profile — all new users start as "user"
          await setDoc(docRef, {
            email: user.email,
            name: user.displayName,
            role: "user",
            createdAt: new Date(),
          });
          setRole("user");
        }
      } catch (error) {
        console.error("Error fetching user role", error);
        setRole("user");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRole();
  }, [user]);

  return { role, isLoading };
}
