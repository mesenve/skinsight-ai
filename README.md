This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## AI Review (Run AI Review)

Copy `env.example` to `.env.local` and add your OpenAI key:

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.5
```

Restart the dev server after changing env vars.

## Deploy on Netlify

Production **Run AI Review** requires the same variables in Netlify:

1. Netlify dashboard → **Site settings** → **Environment variables**
2. Add `OPENAI_API_KEY` and `OPENAI_MODEL=gpt-5.5`
3. Trigger a new deploy (env changes do not apply to existing deploys)

Without `OPENAI_API_KEY`, the app shows: `OPENAI_API_KEY is not configured on the server.`
