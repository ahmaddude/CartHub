# CartHub — Full-Stack MERN E-Commerce

A full-stack e-commerce platform built with the MERN stack. Features user authentication (email verification via Brevo), product management, Stripe payments, Supabase image storage, role-based access (buyer/seller), and a responsive UI.

**Live:** [https://store-3lt8.onrender.com](https://store-3lt8.onrender.com)

---

## Tech Stack

**Frontend:** React 19, Vite 6, React Router 7, Tailwind CSS 4, Zustand, Framer Motion, Lucide React

**Backend:** Node.js, Express 4, MongoDB + Mongoose 8, JWT, bcryptjs, Stripe 18, Supabase, Brevo API

---

## Features

- Signup/Login with email verification & password reset
- Role management (buyer / seller)
- Browse products by category, search products
- Shopping cart with quantity management
- Stripe payment integration
- Order tracking (Pending → Shipped → Delivered → Cancelled)
- Profile management with avatar upload to Supabase
- Seller product CRUD
- Responsive design

---

## Directory Structure

```
STORE/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Route logic
│   │   ├── db/            # MongoDB connection
│   │   ├── middleware/    # JWT verification
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Mailer, Supabase upload, JWT helpers
│   │   ├── index.js       # Express entry point
│   │   └── seed.js        # Database seeder
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # navbar, productCard, Input, etc.
│   │   ├── pages/         # All route pages
│   │   ├── store/         # Zustand stores
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── package.json           # Root build/start scripts
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas URI
- Stripe account (test keys)
- Supabase account
- Brevo account

### Install

```bash
git clone https://github.com/ahmaddude/Store.git
cd STORE

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### Environment Variables

Create `backend/.env`:

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `BREVO_API_KEY` | Brevo transactional email API key |
| `STRIPE_SK` | Stripe secret key |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous key |
| `CLIENT_URL` | Frontend URL for CORS (production) |
| `NODE_ENV` | `development` or `production` |

### Run (Development)

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

### Seed Database

```bash
cd backend && npm run seed
```

Creates 7 test users (password: `password123`), 5 categories, 17 products.

---

## Scripts

| Script | Location | Description |
|---|---|---|
| `npm run dev` | `backend/` | Start backend with nodemon |
| `npm run seed` | `backend/` | Seed database |
| `npm run dev` | `frontend/` | Start Vite dev server |
| `npm run build` | Root | Install deps + build frontend |
| `npm start` | Root | Start production server |

---

## Deployment

Deployed on **Render**. Build command: `npm run build`. Start command: `npm start`. All env vars must be set in the platform dashboard. The Express server serves the built frontend from `frontend/dist/` in production.

---

## API Routes

All prefixed with `/api/auth`. Key endpoints:

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/signup` | — | Register |
| POST | `/login` | — | Login |
| POST | `/verify-email` | — | Verify email code |
| POST | `/forgot-password` | — | Send reset email |
| POST | `/reset-password/:token` | — | Reset password |
| GET | `/check-auth` | Yes | Auth status |
| PUT | `/update-profile` | Yes | Update profile |
| GET | `/products` | — | List products |
| POST | `/create-product` | Yes | Create product |
| GET | `/view-cart` | Yes | View cart |
| POST | `/add-to-cart` | Yes | Add to cart |
| POST | `/create-order` | Yes | Place order |
| POST | `/create-payment` | Yes | Stripe payment intent |
| GET | `/categories` | — | List categories |
