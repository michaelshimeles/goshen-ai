import { signOut, withAuth } from "@workos-inc/authkit-nextjs";
import { Button } from "@workspace/ui/components/button";
import Profile from "@workspace/ui/components/profile";
import Link from "next/link";


export default async function Navbar() {

    const { user } = await withAuth();

    return (
        <div className="flex justify-between items-center w-full mt-4">
            <Link href="/">
                <h1 className="text-xl font-semibold">Goshen AI</h1>
            </Link>
            {!user ?
                <Link href="/login">
                    <Button size="sm" variant="outline">Login</Button>
                </Link>
                :
                <Profile signOut={signOut} firstName={user?.firstName!} profilePictureUrl={user?.profilePictureUrl!} />
            }
        </div>
    );
}
