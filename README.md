# SkillXchanger

SkillXchanger is a free peer-to-peer skill exchange platform built with Next.js, React, and Tailwind CSS. It enables users to teach, learn, and connect at zero cost.

## Features

- Authentication with NextAuth (Google provider)
- Post, browse, and filter skills
- Responsive, accessible UI
- Server-side and client-side validation
- Toast notifications for user feedback
- SEO and Open Graph meta tags for sharing

## API Endpoints

- `POST /api/skills` — Create a new skill (requires authentication)
  - Required fields: `type` ("offer" or "wanted"), `skillName` (min 3 chars), `description` (min 10 chars), `category` (non-empty)
- `GET /api/skills` — List all skills

## Contributing

1. Fork the repo and clone it locally
2. Create a new branch for your feature or fix
3. Follow the code style and conventions (see `.github/copilot-instructions.md`)
4. Ensure accessibility and SEO best practices
5. Submit a pull request with a clear description

## Accessibility & SEO

- All interactive elements are keyboard accessible and have ARIA labels
- Focus states are visible
- Open Graph and Twitter meta tags are included for better sharing

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
