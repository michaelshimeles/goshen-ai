import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import HomePage from "../components/home";

export default async function Page() {
    const waitlistTotal = await preloadQuery(api.waitlist.waitlistTotal);

    return <HomePage waitlistTotal={waitlistTotal}/>
}