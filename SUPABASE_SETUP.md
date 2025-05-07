# Supabase Setup Guide

## Setting Up Your Stories Table

The application requires a `stories` table in your Supabase database. Follow these steps to create it:

### Option 1: Using the Supabase SQL Editor

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the contents of `setup-supabase.sql` into the editor
5. Run the query

### Option 2: Using the Supabase Table Editor

1. Log in to your Supabase dashboard
2. Navigate to Database → Tables
3. Click "Create a new table"
4. Name the table "stories"
5. Add the following columns:
   - `id`: type `bigint`, set as primary key, with identity enabled
   - `user_id`: type `uuid`, references `auth.users(id)`, not nullable
   - `family_member`: type `text`, not nullable
   - `author`: type `text`, not nullable
   - `title`: type `text`, not nullable
   - `content`: type `text`, not nullable
   - `avatar_url`: type `text`, not nullable
   - `background_color`: type `text`, not nullable
   - `created_at`: type `timestamptz`, default value: `now()`, not nullable
6. Save the table

### Setting Up Row-Level Security (RLS)

1. Go to Authentication → Policies
2. Find the `stories` table
3. Enable Row Level Security by clicking the toggle
4. Add the following policies:

#### Select Policy

- Name: "Users can view their own stories"
- Target roles: Leave blank (applies to all authenticated users)
- Using expression: `auth.uid() = user_id`

#### Insert Policy

- Name: "Users can insert their own stories"
- Target roles: Leave blank (applies to all authenticated users)
- With check expression: `auth.uid() = user_id`

#### Update Policy

- Name: "Users can update their own stories"
- Target roles: Leave blank (applies to all authenticated users)
- Using expression: `auth.uid() = user_id`

#### Delete Policy

- Name: "Users can delete their own stories"
- Target roles: Leave blank (applies to all authenticated users)
- Using expression: `auth.uid() = user_id`

## Testing Your Setup

After setting up the table and policies, try the following:

1. Log in to your application
2. Go to the Story Generator page
3. Create and save a story
4. The story should be saved to your Supabase database

If you encounter any errors, check the browser console for details.
