"use client";
import PostFormContextProvider from "./contexts/PostFormContext";

export default function Layout({
    children,
    }:{
        children:React.ReactNode;
    }
    
){
    return <PostFormContextProvider>{children}</PostFormContextProvider>
}