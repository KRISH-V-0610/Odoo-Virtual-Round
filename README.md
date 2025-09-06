# Odoo Virtual Round — Full‑Stack Marketplace

Modern web marketplace built with a React + Vite + Tailwind frontend and a Node.js + Express + MongoDB backend. It supports user authentication, product listings, cart, and checkout flows, designed with clean APIs and a responsive UI.

---

## Overview

- Frontend: React 19, React Router, Tailwind CSS 4, Vite.
- Backend: Express, Mongoose (MongoDB), JWT auth with httpOnly cookies, Cloudinary-ready media support.
- Features: Signup/Login, profile management, product CRUD, category filtering, search, cart, and order checkout.

---

## Tech Stack

- UI: React, React Router, Tailwind CSS, React Icons
- State: Zustand
- Build: Vite
- API: Express, CORS, Cookie Parser, Body Parser
- DB: MongoDB via Mongoose
- Auth: JWT (httpOnly cookie)
- Media: Cloudinary (optional; for image hosting)

---

## Monorepo Structure

- `Odoo-Virtual-Round/frontend` — React app (Vite)
- `Odoo-Virtual-Round/backend` — Express API server

Key entry points:
- Backend server: `Odoo-Virtual-Round/backend/server.js`
- DB init: `Odoo-Virtual-Round/backend/lib/db.js`
- Axios base URL: `Odoo-Virtual-Round/frontend/src/api/axiosInstance.js`

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Optional: Cloudinary account (if you want image uploads hosted)

### 1) Clone and Install

```bash
cd Odoo-Virtual-Round/backend
npm install

cd ../frontend
npm install
```

### 2) Configure Environment

Backend env (create `Odoo-Virtual-Round/backend/.env` if missing):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/odoo_vr
JWT_SECRET=super-secret-string
JWT_EXPIRES_IN=30d
JWT_COOKIE_EXPIRES_IN=30
NODE_ENV=development

# Optional if using Cloudinary for images
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Frontend API base URL lives in `Odoo-Virtual-Round/frontend/src/api/axiosInstance.js`. By default it targets `http://localhost:5000/api`. If you change backend `PORT`, update this value accordingly.

### 3) Run Dev Servers

- Backend:

```bash
cd Odoo-Virtual-Round/backend
npm start
# Health check: http://localhost:5000/api/health
```

- Frontend:

```bash
cd Odoo-Virtual-Round/frontend
npm run dev
# Vite dev server (default): http://localhost:5173
```

---

## Features

- Auth: Register/Login, secure httpOnly cookie, protected routes
- Products: Create, read, update, delete, search, and filter by category
- Cart: Add, update quantity, remove, persistent per user
- Orders: Checkout converts items to an order and marks products as sold
- Profiles: View and update user profile, see listings and purchases
- API Health: `GET /api/health`

---

## API Summary

Base URL: `http://localhost:<PORT>/api`

- Auth (`/auth`)
  - `POST /register` — Create account
  - `POST /login` — Login (sets `jwt` cookie)
  - `POST /protected-logout` — Logout (requires auth)

- Users (`/users`, protected)
  - `GET /profile` — Get user profile
  - `PUT /profile` — Update user profile
  - `GET /listings` — User’s product listings
  - `GET /purchases` — User’s orders

- Products (`/products`)
  - `GET /` — List products (supports `search`, `sort`)
  - `GET /category/:category` — Filter by category
  - `GET /:id` — Get one product
  - `POST /` — Create product (protected)
  - `PUT /:id` — Update product (protected; owner only)
  - `DELETE /:id` — Delete product (protected; owner only)

- Cart (`/cart`, protected)
  - `GET /` — Get current user cart
  - `POST /add` — Add item `{ productId, quantity }`
  - `PUT /update/:productId` — Update quantity
  - `DELETE /remove/:productId` — Remove item

- Orders (`/orders`, protected)
  - `POST /checkout` — Create order from cart
  - `GET /` — List user orders
  - `GET /:id` — Get single order

Notes:
- Auth uses httpOnly cookies; include credentials in client requests.
- CORS is configured for `http://localhost:5173` in `server.js`.

---

## Frontend Highlights

- Pages: Landing, Product, Cart, Profile, My Listings, My Purchases, Auth (Login/Signup)
- Components: Header, Footer, SearchBar, Category cards, Product cards, Mobile/User menus, Sustainability section
- State: Lightweight store in `src/Store/authStore.js`
- Styling: Tailwind CSS 4 via `@tailwindcss/vite`

---

## Data Models (Brief)

- User: `username`, `email`, `password (hashed)`, `profilePicture`, `listings[]`, `purchases[]`
- Product: belongs to seller, has `title`, `description`, `category`, `price`, `images[]`, `status: available|sold`
- Cart: one per user, `items[]` containing `{ product, quantity }`
- Order: `user`, `items[]` with `{ product, quantity, priceAtPurchase }`, `totalAmount`, `status`

---

## Troubleshooting

- 401 Unauthorized: Ensure you’re logged in and cookies are allowed; `withCredentials` is enabled in Axios.
- CORS errors: The backend CORS origin is `http://localhost:5173`. Keep frontend on that origin or adjust CORS in `backend/server.js`.
- Port mismatch: Frontend Axios points to `http://localhost:5000/api`. Either set `PORT=5000` in backend `.env` or change `frontend/src/api/axiosInstance.js`.
- MongoDB connection: Verify `MONGO_URI` is valid and Mongo is running.

---

## Production Notes

- Use secure cookies: set `NODE_ENV=production` to set `cookieOptions.secure=true`.
- Configure CORS to your production domain.
- Serve frontend separately (CDN/host) and deploy backend (e.g., Render, Fly, Railway, Docker + VM).
- Use a managed MongoDB cluster (MongoDB Atlas) and set proper IP access rules.

---

## Roadmap & Future Scope

### Visual Search with Google Lens‑Style Capabilities

- Goal: Let users search products by uploading a photo or using the camera.
- Approach:
  - Client: Add an “Image Search” entry point that accepts images.
  - Backend: Multi‑step pipeline
    - Image preprocessing and object/feature extraction (e.g., CLIP, MobileNet, or Vision API).
    - Vector embedding and similarity search against product image embeddings (use a vector DB such as Pinecone/FAISS/Weaviate).
    - Re‑rank results using category/price filters and popularity.
  - Optional: Integrate Google Cloud Vision (labels, web entities) to boost recall.

### Agentic Shopping Assistant (Personalized, Goal‑Oriented)

- Goal: An AI copilot that understands user intents (budget, category, condition), negotiates constraints, and curates products.
- Skills:
  - Conversational retrieval over product catalog + user profile (listings, purchases, favorites).
  - Tool use: call search, filter, and sort APIs; add to cart; compare items.
  - Multi‑turn memory: keep preferences and constraints in session storage or a lightweight vector memory.
- Architecture:
  - Orchestrator (LangChain/LangGraph) with tools bound to product/cart/order endpoints.
  - RAG over product metadata + embeddings for semantic search.
  - Safety: bounded tools, server‑side rate limiting, strict schema validation.
- UI:
  - Chat dock on product and listing pages.
  - One‑click “Explain why recommended” transparency and controllable preferences.

### Additional Enhancements

- Payments: Integrate Stripe checkout and webhooks.
- Media: Cloudinary upload widget + transformations (resize/compress, placeholder blur).
- Observability: Request logging, tracing, and metrics (pino + OpenTelemetry).
- Access control: Role support for admins/moderators.
- Performance: Server‑side pagination, query indexes, CDN caching for images.

---

## Contributing

- Create an issue for any feature/bug.
- Use conventional commits where possible.
- Keep PRs focused and small; include before/after notes or screenshots.

---

## License

This project is provided as‑is for educational and demonstration purposes. Add a license if you plan to distribute or commercialize.

