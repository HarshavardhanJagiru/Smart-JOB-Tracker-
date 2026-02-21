# Smart Job Tracker (Backend)

A RESTful Job Application Tracker built using Node.js, Express, MongoDB, and JWT authentication.

## 🚀 Features

- User Registration
- User Login (JWT Authentication)
- Protected Routes
- Create Job
- Get User-Specific Jobs
- Update Job (Ownership Validation)
- Delete Job
- Job Statistics (Aggregation API)

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (Authentication)
- bcrypt (Password Hashing)

---

## 📡 API Endpoints

### Auth Routes
POST `/api/auth/register`  
POST `/api/auth/login`

### Job Routes (Protected)
POST `/api/jobs`  
GET `/api/jobs`  
PUT `/api/jobs/:id`  
DELETE `/api/jobs/:id`  
GET `/api/jobs/stats`

---

## 🔐 Authentication

All job routes require:

Authorization Header:

Bearer <JWT_TOKEN>

---

## ⚙️ Installation

```bash
git clone https://github.com/YOUR_USERNAME/smart-job-tracker.git
cd smart-job-tracker/server
npm install
npm run dev
