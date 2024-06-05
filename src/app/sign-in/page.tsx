// pages/sign-in.tsx
'use client';
import { useEffect } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
    const { openSignIn } = useClerk();
    const { isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isSignedIn) {
            router.push('/jobot');
        }
    }, [isSignedIn, router]);

    const handleSignIn = async () => {
        try {
            await openSignIn();
        } catch (error) {
            console.error("Sign-in failed", error);
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
};

export default SignInPage;
