import { PageHeader, PageHeaderHeading, PageHeaderDescription, PageActions } from "@/components/header";
import { Models } from "@/components/models";
import Navbar from "@/components/navbar";
import { getSignUpUrl, withAuth } from "@workos-inc/authkit-nextjs";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
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
                        <PageHeaderHeading>Generate with AI</PageHeaderHeading>
                        <PageHeaderDescription>All you need is one API key to get access to tons of video and image models at a fraction of the cost.</PageHeaderDescription>
                        <PageActions>
                            <div>
                                <Input />
                            </div>
                            <Button variant="outline" size="sm" className="rounded-md">
                                Generate
                            </Button>
                        </PageActions>
                    </PageHeader>
                </div>
                <div className="flex items-center justify-start w-full gap-3">
                    {[0, 1, 2, 3].map((index) => (<Link href="/dashboard/model" key={index}><Models /></Link>))}
                </div>
            </div>
        </div>
    );
}
