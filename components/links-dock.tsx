"use client";

import { links } from "@/data/site";
import { Dock } from "./dock";
import { CodeforcesIcon, GithubIcon, LinkedinIcon, MailIcon, ResumeIcon } from "./icons";
import { MochiArt } from "./mochi/mochi-art";

const items = [
  { label: "GitHub", href: links.github, icon: <GithubIcon className="size-[22px]" />, external: true },
  { label: "LinkedIn", href: links.linkedin, icon: <LinkedinIcon className="size-[24px]" />, external: true },
  { label: "Email", href: `mailto:${links.email}`, icon: <MailIcon className="size-[22px]" /> },
  { label: "Resume", href: links.resume, icon: <ResumeIcon className="size-[22px]" /> },
  { label: "Codeforces", href: links.codeforces, icon: <CodeforcesIcon className="size-[22px]" />, external: true },
];

export function LinksDock({ className = "" }: { className?: string }) {
  return (
    <Dock className={`flex items-end gap-2 ${className}`} label="Links">
      {items.map((it) => (
        <li key={it.label} className="dock-item">
          <a
            href={it.href}
            {...(it.external ? { target: "_blank", rel: "noreferrer" } : {})}
            aria-label={it.label}
            className="dock-tile glass grid size-11 place-items-center rounded-[14px] text-ink"
          >
            {it.icon}
          </a>
          <span className="dock-label" aria-hidden="true">
            {it.label}
          </span>
        </li>
      ))}
      <li className="dock-item" aria-hidden="false">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("mochi:ask"))}
          aria-label="Ask mochi a question"
          className="dock-tile glass grid size-11 place-items-center rounded-[14px]"
        >
          <MochiArt size={30} mood="happy" shadow={false} />
        </button>
        <span className="dock-label" aria-hidden="true">
          ask mochi
        </span>
      </li>
    </Dock>
  );
}
