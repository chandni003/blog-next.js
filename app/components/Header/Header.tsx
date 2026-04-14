import { Home, MessageCircle, List } from "lucide-react";
import LoginButton from "./LoginButton";
import AuthContextProvider from "@/lib/context/AuthContext";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-7 py-3 border-b">
      <img className="h-10" src="/logo.png" alt="" />
      <ul className="flex items-center gap-6">
        <Link href={`/`}>
          <li className="flex gap-2">
            {" "}
            <Home />
            Home
          </li>
        </Link>
        <Link href={`/categories`}>
          <li className="flex gap-2">
            {" "}
            <List />
            Categories
          </li>
        </Link>

        {/* <Link href={`/cantact-us`}>
        <li className="flex gap-2">
          {" "}
          <MessageCircle />
          Contact us
        </li>
        </Link> */}
      </ul>
      <AuthContextProvider>
        <LoginButton />
      </AuthContextProvider>
    </nav>
  );
}
