# VebeKino — Mindful Commerce Platform

**VebeKino** is a revolutionary e-commerce platform designed to combat impulse buying and promote intentional consumerism. Unlike traditional shops that use "dark patterns" to rush your purchase, VebeKino introduces a **cooling-off period** and a **cognitive justification system** to ensure you only buy what you truly need.

## 🚀 Live Demo
- **Frontend:** [https://vebe-kino.netlify.app/](https://vebe-kino.netlify.app/)
- **Backend:** [https://vebekino.onrender.com/](https://vebekino.onrender.com/)

---

## ✨ Key Features

### 🛡️ The Anti-Impulse System
- **Mindful Waitlist (Cooling-off Period):** When you "buy" an item, it doesn't go straight to checkout. It enters a 24-48 hour waitlist to let your initial impulse fade.
- **Cognitive Justification:** After the wait period, you must write a justification explaining why you need the item.
- **AI Sentiment Analysis:** The system analyzes your justification to check if you're still being impulsive or making a rational decision.
- **Social Accountability:** Share your potential purchase with friends to get feedback and "unlock" the final checkout step.

### 👤 User Experience
- **Smart Auth:** Secure Login and Registration with **OTP (One-Time Password)** verification.
- **Dynamic Dashboard:** Real-time tracking of your purchase journey, waitlist status, and order history.
- **Product Catalog:** A minimalist, premium shopping experience with curated products.
- **Stripe Integration:** Seamless and secure payment processing for final purchases.

### 🛠️ Admin Capabilities
- **Platform Analytics:** Real-time statistics on total users, sales, revenue, and product performance.
- **User Management:** Full control over user roles (Admin/Member) and account management.
- **Global Settings:** Configure platform-wide "Lock Hours" and system parameters.

---

## 💻 Tech Stack

- **Frontend:** React 19, Vite, TailwindCSS, DaisyUI, Lucide React, React Router 7.
- **Backend:** Node.js, Express, MongoDB (Mongoose).
- **Payments:** Stripe API.
- **Deployment:** Render (Backend), Netlify (Frontend).

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- Stripe Account (for API keys)

### 1. Clone the Repository
```bash
git clone https://github.com/didarulshahriar37/VebeKino.git
cd VebeKino
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` folder:
```env
VITE_API_URL=http://localhost:3000
```

---

## 🚀 Running Locally

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd frontend
npm run dev
```
Your app will be running at `http://localhost:5173`.

---

## 📜 License
This project was built for the **FRICTION — Hackathon** by **Didarul Shahriar**, **Ashfaque Sadad**, **Zahin Uddin Nirob** and **Tiran Abdullah**.
