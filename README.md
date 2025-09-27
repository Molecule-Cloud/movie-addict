# MovieAddict

A modern, responsive movie discovery application built with Next.js, TypeScript, and Tailwind CSS. Discover trending movies, explore detailed information, and manage your personal favorites collection.

## Features

- **Movie Discovery**: Browse trending, now playing, and popular movies
- **Detailed Movie Information**: Comprehensive details including cast, ratings, and overview
- **Favorites Management**: Save and manage your favorite movies with local storage persistence
- **Infinite Scrolling**: Seamlessly load more movies as you browse
- **Advanced Search**: Find movies by title with real-time search functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, dark-themed interface with smooth animations

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **API**: The Movie Database (TMDB) API

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- TMDB API account ([Get API Key](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/movieaddict.git
cd movieaddict
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
movieaddict/
├── app/
│   ├── components/
│   │   ├── home/
│   │   │   └── hero-carousel.tsx
│   │   ├── movies/
│   │   │   ├── movie-card.tsx
│   │   │   └── movie-section.tsx
│   │   ├── shared/
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   └── ui/
│   │       └── load-more.tsx
│   ├── favorites/
│   │   └── page.tsx
│   ├── movies/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── trending/
│   │   └── page.tsx
│   ├── now-playing/
│   │   └── page.tsx
│   ├── search/
│   │   └── page.tsx
│   └── layout.tsx
├── hooks/
│   ├── use-infinite-scroll.ts
│   └── use-debounce.ts
├── lib/
│   ├── api/
│   │   └── tmdb.ts
│   └── store/
│       └── favorites.ts
├── types/
│   └── tmdb.ts
└── public/
```

## Key Features Implementation

### Movie Discovery
The application features a hero carousel showcasing trending movies, followed by categorized sections for trending, now playing, and popular content. Each section supports infinite scrolling for seamless browsing.

### Favorites System
Movies can be added to favorites using the heart icon on movie cards. The favorites are persisted locally using Zustand with localStorage, ensuring your collection remains available across browser sessions.

### Search Functionality
The search page provides real-time movie discovery with debounced API calls to optimize performance and reduce unnecessary requests.

### Responsive Design
Built with a mobile-first approach using Tailwind CSS, the interface adapts gracefully to all screen sizes while maintaining usability and visual appeal.

## API Integration

MovieAddict integrates with The Movie Database (TMDB) API to provide comprehensive movie data. The application includes:

- Movie listings with infite Scrolling for trending and Popular movies
- Detailed movie information
- Cast and crew details
- High-quality poster and backdrop images
- Search functionality
- Utitlity functions for calling API rather than custom hooks for better server and client side render
- Lodash for debouncing in search functionality



## Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Icons by [Lucide React](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/)
