import { Code2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Code of Conduct", href: "#" },
  { label: "Contact Us", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background — light neutral blending into brand blue */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #f8f9fb 0%, #eef1f6 25%, #dce4f0 50%, #1a3a6b 80%, #01295F 100%)",
        }}
      />

      {/* Large watermark text */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[clamp(80px,15vw,180px)] font-black tracking-tight leading-none text-[#01295F]/10 whitespace-nowrap"
          style={{ letterSpacing: "-0.04em" }}
        >
          SNIPPIFY
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-10">
        {/* Top row */}


        <Separator className="my-10 sm:my-16 bg-transparent" />

        {/* Bottom row */}
        <p className="text-center text-xs sm:text-sm text-white/50">
          {/* Built by students, for students &mdash;{" "} */}
          {/* <span className="font-semibold text-white/80">open source &amp; free forever</span> */}
        </p>
      </div>
    </footer>
  );
}
