'use client';

import { useClerk } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export function SignInButton() {
  const { openSignIn } = useClerk();

  return (
    <Button variant="outline" onClick={() => openSignIn()}>
      Sign in
    </Button>
  );
}

export function SignUpButton() {
  const { openSignUp } = useClerk();

  return (
    <Button onClick={() => openSignUp()}>
      Sign up
    </Button>
  );
}
