"use client";

import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
  preview: React.ReactNode;
  accent: string;
  bg: string;
}

// Preview 1: Code Editor
function EditorPreview() {
  return (
    <div className="rounded-xl bg-[#0d1117] p-3 font-mono text-xs">
      <div className="flex items-center gap-1.5 mb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
      </div>
      <pre className="space-y-1">
        <code>
          <span className="text-[#ff7b72]">function</span>{" "}
          <span className="text-[#d2a8ff]">createSnippet</span>
          <span className="text-neutral-300">() {"{"}</span>
        </code>
        <code className="block pl-3">
          <span className="text-[#ff7b72]">return</span>{" "}
          <span className="text-[#a5d6ff]">&quot;Beautiful!&quot;</span>
          <span className="text-neutral-300">;</span>
        </code>
        <code><span className="text-neutral-300">{"}"}</span></code>
      </pre>
    </div>
  );
}

// Preview 2: Theme Picker
function ThemePreview() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {[
          "bg-[#01295F]",
          "bg-violet-600",
          "bg-emerald-600",
          "bg-rose-500",
          "bg-amber-500",
          "bg-slate-700",
          "bg-pink-500",
          "bg-cyan-600",
        ].map((bg, i) => (
          <div
            key={i}
            className={cn(
              "h-8 rounded-lg transition-all",
              bg,
              i === 0 && "ring-2 ring-white ring-offset-2 ring-offset-neutral-800"
            )}
          />
        ))}
      </div>
      <div className="rounded-lg bg-linear-to-r from-[#01295F] to-violet-600 p-3">
        <div className="h-6 w-24 rounded bg-white/20" />
      </div>
    </div>
  );
}

// Preview 3: Export Options
function ExportPreview() {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1 rounded-lg bg-neutral-800 p-2 text-center">
          <div className="mx-auto mb-1 h-6 w-6 rounded bg-neutral-600" />
          <span className="text-[10px] text-neutral-400">PNG</span>
        </div>
        <div className="flex-1 rounded-lg bg-neutral-800 p-2 text-center">
          <div className="mx-auto mb-1 h-6 w-6 rounded bg-neutral-600" />
          <span className="text-[10px] text-neutral-400">SVG</span>
        </div>
        <div className="flex-1 rounded-lg bg-[#01295F] p-2 text-center">
          <div className="mx-auto mb-1 h-6 w-6 rounded bg-white/20" />
          <span className="text-[10px] text-white/80">Copy</span>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-neutral-800 p-2">
        <div className="h-8 w-8 rounded bg-linear-to-br from-[#01295F] to-violet-600" />
        <div className="flex-1">
          <div className="h-2 w-20 rounded bg-neutral-600" />
          <div className="mt-1 h-2 w-12 rounded bg-neutral-700" />
        </div>
        <div className="h-4 w-4 rounded-full bg-green-500/20" />
      </div>
    </div>
  );
}

// Preview 4: Snippet Collection
function CollectionPreview() {
  return (
    <div className="space-y-2">
      {[
        { label: "React Hooks", count: 12 },
        { label: "TypeScript", count: 8 },
        { label: "CSS Tricks", count: 15 },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg bg-neutral-800 p-2">
          <div className="h-8 w-10 rounded bg-linear-to-br from-[#01295F] to-[#0a4a8f]" />
          <div className="flex-1">
            <div className="h-2 w-24 rounded bg-neutral-600" />
          </div>
          <span className="text-[10px] text-neutral-500">{item.count}</span>
        </div>
      ))}
      <div className="flex items-center justify-center rounded-lg border border-dashed border-neutral-700 p-2">
        <span className="text-[10px] text-neutral-500">+ New collection</span>
      </div>
    </div>
  );
}

const features: Feature[] = [
  {
    title: "Smart highlighting",
    description: "Auto-detects 100+ languages. Your code looks stunning instantly.",
    preview: <EditorPreview />,
    accent: "text-[#01295F]",
    bg: "bg-[#01295F]/8",
  },
  {
    title: "Gorgeous themes",
    description: "Pick from curated gradients or craft your own unique look.",
    preview: <ThemePreview />,
    accent: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Export anywhere",
    description: "PNG, SVG, or clipboard. Ready for Twitter, docs, or slides.",
    preview: <ExportPreview />,
    accent: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    title: "Organize snippets",
    description: "Collections, tags, and search. Your code library, organized.",
    preview: <CollectionPreview />,
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="group relative rounded-xl sm:rounded-2xl border border-neutral-100 bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      {/* Preview area */}
      <div className="relative mb-4 sm:mb-5 overflow-hidden rounded-lg sm:rounded-xl bg-[#0a0a0a] p-3 sm:p-4 border border-neutral-200">
        <div className="relative">{feature.preview}</div>
      </div>

      {/* Text content */}
      <h3 className="mb-1.5 sm:mb-2 text-sm sm:text-base font-semibold text-primaryText">{feature.title}</h3>
      <p className="text-xs sm:text-sm leading-relaxed text-neutral-500">{feature.description}</p>

      {/* Subtle hover border glow */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-transparent group-hover:ring-[#01295F]/10 transition-all duration-300 pointer-events-none" />
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 2x2 Grid */}
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
