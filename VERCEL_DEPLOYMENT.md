# Vercel Deployment Instructions

## What I Fixed

The 404 error was occurring because:
1. The app wasn't configured for Vercel's deployment structure
2. The client was hardcoded to use `localhost:8083` in production
3. No routing configuration existed for the full-stack app

## Changes Made

### 1. Created `vercel.json`
- Configured both client (React) and server (Node.js) builds
- Set up proper routing to handle API requests and static files
- API routes go to `/api/books/*` and `/books/*`
- All other routes serve the React app

### 2. Updated `client/src/service/api.js`
- Changed hardcoded URL to use environment variable
- Uses `/api` in production, `localhost:8083` in development

### 3. Created Environment Files
- `.env.production` - Uses `/api` for production
- `.env.development` - Uses `http://localhost:8083` for local dev

### 4. Updated `server/index.js`
- Added `/api/books` route alongside `/books` for Vercel compatibility

### 5. Updated `client/package.json`
- Added `vercel-build` script
- Added proxy configuration for local development

## How to Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from the root directory
vercel

# For production deployment
vercel --prod
```

## Important Notes

1. **Root Directory**: Make sure you deploy from the project root, NOT from the client or server folders
2. **Environment Variables**: The `.env.production` file sets `REACT_APP_API_URL=/api` automatically
3. **Build Output**: 
   - Client builds to `client/build`
   - Server uses `server/index.js` as the serverless function

## Testing Locally

To test locally before deploying:

```bash
# Terminal 1 - Start the server
cd server
npm install
npm start

# Terminal 2 - Start the client
cd client
npm install
npm start
```

The app will run on `http://localhost:3000` with the backend on `http://localhost:8083`.

## Troubleshooting

If you still see errors after deployment:

1. **Check Build Logs**: Look at Vercel's build logs for any errors
2. **Clear Cache**: In Vercel dashboard, go to Settings → Clear Build Cache
3. **Redeploy**: Try redeploying after clearing cache
4. **Check Routes**: Make sure all API calls in your frontend use `/api/books` or just `URL` variable from api.js

## Project Structure After Changes

```
bookmanagementsystem-main/
├── vercel.json                      # Vercel configuration
├── client/
│   ├── .env.development            # Local development env
│   ├── .env.production             # Production env (uses /api)
│   ├── package.json                # Added vercel-build script
│   └── src/
│       └── service/
│           └── api.js              # Updated to use env variables
└── server/
    └── index.js                    # Updated with /api/books route
```

## Next Steps

1. Commit all changes to your repository:
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push
   ```

2. Deploy to Vercel using either method above

3. Your app should now work at your Vercel URL!
