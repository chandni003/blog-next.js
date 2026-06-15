import { redirect } from "next/navigation";

// Redirect /admin to the main admin dashboard page
export default function AdminRootPage() {
  redirect("/admin/dashboard");
}