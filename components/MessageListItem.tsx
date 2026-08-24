import Image from "next/image";
import Link from "next/link";
import type { MessageItem } from "@/types";

/** A single row in the Latest Messages list: thumbnail + title + excerpt + date. */
export function MessageListItem({ message }: { message: MessageItem }) {
  return (
    <Link
      href={message.href}
      className="group flex gap-4 rounded-lg p-2 transition-colors hover:bg-black/[0.03]"
    >
      <div className="relative h-[70px] w-[90px] shrink-0 overflow-hidden rounded-md">
        <Image
          src={message.image}
          alt={message.title}
          fill
          sizes="90px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-base font-bold text-brand-ink group-hover:text-brand-gold">
          {message.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-brand-muted">
          {message.excerpt}
        </p>
        <p className="mt-1.5 text-xs text-brand-muted/80">{message.date}</p>
      </div>
    </Link>
  );
}
