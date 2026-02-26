"use client";

import { useAuth } from "@/lib/context/AuthContext";
import Link from "next/link";

export default function LoginButton() {
  const { user, isLoading, error, handleSignInwithGoogle, handleLogout } =
    useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (user) {
    return (
      <div className="flex gap-4">
        <button
          onClick={() => handleLogout()}
          className="flex items-center gap-3 bg-black text-white rounded-full px-6"
        >
          Logout
        </button>
       <Link href="/admin"> <div className="flex gap-4 rounded-xl px-3 py-1 bg-blue-100">
          <img className="object-cover h-12 w-12 rounded-full" src={user?.photoURL} alt="User profile pic" />

          <div>
            <h1 className="font-bold">{user?.displayName}</h1>
            <h1>{user?.email}</h1>
          </div>
        </div></Link>
      </div>
    );
  }
  return (
    <section>
      <button
        onClick={() => {
          handleSignInwithGoogle();
        }}
        className="cursor-pointer bg-black flex items-center gap-3 text-white px-4 py-2 rounded-full"
      >
        <img className="h-7" src="/google.png" alt="" />
        Login With Google
      </button>
    </section>
  );
}
