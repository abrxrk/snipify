"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Code2, FileCode, Trash2, Copy, Check, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript", icon: "JS" },
  { value: "react", label: "React", icon: "REACT" },
  { value: "typescript", label: "TypeScript", icon: "TS" },
  { value: "python", label: "Python", icon: "PY" },
  { value: "java", label: "Java", icon: "JAVA" },
  { value: "cpp", label: "C++", icon: "C++" },
  { value: "c", label: "C", icon: "C" },
  { value: "csharp", label: "C#", icon: "C#" },
  { value: "go", label: "Go", icon: "GO" },
  { value: "rust", label: "Rust", icon: "RS" },
  { value: "swift", label: "Swift", icon: "SWIFT" },
  { value: "kotlin", label: "Kotlin", icon: "KT" },
  { value: "ruby", label: "Ruby", icon: "RB" },
  { value: "php", label: "PHP", icon: "PHP" },
  { value: "html", label: "HTML", icon: "HTML" },
  { value: "css", label: "CSS", icon: "CSS" },
  { value: "sql", label: "SQL", icon: "SQL" },
  { value: "bash", label: "Bash", icon: "SH" },
  { value: "json", label: "JSON", icon: "JSON" },
  { value: "yaml", label: "YAML", icon: "YML" },
  { value: "markdown", label: "Markdown", icon: "MD" },
];

const SAMPLE_CODE = {
  javascript: `function calculateFibonacci(n) {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}

const result = calculateFibonacci(10);
console.log(\`Fibonacci number: \${result}\`);`,

  react: `import React from "react";

export default function UserCard({ user }) {
  return (
    <div className="rounded-xl border p-4 shadow-sm">
      <h2 className="text-lg font-semibold">{user.name}</h2>
      <p className="text-sm text-neutral-500">{user.email}</p>
    </div>
  );
}`,

  typescript: `interface User {
  id: number;
  name: string;
  email: string;
}

function getUserById(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json());
}`,

  python: `def factorial(n: int) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)

result = factorial(5)
print(f"Factorial: {result}")`,

  rust: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    let sum: i32 = numbers
        .iter()
        .map(|x| x * x)
        .sum();
    
    println!("Sum of squares: {}", sum);
}`,

  go: `package main

import "fmt"

func main() {
    ch := make(chan string)
    
    go func() {
        ch <- "Hello from goroutine!"
    }()
    
    msg := <-ch
    fmt.Println(msg)
}`,
};

export function TextField({
  value,
  onChange,
  language = "javascript",
  onLanguageChange,
  placeholder = "Paste or type your code here...",
  maxLength,
  showLanguageSelector = true,
  showActions = true,
  showLineCount = true,
  className,
  minRows = 10,
  maxRows = 20,
  disabled = false,
}) {
  const [copied, setCopied] = React.useState(false);
  const isMobile = useIsMobile();

  const lineCount = value ? value.split("\n").length : 0;
  const charCount = value?.length || 0;

  const handleCopy = async () => {
    if (value) {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    if (onChange) {
      onChange("");
    }
  };

  const loadSample = () => {
    const sample = SAMPLE_CODE[language] || SAMPLE_CODE.javascript;
    if (onChange) {
      onChange(sample);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Code Editor</Label>
        </div>
        <div className="flex items-center gap-2">
          {showLanguageSelector && onLanguageChange && (
            isMobile ? (
              <NativeSelect
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="h-7 w-[100px] sm:w-[130px] text-xs"
                size="sm"
              >
                {LANGUAGES.map((lang) => (
                  <NativeSelectOption key={lang.value} value={lang.value}>
                    {lang.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            ) : (
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="h-7 w-[100px] sm:w-[130px] text-xs">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={4} className="z-50 max-h-64">
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      <span className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-8 font-mono">
                          {lang.icon}
                        </span>
                        {lang.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )
          )}
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            if (!maxLength || newValue.length <= maxLength) {
              onChange?.(newValue);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "min-h-[200px] font-mono text-sm resize-y",
            "bg-muted/30 border-muted-foreground/20",
            "focus-visible:ring-primary/30",
            "placeholder:text-muted-foreground/50"
          )}
          style={{
            minHeight: `${minRows * 1.5}rem`,
            maxHeight: maxRows ? `${maxRows * 1.5}rem` : undefined,
          }}
        />
        
        {/* Floating Actions */}
        {showActions && value && (
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleCopy}
              className="h-6 w-6 bg-background/80 backdrop-blur-sm"
            >
              {copied ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleClear}
              className="h-6 w-6 bg-background/80 backdrop-blur-sm hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          {showLineCount && (
            <span>
              {lineCount} {lineCount === 1 ? "line" : "lines"}
            </span>
          )}
          <span>{charCount} characters</span>
          {maxLength && (
            <span className={cn(
              charCount > maxLength * 0.9 && "text-yellow-500",
              charCount >= maxLength && "text-destructive"
            )}>
              {maxLength - charCount} remaining
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={loadSample}
          className="h-6 gap-1.5 text-xs"
        >
          <Sparkles className="h-3 w-3" />
          Load Sample
        </Button>
      </div>
    </div>
  );
}

export function LanguageBadge({ language, className }) {
  const lang = LANGUAGES.find((l) => l.value === language);
  
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-xs font-medium",
        className
      )}
    >
      <FileCode className="h-3 w-3" />
      <span>{lang?.label || language}</span>
    </div>
  );
}

export { LANGUAGES, SAMPLE_CODE };
