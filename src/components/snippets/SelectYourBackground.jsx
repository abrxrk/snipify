"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CustomGradientMaker } from "./CustomGradientMaker";
import { ImageIcon, Palette, Check } from "lucide-react";

const BACKGROUND_TEMPLATES = [
  { id: 1, path: "/bg%20templates/1.jpeg", name: "Gradient 1" },
  { id: 2, path: "/bg%20templates/2.jpeg", name: "Gradient 2" },
  { id: 3, path: "/bg%20templates/3.jpeg", name: "Gradient 3" },
  { id: 4, path: "/bg%20templates/4.jpeg", name: "Gradient 4" },
  { id: 5, path: "/bg%20templates/5.jpeg", name: "Gradient 5" },
  { id: 6, path: "/bg%20templates/6.jpeg", name: "Gradient 6" },
  { id: 7, path: "/bg%20templates/7.jpeg", name: "Gradient 7" },
];

function BackgroundGrid({ selectedId, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-1">
      {BACKGROUND_TEMPLATES.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template)}
          className={cn(
            "group relative aspect-4/3 rounded-lg overflow-hidden transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            selectedId === template.id
              ? "ring-2 ring-primary ring-offset-2"
              : "hover:ring-2 hover:ring-muted-foreground/30"
          )}
        >
          <img
            src={template.path}
            alt={template.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {selectedId === template.id && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="rounded-full bg-primary p-1.5">
                <Check className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

export function SelectYourBackground({
  children,
  onBackgroundSelect,
  onGradientSelect,
  defaultBackground = null,
  defaultGradient = null,
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedBackground, setSelectedBackground] = React.useState(defaultBackground);
  const [selectedGradient, setSelectedGradient] = React.useState(defaultGradient);
  const [activeTab, setActiveTab] = React.useState("presets");

  const handleBackgroundSelect = (template) => {
    setSelectedBackground(template);
    setSelectedGradient(null);
    if (onBackgroundSelect) {
      onBackgroundSelect(template);
    }
    setOpen(false);
  };

  const handleGradientSelect = (gradient) => {
    setSelectedGradient(gradient);
    setSelectedBackground(null);
    if (onGradientSelect) {
      onGradientSelect(gradient);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="gap-2">
            <ImageIcon className="h-4 w-4" />
            Select Background
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="flex h-[85dvh] w-[calc(100vw-2rem)] max-w-2xl flex-col overflow-hidden p-0 gap-0 sm:h-[90dvh]">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Choose Your Background
          </DialogTitle>
          <DialogDescription>
            Select from preset backgrounds or create your own custom gradient.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="px-6 py-3 border-b bg-muted/30">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="presets" className="gap-2">
                <ImageIcon className="h-4 w-4" />
                Presets
              </TabsTrigger>
              <TabsTrigger value="custom" className="gap-2">
                <Palette className="h-4 w-4" />
                Custom Gradient
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex h-full min-h-0 flex-1 overflow-hidden">
            <TabsContent value="presets" className="m-0 h-full min-h-0 data-[state=active]:flex flex-col overflow-hidden">
              <ScrollArea className="h-full w-full px-6 py-4" type="always">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Choose from {BACKGROUND_TEMPLATES.length} beautifully crafted gradient backgrounds.
                  </p>
                  <BackgroundGrid
                    selectedId={selectedBackground?.id}
                    onSelect={handleBackgroundSelect}
                  />
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="custom" className="m-0 h-full min-h-0 data-[state=active]:flex flex-col overflow-hidden">
              <div className="h-full min-h-0 w-full overflow-y-auto overscroll-contain px-6 py-4">
                <CustomGradientMaker
                  onApply={handleGradientSelect}
                  initialGradient={selectedGradient}
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export { BACKGROUND_TEMPLATES };
