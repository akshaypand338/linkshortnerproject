# Agent Instructions for Link Shortener Project

This document provides instructions for AI agents (including GitHub Copilot and other LLMs) to maintain consistent coding standards and best practices throughout this project.

## Overview

This is a **Next.js 16** based URL shortening application with the following tech stack:
- **Frontend**: React 19, Next.js 16 with App Router
- **Backend**: Next.js API routes
- **Database**: Neon (PostgreSQL) with Drizzle ORM
- **Authentication**: Clerk
- **Styling**: Tailwind CSS 4
- **Type Safety**: TypeScript 5
- **Linting**: ESLint 9

## Instructions by Topic

**⚠️ CRITICAL: ALWAYS read the relevant instruction files in the /docs directory BEFORE generating ANY code. Do not skip this step under any circumstances.**

The following markdown files contain detailed instructions for specific aspects of this project.
**These instructions are mandatory and must be followed for all code generation:**

- [docs/CLERK_AUTH.md](docs/CLERK_AUTH.md) - Authentication with Clerk
- [docs/SHADCN_UI.md](docs/SHADCN_UI.md) - UI Components with shadcn/ui


## Quick Reference

### Running the Project
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Project Structure
```
app/                 # Next.js App Router directory
  layout.tsx         # Root layout with Clerk provider
  page.tsx           # Home page
  api/               # API routes
db/                  # Database layer
  schema.ts          # Drizzle ORM schema definitions
  index.ts           # Database utilities and connections
docs/                # This documentation
public/              # Static assets
```

### Key Files
- `tsconfig.json` - TypeScript configuration (strict mode enabled)
- `next.config.ts` - Next.js configuration
- `drizzle.config.ts` - Drizzle ORM configuration
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS/Tailwind configuration

## General Principles

1. **Type Safety First**: Always use TypeScript with strict mode. Avoid `any` types.
2. **Server Components by Default**: Use Server Components in Next.js unless interactivity is required.
3. **Database Consistency**: All database operations must use Drizzle ORM through the provided utilities.
4. **Error Handling**: Always handle errors gracefully with meaningful messages.
5. **Accessibility**: Follow WCAG standards for interactive components.
6. **Performance**: Optimize images, lazy load components, and minimize bundle size.
7. **Security**: Never expose secrets, validate all inputs, protect API routes with authentication.
8. **Testing**: Write testable code and include test coverage for critical features.
9. **Documentation**: Keep code self-documenting with clear variable names and JSDoc comments.
10. **Consistency**: Follow established patterns; avoid one-off solutions.

## When in Doubt

1. Check existing code in the project first
2. Follow the patterns established in the `app/` and `db/` directories
3. Reference the TypeScript strict mode guidelines
4. Check Clerk documentation for authentication patterns
5. Refer to Next.js 16 App Router documentation

## Important Notes for AI Agents

- **🔴 MANDATORY: Read relevant /docs instruction files BEFORE any code generation** - This is non-negotiable
- **Always run ESLint** after making changes to catch style violations
- **Test type checking** with `typescript --noEmit` equivalent checks
- **Preserve existing patterns** - don't refactor unrelated code
- **Ask for clarification** if requirements conflict with these standards
- **Update documentation** if introducing new patterns or conventions
