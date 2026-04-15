import Sidebar from "../components/Header/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-background text-foreground min-h-screen transition-colors duration-300">
      <Sidebar />
      <section className="flex-1 overflow-y-auto">
        {children}
      </section>
    </div>
  );
}

