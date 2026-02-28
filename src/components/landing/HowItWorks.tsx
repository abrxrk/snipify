"use client";

import { useState } from "react";
import { Code2, Palette, ImageIcon, ArrowRight, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 1,
    icon: Code2,
    title: "Paste your code",
    description: "Copy any code snippet and paste it into the editor. Syntax highlighting is automatic.",
  },
  {
    id: 2,
    icon: Palette,
    title: "Pick a theme",
    description: "Choose from beautiful gradient backgrounds or solid colours to make your snippet pop.",
  },
  {
    id: 3,
    icon: ImageIcon,
    title: "Export & share",
    description: "Download as PNG or copy to clipboard. Share anywhere — Twitter, GitHub, docs, or slides.",
  },
];

function StepCard({ step, isActive, onClick }: { step: Step; isActive: boolean; onClick: () => void }) {
  const Icon = step.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full text-left rounded-2xl border p-4 sm:p-6 transition-all duration-300",
        isActive
          ? "border-[#01295F]/30 bg-white shadow-lg shadow-[#01295F]/5"
          : "border-neutral-200 bg-white/80 hover:border-[#01295F]/20 hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <span
          className={cn(
            "flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
            isActive ? "bg-[#01295F] text-white" : "bg-neutral-100 text-neutral-500"
          )}
        >
          <Icon size={20} strokeWidth={2} className="sm:w-[22px] sm:h-[22px]" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={cn(
                "text-xs font-bold px-2 py-0.5 rounded-full",
                isActive ? "bg-[#01295F]/10 text-[#01295F]" : "bg-neutral-100 text-neutral-500"
              )}
            >
              Step {step.id}
            </span>
          </div>
          <h3 className={cn("text-base sm:text-lg font-semibold mb-1", isActive ? "text-primaryText" : "text-neutral-700")}>
            {step.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">{step.description}</p>
        </div>
        <ArrowRight
          size={18}
          className={cn(
            "shrink-0 transition-all hidden sm:block",
            isActive ? "text-[#01295F] translate-x-0 opacity-100" : "text-neutral-300 -translate-x-2 opacity-0"
          )}
        />
      </div>
    </button>
  );
}

function PreviewDemo({ activeStep }: { activeStep: number }) {
  return (
    <div className="relative rounded-xl sm:rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden mb-6 lg:mb-0">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-neutral-100 bg-neutral-50">
        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-400" />
        <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs font-medium text-neutral-400 font-mono">snippet.tsx</span>
      </div>

      {/* Preview content based on step */}
      <div className="p-4 sm:p-6">
        {activeStep === 1 && (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500">
              <Copy size={14} />
              <span>Paste your code here...</span>
            </div>
            <div className="rounded-lg sm:rounded-xl bg-[#0d1117] p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-hidden">
              <pre className="text-neutral-300">
                <code>
                  <span className="text-[#ff7b72]">const</span>{" "}
                  <span className="text-[#79c0ff]">greeting</span>{" "}
                  <span className="text-white">=</span>{" "}
                  <span className="text-[#a5d6ff]">&quot;Hello, World!&quot;</span>
                  <span className="text-white">;</span>
                  {"\n"}
                  <span className="text-[#d2a8ff]">console</span>
                  <span className="text-white">.log(greeting);</span>
                </code>
              </pre>
              <div className="mt-2 sm:mt-3 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-green-400">TypeScript detected</span>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-neutral-700">Choose background</span>
              <Check size={14} className="text-green-500" />
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {[
                "from-[#01295F] to-[#0a4a8f]",
                "from-violet-600 to-purple-400",
                "from-emerald-600 to-teal-400",
                "from-rose-500 to-orange-400",
                "from-amber-500 to-yellow-400",
                "from-slate-700 to-slate-500",
                "from-pink-500 to-rose-400",
                "from-cyan-600 to-blue-400",
              ].map((gradient, i) => (
                <button
                  key={i}
                  className={cn(
                    "h-8 sm:h-12 rounded-md sm:rounded-lg bg-linear-to-br transition-all",
                    gradient,
                    i === 0 ? "ring-2 ring-[#01295F] ring-offset-2" : "hover:scale-105"
                  )}
                />
              ))}
            </div>
            <div className="rounded-lg sm:rounded-xl bg-linear-to-br from-[#01295F] to-[#0a4a8f] p-3 sm:p-4">
              <pre className="font-mono text-xs sm:text-sm text-white/90">
                <code>console.log(&quot;Beautiful!&quot;);</code>
              </pre>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-neutral-700">Export options</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="bg-[#01295F] text-white gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <ImageIcon size={14} />
                <span className="hidden sm:inline">Download PNG</span>
                <span className="sm:hidden">PNG</span>
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <Copy size={14} />
                <span className="hidden sm:inline">Copy image</span>
                <span className="sm:hidden">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg sm:rounded-xl border border-neutral-200 p-3 sm:p-4 bg-neutral-50">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-linear-to-br from-[#01295F] to-[#0a4a8f] flex items-center justify-center">
                  <Code2 size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-neutral-700 truncate">snippet-export.png</p>
                  <p className="text-[10px] sm:text-xs text-neutral-400">1200 x 630 • 24KB</p>
                </div>
                <Check size={16} className="text-green-500 sm:w-[18px] sm:h-[18px]" />
              </div>
            </div>
            <p className="text-[10px] sm:text-xs text-neutral-500 text-center">
              Ready to share on Twitter, LinkedIn, or your blog!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-16 px-4 sm:px-0">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#01295F]/60 mb-2 sm:mb-3">
            Simple as 1-2-3
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primaryText tracking-tight">
            How it <span className="text-[#0a4a8f]">works</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-neutral-500 text-sm sm:text-base leading-relaxed">
            From code to shareable image in three simple steps. No signup required.
          </p>
        </div>

        {/* Steps + Preview */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start px-4 sm:px-0">
          {/* Steps list */}
          <div className="flex flex-col gap-3 sm:gap-4 order-2 lg:order-1">
            {steps.map((step) => (
              <StepCard
                key={step.id}
                step={step}
                isActive={activeStep === step.id}
                onClick={() => setActiveStep(step.id)}
              />
            ))}
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-32 order-1 lg:order-2">
            <PreviewDemo activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}
