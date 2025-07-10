# Zomato Clone - Frontend

## Getting Started

## Authentication System Overview

### How It Works

1. **Server-Side Protection (Middleware)**
   - Located in `src/middleware.js`
   - Runs before any page renders
   - Checks for authentication tokens in cookies
   - Redirects unauthenticated users to `/login`
   - Redirects authenticated users away from login/signup pages

2. **Client-Side Protection (ProtectedRoute Component)**
   - Located in `src/components/ProtectedRoute.jsx`
   - Provides additional client-side protection
   - Shows loading state while checking authentication
   - Redirects to login if not authenticated

3. **Authentication Context**
   - Located in `src/context/authContext.js`
   - Manages authentication state globally
   - Handles login, signup, and logout
   - Stores tokens and user data in cookies

### Protected Routes

The following routes require authentication:
- `/profile` - User profile page
- `/restaurant` - Restaurant listing page
- `/restaurant/[id]` - Individual restaurant pages

### Public Routes

These routes are accessible without authentication:
- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page

### Authentication Flow

1. **Login Process:**
   - User enters credentials on `/login`
   - Credentials are sent to backend API
   - On success, token and user data are stored in cookies
   - User is redirected to home page
   - Header shows user avatar and logout button

2. **Signup Process:**
   - User fills signup form on `/signup`
   - Data is sent to backend API
   - On success, user is automatically logged in
   - User is redirected to home page

3. **Logout Process:**
   - User clicks logout button in header
   - Cookies are cleared
   - User is redirected to login page

4. **Route Protection:**
   - Middleware checks every route before rendering
   - If user tries to access protected route without token → redirected to login
   - If authenticated user tries to access login/signup → redirected to home

### Key Features

- **Dual Protection**: Both server-side (middleware) and client-side (ProtectedRoute) protection
- **Persistent Sessions**: Authentication state persists across browser sessions via cookies
- **Automatic Redirects**: Users are automatically redirected based on their authentication status
- **Loading States**: Proper loading indicators while checking authentication
- **Error Handling**: Comprehensive error handling for login/signup failures

### File Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── login/page.jsx     # Login page
│   ├── signup/page.jsx    # Signup page
│   ├── profile/page.jsx   # Protected profile page
│   └── restaurant/        # Protected restaurant pages
├── components/
│   ├── ProtectedRoute.jsx # Client-side route protection
│   └── Header.jsx         # Navigation with auth state
├── context/
│   └── authContext.js     # Authentication state management
└── middleware.js          # Server-side route protection
```

### Usage

1. **For Protected Pages**: Wrap your page content with `<ProtectedRoute>`
2. **For Authentication State**: Use `useAuth()` hook to access authentication data
3. **For Navigation**: The Header component automatically shows login/logout based on auth state


