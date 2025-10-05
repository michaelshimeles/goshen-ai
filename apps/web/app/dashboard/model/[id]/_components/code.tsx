"use client"
import {
    CodeBlock,
    CodeBlockCode,
    CodeBlockGroup,
} from "@/components/code-block";
import { Button } from "@workspace/ui/components/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function Code() {

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

        <div className="flex flex-col gap-3 max-w-fit">
            <p className="text-sm">Generate an image/video using our API for a fraction of the cost fal.ai and replicate charge</p>
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
    );
}
