"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Import PrismJS core styles
import "prismjs/themes/prism-tomorrow.css";

let prismLoaderPromise = null;

async function loadPrism() {
  if (typeof window === "undefined") return null;
  if (prismLoaderPromise) return prismLoaderPromise;

  prismLoaderPromise = (async () => {
    const prismModule = await import("prismjs");
    const Prism = prismModule.default ?? prismModule;
    Prism.manual = true;

    await Promise.all([
      import("prismjs/components/prism-markup-templating"),
      import("prismjs/components/prism-markup"),
      import("prismjs/components/prism-javascript"),
      import("prismjs/components/prism-typescript"),
      import("prismjs/components/prism-jsx"),
      import("prismjs/components/prism-tsx"),
      import("prismjs/components/prism-python"),
      import("prismjs/components/prism-java"),
      import("prismjs/components/prism-c"),
      import("prismjs/components/prism-cpp"),
      import("prismjs/components/prism-csharp"),
      import("prismjs/components/prism-go"),
      import("prismjs/components/prism-rust"),
      import("prismjs/components/prism-swift"),
      import("prismjs/components/prism-kotlin"),
      import("prismjs/components/prism-ruby"),
      import("prismjs/components/prism-php"),
      import("prismjs/components/prism-css"),
      import("prismjs/components/prism-sql"),
      import("prismjs/components/prism-bash"),
      import("prismjs/components/prism-json"),
      import("prismjs/components/prism-yaml"),
      import("prismjs/components/prism-markdown"),
    ]);

    return Prism;
  })();

  return prismLoaderPromise;
}

function WindowControls({ variant = "mac", isExport = false }) {
  if (variant === "mac") {
    return (
      <div className={cn("flex items-center shrink-0", isExport ? "gap-1.5" : "gap-1 sm:gap-1.5")}>
        <div className={cn("rounded-full bg-[#FF5F57]", isExport ? "h-3 w-3" : "h-2.5 w-2.5 sm:h-3 sm:w-3")} />
        <div className={cn("rounded-full bg-[#FEBC2E]", isExport ? "h-3 w-3" : "h-2.5 w-2.5 sm:h-3 sm:w-3")} />
        <div className={cn("rounded-full bg-[#28C840]", isExport ? "h-3 w-3" : "h-2.5 w-2.5 sm:h-3 sm:w-3")} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
      <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-500" />
      <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-yellow-500" />
      <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-green-500" />
    </div>
  );
}

// Map language names to Prism language identifiers
const LANGUAGE_MAP = {
  javascript: "javascript",
  react: "jsx",
  typescript: "typescript",
  jsx: "jsx",
  tsx: "tsx",
  python: "python",
  java: "java",
  c: "c",
  cpp: "cpp",
  csharp: "csharp",
  go: "go",
  rust: "rust",
  swift: "swift",
  kotlin: "kotlin",
  ruby: "ruby",
  php: "php",
  html: "markup",
  css: "css",
  sql: "sql",
  bash: "bash",
  json: "json",
  yaml: "yaml",
  markdown: "markdown",
};

export function PreviewComponent({
  code,
  language = "typescript",
  background,
  gradient,
  title = "snippet",
  showLineNumbers = true,
  padding = "normal",
  theme = "dark",
  className,
  isExport = false,
}) {
  const codeRef = React.useRef(null);

  React.useEffect(() => {
    let active = true;

    const highlight = async () => {
      if (!codeRef.current || !code) return;
      const Prism = await loadPrism();
      if (!active || !Prism || !codeRef.current) return;
      Prism.highlightElement(codeRef.current);
    };

    highlight();

    return () => {
      active = false;
    };
  }, [code, language]);

  const getBackgroundStyle = () => {
    if (gradient) {
      return { background: gradient.cssValue || gradient };
    }
    if (background?.path) {
      return {
        backgroundImage: `url(${background.path})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };
    }
    return {};
  };

  const paddingClasses = {
    small: "p-4 sm:p-6 lg:p-8",
    normal: "p-6 sm:p-8 lg:p-12",
    large: "p-6 sm:p-12 lg:p-20",
  };

  const themeStyles = {
    dark: {
      card: "bg-[#1E1E1E]/95 backdrop-blur-sm",
      code: "text-neutral-300",
      header: "border-b border-white/10",
      title: "text-neutral-500",
    },
    light: {
      card: "bg-white/95 backdrop-blur-sm",
      code: "text-neutral-700",
      header: "border-b border-black/10",
      title: "text-neutral-400",
    },
    transparent: {
      card: "bg-black/40 backdrop-blur-md",
      code: "text-white",
      header: "border-b border-white/10",
      title: "text-white/60",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.dark;
  const prismLanguage = LANGUAGE_MAP[language] || "javascript";

  // Generate line numbers if enabled
  const lineNumbers = showLineNumbers && code
    ? code.split("\n").map((_, i) => i + 1)
    : [];

  return (
    <div
      className={cn(
        "relative rounded-xl border-0 shadow-2xl w-full h-full flex items-center justify-center",
        className
      )}
      style={getBackgroundStyle()}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 rounded-xl" />

      {/* Content */}
      <div className={cn("relative", paddingClasses[padding])}>
        {/* Code Card */}
        <div
          className={cn(
            isExport
              ? "rounded-lg shadow-xl w-fit max-w-none"
              : "rounded-lg shadow-xl w-full max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)] lg:w-fit lg:max-w-none",
            currentTheme.card
          )}
        >
          {/* Header */}
          <div
            className={cn(
              isExport
                ? "flex items-center justify-between px-4 py-3 gap-2"
                : "flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 gap-2",
              currentTheme.header
            )}
          >
            <WindowControls variant="mac" isExport={isExport} />
            <span
              className={cn(
                isExport
                  ? "text-xs font-medium truncate max-w-[180px]"
                  : "text-[10px] sm:text-xs font-medium truncate max-w-[100px] sm:max-w-[150px]",
                currentTheme.title
              )}
            >
              {title}.{language}
            </span>
            <div className={cn("shrink-0", isExport ? "w-12" : "w-8 sm:w-12")} /> {/* Spacer for alignment */}
          </div>

          {/* Code Content - Expands to fit content */}
          <div className={cn(isExport ? "p-3" : "p-2 sm:p-3", currentTheme.code)}>
            <div className="flex">
              {/* Line Numbers */}
              {showLineNumbers && code && (
                <div className={cn("select-none text-right shrink-0", isExport ? "pr-3" : "pr-2 sm:pr-3")}>
                  {lineNumbers.map((num) => (
                    <div
                      key={num}
                      className={cn(
                        "text-neutral-500/50 leading-relaxed font-mono",
                        isExport ? "text-xs" : "text-[10px] sm:text-xs"
                      )}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              )}
              {/* Prism-highlighted Code */}
              <div className="flex-1 min-w-0 overflow-x-auto">
                <pre className="m-0! p-0! bg-transparent!">
                  <code
                    ref={codeRef}
                    className={cn(
                      `language-${prismLanguage} leading-relaxed! font-mono! bg-transparent! p-0! m-0! whitespace-pre block`,
                      isExport ? "text-sm!" : "text-[10px] sm:text-sm!"
                    )}
                  >
                    {code || ""}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PreviewContainer({
  children,
  className,
  aspectRatio = "auto",
}) {
  const aspectClasses = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    "4:3": "aspect-[4/3]",
    "16:9": "aspect-video",
    "21:9": "aspect-[21/9]",
    "9:16": "aspect-[9/16]",
  };

  return (
    <div
      className={cn(
        "relative rounded-xl border bg-muted/50 overflow-hidden",
        aspectClasses[aspectRatio],
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
}

export { WindowControls };
