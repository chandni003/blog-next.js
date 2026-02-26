import Header from "../components/Header/Header";
import Sidebar from "../components/Header/Sidebar";

export default function AdminLayout({ children }: { children: any }) {
  return (
    <div className="bg-white text-black">
      <Header />
      <section className="flex bg-white">
        <Sidebar />
        {children}
      </section>
    </div>
  );
}
