# Switching Between Development and Production Authentication

Since authentication behavior differs between localhost and the production Netlify site, follow these instructions to ensure smooth authentication in both environments.

## Step 1: Configure your Google OAuth

In your Google Cloud Console OAuth credentials, make sure you have BOTH redirect URIs added:

- `http://localhost:3000/confirm` (for local development)
- `https://kintails.netlify.app/confirm` (for production)

## Step 2: Use the configuration helper

When switching between environments, run the following command:

### For local development:

```
node setup-auth-config.js development
```

Then go to your Supabase dashboard and set the Site URL to: `http://localhost:3000`

### For production deployment:

```
node setup-auth-config.js production
```

Then go to your Supabase dashboard and set the Site URL to: `https://kintails.netlify.app`

## Step 3: Update .env files (if needed)

Make sure you have the correct environment variables in:

- `.env` - Used for local development
- `.env.production` - Used for Netlify deployment

## Note on Behavior

You may notice:

- When Supabase is configured for localhost: Google auth is fast on Netlify but redirects to localhost
- When Supabase is configured for Netlify: Google auth is fast on localhost but redirects to Netlify

This is expected behavior and why we need to switch the configuration based on which environment you're working in.

## Alternative: Two Supabase Projects

For a more complete separation, consider creating two separate Supabase projects:

1. A development project configured for localhost
2. A production project configured for your Netlify site

Then use different environment variables for each.
