# Family Stories App

A Nuxt.js application for creating and sharing family stories with Supabase authentication and database.

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Environment Variables

Make sure you have a `.env` file with the following variables:

```
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
```

## Database Setup

Before using the application, you need to set up the Supabase database structure.

Follow the instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to create the necessary tables and set up Row-Level Security (RLS) policies.

## Features

- User authentication with Supabase Auth
- Create and save family stories
- Random story generator
- Custom avatar creation
- Responsive design
