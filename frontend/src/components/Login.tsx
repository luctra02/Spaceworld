"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function Login() {
    const { data: session } = useSession();
    const [username, setUsername] = useState(""); // Initially empty

    // UseEffect to set the username when the session data is loaded
    useEffect(() => {
        const fetchData = async () => {
            if (session?.user?.userId) {
                const response = await fetch(
                    `http://localhost:8001/v1/api/users/username/${session.user.userId}`,
                );
                const username = await response.text();
                setUsername(username);
            }
        };
        fetchData();
    }, [session]);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value); // Update state on input change
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // Check if the Enter key was pressed
            const newUsername = e.currentTarget.value; // Get the value from the input

            // Send the PUT request
            try {
                const response = await fetch(
                    `http://localhost:8001/v1/api/users/username/${session?.user.userId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json", // Add Content-Type header
                        },
                        body: JSON.stringify({
                            username: newUsername, // Use the new username
                        }),
                    },
                );

                if (!response.ok) {
                    throw new Error("Failed to update username");
                }

                // Show a success toast notification
                toast({
                    title: "Username Updated",
                    description: `Your username has been updated successfully to ${newUsername}!`,
                });

                setUsername(newUsername); // Update the username state immediately
            } catch (error) {
                console.error("Error updating username:", error);
                toast({
                    title: "Update Failed",
                    description: "Failed to update username. Please try again.",
                });
                // Optionally reset to previous value or show error message
            }
        }
    };

    return (
        <>
            {!session ? (
                <Link href="/api/auth/signin" className="ml-6">
                    <Button>Log in</Button>
                </Link>
            ) : (
                <div className="ml-6 flex items-center gap-4">
                    {session?.user?.picture && (
                        <Popover>
                            <PopoverTrigger>
                                <Avatar>
                                    <AvatarImage
                                        src={session.user.picture}
                                        alt="User Profile"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 text-center p-4">
                                {/* Centered Larger Avatar */}
                                <div className="flex flex-col items-center">
                                    <Avatar className="w-24 h-24 mb-4">
                                        {" "}
                                        {/* Larger avatar */}
                                        <AvatarImage
                                            src={session.user.picture}
                                            alt="User Profile"
                                        />
                                    </Avatar>
                                    {/* Input field for changing username */}
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        onKeyDown={handleKeyDown}
                                        className="border-2 rounded-md p-3 w-full"
                                    />
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}

                    <Link href="/api/auth/signout">
                        <Button>Sign out</Button>
                    </Link>
                </div>
            )}
        </>
    );
}
