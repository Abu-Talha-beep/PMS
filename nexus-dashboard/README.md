# NEXUS - Inventory & Order Management Dashboard

A modern, decoupled SaaS dashboard for inventory and order management built with Next.js 14 and Node.js/Express. This project demonstrates professional architecture with complete separation of frontend and backend, communicating only through REST APIs.

## 🏗️ Project Architecture

### Decoupled Design
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and shadcn/ui
- **Backend**: Node.js + Express REST API with MongoDB
- **Communication**: REST APIs only (no shared business logic)
- **Independent Deployment**: Frontend and backend can be deployed separately

### Project Structure
```
nexus-dashboard/
├── frontend/                 # Next.js 14 Application
│   ├── app/                 # App Router (pages & layouts)
│   ├── components/          # Reusable UI components
│   ├── features/            # Feature-specific components
│   ├── services/            # API service layer
│   ├── store/               # Zustand state management
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Global styles & CSS
│   ├── utils/               # Utility functions
│   └── public/              # Static assets
│
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── routes/          # API routes
│   │   ├── models/          # MongoDB schemas
│   │   ├── services/        # Business logic
│   │   ├── middlewares/     # Express middlewares
│   │   └── config/          # Database & JWT config
│   ├── server.js            # Entry point
│   └── package.json
│
└── README.md
```

## 🚀 Features

### Frontend Features
- ✅ Modern, responsive SaaS dashboard
- ✅ Sidebar navigation with collapsible menu
- ✅ Real-time statistics with charts (Recharts)
- ✅ Protected routes with JWT authentication
- ✅ Login & Registration pages
- ✅ Inventory management
- ✅ User management
- ✅ Dark theme ready
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ shadcn/ui components

### Backend Features
- ✅ RESTful API architecture
- ✅ JWT-based authentication
- ✅ Role-based access control (Admin, Staff)
- ✅ MongoDB with Mongoose ODM
- ✅ CORS enabled for frontend communication
- ✅ Input validation and error handling
- ✅ Async/await with proper error handling
- ✅ Modular service-based architecture

### Dashboard Features
- 📊 Weekly Sales Statistics
- 📈 Red Stock Levels
- 👥 New Users Count
- 📉 7-Day Analytics Chart
- 📦 Inventory Overview
- 🔐 Secure Authentication

## 📋 Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

## 🔧 Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create a `.env` file in the backend folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nexus-dashboard
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 3. Start MongoDB
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
```

### 4. Seed Demo Data (Optional)
```bash
# Add demo data to MongoDB
node scripts/seed.js  # (create this file with demo data)
```

### 5. Start Backend Server
```bash
npm run dev
# Server runs at http://localhost:5000
```

## 🎨 Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
# Frontend runs at http://localhost:3000
```

## 📖 Usage

### Access the Application
1. Open browser: `http://localhost:3000`
2. You'll be redirected to login page
3. Register a new account or use demo credentials

### Demo Credentials
```
Email: admin@nexus.com
Password: password123
```

### Navigation
- **Dashboard**: Main analytics and overview
- **Inventory**: Manage inventory items
- **Users**: Manage team members
- **Distributes**: Distribution management
- **Reporting**: Analytics reports
- **Support**: Support tickets
- **Settings**: System preferences

## 🔐 API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
GET    /api/auth/me            - Get current user (protected)
GET    /api/auth/users         - Get all users (admin only)
PUT    /api/auth/users/:id     - Update user (protected)
DELETE /api/auth/users/:id     - Delete user (admin only)
```

### Inventory
```
GET    /api/inventory          - Get all items
GET    /api/inventory/:id      - Get item details
GET    /api/inventory/stats    - Get inventory statistics
GET    /api/inventory/low-stock - Get low stock items
POST   /api/inventory          - Create item (protected)
PUT    /api/inventory/:id      - Update item (protected)
DELETE /api/inventory/:id      - Delete item (admin only)
```

### Purchase Bills
```
GET    /api/bills              - Get all bills
GET    /api/bills/:id          - Get bill details
GET    /api/bills/stats        - Get bill statistics
POST   /api/bills              - Create bill (protected)
PUT    /api/bills/:id          - Update bill (protected)
DELETE /api/bills/:id          - Delete bill (admin only)
```

### Dashboard
```
GET    /api/dashboard/stats    - Get dashboard statistics (protected)
GET    /api/dashboard/chart-data - Get chart data (protected)
```

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first CSS framework |
| shadcn/ui | High-quality React components |
| Recharts | Charts and visualizations |
| Zustand | Lightweight state management |
| Axios | HTTP client for API calls |
| js-cookie | Cookie management |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| CORS | Cross-origin requests |
| Dotenv | Environment variables |

## 📦 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/staff),
  department: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Inventory
```javascript
{
  itemId: String (unique),
  itemName: String,
  category: String,
  quantity: Number,
  reorderLevel: Number,
  price: Number,
  supplierName: String,
  status: String (in-stock/low-stock/out-of-stock),
  createdAt: Date,
  updatedAt: Date
}
```

### PurchaseBill
```javascript
{
  billNumber: String (unique),
  supplierName: String,
  items: [
    {
      itemId: ObjectId (ref: Inventory),
      quantity: Number,
      unitPrice: Number,
      totalPrice: Number
    }
  ],
  totalAmount: Number,
  billDate: Date,
  dueDate: Date,
  status: String (pending/paid/overdue),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication & Authorization

### JWT Token
- Tokens are stored in cookies (secure)
- Tokens include user ID and role
- Tokens expire after 7 days
- Auto-logout on 401 response

### Role-Based Access Control
- **Admin**: Full access to all resources
- **Staff**: Limited access (can create/update, cannot delete)
- **Public**: Access to login/register only

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1366px)
- Tablet (768px)
- Mobile (320px+)

## 🚀 Production Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
npm start
```

### Backend Deployment (Heroku/Railway/DigitalOcean)
```bash
npm start
```

### Environment Variables (Production)
Update `.env` with production values:
- `MONGODB_URI`: Production MongoDB connection
- `JWT_SECRET`: Strong secret key
- `CORS_ORIGIN`: Production frontend URL

## 🐛 Troubleshooting

### CORS Errors
- Ensure `CORS_ORIGIN` in backend matches frontend URL
- Check CORS middleware is properly configured

### Authentication Issues
- Verify JWT_SECRET is consistent
- Check token expiration and refresh logic

### Database Connection
- Ensure MongoDB is running
- Verify MONGODB_URI connection string
- Check network connectivity

### API Not Responding
- Verify backend server is running on correct port
- Check `NEXT_PUBLIC_API_URL` in frontend

## 📚 API Testing

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Get Dashboard Stats
curl -X GET http://localhost:5000/api/dashboard/stats \
  -H "Authorization: Bearer <token>"
```

### Using Postman
1. Create a new collection
2. Set base URL: `http://localhost:5000/api`
3. Add auth token to headers: `Authorization: Bearer <token>`
4. Test endpoints

## 📄 Scripts

### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

### Backend
```bash
npm run dev      # Development with nodemon
npm start        # Production server
npm test         # Run tests (if configured)
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 💡 Key Design Principles

1. **Separation of Concerns**: Frontend and backend are completely decoupled
2. **RESTful Design**: Standard HTTP methods and status codes
3. **Security First**: JWT authentication, password hashing, input validation
4. **Type Safety**: TypeScript throughout both frontend and backend
5. **Scalability**: Modular architecture ready for growth
6. **Code Quality**: Clean code, proper error handling, logging

## 📞 Support

For support, please create an issue in the repository or contact the development team.

## 🎯 Future Enhancements

- [ ] Real-time notifications with WebSockets
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Bulk import/export functionality
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Two-factor authentication
- [ ] Audit logging
- [ ] API rate limiting
- [ ] Caching layer (Redis)

---

**Built with ❤️ using Next.js and Express.js**
