import type { Metadata } from "next";
import { MessageStudio } from "@/components/admin/MessageStudio";

export const metadata: Metadata = {
  title: "Message Studio",
  // Keep the admin tool out of search engines.
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <MessageStudio />;
}
