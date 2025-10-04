import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/header";
import Navbar from "@/components/navbar";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";


export default async function Home() {
    const { user } = await withAuth();

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col gap-3 justify-start items-center w-full px-6">
                <Navbar />
                <div className="flex flex-col gap-3 justify-start w-full">
                    <PageHeader>
                        <PageHeaderHeading>Welcome, {user?.firstName}</PageHeaderHeading>
                        <PageHeaderDescription>All you need is one API key to get access to tons of video and image models at a fraction of the cost.</PageHeaderDescription>

                    </PageHeader>
                </div>
            </div>
        </div>
    );
}
