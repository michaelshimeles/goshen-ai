import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/header";
import { Models } from "@/components/models";
import Navbar from "@/components/navbar";
import { createServerClient } from "@/lib/api";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { Input } from "@workspace/ui/components/input";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import GenerateApiButton from "./model/[id]/_components/generate-button";

export default async function Dashboard() {

    const { user } = await withAuth();

    if (!user) {
        redirect("/")
    }

    const cookieStore = await cookies();
    const serverClient = createServerClient(cookieStore);

    const { data, error } = await serverClient.api.admin.keys.get({
        query: {
            userId: user.id
        }
    })

    const apiKeys = data?.[0]?.last4 || []

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
                                <Input
                                    defaultValue={"*********" + apiKeys}
                                    readOnly
                                />
                            </div>
                            <GenerateApiButton userId={user.id} />
                        </PageActions>
                    </PageHeader>
                </div>
                <div className="flex items-center justify-start w-full gap-3">
                    {[0].map((index) => (<Models key={index} />))}
                </div>
            </div>
        </div>
    );
}
