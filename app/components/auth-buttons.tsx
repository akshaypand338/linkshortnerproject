'use client';

import { useClerk } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export function SignInButton() {
  const { openSignIn } = useClerk();

  return (
    <Button
      variant="outline"
      onClick={() => openSignIn()}
      className="px-6 py-2"
    >
      Sign in
    </Button>
  );
}

export function SignUpButton() {
  const { openSignUp } = useClerk();

  return (
    <Button
      onClick={() => openSignUp()}
      className="bg-blue-600 px-6 py-2 hover:bg-blue-700"
    >
      Get Started
    </Button>
  );
}
