

import { ClerkProvider, RedirectToSignIn, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <ClerkProvider>
      <html lang="en">
        <body>
          <header>
          {/* <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
          </header>
          <main>
            {children}
          </main>
        </body>
      </html>
    // {/* </ClerkProvider> */}
  )
} 