// setup-auth-config.js
// A simple script to help configure authentication settings

/**
 * This script helps you manage different authentication configurations
 * between development and production environments.
 * 
 * Usage:
 * 1. For local development:
 *    node setup-auth-config.js development
 * 
 * 2. For production:
 *    node setup-auth-config.js production
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the environment from command line arguments
const env = process.argv[2] || 'development';

// Configuration templates
const configs = {
  development: {
    siteUrl: 'http://localhost:3000',
    redirectInfo: `
===============================================
DEVELOPMENT CONFIGURATION SET
===============================================
Your Supabase dashboard should have:
- Site URL: http://localhost:3000

Your Google OAuth settings should include:
- Redirect URI: http://localhost:3000/confirm

Now run your dev server with:
npm run dev
===============================================
`
  },
  production: {
    siteUrl: 'https://kintails.netlify.app', // Changed to the actual Netlify URL
    redirectInfo: `
===============================================
PRODUCTION CONFIGURATION SET
===============================================
Your Supabase dashboard should have:
- Site URL: https://kintails.netlify.app

Your Google OAuth settings should include:
- Redirect URI: https://kintails.netlify.app/confirm

Now deploy to Netlify:
git push
===============================================
`
  }
};

// Make sure the environment is valid
if (!configs[env]) {
  console.error(`Error: Unknown environment "${env}". Use "development" or "production".`);
  process.exit(1);
}

console.log(`Setting up authentication configuration for ${env}...`);

// Instructions for manual configuration
console.log(configs[env].redirectInfo);

// Create a note in the project directory about the current configuration
fs.writeFileSync(
  path.join(__dirname, 'AUTH_CONFIG.md'),
  `# Current Authentication Configuration\n\nEnvironment: ${env}\nSite URL: ${configs[env].siteUrl}\n\n${configs[env].redirectInfo}`
);

console.log('Created AUTH_CONFIG.md with instructions');
console.log('Configuration complete!'); 