# Deployment Guide

Complete instructions for deploying Executive Edge to production.

## Architecture Overview

```
┌─────────────────────────────────────┐
│   Frontend (React + Vite)           │
│   Hosted on: Vercel/Netlify/AWS     │
│   Static files + SPAs                │
└────────────┬────────────────────────┘
             │ HTTPS API calls
             ↓
┌─────────────────────────────────────┐
│  Backend (Express)                  │
│  Hosted on: Railway/Heroku/AWS      │
│  Secure API endpoints                │
└────────────┬────────────────────────┘
             │ HTTPS calls
             ↓
┌─────────────────────────────────────┐
│  OpenAI APIs (GPT-4, Whisper)       │
│  API Key: Protected server-side      │
└─────────────────────────────────────┘
```

## Backend Deployment

### Option 1: Railway (Recommended - Easiest)

Railway auto-deploys on git push and has excellent Node.js support.

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository
   - Choose "Attach your Git repo"

3. **Set Environment Variables**
   - In Railway dashboard: Project Settings → Variables
   - Add `OPENAI_API_KEY=sk-your-actual-key`
   - Add `PORT=3001` (optional, Railway assigns automatically)

4. **Configure Start Script**
   - Railway auto-detects Node.js
   - Verify it runs: `npm start` from `server/` directory
   - Create `Procfile` in root if needed:
     ```
     worker: cd server && npm start
     ```

5. **Deploy**
   - Push changes to main branch: `git push origin main`
   - Railway auto-deploys
   - Get your API URL from Railway dashboard (e.g., `https://executive-edge-api.up.railway.app`)

6. **Update Frontend**
   - Set frontend environment variable:
     ```
     VITE_API_BASE_URL=https://executive-edge-api.up.railway.app
     ```
   - Redeploy frontend

### Option 2: Heroku

Heroku has generous free tier but requires buildpacks setup.

1. **Install Heroku CLI**
   ```bash
   brew install heroku  # macOS
   # or download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create your-executive-api
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set OPENAI_API_KEY=sk-your-actual-key
   heroku config:set NODE_ENV=production
   ```

5. **Configure Buildpack**
   ```bash
   heroku buildpacks:add heroku/nodejs
   ```

6. **Create Procfile** in root directory:
   ```
   worker: cd server && npm start
   ```

7. **Deploy**
   ```bash
   git push heroku main
   ```

8. **Get URL**
   ```bash
   heroku apps:info
   # Your API URL: https://your-executive-api.herokuapp.com
   ```

### Option 3: AWS (Advanced)

Using AWS Elastic Beanstalk or EC2.

**Using Elastic Beanstalk:**

1. **Install EB CLI**
   ```bash
   pip install awsebcli --upgrade --user
   ```

2. **Initialize**
   ```bash
   eb init -p node.js-18 executive-edge-api --region us-east-1
   ```

3. **Create Environment**
   ```bash
   eb create production --instance-type t3.micro
   ```

4. **Set Environment Variables**
   ```bash
   eb setenv OPENAI_API_KEY=sk-your-actual-key
   ```

5. **Deploy**
   ```bash
   eb deploy
   ```

6. **Get URL**
   ```bash
   eb open  # Gets your Elastic Beanstalk URL
   ```

### Option 4: Docker + Any Host

1. **Create `server/Dockerfile`**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY server/package*.json ./
   RUN npm ci --only=production
   COPY server .
   EXPOSE 3001
   CMD ["npm", "start"]
   ```

2. **Build & Test Locally**
   ```bash
   docker build -t executive-api .
   docker run -e OPENAI_API_KEY=sk-xxx -p 3001:3001 executive-api
   ```

3. **Push to Registry** (Docker Hub, ECR, etc.)
   ```bash
   docker tag executive-api your-registry/executive-api:latest
   docker push your-registry/executive-api:latest
   ```

4. **Deploy to Any Container Platform**
   - Google Cloud Run
   - Azure Container Instances
   - DigitalOcean App Platform
   - Any Kubernetes cluster

## Frontend Deployment

### Option 1: Vercel (Recommended)

Vercel is optimized for Next.js and React, with instant deployments.

1. **Connect Repository**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure**
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

3. **Environment Variables**
   - In project settings → Environment Variables
   - Add: `VITE_API_BASE_URL=https://your-backend-url.com`
   - Add: `VITE_APP_NAME=Executive Edge`

4. **Deploy**
   - Vercel auto-deploys on push to main
   - Get your frontend URL (e.g., `https://executive-edge.vercel.app`)

### Option 2: Netlify

Simple drag-and-drop alternative to Vercel.

1. **Connect Repository**
   - Visit [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose your repository

2. **Configure**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables:
     ```
     VITE_API_BASE_URL=https://your-backend-url.com
     VITE_APP_NAME=Executive Edge
     ```

3. **Deploy**
   - Netlify auto-deploys on push
   - Custom domain: Site settings → Domain management

### Option 3: GitHub Pages

Free static hosting (but no environment variables support).

1. **Update `vite.config.js`**
   ```javascript
   export default {
     base: '/executive-edge/',  // if repos is executive-edge
     // ... rest of config
   }
   ```

2. **Create Deploy Script**
   ```bash
   npm run build
   cd dist
   git add .
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix dist origin gh-pages
   ```

3. **Configure Repo**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages`

### Option 4: AWS S3 + CloudFront

For advanced caching and CDN distribution.

1. **Build**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://executive-edge-app
   ```

3. **Upload Build**
   ```bash
   aws s3 sync dist/ s3://executive-edge-app/
   ```

4. **Create CloudFront Distribution**
   - Origin: S3 bucket
   - Origin access: Regular
   - SSL certificate: AWS Certificate Manager

5. **Point Domain**
   - Route53 or your registrar
   - A record → CloudFront distribution

## Post-Deployment Checklist

### Security
- [ ] OpenAI API key not exposed anywhere
- [ ] Backend `.env` file not in git
- [ ] Environment variables set correctly
- [ ] HTTPS enforced everywhere
- [ ] CORS configured for your domain only

### Performance
- [ ] Frontend build is minified (check file sizes)
- [ ] Backend API response times < 5s
- [ ] CDN caching configured
- [ ] Database indexes are optimal (if using DB)

### Monitoring
- [ ] Error logging enabled
- [ ] API rate limiting configured
- [ ] Usage monitoring set up
- [ ] Uptime monitoring configured
- [ ] Backend health check tested

### Domain & SSL
- [ ] Custom domain configured
- [ ] SSL certificate valid
- [ ] Redirects from old URLs (if migrating)
- [ ] DNS records updated

### Testing
- [ ] Record audio and test transcription
- [ ] Test tone transformation
- [ ] Test in dark mode
- [ ] Test on mobile devices
- [ ] Test error handling (invalid API key, etc.)

## Environment Variables Checklist

### Frontend (in {hosting-platform})
```
VITE_API_BASE_URL=https://your-backend-url.com
VITE_APP_NAME=Executive Edge
```

### Backend (in {hosting-platform})
```
OPENAI_API_KEY=sk-proj-xxxxxx...
PORT=3001  # Optional, some platforms auto-assign
NODE_ENV=production
```

## Scaling Considerations

### For 1K-10K Users
- Current setup sufficient
- Monitor API quotas with OpenAI

### For 10K-100K Users
- Add database for user data (MongoDB, PostgreSQL)
- Implement user authentication
- Add rate limiting per user
- Cache common transformations

### For 100K+ Users
- Distribute API calls across multiple workers
- Implement queue system (Bull, RabbitMQ)
- Add reverse proxy/load balancer
- Use CDN for frontend assets
- Consider OpenAI Enterprise plan

## Troubleshooting Deployments

### Backend won't start
```bash
# Check logs
heroku logs --tail  # if using Heroku
# or check your platform's logs interface

# Common issues:
# - Missing OPENAI_API_KEY environment variable
# - PORT not available
# - Node.js version mismatch
```

### Frontend can't reach backend
- Verify `VITE_API_BASE_URL` is correct
- Check CORS settings in backend
- Verify backend is actually running
- Check browser network tab for CORS errors

### OpenAI API errors
- Verify API key is valid
- Check account has usage quota
- Review rate limits on your account
- Check OpenAI status page

### Build fails on host
- Ensure Node.js version ≥ 18
- Delete `node_modules` and reinstall
- Check enough disk space available
- Review build logs for specific errors

## Rollback Procedure

### Vercel
- Select deployment → "Promote to Production"
- Or use git: push previous commit

### Heroku
```bash
heroku releases
heroku releases:rollback v123
```

### Railway
- Select previous deployment → Deploy

## Continuous Integration/Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm install
      
      - name: Build frontend
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod'
      
      - name: Deploy backend to Railway
        if: success()
        # Add your Railway deployment steps
```

## Support

Need help? Check:
- Frontend logs: Browser DevTools (F12) → Console
- Backend logs: SSH into server or platform logs
- OpenAI status: https://status.openai.com
- This repo's issues: https://github.com/bp28203/ExecPulse/issues
