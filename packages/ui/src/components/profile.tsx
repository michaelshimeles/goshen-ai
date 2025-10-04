"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

type UserProfile = {
    signOut: () => void
    firstName: string,
    profilePictureUrl: string
}
export default function Profile({ signOut, firstName, profilePictureUrl }: UserProfile) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={profilePictureUrl!} />
                    <AvatarFallback>{firstName?.charAt(0)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem
                    onClick={async () => {
                        await signOut();
                    }}
                >
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}