import { treaty } from "@elysiajs/eden";
import { API } from "../app/api/[[...slugs]]/route";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

// Client for client-side usage
export const client = treaty<API>(process.env.NEXT_PUBLIC_APP_URL!);

// Factory function to create server-side client with cookies
export function createServerClient(cookieStore: ReadonlyRequestCookies) {
    return treaty<API>(process.env.NEXT_PUBLIC_APP_URL!, {
        headers: {
            Cookie: cookieStore.toString()
        }
    });
}