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
          // Auto-upgrade specified user to admin
          if (user.email === "chandniofficial001@gmail.com" && currentRole !== "admin") {
            await setDoc(docRef, { role: "admin" }, { merge: true });
            setRole("admin");
          } else {
            setRole(currentRole);
          }
        } else {
          // Create default user profile
          const initialRole = user.email === "chandniofficial001@gmail.com" ? "admin" : "user";
          await setDoc(docRef, {
            email: user.email,
            name: user.displayName,
            role: initialRole,
            createdAt: new Date(),
          });
          setRole(initialRole);
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
