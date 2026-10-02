import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/AdminApp";

export const metadata: Metadata = {
  title: "Message Studio",
  // Keep the admin tool out of search engines.
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}
