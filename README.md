# Next.js Hello World



default export က ဘယ်လို အလုပ်လုပ်တာလဲ?

```js
export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
```

ဘာလို့ Home ကို ယူပြနေရတာလဲ?

File based routing မှာ function name နဲ့ page name တူဖို့လိုလား

```js
export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the About page.</p>
    </div>
  );
}
```


## ဘာဆက်လုပ်ရမှာလဲ?

- [ ] CRUD အပြည့်ရဖို့ To Do List api ရှာ / ရေးထား
- [ ] ဒီမှာ Integrate လုပ်။
- [ ] ပြီးရင် authentication ထည့်။


တက်နိုင်သမျှ server side တွေပဲလုပ်။


Module not found: Can't resolve '@src/app/globals.css'

Module တွေ ဘယ်လို import လုပ်ကြလဲ?



## Live Demo

https://blog-using-next.onrender.com/

ဒီမှာ တင်ထားပါတယ်။


## အသစ်ထပ်ဖတ်ဖို့

- [ ] tailwind
- [ ] next.js api routing
- [ ] api routing / proxy / api gateway
- [ ] layout တစ်ခု အစအဆုံး ချကြည့်ပါ။ MOHT အတွက်။

## 2025-05-20

Documentation ထဲကအတိုင်း page က အလုပ်လုပ်ပေမယ့် getServerSideProperties က အလုပ်မလုပ်။


You're not alone in this confusion — Next.js 13+ (including 15) introduced a major architectural change with the **App Router**, and it's easy to get tripped up by the differences from the old **Pages Router**. Here's a clear breakdown to help you breathe again:

---

## 🧠 TL;DR:

* **`app/`** is for the **App Router** (Next.js 13+).
* **`pages/`** is for the legacy **Pages Router**.
* They **can coexist** (but with caveats).
* **Layouts only work in `app/`**, not in `pages/`.
* You’re likely using `pages/` expecting App Router features — hence the confusion.

---

## 🤖 When to use `app/`

Use the `app/` directory if:

* You want to use **layouts**, **server components**, **loading.tsx**, **error.tsx**, **Route Groups**, **Segment Config**, etc.
* You are comfortable with React Server Components and newer Next.js features.
* You want the most modern approach recommended by the Next.js team.

**Example:**

```bash
/app
  /dashboard
    page.tsx
    layout.tsx
    loading.tsx
```

---

## 📦 When to use `pages/`

Use the `pages/` directory if:

* You are migrating from older Next.js projects.
* You rely on `getServerSideProps`, `getStaticProps`, etc.
* You are using libraries that aren’t yet compatible with the App Router.

**Example:**

```bash
/pages
  index.tsx
  about.tsx
```

---

## ✅ Do they coexist?

Yes, **`app/` and `pages/` can coexist**, but only **one router handles a given route**.

### ⚠️ Key Rule:

> Routes in `app/` will **override** routes in `pages/`.

So:

* If you have `/app/about/page.tsx`, it will take precedence over `/pages/about.tsx`.

---

## 😤 Why aren’t layouts working in `pages/`?

Because layouts are **only supported in the App Router (`app/`)**.

If you're doing this:

```tsx
// pages/_app.tsx or pages/_layout.tsx
```

That's **not the same** as the new `app/layout.tsx`. In `pages/`, you manually create shared layouts in `_app.tsx` or HOCs.

---

## 🔥 Final sanity-saving advice:

### ✅ Use `app/` if:

* You’re starting a new project.
* You want nested layouts, loading states, and server components.

### ✅ Use `pages/` if:

* You’re upgrading slowly or using older Next.js-compatible libraries.

---

## 🚨 Common mistake in your case:

You probably put `layout.tsx` inside `pages/` — that won’t do anything.

✅ Fix: move to `app/` and structure like:

```
/app
  layout.tsx         <-- your main layout
  page.tsx           <-- your homepage
  /about
    page.tsx         <-- /about route
```

---

Want help migrating or debugging your specific layout issue? Feel free to paste your folder structure or relevant code here.

----

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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
