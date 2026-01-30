# Database Connection Troubleshooting Guide

## Problem Detected
❌ MongoDB is not running on `localhost:27017`
❌ Backend cannot connect to database
❌ API endpoints will fail without database

---

## Solution: Setup MongoDB

### **Option 1: MongoDB Atlas (Easiest - Recommended)**

This is cloud-hosted MongoDB with no local installation needed.

#### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"**
3. Sign up with email/Google account
4. Verify email

#### Step 2: Create Database Cluster
1. Click **"Create Cluster"**
2. Select **"Free Shared Cluster"** (M0)
3. Choose your region
4. Click **"Create Deployment"**

#### Step 3: Get Connection String
1. Click **"Connect"**
2. Click **"Drivers"**
3. Select **Node.js** driver
4. Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/nexus-dashboard?retryWrites=true&w=majority`

#### Step 4: Update Backend .env
Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/nexus-dashboard?retryWrites=true&w=majority
JWT_SECRET=nexus-secret-key-change-in-production
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

Replace:
- `username` with your MongoDB username
- `password` with your MongoDB password
- Keep `nexus-dashboard` as database name

#### Step 5: Restart Backend
```bash
cd backend
npm run dev
```

✅ Your backend will now connect to MongoDB Atlas!

---

### **Option 2: Local MongoDB (Windows)**

If you prefer local MongoDB:

#### Step 1: Download MongoDB
1. Download MongoDB Community: https://www.mongodb.com/try/download/community
2. Choose **Windows** version
3. Select **MSI Installer**
4. Run the installer
5. Follow the setup wizard
6. Choose **"Install MongoDB as a Service"**

#### Step 2: Verify Installation
```powershell
# Check if MongoDB service is running
Get-Service MongoDB | Select-Object Status, DisplayName
```

#### Step 3: Start MongoDB
```powershell
# If service is stopped, start it
Start-Service MongoDB
```

#### Step 4: Verify Connection
```powershell
# MongoDB should be listening on port 27017
netstat -ano | findstr :27017
```

#### Step 5: Backend .env (Keep As Is)
Your `backend/.env` already has the local MongoDB connection:
```env
MONGODB_URI=mongodb://localhost:27017/nexus-dashboard
```

No changes needed! Just restart backend:
```bash
cd backend
npm run dev
```

---

### **Option 3: Docker MongoDB (If Docker Installed)**

```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Backend .env stays the same
# MONGODB_URI=mongodb://localhost:27017/nexus-dashboard
```

---

## Quick Connection Test

### Test Backend Connection
```bash
# After backend is running, test:
$headers = @{"Content-Type"="application/json"}
Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
  -Method POST -Headers $headers `
  -Body '{"email":"test@test.com","password":"test"}'
```

✅ If you get a JSON response (even with "Invalid credentials"), MongoDB is connected!

---

## Full Startup Sequence

### 1. Start MongoDB (Choose One)
**Local:**
```bash
# Windows
net start MongoDB
# or
Start-Service MongoDB
```

**Cloud:**
- Use MongoDB Atlas (no start needed)

**Docker:**
```bash
docker start mongodb
```

### 2. Start Backend
```bash
cd backend
npm run dev
# Should show: "MongoDB Connected: localhost"
# or "MongoDB Connected: cluster0.xxxxx"
```

### 3. Start Frontend
```bash
cd frontend
npm run dev
# Should show: "Ready in X.Xs"
```

### 4. Access Application
- Open: http://localhost:3000
- Register or login
- ✅ You're connected!

---

## Verify Everything is Working

```bash
# Test 1: MongoDB running?
netstat -ano | findstr :27017
# Should show: LISTENING

# Test 2: Backend running?
netstat -ano | findstr :5000
# Should show: LISTENING

# Test 3: Frontend running?
netstat -ano | findstr :3000
# Should show: LISTENING

# Test 4: Can reach backend API?
$headers = @{"Content-Type"="application/json"}
$response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
  -Method POST -Headers $headers `
  -Body '{"email":"test@test.com","password":"test"}' `
  -ErrorAction SilentlyContinue
$response.StatusCode
# Should show: 200 or 401 (not connection error)
```

---

## Troubleshooting Checklist

| Issue | Check | Solution |
|-------|-------|----------|
| Can't connect to MongoDB | Is MongoDB running? | Start MongoDB service or container |
| Port 27017 not listening | Run netstat command | Restart MongoDB |
| Backend won't start | Check MongoDB connection | Verify MONGODB_URI in .env |
| API returns 500 error | Check backend logs | Restart backend after DB starts |
| Frontend can't reach API | CORS configured? | Check .env CORS_ORIGIN |
| Database already exists? | Check Atlas/Local | Can seed demo data with `npm run seed` |

---

## What Should You See

### Backend Logs (Successful Connection)
```
[nodemon] starting `node server.js`
Server is running on port 5000
MongoDB Connected: localhost
✅ Ready for API requests
```

### Frontend Console
```
▲ Next.js 14.2.35
  - Local:        http://localhost:3000
  ✓ Ready in 4.8s
✅ Ready for user access
```

### Browser (Login Page)
```
NEXUS Dashboard
Register | Login
✅ Can create account and login
```

---

## Recommended: MongoDB Atlas Setup

**Why?** 
- No local installation needed
- Always available (cloud)
- Free tier is generous (512MB storage)
- Easy to upgrade later
- Perfect for development

**Quick Setup Time:** 5-10 minutes

---

## Next Steps

1. **Choose database option** (Atlas recommended for easiest setup)
2. **Setup MongoDB** using appropriate option
3. **Update backend/.env** with correct MONGODB_URI
4. **Restart backend**: `npm run dev`
5. **Test connection**: Try login API call
6. **Start frontend**: `npm run dev`
7. **Visit**: http://localhost:3000

Your NEXUS Dashboard will then be fully operational! 🚀

---

**Questions?** Check the ERRORS_RESOLVED.md or START_HERE.md files for more guidance.
