"use client";
import CategoryformContextProvider from "./contexts/categoryFormContext";

export default function Layout({
    children,
    }:{
        children:React.ReactNode;
    }
    
){
    return <CategoryformContextProvider>{children}</CategoryformContextProvider>
}