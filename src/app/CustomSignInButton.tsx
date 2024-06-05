'use client'
import { useEffect } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const CustomSignInButton = () => {
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

  return <button onClick={handleSignIn}>Sign In</button>;
};

export default CustomSignInButton;
