import Sidebar from "@/app/components/Header/Sidebar";
import AuthContextProvider from "@/lib/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <div className="flex bg-background text-foreground min-h-screen transition-colors duration-300">
        <Sidebar />
        <section className="flex-1 overflow-y-auto">
          {children}
        </section>
      </div>
    </AuthContextProvider>
  );
}
