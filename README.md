This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Project Overview

**Trumsg** is a modern, anonymous messaging and feedback platform built with **Next.js**, **TypeScript**, and **MongoDB**. It enables users to submit feedback or messages without revealing their identity, while still providing optional authentication for users who wish to manage their submissions. The application offers a full‑stack solution for user registration, email verification, and optional authentication (via NextAuth), combined with real‑time‑like message handling. The backend exposes a set of RESTful API routes for creating, retrieving, accepting, deleting, and suggesting messages, and the frontend delivers a clean UI featuring a navigation bar, message cards, and background animations.

**Key features include**
- Anonymous message/feedback submission with optional user accounts.
- Secure user sign‑up and sign‑in with hashed passwords and verification codes.
- Email verification integration using Resend.
- Message persistence per user (or anonymously) with MongoDB subdocuments.
- Comprehensive API endpoints for sending, accepting, deleting, and suggesting messages.
- Type‑safe request validation via Zod schemas.
- Deployable on Vercel with automatic font optimization.

This repository serves as a starter template for building scalable, type‑safe, full‑stack applications with Next.js.

## Tech Stack
- **Framework:** Next.js (App Router) with React 18
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** NextAuth.js
- **Email Service:** Resend
- **Schema Validation:** Zod
- **Styling:** Tailwind CSS (via shadcn/ui components)
- **Deployment:** Vercel

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
