# NEXUS - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Prerequisites
- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account
- npm or yarn package manager

### Step 2: Backend Setup (Terminal 1)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file with your configuration
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nexus-dashboard
JWT_SECRET=nexus-secret-key-change-in-production
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
EOF

# Start the backend server
npm run dev
# ✅ Backend running at http://localhost:5000
```

### Step 3: Frontend Setup (Terminal 2)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
# ✅ Frontend running at http://localhost:3000
```

### Step 4: Access the Application

1. Open your browser: **http://localhost:3000**
2. You'll be redirected to the login page
3. Click "Register" to create a new account
4. Enter your details and click "Register"
5. You'll be logged in automatically to the dashboard

### Demo Credentials (Optional)

Once backend is seeded with demo data:
```
Email: admin@nexus.com
Password: password123
```

## 📊 Dashboard Overview

After logging in, you'll see:

### Left Sidebar
- **Home**: Main dashboard
- **Inventory**: Manage items and stock
- **Distributes**: Distribution management
- **Users**: User management
- **Reporting**: Analytics & reports
- **Support**: Support center
- **Settings**: System settings

### Dashboard Stats
- **Weekly Sale**: Sales statistics with trend
- **Red Stock**: Low stock items count
- **No of New Users**: New user registrations
- **7-Day Analytics**: Line chart showing trends

### Features Available
1. **View Inventory**: See all inventory items
2. **Add Items**: Create new inventory entries
3. **Manage Users**: View and delete users
4. **View Statistics**: Real-time dashboard data
5. **Logout**: Securely logout from the app

## 🔧 API Testing

### Test Auth Endpoints
```bash
# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Response Example
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "6572a3f4c5e1d8b9a2f3e4d5",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "staff"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 📁 Project Structure

```
nexus-dashboard/
├── backend/
│   ├── src/
│   │   ├── controllers/      # API handlers
│   │   ├── routes/           # API routes
│   │   ├── models/           # MongoDB schemas
│   │   ├── services/         # Business logic
│   │   ├── middlewares/      # Auth, CORS
│   │   └── config/           # Database, JWT
│   ├── server.js             # Entry point
│   ├── package.json
│   ├── .env                  # Your config (not in git)
│   └── .env.example          # Config template
│
├── frontend/
│   ├── app/
│   │   ├── dashboard/        # Main dashboard
│   │   ├── inventory/        # Inventory page
│   │   ├── users/            # Users page
│   │   ├── login/            # Login page
│   │   └── page.tsx          # Root page
│   ├── components/           # UI components
│   ├── services/             # API calls
│   ├── store/                # Zustand store
│   ├── styles/               # CSS
│   ├── package.json
│   ├── .env.local            # Your config
│   └── .env.example          # Config template
│
└── README.md                 # Full documentation
```

## 🔐 Security Tips

1. **Change JWT_SECRET** in production
2. **Use HTTPS** in production
3. **Enable database authentication**
4. **Use environment variables** for sensitive data
5. **Keep dependencies updated**: `npm update`
6. **Validate all inputs** on backend

## 🐛 Common Issues & Solutions

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env
- Verify connection string format

### "CORS error" in frontend
- Check CORS_ORIGIN in backend .env
- Should match frontend URL (http://localhost:3000)

### "Cannot GET /api/..."
- Backend server not running
- Check if running on correct port (5000)
- Verify API URL in frontend (.env.local)

### "Token expired"
- Re-login to get new token
- Tokens expire after 7 days
- Check JWT_SECRET is same in all requests

## 📚 Next Steps

1. **Customize the UI**: Modify components in `frontend/components/`
2. **Add more features**: Create new API endpoints in `backend/src/routes/`
3. **Database models**: Extend models in `backend/src/models/`
4. **Styling**: Edit Tailwind config and CSS in `frontend/styles/`
5. **Deploy**: Follow deployment guides in main README.md

## 🎓 Learning Resources

- Next.js: https://nextjs.org/docs
- Express.js: https://expressjs.com/
- MongoDB: https://docs.mongodb.com/
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs/

## ✨ Pro Tips

- Use VS Code with ESLint extension
- Install MongoDB Compass for DB visualization
- Use Postman for API testing
- Enable TypeScript strict mode for better code
- Set up Git hooks with Husky for code quality

## 🚀 Production Checklist

Before deploying:
- [ ] Change JWT_SECRET to secure value
- [ ] Update MONGODB_URI to production database
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Set up error logging
- [ ] Configure proper CORS origins
- [ ] Test all API endpoints
- [ ] Run security audit: `npm audit`

---

**Happy Building! 🎉**

For issues or questions, refer to the main README.md or create an issue in the repository.
