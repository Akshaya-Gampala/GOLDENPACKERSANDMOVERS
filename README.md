# Golden Packers and Movers - Full-Stack Web Application

A complete, modern, attractive, and responsive full-stack business website for **Golden Packers and Movers**, engineered to convert website visitors into customers. Built with **React, Vite, Node.js, Express, MongoDB Atlas, and Tailwind CSS**.

---

## 🌟 Key Features

- **Bright & Premium Aesthetic**: Clean white background design with warm gold accents, royal navy contrasts, subtle glassmorphic elements, and smooth micro-animations.
- **Dynamic Business Configuration**: Single central configuration file (`client/src/config/business.js`) to easily edit phone numbers, email, physical address, business hours, hero counters, FAQs, and social links.
- **Quote Request Engine**: Full-featured quotation form saving requests directly to **MongoDB Atlas** under the `quoteRequests` collection with default `"New"` status.
- **Work Experience Photo Gallery**: Modern filterable gallery with Lightbox modal preview. Supports categories like *Packing, Loading, Transportation, Unloading, House Shifting, Office Shifting, Vehicle Moving, Completed Projects*.
- **Secure Admin Portal & Dashboard**: Protected by JWT authentication and bcrypt password hashing. Allows admins to:
  - View summary analytics (Total Enquiries, New Requests, Completed Moves, Total Gallery Photos).
  - Update quote request status (`New`, `Contacted`, `In Progress`, `Completed`, `Cancelled`) and delete quotes.
  - View & delete customer contact messages.
  - Upload new work experience photos via local file upload (Multer) or image URLs.
- **SEO & Performance Optimized**: Semantic HTML5 tags, dynamic page titles, Open Graph tags, `robots.txt`, `sitemap.xml`, and fast Vite bundling.
- **Floating Contact Actions**: Sticky WhatsApp and direct phone call buttons.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, JavaScript (ES6+), Tailwind CSS, Lucide Icons, React Router DOM v6
- **Backend**: Node.js, Express.js, Mongoose, Multer, bcryptjs, JSON Web Tokens (JWT), CORS, dotenv
- **Database**: MongoDB Atlas Free Cluster (Collection names: `admins`, `quoteRequests`, `galleryItems`, `contactMessages`)

---

## 📁 Project Architecture

```
GOLDENPACKERSANDMOVERS/
├── package.json                   # Master scripts
├── .env.example                   # Master environment template
├── README.md                      # Documentation
├── client/                        # React + Vite Frontend
│   ├── public/
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── config/
│   │   │   └── business.js        # Central editable business details
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Admin JWT auth context
│   │   ├── services/
│   │   │   └── api.js             # Axios API client
│   │   ├── components/            # Navbar, Footer, FloatingContact, SEO, ServiceCard, LightboxModal, ProtectedRoute
│   │   ├── pages/                 # Home, About, Services, WhyChooseUs, Gallery, Contact, GetQuote, FAQ, AdminLogin, AdminDashboard
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css              # Custom Tailwind CSS rules
│   └── package.json
└── server/                        # Node.js + Express Backend
    ├── config/
    │   └── db.js                  # Mongoose MongoDB connection
    ├── models/                    # Admin, QuoteRequest, GalleryItem, ContactMessage
    ├── middleware/                # authMiddleware, uploadMiddleware
    ├── controllers/               # authController, quoteController, galleryController, contactController
    ├── routes/                    # authRoutes, quoteRoutes, galleryRoutes, contactRoutes
    ├── utils/
    │   └── seed.js                # Initial admin & gallery seed script
    ├── uploads/                   # Local storage for work experience photos
    ├── server.js                  # Express API server
    └── package.json
```

---

## 🗄️ MongoDB Atlas Setup Guide

To connect the application to your free **MongoDB Atlas** cluster:

1. **Create MongoDB Atlas Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. **Deploy a Free Cluster**: Choose the **M0 Free Cluster** tier in your preferred cloud region.
3. **Create Database User**:
   - Go to **Security > Database Access**.
   - Click **Add New Database User**.
   - Set Authentication Method to **Password**.
   - Enter a Username (e.g. `golden_admin`) and a strong Password.
   - Assign user role: **Read and write to any database**.
4. **Configure Network Access**:
   - Go to **Security > Network Access**.
   - Click **Add IP Address**.
   - Choose **Allow Access from Anywhere** (`0.0.0.0/0`) or add your specific server IP address.
5. **Get Connection String**:
   - Go to **Database > Clusters**.
   - Click **Connect** on your cluster.
   - Select **Drivers** (Node.js).
   - Copy the connection string:
     ```env
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/golden_packers?retryWrites=true&w=majority
     ```
6. **Set Environment Variable**:
   - Open `server/.env` and replace `MONGODB_URI` with your copied Atlas connection string (remember to replace `<username>` and `<password>` with your actual database user credentials).

---

## 🔑 Admin Setup & Default Login Credentials

Initial admin credentials are automatically created when the server starts or when you run the seed command.

### Default Login Credentials:
- **Admin Portal URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@goldenpackers.com`
- **Password**: `GoldenPackers@2026`

### How to Change Admin Password:
1. Edit `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env`.
2. Run the seed script:
   ```bash
   cd server
   npm run seed
   ```

---

## 📸 Uploading Real Work Experience Photographs

As business owner/admin, you can upload actual photographs of your packing, loading, transit, and unloading work:

1. Log into the **Admin Dashboard** (`/admin/dashboard`).
2. Click on the **Manage Work Photos** tab.
3. Click **+ Add Work Photo**.
4. Select a category (e.g., *Packing, Loading, Transportation, House Shifting, Office Shifting, Vehicle Moving*).
5. Choose a local photo from your device using the file selector, or paste an external image URL.
6. Click **Save Work Photo**. The new image will instantly appear on the public **Work Experience Gallery** page.

---

## ⚙️ Environment Variables (`server/.env`)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | Express server port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/golden_packers` | MongoDB Atlas URI string |
| `JWT_SECRET` | `golden_packers_movers_super_secret_jwt_key_2026` | Secret key for JWT signing |
| `ADMIN_EMAIL` | `admin@goldenpackers.com` | Initial admin email |
| `ADMIN_PASSWORD` | `GoldenPackers@2026` | Initial admin password |

---

## 🚀 Running the Application Locally

### Step 1: Install Dependencies
From the root directory, run:
```bash
npm run setup
```
*(Or install manually inside both `client/` and `server/` using `npm install`)*

### Step 2: Seed Database (Optional)
Populate initial admin account and sample gallery items:
```bash
npm run seed
```

### Step 3: Start Development Servers

**Option A (Terminal 1 - Backend Server)**:
```bash
npm run dev:server
```
*Backend runs at `http://localhost:5000`*

**Option B (Terminal 2 - Frontend Client)**:
```bash
npm run dev:client
```
*Frontend runs at `http://localhost:5173`*

---

## 🚢 Deployment Guide

### 1. Frontend (Vercel / Netlify)
- Build command: `cd client && npm run build`
- Build Output Directory: `client/dist`
- Configure redirect rules for single-page React apps (`/* -> /index.html`).

### 2. Backend (Render / Railway / Heroku)
- Environment: Node.js
- Build Command: `cd server && npm install`
- Start Command: `cd server && node server.js`
- Set Environment Variables: `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLIENT_URL`.

---

© 2026 Golden Packers and Movers. All rights reserved.
