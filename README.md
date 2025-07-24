# Blog App (React Client)

A modern, responsive blog application built with React, React Router, and Tailwind CSS. Features authentication, protected routes, sidebar navigation, and a clean separation of concerns for pages, components, and services.

---

## Overview

- **Live Demo:** [likhalikhi.vercel.app](https://likhalikhi.vercel.app)
- **Stack:** React, React Router, Tailwind CSS, Context API

---

## Project Structure

```
client/
  src/
    App.jsx                # Main app entry, routing
    Layout.jsx             # App layout: Navbar, Sidebar, Footer, main content
    components/            # Reusable UI components (Navbar, Sidebar, Footer, etc.)
    context/
      authContext.jsx      # Authentication context/provider
    pages/                 # Main pages (Home, Posts, SinglePost, Profile, etc.)
    services/              # API service modules (auth, posts, users)
    utils/                 # Utility functions (PrivateRoute, notifications, etc.)
    main.jsx               # React root render
    index.css, App.css     # Styles (Tailwind, custom)
```

---

## Routing & Layout

- **App.jsx** sets up all routes using `react-router-dom`.
- **Layout.jsx** wraps all main pages with a consistent layout:
  - **Navbar** (top, sticky, contains hamburger, user, dark mode)
  - **Sidebar** (left, contains all navigation links, collapsible on mobile)
  - **Footer** (bottom)
  - **Outlet** (renders the current page)

**Routes:**

- `/register` → Register page
- `/login` → Login page
- `/verify-email` → Email verification page
- `/` → Home (inside Layout)
- `/posts` → All posts (inside Layout)
- `/post/:id` → Single post (inside Layout)
- `/create-post` → Write post (protected, inside Layout)
- `/profile/:id` → User profile (protected, inside Layout)

---

## Authentication

- **Context:**
  - `AuthContext` provides `user`, `loginWithContext`, `logoutWithContext`, and `setUser`.
  - User state is persisted in `localStorage`.
- **Login/Register:**
  - Use API services to authenticate/register users.
  - On login, user data is saved in context and localStorage.
- **Protected Routes:**
  - `PrivateRoute` component checks if `user` exists; if not, redirects to `/login`.

---

## Navigation

- **Sidebar:**
  - Contains all navigation links (Home, All Posts, Write Post, Profile, Login).
  - Collapsible on mobile (slides in/out).
  - Shows/hides links based on authentication state.
  - Also displays popular tags.
- **Navbar:**
  - Only contains hamburger menu (for sidebar), user/login, and dark mode toggle.
  - No navigation links (all in sidebar).

---

## Main Pages

- **Home:**
  - Hero section, trending blogs, latest posts.
  - Responsive grid for blog cards.
- **Posts:**
  - List of all posts, filterable by tag.
- **SinglePost:**
  - Full post view, comments, reactions, and “You May Like” suggestions.
- **Profile:**
  - User info, profile editing, user’s posts, post management.
- **WritePost:**
  - Create or edit a post, tag selection, image upload.
- **Register/Login/VerifyEmail/VerifywithOTP:**
  - Auth flows, form validation, feedback.

---

## Components

- **Navbar:**
  - Hamburger menu, user avatar, login/logout, dark mode toggle.
- **Sidebar:**
  - Navigation links, popular tags, responsive behavior.
- **Footer:**
  - Social links, quick links, categories, newsletter.
- **BestBlogs, YouMayLike, SkeletonCard, ConfirmationModal:**
  - Specialized UI for blog highlights, suggestions, loading states, and confirmations.

---

## Services

- **authenticationsServices.js:**
  - Handles login, register, email verification, etc.
- **postServices.js:**
  - CRUD for posts, comments, reactions.
- **userServices.js:**
  - User profile fetch/update.

---

## Utilities

- **PrivateRoute.jsx:**
  - Protects routes that require authentication.
- **notify.js:**
  - Toast notifications for user feedback.

---

## Styling

- **Tailwind CSS** is used for all layout and component styling.
- **Dark mode** is supported and toggled via the navbar.

---

## Responsive Design

- Layout and all components are mobile-first and responsive.
- Sidebar overlays on mobile, is sticky on desktop.
- Main content always flush with sidebar on desktop, full width on mobile.

---

## How It Works (Flow)

1. **User visits the app:**
   - Sees Home page, can browse posts, or register/login.
2. **Authentication:**
   - Register or login via forms; context and localStorage manage session.
3. **Navigation:**
   - Uses sidebar for all navigation; navbar for user/dark mode.
4. **Protected actions:**
   - Creating posts or viewing profiles requires login.
5. **Blogging:**
   - Users can create, edit, and delete their posts.
   - Posts can be liked/reacted to and commented on.
6. **Profile:**
   - Users can edit their profile and manage their posts.

---

## Customization & Extensibility

- Add new pages by creating a component in `pages/` and adding a route in `App.jsx`.
- Add new API endpoints in `services/`.
- Add new UI components in `components/`.

---

## Running the App

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. The app runs at [http://localhost:5173/](http://localhost:5173/)

---

## License

MIT
