# URL Shortener

A simple URL shortener built with Next.js, PostgreSQL, and Prisma.

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL
- npm or yarn

## Setup

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/CamilleClipet/url-shortener.git
cd url-shortener
npm install
```

2. Set up your environment variables:
Create a `.env` file and add your PostgreSQL connection string:
```
DATABASE_URL="postgresql://username:password@localhost:5432/url_shortener?schema=public"
```

3. Set up the database:
```bash
# Create and apply migrations
npx prisma migrate dev

```

## Running the Project

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Shorten long URLs into easy-to-share links
- Copy shortened URLs to clipboard
- Track click counts
- Modern, responsive UI
- Real-time URL validation

## API Endpoints

- `POST /api/shorten` - Create a short URL
- `GET /api/redirect/[shortUrl]` - Redirect to original URL

## Tech Stack

- Next.js 14
- PostgreSQL
- Prisma ORM
- Tailwind CSS

## Additional information

To open a psql console, at the root of the project, run:
    ```
    psql url_shortener
    ```
