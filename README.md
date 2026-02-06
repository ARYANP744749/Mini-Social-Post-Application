# Mini Social Post App (3W Internship Assignment)

A full-stack mini social feed application where users can sign up, log in, create posts (text/image), view a public feed, like posts, and comment — inspired by the TaskPlanet Social Page.

---

## 🚀 Features

### ✅ Authentication
- User Signup
- User Login
- JWT-based authentication
- Protected routes for posting, liking, and commenting

### ✅ Social Feed
- Public feed showing all posts from all users
- Displays:
  - Username
  - Post text
  - Post image (if available)
  - Likes count
  - Comments count

### ✅ Post Actions
- Create post with **text, image, or both**
- Like/unlike posts
- Add comments on posts
- Comment and like updates reflect instantly

---

## 🛠 Tech Stack

### Frontend
- React.js
- CSS (custom styling)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

---

## 📂 Project Structure

root/
├── frontend/
└── backend/

## Backend Setup

1) cd backend
2) npm install
3) create file- .emv
4)Add this to .env -
  PORT=5000
  MONGO_URI=your_mongodb_atlas_connection_string
  JWT_SECRET=your_secret_key
5) start backend - npm start

## Frontend Setup
1) cd frontend
2) npm install
3) npm start

## API Endpoints (Backend)
1) Auth-
POST /auth/signup → Signup
POST /auth/login → Login

2) Posts-
GET /posts → Get all posts
POST /posts → Create post (Protected)
PUT /posts/:id/like → Like/Unlike (Protected)
POST /posts/:id/comment → Add comment (Protected)

