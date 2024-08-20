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
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: "url('/image/job.png')",
            }}
        >
            {/* Main container with max-width and padding */}
            <div className="flex flex-col items-center justify-center w-full max-w-3xl space-y-10 p-6 md:p-10 lg:p-16 bg-white bg-opacity-70 rounded-lg shadow-2xl">
                
                {/* Sign In Section */}
                <div className="w-full text-center">
                    <SignedOut>
                        <h1 className="text-5xl font-extrabold mb-6 text-purple-900">Welcome to Beta</h1>
                        <p className="mb-8 text-lg text-black font-medium">
                            Join us to explore job opportunities, career tips, and more.
                        </p>
                        <SignInButton mode="redirect">
                            <button className="px-6 py-3 font-semibold bg-purple-900 text-white rounded-full hover:bg-purple-700 transition duration-300">
                                Try Beta
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <div className="flex items-center justify-center">
                            <UserButton />
                        </div>
                    </SignedIn>
                </div>

                {/* About Section */}
                <div className="w-full text-center">
                    <h2 className="text-4xl font-bold mb-6 text-purple-900">About Our App</h2>
                    <p className="mb-6 text-lg text-black font-medium">
                        Our app helps you navigate your career with ease. Discover job opportunities, get career advice, and connect with professionals.
                    </p>
                    <h3 className="text-2xl font-semibold mb-4 text-purple-900">Features:</h3>
                    <ul className="list-disc list-inside  mb-6 text-black font-medium">
                        <li>Job Search</li>
                        <li>Resume Builder</li>
                        <li>Interview Tips</li>
                        <li>Professional Networking</li>
                    </ul>
                    <p className="text-purple-900 font-bold">&copy; 2024 Beta. All rights reserved.</p>
                </div>
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
