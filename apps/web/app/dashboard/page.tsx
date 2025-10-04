import { PageHeader, PageHeaderHeading, PageHeaderDescription, PageActions } from "@/components/header";
import Navbar from "@/components/navbar";
import { getSignUpUrl, withAuth } from "@workos-inc/authkit-nextjs";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export default async function Dashboard() {

    // Retrieves the user from the session or returns `null` if no user is signed in
    const { user } = await withAuth();

    // Get the URL to redirect the user to AuthKit to sign up
    const signUpUrl = await getSignUpUrl();

    if (!user) {
        return (
            <>
                <a href="/login">Sign in</a>
                <Link href={signUpUrl}>Sign up</Link>
            </>
        );
    }


    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col gap-3 justify-start items-center w-full px-6">
                <Navbar />
                <div className="flex flex-col gap-3 justify-start w-full">
                    <PageHeader>
                        <PageHeaderHeading>Dashboard</PageHeaderHeading>
                        <PageHeaderDescription>Generate an API key.</PageHeaderDescription>
                        <PageActions>
                            <Button asChild size="sm" className="rounded-md">
                                <Link href="/" prefetch={true}>
                                    Get Started
                                </Link>
                            </Button>
                        </PageActions>
                    </PageHeader>
                </div>
            </div>
        </div>
    );
}
