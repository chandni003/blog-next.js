import AuthorformcontextProvider from "./contexts/AuthorFormContext";

export default function Layout({
    children,
    }:{
        children:React.ReactNode;
    }
    
){
    return <AuthorformcontextProvider>{children}</AuthorformcontextProvider>
}