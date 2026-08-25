import type { Metadata } from "next";
import { ErrorState } from "@/components/ui/States";
import { Reader } from "@/components/reader/Reader";
import { getAllItems, getItemById } from "@/lib/library";

export function generateStaticParams() {
  return getAllItems().map((item) => ({ id: item.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const item = getItemById(params.id);
  return {
    title: item ? `Reading — ${item.title}` : "Message not found",
  };
}

export default function ReadPage({ params }: { params: { id: string } }) {
  const item = getItemById(params.id);

  if (!item) {
    return (
      <div className="min-h-screen bg-brand-cream">
        <ErrorState
          title="Message not found"
          message="The message you're looking for could not be found."
          action={{ label: "Back to Messages Library", href: "/messages" }}
        />
      </div>
    );
  }

  return <Reader item={item} />;
}
