'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClerkProvider, SignedIn, SignedOut, UserButton, useUser, SignInButton } from '@clerk/nextjs';

function SignInContent() {
    const router = useRouter();
    const { isSignedIn } = useUser();

    useEffect(() => {
        if (isSignedIn) {
            router.push('/jobot');
        }
    }, [isSignedIn, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <SignedOut>
                    <div>
                    <h1 className="text-2xl font-bold mb-4 text-blue-600">Welcome to Beta</h1>

                        <SignInButton mode="redirect">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Sign In</button>
                        </SignInButton>
                    </div>
                </SignedOut>
                <SignedIn>
                    <div>
                        <UserButton />
                    </div>
                </SignedIn>
            </div>
        </div>
    );
}

export default function SignInPage() {
    return (
        <ClerkProvider>
            <SignInContent />
        </ClerkProvider>
    );
}
