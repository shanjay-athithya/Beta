'use client';
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 p-4 space-y-8">
            <div className="bg-red-100 p-8 rounded-lg shadow-lg text-center w-full max-w-md">
                <SignedOut>
                    <div>
                        <h1 className="text-3xl font-bold mb-4 text-pink-600">Welcome to Beta</h1>
                        <p className="mb-6 text-gray-900">Join us to explore job opportunities, career tips, and more.</p>
                        <SignInButton mode="redirect">
                            <button className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-red-700">
                                Try Beta
                            </button>
                        </SignInButton>
                    </div>
                </SignedOut>
                <SignedIn>
                    <div>
                        <UserButton />
                    </div>
                </SignedIn>
            </div>

            <div className="bg-red-100 p-8 rounded-lg shadow-lg text-center w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-pink-600">About Our App</h2>
                <p className="mb-4 text-gray-900">
                    Our app helps you navigate your career with ease. Discover job opportunities, get career advice, and connect with professionals.
                </p>
                <h3 className="text-xl font-bold mb-2 text-red-600">Features:</h3>
                <ul className="list-disc list-inside text-left mb-5 text-gray-900">
                    <li>Job Search</li>
                    <li>Resume Builder</li>
                    <li>Interview Tips</li>
                    <li>Professional Networking</li>
                </ul>
                <p className="text-pink-600 font-semibold">&copy; 2024 Beta. All rights reserved.</p>
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
