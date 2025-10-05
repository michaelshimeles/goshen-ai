import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/header";
import Navbar from "@/components/navbar";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";


export default async function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col gap-3 justify-start items-center w-full px-6">
        <Navbar />
        <div className="flex flex-col gap-3 justify-start w-full">
          <PageHeader>
            <PageHeaderHeading>Goshen AI</PageHeaderHeading>
            <PageHeaderDescription>Full typesafe Nextjs + Elysia app using Tanstack Query to manage data. A separate worker server using BullMQ + Redis for background jobs.</PageHeaderDescription>
            <PageActions>
              <Button asChild size="sm" className="rounded-md">
                <Link href="/dashboard" prefetch={true}>
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
