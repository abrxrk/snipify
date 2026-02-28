"use client";

import { useState } from "react";
import { Copy, Check, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const backgrounds = [
  { id: "blue", label: "Ocean", class: "from-[#01295F] via-[#0a4a8f] to-[#1a6fcc]" },
  { id: "purple", label: "Violet", class: "from-[#3b1f6e] via-[#6d28d9] to-[#a78bfa]" },
  { id: "sunset", label: "Sunset", class: "from-[#7f1d1d] via-[#dc2626] to-[#fb923c]" },
  { id: "forest", label: "Forest", class: "from-[#14532d] via-[#16a34a] to-[#86efac]" },
  { id: "neutral", label: "Slate", class: "from-[#1e293b] via-[#334155] to-[#64748b]" },
];

const CODE_SNIPPET = `function greet(name: string) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

greet("World");`;

export function HeroSnippetPreview() {
  const [copied, setCopied] = useState(false);
  const [selectedBg, setSelectedBg] = useState(backgrounds[0]);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-4xl">
      {/* Glow ring */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#01295F]/30 via-transparent to-[#0a4a8f]/20 blur-2xl pointer-events-none" />

      {/* Background floating cards - hidden on mobile */}
      {/* Top left floating card */}
      <div className="hidden lg:block absolute -top-12 -left-20 w-64 h-44 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/30 shadow-xl opacity-40 rotate-[-8deg] pointer-events-none z-0">
        <div className="p-4">
          <div className="flex gap-2 mb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
          </div>
          <div className="space-y-2">
            <div className="h-2.5 w-3/4 rounded bg-neutral-300/60" />
            <div className="h-2.5 w-1/2 rounded bg-neutral-300/60" />
            <div className="h-2.5 w-2/3 rounded bg-neutral-300/60" />
          </div>
        </div>
      </div>

      {/* Top right floating card */}
      <div className="hidden lg:block absolute -top-6 -right-24 w-56 h-36 rounded-2xl bg-white/30 backdrop-blur-sm border border-white/20 shadow-xl opacity-30 rotate-[6deg] pointer-events-none z-0">
        <div className="p-4">
          <div className="flex gap-2 mb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-300/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-300/60" />
          </div>
          <div className="space-y-2">
            <div className="h-2.5 w-full rounded bg-neutral-300/40" />
            <div className="h-2.5 w-3/4 rounded bg-neutral-300/40" />
          </div>
        </div>
      </div>

      {/* Bottom left floating card */}
      <div className="hidden lg:block absolute -bottom-10 -left-28 w-60 h-32 rounded-2xl bg-white/25 backdrop-blur-sm border border-white/20 shadow-xl opacity-25 rotate-[5deg] pointer-events-none z-0">
        <div className="p-4">
          <div className="space-y-2 mt-2">
            <div className="h-2.5 w-5/6 rounded bg-neutral-300/40" />
            <div className="h-2.5 w-2/3 rounded bg-neutral-300/40" />
            <div className="h-2.5 w-3/4 rounded bg-neutral-300/40" />
          </div>
        </div>
      </div>

      {/* Bottom right floating card */}
      <div className="hidden lg:block absolute top-1/2 -right-32 w-48 h-28 rounded-2xl bg-white/35 backdrop-blur-sm border border-white/25 shadow-xl opacity-35 rotate-[-12deg] pointer-events-none z-0">
        <div className="p-4">
          <div className="flex gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-red-300/50" />
            <span className="h-2 w-2 rounded-full bg-yellow-300/50" />
            <span className="h-2 w-2 rounded-full bg-green-300/50" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-full rounded bg-neutral-300/30" />
            <div className="h-2 w-2/3 rounded bg-neutral-300/30" />
          </div>
        </div>
      </div>

      {/* Far back floating elements - hidden on mobile */}
      <div className="hidden lg:block absolute top-1/4 -left-32 w-44 h-28 rounded-xl bg-gradient-to-br from-blue-200/20 to-purple-200/20 opacity-20 rotate-[15deg] pointer-events-none z-0" />
      <div className="hidden lg:block absolute bottom-1/4 -right-28 w-36 h-24 rounded-xl bg-gradient-to-br from-cyan-200/20 to-blue-200/20 opacity-15 rotate-[-10deg] pointer-events-none z-0" />

      {/* Card shell */}
      <div className="relative z-10 rounded-2xl border border-neutral-200 bg-white shadow-2xl overflow-hidden">
        {/* Top bar – app chrome */}
        <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-100 bg-neutral-50">
          <span className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-red-400" />
          <span className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-green-400" />
          <span className="ml-2 sm:ml-4 text-xs sm:text-sm font-medium text-neutral-400 font-mono truncate">
            greet.ts — Snippify
          </span>
        </div>

        {/* Preview area */}
        <div className={cn("relative p-4 sm:p-6 lg:p-10 bg-gradient-to-br", selectedBg.class)}>
          {/* Snippet card floating inside */}
          <div className="rounded-xl bg-[#0d1117] shadow-xl overflow-hidden text-left">
            {/* Code editor header */}
            <div className="flex items-center justify-between px-3 sm:px-5 py-3 bg-[#161b22] border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
              </div>
              <span className="text-xs text-white/40 font-mono">greet.ts</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors px-2 sm:px-3 py-1.5 rounded bg-white/5 hover:bg-white/10"
              >
                {copied ? (
                  <><Check size={12} className="text-green-400" /><span className="text-green-400 hidden sm:inline">Copied!</span></>
                ) : (
                  <><Copy size={12} /><span className="hidden sm:inline">Copy</span></>
                )}
              </button>
            </div>

            {/* Code content */}
            <pre className="px-3 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm leading-6 sm:leading-7 font-mono overflow-x-auto">
              <code>
                <span className="text-[#ff7b72]">function </span>
                <span className="text-[#d2a8ff]">greet</span>
                <span className="text-white">(</span>
                <span className="text-[#ffa657]">name</span>
                <span className="text-[#79c0ff]">: string</span>
                <span className="text-white">) {"{"}{"\n"}</span>
                <span className="text-white">{"  "}</span>
                <span className="text-[#ff7b72]">const </span>
                <span className="text-[#ffa657]">message </span>
                <span className="text-white">= </span>
                <span className="text-[#a5d6ff]">{"`Hello, ${"}</span>
                <span className="text-[#ffa657]">{"{"}</span>
                <span className="text-white">name</span>
                <span className="text-[#ffa657]">{"}"}</span>
                <span className="text-[#a5d6ff]">!`"</span>
                <span className="text-white">;{"\n"}</span>
                <span className="text-white">{"  "}</span>
                <span className="text-[#d2a8ff]">console</span>
                <span className="text-white">.log(</span>
                <span className="text-[#ffa657]">message</span>
                <span className="text-white">);{"\n"}</span>
                <span className="text-white">{"  "}</span>
                <span className="text-[#ff7b72]">return </span>
                <span className="text-[#ffa657]">message</span>
                <span className="text-white">;{"\n"}</span>
                <span className="text-white">{"}"}{"\n\n"}</span>
                <span className="text-[#d2a8ff]">greet</span>
                <span className="text-white">(</span>
                <span className="text-[#a5d6ff]">&quot;World&quot;</span>
                <span className="text-white">);</span>
              </code>
            </pre>
          </div>
        </div>

        {/* Controls bar */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-neutral-100 bg-neutral-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          {/* Background pickers */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <ImageIcon size={16} className="text-neutral-400 hidden sm:block" />
            <span className="text-sm text-neutral-400 font-medium mr-1 sm:mr-2">Theme</span>
            {backgrounds.map((bg) => (
              <button
                key={bg.id}
                title={bg.label}
                onClick={() => setSelectedBg(bg)}
                className={cn(
                  "h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-br transition-all border-2",
                  bg.class,
                  selectedBg.id === bg.id
                    ? "border-[#01295F] scale-110 shadow"
                    : "border-transparent hover:scale-105"
                )}
              />
            ))}
          </div>

          {/* Export action */}
          <button className="flex items-center gap-2 text-sm font-semibold text-white bg-[#01295F] hover:bg-[#01295F]/90 transition-colors px-3 sm:px-4 py-2 rounded-lg shadow-sm w-full sm:w-auto justify-center">
            <ImageIcon size={14} />
            <span className="hidden sm:inline">Export PNG</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      {/* Floating copy toast */}
      {copied && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check size={14} /> Copied to clipboard
        </div>
      )}
    </div>
  );
}
