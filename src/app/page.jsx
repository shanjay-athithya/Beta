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
        <div>
            <SignedOut>
                <div>
                    <h1>Welcome to Our App</h1>
                    <SignInButton mode="redirect">
                        <button>Sign In</button>
                    </SignInButton>
                </div>
            </SignedOut>
            <SignedIn>
                <div>
                    <UserButton />
                    {/* Optionally show some content here while redirecting */}
                </div>
            </SignedIn>
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
