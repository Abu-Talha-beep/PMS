# NEXUS Dashboard - Start Here 📚

Welcome to the **NEXUS** Inventory & Order Management Dashboard! This document will guide you through the project structure and help you get started quickly.

## 📖 Documentation Index

### Quick References
1. **[QUICKSTART.md](./QUICKSTART.md)** ⚡ - **START HERE!**
   - Get running in 5 minutes
   - Installation steps
   - Demo credentials
   - Common issues

2. **[README.md](./README.md)** 📖 - **Complete Documentation**
   - Full feature overview
   - Architecture explanation
   - API endpoints reference
   - Technology stack details
   - Troubleshooting guide

3. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** 📊 - **Project Overview**
   - What was built
   - File structure breakdown
   - Feature implementation details
   - Statistics and metrics

4. **[DEPLOYMENT.md](./DEPLOYMENT.md)** 🚀 - **Production Deployment**
   - Vercel deployment (frontend)
   - Heroku deployment (backend)
   - Environment configuration
   - Security hardening
   - Monitoring setup

## 🎯 Getting Started (3 Steps)

### 1️⃣ Prerequisites Check
```bash
node --version  # Should be 18+
npm --version   # Should be 8+
```

Need MongoDB? Get it from [mongodb.com](https://www.mongodb.com/)

### 2️⃣ Backend Setup (Terminal 1)
```bash
cd backend
npm install
# Create .env file (use .env.example as template)
npm run dev
```

✅ Backend running at `http://localhost:5000`

### 3️⃣ Frontend Setup (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running at `http://localhost:3000`

## 🗂️ Project Structure

```
nexus-dashboard/
│
├── 📄 README.md                 ← Full documentation
├── 📄 QUICKSTART.md             ← Quick setup guide
├── 📄 PROJECT_SUMMARY.md        ← Project overview
├── 📄 DEPLOYMENT.md             ← Production guide
│
├── 📂 backend/                  ← Node.js Express API
│   ├── src/
│   │   ├── config/              ← Database & JWT
│   │   ├── controllers/         ← API handlers
│   │   ├── routes/              ← API endpoints
│   │   ├── models/              ← MongoDB schemas
│   │   ├── services/            ← Business logic
│   │   └── middlewares/         ← Auth & CORS
│   ├── scripts/
│   │   └── seed.js              ← Demo data
│   ├── server.js                ← Entry point
│   └── package.json
│
└── 📂 frontend/                 ← Next.js 14 App
    ├── app/
    │   ├── dashboard/           ← Main dashboard
    │   ├── inventory/           ← Inventory page
    │   ├── users/               ← Users page
    │   ├── login/               ← Auth page
    │   └── [other pages]/
    ├── components/              ← Reusable UI
    ├── services/                ← API calls
    ├── store/                   ← State (Zustand)
    ├── utils/                   ← Helpers
    ├── styles/                  ← CSS
    └── package.json
```

## 🎨 Main Pages

| Page | URL | Feature |
|------|-----|---------|
| Login | `/login` | Register & Login |
| Dashboard | `/dashboard` | Stats & Charts |
| Inventory | `/inventory` | Manage Items |
| Users | `/users` | Team Management |
| Distributes | `/distributes` | Distribution |
| Reporting | `/reporting` | Analytics |
| Support | `/support` | Help Center |
| Settings | `/settings` | Configuration |

## 🔐 Demo Credentials (After Seeding)

```
Email:    admin@nexus.com
Password: password123
```

To seed demo data:
```bash
cd backend
npm run seed
```

## 📊 API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Current user (protected)

### Inventory
- `GET /api/inventory` - List items
- `POST /api/inventory` - Create item
- `PUT /api/inventory/:id` - Update item
- `DELETE /api/inventory/:id` - Delete item

### Users
- `GET /api/auth/users` - List users (admin)
- `DELETE /api/auth/users/:id` - Delete user (admin)

### Purchase Bills
- `GET /api/bills` - List bills
- `POST /api/bills` - Create bill
- `PUT /api/bills/:id` - Update bill
- `DELETE /api/bills/:id` - Delete bill

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/dashboard/chart-data` - Chart data (7 days)

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 | React framework |
| | TypeScript | Type safety |
| | Tailwind CSS | Styling |
| | Zustand | State management |
| | Recharts | Charts |
| | Axios | HTTP client |
| **Backend** | Express.js | Web framework |
| | MongoDB | Database |
| | Mongoose | ODM |
| | JWT | Authentication |
| | bcryptjs | Password hashing |

## 💡 Key Features

### ✨ Frontend
- Modern SaaS dashboard UI
- Real-time charts & statistics
- Protected routes
- JWT authentication
- Responsive design
- Type-safe with TypeScript

### 🔧 Backend
- RESTful API
- MongoDB integration
- JWT-based auth
- Role-based access control
- Input validation
- Error handling

## 📝 File Descriptions

### Backend Key Files

| File | Purpose |
|------|---------|
| `server.js` | Express app setup |
| `src/config/database.js` | MongoDB connection |
| `src/config/jwt.js` | JWT utilities |
| `src/controllers/*` | API handlers |
| `src/services/*` | Business logic |
| `src/models/*` | Data schemas |
| `src/routes/*` | API endpoints |
| `src/middlewares/auth.js` | Authentication |
| `scripts/seed.js` | Demo data |

### Frontend Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Root page (redirect) |
| `app/layout.tsx` | Root layout |
| `app/login/page.tsx` | Auth pages |
| `app/dashboard/page.tsx` | Main dashboard |
| `app/inventory/page.tsx` | Inventory page |
| `app/users/page.tsx` | Users page |
| `components/*.tsx` | UI components |
| `services/*.ts` | API services |
| `store/*.ts` | State management |
| `styles/globals.css` | Global styles |

## 🚀 Development Commands

### Backend
```bash
npm run dev      # Start with auto-reload
npm start        # Production start
npm run seed     # Seed demo data
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Production server
npm run lint     # Run linter
```

## 🔒 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nexus-dashboard
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## ✅ Verification Checklist

After setup, verify:
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can access `http://localhost:3000`
- [ ] Can register new account
- [ ] Can login
- [ ] Dashboard loads with stats
- [ ] Can view inventory page
- [ ] Can view users page
- [ ] Sidebar navigation works

## 🐛 Common Issues

### "Cannot connect to MongoDB"
→ Ensure MongoDB is running: `mongod`

### "CORS error" in browser console
→ Check CORS_ORIGIN in backend .env

### "Cannot find module" errors
→ Run `npm install` in the respective folder

### "Port 5000/3000 already in use"
→ Change port in .env or kill existing process

## 📚 Learning Path

1. **Read** QUICKSTART.md (5 min)
2. **Run** Backend + Frontend (10 min)
3. **Test** Login/Register (5 min)
4. **Explore** Dashboard pages (10 min)
5. **Read** README.md for details (30 min)
6. **Test** API endpoints (20 min)

## 🎯 Next Steps

### For Beginners
1. Get it running (QUICKSTART.md)
2. Explore the UI
3. Test the API endpoints
4. Read the code comments
5. Try making small changes

### For Developers
1. Review PROJECT_SUMMARY.md
2. Study the API endpoints (README.md)
3. Examine the code structure
4. Add new features
5. Deploy to production (DEPLOYMENT.md)

### For DevOps
1. Review DEPLOYMENT.md
2. Set up CI/CD pipelines
3. Configure monitoring
4. Plan scaling strategy
5. Set up backup procedures

## 🔗 Quick Links

- **GitHub Repo**: [your-repo-url]
- **Vercel Deploy**: [your-vercel-url]
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Heroku Deploy**: https://heroku.com

## 📞 Need Help?

1. Check **QUICKSTART.md** for setup issues
2. Read **README.md** for detailed docs
3. Review **PROJECT_SUMMARY.md** for structure
4. Check **DEPLOYMENT.md** for production
5. Look at code comments in source files

## 🎓 Educational Value

This project teaches:
- ✅ Full-stack development
- ✅ React & Next.js patterns
- ✅ Node.js & Express architecture
- ✅ MongoDB database design
- ✅ JWT authentication
- ✅ RESTful API design
- ✅ TypeScript usage
- ✅ Component composition
- ✅ State management
- ✅ Deployment practices

## 📊 Project Stats

- **50+** Files
- **3000+** Lines of Code
- **25** API Endpoints
- **8** Pages/Routes
- **15+** Components
- **4** Database Models
- **100%** Decoupled Architecture

## ✨ Features Checklist

### Frontend ✅
- [x] Modern UI design
- [x] Responsive layout
- [x] Protected routes
- [x] JWT authentication
- [x] Real-time charts
- [x] Form validation
- [x] Error handling
- [x] State management

### Backend ✅
- [x] RESTful API
- [x] MongoDB integration
- [x] JWT auth
- [x] RBAC
- [x] Input validation
- [x] Error handling
- [x] CORS enabled
- [x] Modular architecture

## 🎉 Ready to Start?

→ Open **[QUICKSTART.md](./QUICKSTART.md)** for the 5-minute setup!

---

**NEXUS Dashboard** - Built for production, designed for scale.

Version 1.0 | Created with ❤️
