import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroSnippetPreview } from "./HeroSnippetPreview";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-20">
      {/* Radial colour bloom */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#01295F]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 right-0 h-[400px] w-[400px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 flex flex-col items-center text-center gap-6 sm:gap-8">
        {/* Top — copy centered */}
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-primaryText leading-[1.08] tracking-tight">
            Beautiful,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">shareable</span>
              <span
                className="absolute bottom-0.5 sm:bottom-1 left-0 right-0 h-2 sm:h-3 z-0 rounded"
                style={{
                  background: "linear-gradient(90deg, #01295F22 0%, #0a4a8f44 100%)",
                }}
              />
            </span>{" "}
            code snippets{" "}
            <span className="text-[#0a4a8f]">in seconds.</span>
          </h1>


{/* 
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              className="bg-[#01295F] text-white hover:bg-[#01295F]/90 shadow-lg shadow-[#01295F]/20 gap-2"
            >
              Start for free
              <ArrowRight size={16} />
            </Button>
          </div> */}
        </div>

        {/* Below — full width preview */}
        <div className="flex justify-center w-full mt-6 sm:mt-8 px-2 sm:px-4">
          <HeroSnippetPreview />
        </div>
      </div>
    </section>
  );
}
