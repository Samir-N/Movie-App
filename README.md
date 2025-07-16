eact + Vite + Tailwind CSS + Appwrite - Movie App
This project provides a minimal yet practical setup to build a Movie App using React, Vite, Tailwind CSS, and Appwrite. It focuses on fast development, clean UI, and backend integration with Appwrite for authentication and database management. The app integrates TMDB API for movie data and allows users to browse, search, and manage favorite movies with authentication features.

Currently, this project leverages Vite for ultra-fast development and Tailwind CSS for styling. Appwrite is used as the backend-as-a-service (BaaS) to handle user authentication, movie collections, and secure API access.

Project Purpose
This project demonstrates how to build a modern movie discovery app with:

React for the UI

Vite for build tools and hot module replacement (HMR)

Tailwind CSS for fast and responsive styling

Appwrite for backend (authentication, database, API management)

TMDB API for accessing trending and popular movie data

Appwrite Integration
Appwrite is used for:

User Authentication (Sign up, Login, Session Management)

Storing user-specific data (such as favorite movies or watchlists)

Secure API access and rules

The Appwrite SDK is connected to the React app through Appwrite’s JavaScript SDK, allowing secure and efficient CRUD operations on user data.

TMDB API Integration
The Movie Database (TMDB) API is used to fetch:

Trending Movies

Search Results

Movie Details (overview, rating, release date, etc.)

API keys are stored securely in .env using Vite’s environment variables.
