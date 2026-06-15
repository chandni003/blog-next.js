import Header from "@/app/(frontend)/(public)/components/Header";
import Footer from "@/app/(frontend)/(public)/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
