# Verve — Social Media Web App

A fully client-side social media app built with **React 19**, **Tailwind CSS v4**, and **Vite**. Includes authentication, a home feed, stories, likes & comments, a messaging UI, notifications, a profile page, and a settings page (with dark mode) — all fully responsive and interactive.

> This is a front-end implementation with mock, in-memory data (no backend/database). Everything resets on page refresh. See **Next steps** below for hooking up a real API.

## Features

- **Auth** — login/signup screen with client-side validation (email format, password length, confirm-password match, show/hide password)
- **Feed** — post cards with like, comment, save, delete, and share UI; empty states
- **Stories** — story rail with a full-screen viewer (auto-advancing progress bars, tap-to-navigate) and the ability to add your own story with an image preview
- **Create post** — modal composer with text + image upload/preview and validation
- **Explore** — suggested people to follow + a trending photo grid
- **Messages** — conversation list and chat window, responsive (list <-> conversation) on mobile
- **Notifications** — likes/comments/follows feed with read/unread state and "mark all as read"
- **Profile** — cover photo, avatar, bio, stats, Posts/Saved tabs, edit-profile modal
- **Settings** — account info, dark mode toggle, privacy toggles, notification preferences, sign out
- Fully responsive: collapsible sidebar -> icon rail -> bottom nav bar on mobile
- Toast notifications for key actions

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

> **Note:** if you copied this project between operating systems (e.g. it was zipped up including `node_modules`), delete `node_modules` and `package-lock.json` and run `npm install` fresh on your machine first — native build tooling (Rolldown/Vite) ships OS-specific binaries.

## Project structure

```
src/
  components/     Reusable UI: Sidebar, Topbar, MobileNav, PostCard, StoriesBar,
                  StoryViewer, CreatePostModal, Avatar, Icon, Toast
  pages/          Route-level screens: AuthPage, HomePage, ExplorePage,
                  MessagesPage, NotificationsPage, ProfilePage, SettingsPage
  context/        AppContext (global state: auth, posts, stories, messages,
                  notifications, settings, theme) + the useApp() hook
  data/           mockData.js - seed users, posts, stories, conversations,
                  notifications (swap this for real API calls)
  App.jsx         Top-level layout/router (tab-based, no external router)
  main.jsx        Entry point
```

There's no routing library — navigation is simple tab-based state in `App.jsx`, which keeps the app dependency-light. Swap in `react-router` if you want real URLs per page.

## Next steps for a production app

- Replace `src/data/mockData.js` with real API calls (e.g. via `fetch`/`axios` + a backend of your choice)
- Add persistent auth (JWT/session) instead of the in-memory `authenticated` flag
- Store uploaded images in real storage (S3, Cloudinary, etc.) instead of `URL.createObjectURL`
- Add real-time updates for messages/notifications (WebSockets or polling)
- Add pagination/infinite scroll to the feed and explore grid
