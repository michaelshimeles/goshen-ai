"use client"

import { Button } from "@/components/components/ui/button";
import { Input } from "@/components/components/ui/input";
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockGroup,
} from "@/components/components/ui/code-block"
import { Check, Copy } from "lucide-react"
import { useState } from "react"


export default function Home() {
  const code =
    `const res = await fetch("https://api.goshenlabs.ai/v1/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "image/png",
    "x-api-key": "YOUR_API_KEY"
  },
  body: JSON.stringify({
    model: "sdxl@base-1.0",
    input: { prompt: "a neon city skyline at night", width: 1024, height: 1024, steps: 28 },
  })
});`

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col gap-3 justify-start w-full p-12">
        <div className="space-y-1">
          <p className="text-2xl font-medium">Goshen AI</p>
          <p>AI inference at a fraction of the cost</p>
        </div>
        <div className="flex justify-start items-center w-fit gap-2">
          <div>
            <label className="text-xs text-gray-400">Sign up for our waitlist</label>
            <div className="flex gap-2 justify-center items-center">
              <Input placeholder="michael@goshenlabs.ai" />
              <Button size="sm" variant="outline" className="hover:cursor-pointer">
                Get Started
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-fit mt-4">
          <p>Generate an image/video using our API for a fraction of the cost</p>
          <CodeBlock>
            <CodeBlockGroup className="border-border border-b py-2 pr-2 pl-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">generate.ts</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </CodeBlockGroup>
            <CodeBlockCode code={code} language="tsx" />
          </CodeBlock>

        </div>
      </div>
    </div>
  );
}
