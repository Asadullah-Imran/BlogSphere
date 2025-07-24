# BlogSphere

A modern, full-stack blog application with a React frontend and Node.js/Express backend, using MongoDB for data storage. Features include authentication, protected routes, post management, user profiles, and a clean, responsive UI.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
  - [Frontend (React)](#frontend-react)
  - [Backend (Node.js/Express)](#backend-nodejsexpress)
- [MongoDB Integration](#mongodb-integration)
- [Cloudinary & .env Issues](#cloudinary--env-issues)
- [Running the App](#running-the-app)
- [License](#license)

---

## Project Overview

BlogSphere is a platform for users to share thoughts, ideas, and stories. It supports user authentication, post creation/editing, comments, reactions, and profile management. The app is built with scalability and modern best practices in mind.

---

## Project Structure

### Frontend (React)

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
  public/
    logo.png               # App logo
    profilePicture.jpg     # Default profile picture
    vite.svg               # Vite default icon
  index.html               # HTML entry, SEO/meta tags, favicon
  tailwind.config.js       # Tailwind CSS config
  vite.config.js           # Vite config
  package.json             # Frontend dependencies
```

#### Key Features

- **Routing:** Uses `react-router-dom` for SPA navigation.
- **State Management:** Context API for authentication state.
- **UI:** Tailwind CSS for styling, dark mode support.
- **Components:** Navbar, Sidebar, Footer, modals, skeleton loaders, etc.
- **Pages:** Home, Posts, SinglePost, Profile, Register, Login, WritePost, etc.
- **API Services:** Abstracted API calls for authentication, posts, users.
- **Utilities:** PrivateRoute for protected routes, notification helpers.

---

### Backend (Node.js/Express)

```
api/
  src/
    app.js                # Express app setup, middleware
    index.js              # Server entry point
    db/
      db.js               # MongoDB connection logic
    models/
      user.model.js       # User schema/model
      post.model.js       # Post schema/model
      comment.model.js    # Comment schema/model
      reaction.model.js   # Reaction schema/model
    controllers/
      auth.controllers.js # Auth logic (register, login, etc.)
      post.controllers.js # Post CRUD logic
      user.controllers.js # User profile logic
    routes/
      auth.routes.js      # Auth endpoints
      post.routes.js      # Post endpoints
      user.routes.js      # User endpoints
    middlewares/
      auth.middleware.js  # Auth/JWT middleware
      multer.middleware.js# File upload middleware
    utils/
      ApiError.js         # Custom error handling
      ApiResponse.js      # Standardized API responses
      asyncHandler.js     # Async error wrapper
      cloudinary.js       # Cloudinary integration
    seedPosts.js          # Script to seed initial posts
  public/
    temp/                 # Temporary files (e.g., generated images)
  package.json            # Backend dependencies
  vercel.json             # Deployment config
```

#### Key Features

- **Express API:** RESTful endpoints for authentication, posts, users.
- **MongoDB:** Mongoose ODM for schema and data management.
- **Authentication:** JWT-based, with middleware for route protection.
- **File Uploads:** Multer for handling uploads, Cloudinary for image storage.
- **Error Handling:** Centralized error and response utilities.
- **Seeding:** Script for populating the database with sample posts.

---

## MongoDB Integration

- The backend connects to MongoDB using Mongoose.
- Models are defined for users, posts, comments, and reactions.
- Connection logic is in `api/src/db/db.js`.
- All data (users, posts, comments, reactions) is persisted in MongoDB, making the app scalable and reliable.

---

## Cloudinary & .env Issues

**Cloudinary** is used for image uploads (e.g., post images, profile pictures). The integration is handled in `api/src/utils/cloudinary.js`.

### Common .env Issue

When deploying or running locally, you may face issues where Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are not loaded properly from the `.env` file. This can happen due to:

- The `.env` file not being present in the deployment environment.
- Incorrect path or filename (should be `.env` at the project root).
- Not restarting the server after adding/changing `.env` variables.
- Not using a package like `dotenv` to load environment variables in `app.js` or `index.js`.

**Solution:**

- Ensure `.env` is present and contains the correct keys.
- Add `require('dotenv').config();` at the top of your entry file (e.g., `index.js` or `app.js`).
- Never commit your `.env` to version control (add to `.gitignore`).

---

## Running the App

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)
- Cloudinary account for image uploads

### Setup

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd blog-app
   ```

2. **Backend Setup:**

   - Create a `.env` file in `api/` with your MongoDB URI and Cloudinary credentials:
     ```
     MONGODB_URI=your_mongodb_uri
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     JWT_SECRET=your_jwt_secret
     ```
   - Install dependencies and start the server:
     ```bash
     cd api
     npm install
     npm run dev
     ```

3. **Frontend Setup:**
   - Install dependencies and start the dev server:
     ```bash
     cd ../client
     npm install
     npm run dev
     ```
   - The app runs at [http://localhost:5173/](http://localhost:5173/)

---

## License

MIT

---

**If you encounter issues with environment variables or deployment, double-check your `.env` files and ensure all required variables are set. For Cloudinary, verify your credentials and that the environment variables are loaded before any Cloudinary code runs.**
