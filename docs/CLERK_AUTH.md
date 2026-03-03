# Clerk Authentication Standards

## Overview

All authentication in this application is handled exclusively by **Clerk**. No alternative authentication methods should be implemented or used.

## Key Rules

### 1. Single Auth Provider
- **Only Clerk** handles authentication for this application
- No custom auth solutions, API key authentication, or alternative login methods are permitted
- All user identity and session management flows through Clerk

### 2. Protected Routes

#### /dashboard Route
- **Must be protected** - only accessible to authenticated users
- Redirect unauthenticated users to sign-in
- Use `auth()` from `@clerk/nextjs` in Server Components to check authentication status
- Use `useAuth()` hook in Client Components for auth state

#### Homepage (/)
- Logged-in users accessing `/` **must be redirected to `/dashboard`**
- Implement redirect logic in the root `page.tsx` using `auth()` and `redirect()`

### 3. Sign-In & Sign-Up Modal

- All sign-in and sign-up flows **must launch as modals**, not full pages
- Use Clerk's `<SignIn />` and `<SignUp />` components with modal mode
- Do not create separate dedicated pages for sign-in/sign-up

### 4. Implementation Patterns

#### Server Components (checking auth status)
```typescript
import { auth } from '@clerk/nextjs';

export default async function Page() {
  const { userId } = auth();
  
  if (!userId) {
    // Handle unauthenticated state
  }
}
```

#### Client Components (accessing auth state)
```typescript
'use client';
import { useAuth } from '@clerk/nextjs';

export default function Component() {
  const { userId, isLoaded } = useAuth();
  
  if (!isLoaded) return null; // Wait for auth to load
  if (!userId) return <SignIn />;
}
```

#### Redirecting Authenticated Users from Homepage
```typescript
import { auth, redirect } from '@clerk/nextjs';

export default async function Home() {
  const { userId } = auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  // Render homepage for unauthenticated users
}
```

### 5. Layout & Provider Setup

- Clerk `<ClerkProvider>` **must wrap the entire app** in `app/layout.tsx`
- Configure Clerk environment variables in `.env.local`:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`

### 6. API Routes

- Protect API routes using `auth()` from `@clerk/nextjs`
- Return `401 Unauthorized` for unauthenticated requests
- All user-specific data operations must be scoped to the authenticated `userId`

```typescript
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Handle authenticated request
}
```

## Summary

| Requirement | Standard |
|---|---|
| Auth Provider | Clerk only |
| Dashboard Access | Protected - auth required |
| Homepage Redirect | Logged-in users → /dashboard |
| Sign-In/Sign-Up UI | Modal only |
| Session Management | Clerk `auth()` & `useAuth()` |

