"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, RefreshCw, Eye, Code } from "lucide-react";

const GRADIENT_DIRECTIONS = [
  { value: "to right", label: "Left to Right", icon: "→" },
  { value: "to left", label: "Right to Left", icon: "←" },
  { value: "to bottom", label: "Top to Bottom", icon: "↓" },
  { value: "to top", label: "Bottom to Top", icon: "↑" },
  { value: "to bottom right", label: "Diagonal ↘", icon: "↘" },
  { value: "to bottom left", label: "Diagonal ↙", icon: "↙" },
  { value: "to top right", label: "Diagonal ↗", icon: "↗" },
  { value: "to top left", label: "Diagonal ↖", icon: "↖" },
];

const PRESET_GRADIENTS = [
  { from: "#FF6B6B", to: "#4ECDC4", name: "Sunset" },
  { from: "#667EEA", to: "#764BA2", name: "Purple Haze" },
  { from: "#F093FB", to: "#F5576C", name: "Pink Passion" },
  { from: "#4FACFE", to: "#00F2FE", name: "Ocean Blue" },
  { from: "#43E97B", to: "#38F9D7", name: "Mint Fresh" },
  { from: "#FA709A", to: "#FEE140", name: "Peachy" },
  { from: "#30CFD0", to: "#330867", name: "Deep Space" },
  { from: "#A8EDEA", to: "#FED6E3", name: "Soft Pastel" },
];

function ColorPicker({ label, value, onChange }) {
  const [localValue, setLocalValue] = React.useState(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium">{label}</Label>
      <div className="flex gap-2">
        <div className="relative h-9 w-9 rounded-md overflow-hidden border">
          <input
            type="color"
            value={localValue}
            onChange={handleChange}
            className="absolute inset-0 h-full w-full cursor-pointer border-0 p-0"
          />
        </div>
        <Input
          type="text"
          value={localValue.toUpperCase()}
          onChange={(e) => {
            const val = e.target.value;
            setLocalValue(val);
            if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
              onChange(val);
            }
          }}
          className="flex-1 font-mono text-sm uppercase"
          maxLength={7}
        />
      </div>
    </div>
  );
}

function GradientPreview({ gradient, onClick, isSelected, name }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative h-16 rounded-lg overflow-hidden transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isSelected
          ? "ring-2 ring-primary ring-offset-2"
          : "hover:ring-2 hover:ring-muted-foreground/30"
      )}
      style={{ background: gradient }}
    >
      {isSelected && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="rounded-full bg-primary p-1">
            <Check className="h-3 w-3 text-primary-foreground" />
          </div>
        </div>
      )}
      {name && (
        <span className="absolute bottom-1 left-1.5 text-[10px] font-medium text-white/90 bg-black/40 px-1.5 py-0.5 rounded">
          {name}
        </span>
      )}
    </button>
  );
}

export function CustomGradientMaker({
  onApply,
  initialGradient = null,
  showPresets = true,
  className,
}) {
  const [fromColor, setFromColor] = React.useState(initialGradient?.from || "#667EEA");
  const [toColor, setToColor] = React.useState(initialGradient?.to || "#764BA2");
  const [direction, setDirection] = React.useState(initialGradient?.direction || "to right");
  const [angle, setAngle] = React.useState(initialGradient?.angle || 90);
  const [gradientType, setGradientType] = React.useState(initialGradient?.type || "linear");
  const [copied, setCopied] = React.useState(false);

  const getGradientString = () => {
    if (gradientType === "linear") {
      if (direction.startsWith("to ")) {
        return `linear-gradient(${direction}, ${fromColor}, ${toColor})`;
      }
      return `linear-gradient(${angle}deg, ${fromColor}, ${toColor})`;
    }
    return `radial-gradient(circle, ${fromColor}, ${toColor})`;
  };

  const gradientValue = getGradientString();

  const handleCopy = () => {
    navigator.clipboard.writeText(gradientValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    if (onApply) {
      onApply({
        from: fromColor,
        to: toColor,
        direction,
        angle,
        type: gradientType,
        cssValue: gradientValue,
      });
    }
  };

  const handleReset = () => {
    setFromColor("#667EEA");
    setToColor("#764BA2");
    setDirection("to right");
    setAngle(90);
    setGradientType("linear");
  };

  const loadPreset = (preset) => {
    setFromColor(preset.from);
    setToColor(preset.to);
  };

  const randomize = () => {
    const randomColor = () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    setFromColor(randomColor());
    setToColor(randomColor());
  };

  return (
    <div className={cn("space-y-6 pb-1", className)}>
      {/* Preview */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 gap-1.5 text-xs"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Code className="h-3.5 w-3.5" />
                  Copy CSS
                </>
              )}
            </Button>
          </div>
        </div>
        <div
          className="h-32 rounded-xl border shadow-inner"
          style={{ background: gradientValue }}
        />
        <p className="text-xs text-muted-foreground font-mono break-all">
          {gradientValue}
        </p>
      </div>

      {/* Presets */}
      {showPresets && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Quick Presets</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={randomize}
              className="h-7 gap-1.5 text-xs"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Randomize
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PRESET_GRADIENTS.map((preset, index) => (
              <GradientPreview
                key={index}
                gradient={`linear-gradient(to right, ${preset.from}, ${preset.to})`}
                onClick={() => loadPreset(preset)}
                isSelected={fromColor === preset.from && toColor === preset.to}
                name={preset.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Customize</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-7 gap-1.5 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset
          </Button>
        </div>

        {/* Gradient Type */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Gradient Type</Label>
          <Select value={gradientType} onValueChange={setGradientType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear Gradient</SelectItem>
              <SelectItem value="radial">Radial Gradient</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ColorPicker
            label="From Color"
            value={fromColor}
            onChange={setFromColor}
          />
          <ColorPicker
            label="To Color"
            value={toColor}
            onChange={setToColor}
          />
        </div>

        {/* Direction */}
        {gradientType === "linear" && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Direction</Label>
            <Select value={direction} onValueChange={setDirection}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                {GRADIENT_DIRECTIONS.map((dir) => (
                  <SelectItem key={dir.value} value={dir.value}>
                    <span className="flex items-center gap-2">
                      <span className="text-muted-foreground">{dir.icon}</span>
                      {dir.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Angle Slider */}
        {gradientType === "linear" && direction === "custom" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Angle</Label>
              <span className="text-xs font-mono">{angle}°</span>
            </div>
            <Slider
              value={[angle]}
              onValueChange={(value) => setAngle(value[0])}
              min={0}
              max={360}
              step={1}
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button onClick={handleApply} className="flex-1 gap-2">
          <Check className="h-4 w-4" />
          Apply Gradient
        </Button>
      </div>
    </div>
  );
}

export { GRADIENT_DIRECTIONS, PRESET_GRADIENTS };
