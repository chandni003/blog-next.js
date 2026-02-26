import { Home,MessageCircle,List } from "lucide-react";
import LoginButton from "./LoginButton";
import AuthContextProvider from "@/lib/context/AuthContext";

export default function Header(){
    return <nav className="flex items-center justify-between px-7 py-3 border-b">
        <img className="h-10" src="/logo.png" alt="" />
        <ul className="flex items-center gap-6">
            <li className="flex gap-2"> <Home />home</li>
            <li className="flex gap-2"> <List />blogs</li>
            <li className="flex gap-2"> <MessageCircle />contact us</li>
        </ul>
        < AuthContextProvider><LoginButton /></AuthContextProvider>

    </nav>
}