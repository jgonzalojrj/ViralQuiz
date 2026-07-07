# ViralQuiz Agent Notes

## Project

ViralQuiz is a small Next.js app for visual, shareable mini-tests. Keep the product simple, fast, and easy to extend.

## Stack

- Next.js App Router
- React client components for interactive quizzes
- Local TypeScript data in `data/quizzes.ts`
- No database, login, or payments in the first version
- Designed for Vercel deployment

## Development

- Run `npm install` before local development.
- Run `npm run dev` to start the app.
- Run `npm run build` before shipping changes.

## Conventions

- Add new quiz metadata and questions in `data/quizzes.ts`.
- Create a route under `app/test/<slug>/page.tsx` for each functional quiz.
- Keep components small and focused.
- Prefer clear, mobile-first UI with large tap targets.
- Do not add backend services until the product needs persistent data.
