import {
    CodeBlock,
    CodeBlockCode,
    CodeBlockGroup,
} from "@/components/code-block";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/header";
import Navbar from "@/components/navbar";
import { Button } from "@workspace/ui/components/button";
import { Check, Copy } from "lucide-react";
import Code from "./_components/code";

export default function Dashboard() {


    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col gap-3 justify-center items-start w-full px-6">
                <Navbar />
                <div className="flex flex-col gap-3 justify-start w-full">
                    <PageHeader>
                        <PageHeaderHeading>Model</PageHeaderHeading>
                        <PageHeaderDescription>All you need is one API key to get access to tons of video and image models at a fraction of the cost.</PageHeaderDescription>
                    </PageHeader>
                </div>
                <Code />
            </div>
        </div>
    );
}
