"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextField } from "@/components/snippets/TextField";
import { PreviewComponent } from "@/components/snippets/PreviewComponent";
import { SelectYourBackground } from "@/components/snippets/SelectYourBackground";
import {
  Code2,
  Download,
  Sparkles,
  ArrowLeft,
  Image as ImageIcon,
  Palette,
  Check,
  Copy,
} from "lucide-react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { Footer } from "@/components/landing";


const SAMPLE_CODE = `interface User {
  id: number;
  name: string;
  email: string;
}

async function getUserById(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

// Example usage
getUserById(1).then(user => {
  console.log(\`Welcome, \${user.name}!\`);
});`;

export default function SnippetsPage() {
  const [code, setCode] = React.useState(SAMPLE_CODE);
  const [language, setLanguage] = React.useState("typescript");
  const [background, setBackground] = React.useState(null);
  const [gradient, setGradient] = React.useState({
    from: "#01295F",
    to: "#0a4a8f",
    direction: "to right",
    type: "linear",
    cssValue: "linear-gradient(to right, #01295F, #0a4a8f)",
  });
  const [isExporting, setIsExporting] = React.useState(false);
  const previewRef = React.useRef(null);
  const exportPreviewRef = React.useRef(null);

  const handleExport = async () => {
    if (!exportPreviewRef.current) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(exportPreviewRef.current, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `snippet-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      toast.success("Snippet exported successfully!");
    } catch (error) {
      toast.error("Failed to export snippet");
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleBackgroundSelect = (selectedBg) => {
    setBackground(selectedBg);
    setGradient(null);
    toast.success(`Background "${selectedBg.name}" selected`);
  };

  const handleGradientSelect = (selectedGradient) => {
    setGradient(selectedGradient);
    setBackground(null);
    toast.success("Custom gradient applied");
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  return (
    <main className="min-h-screen bg-dot-pattern">
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 py-4">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 bg-white/90 backdrop-blur-xl rounded-full border border-neutral-200 shadow-lg">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#01295F] text-white shadow-md transition-transform group-hover:scale-105">
                <Code2 size={16} strokeWidth={2.5} />
              </span>
              <span className="text-lg font-bold text-primaryText tracking-tight">
                Snippify
              </span>
            </Link>

            {/* Back link */}
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-[#01295F] transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to home</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <div className="pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primaryText tracking-tight mb-2">
              Create your snippet
            </h1>
            <p className="text-neutral-600">
              Write or paste your code, choose a beautiful background, and export it.
            </p>
          </div>

          {/* Top Row - Editor and Background */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
            {/* Left - Code Editor */}
            <div className="lg:col-span-2">
              <Card className="p-4 sm:p-6 border-neutral-200 shadow-sm bg-white/80 backdrop-blur-sm h-full">
                <TextField
                  value={code}
                  onChange={setCode}
                  language={language}
                  onLanguageChange={setLanguage}
                  showLanguageSelector={true}
                  showActions={true}
                  minRows={10}
                />
              </Card>
            </div>

            {/* Right - Background & Quick Actions */}
            <div className="space-y-4 sm:space-y-6">
              {/* Background Selection */}
              <Card className="p-4 sm:p-6 border-neutral-200 shadow-sm bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-[#01295F]" />
                    <h3 className="font-semibold text-primaryText">Background</h3>
                  </div>
                  <SelectYourBackground
                    onBackgroundSelect={handleBackgroundSelect}
                    onGradientSelect={handleGradientSelect}
                    defaultBackground={background}
                    defaultGradient={gradient}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-[#01295F]/20 hover:border-[#01295F]/40 hover:bg-[#01295F]/5"
                    >
                      <ImageIcon className="h-4 w-4" />
                      Change
                    </Button>
                  </SelectYourBackground>
                </div>

                {/* Current Background Preview */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Current selection:</p>
                  <div
                    className="h-24 rounded-lg border shadow-sm"
                    style={
                      gradient
                        ? { background: gradient.cssValue }
                        : background
                          ? {
                              backgroundImage: `url(${background.path})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }
                          : { background: "linear-gradient(to right, #01295F, #0a4a8f)" }
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    {gradient
                      ? "Custom Gradient"
                      : background?.name || "Default Gradient"}
                  </p>
                </div>
              </Card>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={handleCopyCode}
                  variant="outline"
                  className="flex-1 gap-2 border-neutral-200"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button
                  onClick={() => setCode("")}
                  variant="outline"
                  className="flex-1 gap-2 border-neutral-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Row - Full Width Preview */}
          <Card className="p-4 sm:p-6 border-neutral-200 shadow-sm bg-white/80 backdrop-blur-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#01295F]" />
                <h3 className="font-semibold text-primaryText">Preview</h3>
              </div>
            </div>

            {/* Preview Container */}
            <div
              ref={previewRef}
              className="rounded-xl w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-x-auto overflow-y-hidden"
              style={
                gradient
                  ? { background: gradient.cssValue }
                  : background
                    ? {
                        backgroundImage: `url(${background.path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : { background: "linear-gradient(to right, #01295F, #0a4a8f)" }
              }
            >
              <PreviewComponent
                code={code}
                language={language}
                background={null}
                gradient={null}
                showLineNumbers={true}
                theme="dark"
                padding="large"
              />
            </div>
          </Card>

          {/* Hidden export canvas to keep PNG output stable on mobile */}
          <div className="fixed -left-[10000px] top-0 pointer-events-none">
            <div
              ref={exportPreviewRef}
              className="rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                width: "1400px",
                minHeight: "900px",
                background: gradient
                  ? gradient.cssValue
                  : background
                    ? `url(${background.path}) center / cover no-repeat`
                    : "linear-gradient(to right, #01295F, #0a4a8f)",
              }}
            >
              <PreviewComponent
                code={code}
                language={language}
                background={null}
                gradient={null}
                showLineNumbers={true}
                theme="dark"
                padding="large"
                isExport={true}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Export and Tips Row */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Export Card */}
            <div className="lg:col-span-2">
              <Card className="p-4 sm:p-6 border-neutral-200 shadow-sm bg-linear-to-br from-[#01295F]/5 to-[#0a4a8f]/5 h-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-primaryText mb-1">
                      Ready to share?
                    </h3>
                    <p className="text-sm text-neutral-600">
                      Export your snippet as a high-quality PNG image.
                    </p>
                  </div>
                  <Button
                    onClick={handleExport}
                    disabled={isExporting || !code}
                    className="bg-[#01295F] hover:bg-[#01295F]/90 text-white shadow-lg shadow-[#01295F]/20 gap-2 min-w-[140px]"
                  >
                    {isExporting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Export PNG
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Tips */}
            <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
              <h4 className="font-medium text-primaryText mb-2 flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Tips for great snippets
              </h4>
              <ul className="space-y-1.5 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#01295F]">•</span>
                  Keep code concise (10-30 lines works best)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#01295F]">•</span>
                  Choose a background that contrasts with your code
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#01295F]">•</span>
                  Use the dark theme for better readability
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
