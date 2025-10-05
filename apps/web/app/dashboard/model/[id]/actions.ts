"use server"

import { createServerClient } from "@/lib/api"
import { cookies } from "next/headers"

export default async function generateApiKey({ userId }: {
    userId: string
}) {
    const cookieStore = await cookies()
    const client = createServerClient(cookieStore)

    const { data, error } = await client.api.admin.keys.post({
        userId
    })

    if (error) {
        return {
            error: error.value,
            status: error.status
        }
    }

    return data
}