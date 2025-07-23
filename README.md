# Zemco 🍽️

A full-stack food delivery and restaurant booking platform inspired by Zomato. Built with Next.js (React), Node.js, Express, and MongoDB. Features include authentication, restaurant listings, menu management, reviews, image uploads, and more.

---

## 🚀 Features
- **User Authentication** (JWT-based signup/login)
- **Restaurant Listings** with search, filter, and pagination
- **Restaurant Profiles** with menus, reviews, and ratings
- **Menu Management** (add/edit dishes, admin/owner features)
- **Review System** (leave/read reviews, average ratings)
- **Image Uploads** (Cloudinary integration)
- **Responsive UI** (mobile-friendly, modern design)
- **Protected Routes** (role-based access)

---

## 🛠️ Tech Stack
- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Cloud Storage:** Cloudinary
- **Deployment:** Vercel (frontend), Render(backend), MongoDB Atlas

---

## 📦 Project Structure
```
zomato-clone/
  ├── backend/        # Express API
  └── frontend/       # Next.js app
```

---

## 💻 Screenshots

### Home Page

![Home](https://drive.google.com/uc?export=view&id=10PS5qDTyPYLZGP7_TdCkLSKVU876Qwfq)

### Restaurants Page

![Restaurants](https://drive.google.com/uc?export=view&id=1Oa3tv2DPJvhQBmjoMEdMhDs4WuR8381F)
#### -- Dark Theme
![darkRestaurnats](https://drive.google.com/uc?export=view&id=1zq7gC2ZQbeKdMc0nS5SZsCA-wn7wtJYP)

### Single Restaurant Page

![Image](https://drive.google.com/uc?export=view&id=1QsAaVp4T6RfYXKUdqA0ZTXaiSdnHtS2p)


---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Sakib008/zemco
cd zomato-clone
```

### 2. Backend Setup
```bash
cd backend
npm install
```

#### Create a `.env` file in `backend/` with:
```
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Start Backend
```bash
npm start
# or
node index.js
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

#### Create a `.env.local` file in `frontend/` with:
```
NEXT_PUBLIC_API_URL=your_backend_url
```

#### Start Frontend
```bash
npm run dev
```

---


- Built with ❤️ using MERN stack and Next.js 