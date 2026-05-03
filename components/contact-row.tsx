"use client";

import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import type { ReactNode } from "react";
import { contact, isTodo } from "@/data/content";
import { MaybeTodo } from "./todo";
import { ThemeToggle } from "./theme-toggle";

const linkClass =
  "underline underline-offset-4 decoration-[color:var(--rule)] hover:decoration-current transition-colors inline-flex items-center gap-1.5";

function Item({ href, icon, label }: { href?: string; icon: ReactNode; label: string }) {
  if (!href) return null;
  if (isTodo(href)) {
    return (
      <span className="inline-flex items-center gap-1.5">
        {icon}
        <MaybeTodo value={href} />
      </span>
    );
  }
  const isMail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noreferrer"}
      className={linkClass}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function emailHref(email: string): string | undefined {
  if (!email) return undefined;
  if (isTodo(email)) return email;
  return `mailto:${email}`;
}

function githubHref(handle: string): string | undefined {
  if (!handle) return undefined;
  if (isTodo(handle)) return handle;
  return handle.startsWith("http") ? handle : `https://github.com/${handle}`;
}

function twitterHref(handle: string): string | undefined {
  if (!handle) return undefined;
  if (isTodo(handle)) return undefined;
  return handle.startsWith("http") ? handle : `https://x.com/${handle.replace(/^@/, "")}`;
}

function instagramHref(handle: string): string | undefined {
  if (!handle) return undefined;
  if (isTodo(handle)) return undefined;
  return handle.startsWith("http") ? handle : `https://instagram.com/${handle.replace(/^@/, "")}`;
}

function linkedinHref(url: string): string | undefined {
  if (!url) return undefined;
  if (isTodo(url)) return url;
  return url.startsWith("http") ? url : `https://linkedin.com/in/${url}`;
}

const dot = (
  <span className="text-[color:var(--muted)] mx-2" aria-hidden>·</span>
);

export function ContactRow() {
  const items = [
    { href: emailHref(contact.email), icon: <Mail size={14} aria-hidden />, label: "Email" },
    { href: githubHref(contact.github), icon: <Github size={14} aria-hidden />, label: "GitHub" },
    { href: twitterHref(contact.twitter), icon: <Twitter size={14} aria-hidden />, label: "Twitter" },
    { href: linkedinHref(contact.linkedin), icon: <Linkedin size={14} aria-hidden />, label: "LinkedIn" },
    { href: instagramHref(contact.instagram), icon: <Instagram size={14} aria-hidden />, label: "Instagram" },
  ].filter((i) => i.href !== undefined);

  return (
    <div className="flex flex-wrap items-center gap-y-2 text-[15px]">
      {items.map((it, i) => (
        <span key={it.label} className="inline-flex items-center">
          {i > 0 && dot}
          <Item href={it.href} icon={it.icon} label={it.label} />
        </span>
      ))}
      <span className="ml-auto pl-4">
        <ThemeToggle />
      </span>
    </div>
  );
}
