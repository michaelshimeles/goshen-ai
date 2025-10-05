"use client"
import { Button } from "@workspace/ui/components/button"
import { toast } from "sonner"
import generateApiKey from "../actions"

export default function GenerateApiButton({ userId }: {
    userId: string
}) {
    return (
        <Button
            onClick={async () => {
                const result = await generateApiKey({ userId })

                if ("error" in result) {
                    toast.error("Failed to create API key", {
                        description: result.error.message || result.error.summary
                    })
                } else {
                    await navigator.clipboard.writeText(result.apiKey)
                    toast.success("API Key created and copied to clipboard!", {
                        description: result.apiKey,
                        duration: 10000,
                    })
                }
            }}
            variant="outline"
            size="sm"
            className="rounded-md hover:cursor-pointer"
        >
            Generate
        </Button>
    )
}