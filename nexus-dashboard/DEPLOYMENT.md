# NEXUS - Deployment Guide

## 🌐 Deployment Overview

This guide covers deploying both frontend and backend to production.

## 🚀 Frontend Deployment (Vercel - Recommended)

### Step 1: Prepare Frontend
```bash
cd frontend

# Build the application
npm run build

# Test production build locally
npm start
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: GitHub Integration
1. Push code to GitHub
2. Go to vercel.com
3. Connect your GitHub repository
4. Vercel auto-deploys on push

### Step 3: Configure Environment Variables

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_URL=https://your-backend-url.com/api`
3. Redeploy

## 🖥️ Backend Deployment (Heroku)

### Step 1: Prepare Backend
```bash
cd backend

# Create Procfile
echo "web: node server.js" > Procfile

# Create .gitignore (if not present)
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore
```

### Step 2: Deploy to Heroku

#### Option A: Using Heroku CLI
```bash
# Install Heroku CLI
npm i -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your-strong-secret
heroku config:set CORS_ORIGIN=https://your-frontend-url.com

# Deploy
git push heroku main
```

#### Option B: Deploy from Dashboard
1. Go to heroku.com
2. Create new app
3. Connect GitHub repository
4. Enable auto-deploy
5. Add environment variables in settings

### Step 3: MongoDB Production Database

#### Using MongoDB Atlas (Recommended)
1. Go to mongodb.com/atlas
2. Create account
3. Create free cluster
4. Get connection string
5. Add to Heroku: `heroku config:set MONGODB_URI=mongodb+srv://...`

## 🛠️ Alternative Deployment Options

### Frontend Alternatives

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

#### AWS Amplify
```bash
# Install AWS CLI
npm i -g @aws-amplify/cli

# Configure
amplify configure

# Deploy
amplify publish
```

### Backend Alternatives

#### Railway.app
```bash
# Install Railway CLI
npm i -g railway

# Login
railway login

# Deploy
railway up
```

#### DigitalOcean App Platform
1. Go to digitalocean.com
2. Create new app
3. Connect GitHub
4. Configure buildpack for Node.js
5. Set environment variables
6. Deploy

#### AWS Lambda + API Gateway
1. Package backend for Lambda
2. Create API Gateway
3. Configure Lambda functions
4. Set environment variables
5. Deploy

## 📋 Production Checklist

### Before Deployment
- [ ] Update `JWT_SECRET` to a strong, random string
- [ ] Use production MongoDB URL (Atlas)
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS everywhere
- [ ] Configure CORS with exact frontend URL
- [ ] Test all API endpoints
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Remove console.log statements
- [ ] Add proper error logging
- [ ] Set up monitoring/alerting

### Environment Variables Checklist

#### Backend (.env)
```
PORT=process.env.PORT (for auto-detection)
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-strong-random-secret-min-32-chars
JWT_EXPIRE=7d
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

#### Frontend (.env.production)
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

## 🔒 Security Hardening

### 1. Environment Variables
```bash
# Never commit .env files
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore

# Use secret management for sensitive data
```

### 2. HTTPS/SSL
```bash
# Ensure all URLs use HTTPS
CORS_ORIGIN=https://...
```

### 3. Password Hashing
```javascript
// Ensure bcryptjs is used (already configured)
const salt = await bcryptjs.genSalt(10);
const hashedPassword = await bcryptjs.hash(password, salt);
```

### 4. Rate Limiting (Optional)
```bash
# Install express-rate-limit
npm install express-rate-limit

# Add to backend/server.js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 5. CORS Configuration
```javascript
// Only allow specific origins
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));
```

## 📊 Monitoring & Logging

### Heroku Logs
```bash
# View logs
heroku logs --tail

# View error logs
heroku logs --tail --source app
```

### MongoDB Atlas Monitoring
1. Go to Atlas dashboard
2. Check metrics for queries
3. Monitor cluster performance
4. Set up alerts

### Vercel Analytics
1. Go to Vercel dashboard
2. View real-time metrics
3. Check core web vitals
4. Monitor deployment health

## 🔄 Continuous Deployment

### GitHub Actions (Automated Testing + Deployment)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm install
      
      - name: Run linter
        run: npm run lint
      
      - name: Build
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 📈 Scaling Guidelines

### Frontend Scaling
- Vercel handles auto-scaling
- Configure caching headers
- Use CDN for static assets
- Optimize images

### Backend Scaling
- Use connection pooling
- Implement caching (Redis)
- Add load balancer
- Use read replicas for MongoDB
- Implement database indexing

## 🆘 Troubleshooting

### Heroku App Won't Start
```bash
# Check logs
heroku logs --tail

# Check procfile exists
cat Procfile

# Ensure server.js doesn't use hardcoded port
const PORT = process.env.PORT || 5000;
```

### CORS Errors in Production
- Check CORS_ORIGIN matches frontend URL exactly
- Ensure HTTPS if frontend uses HTTPS
- Verify backend is accessible from frontend

### MongoDB Connection Issues
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure credentials are correct
- Test locally first

### Frontend Can't Reach Backend
- Check NEXT_PUBLIC_API_URL
- Verify backend is running
- Check CORS configuration
- Test with curl from browser console

## 📚 Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Heroku Deployment Docs](https://devcenter.heroku.com/)
- [MongoDB Atlas Guide](https://docs.mongodb.com/atlas/)
- [Next.js Production Checklist](https://nextjs.org/docs/going-to-production)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

## 🎯 Post-Deployment

### Monitor & Maintain
1. Set up error tracking (Sentry)
2. Monitor performance (New Relic, DataDog)
3. Track analytics (Google Analytics)
4. Schedule regular backups
5. Update dependencies monthly

### User Communication
1. Announce production URL
2. Provide demo credentials
3. Share documentation
4. Set up support channels
5. Collect feedback

---

**You're ready to go live! 🚀**
