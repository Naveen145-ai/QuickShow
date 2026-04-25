# QuickShow - Movie & Show Booking Platform

A full-stack web application for booking movie and show tickets with an admin dashboard for management.

## 🚀 Features

- **User Authentication**: Secure login and signup system
- **Show Management**: Browse and filter movies/shows with ratings and timings
- **Ticket Booking**: Easy ticket reservation and booking system
- **Favorites**: Save favorite shows for quick access
- **360° Videos**: Immersive video content experience
- **Admin Dashboard**: Comprehensive management panel for shows, bookings, and 360° videos
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Cloudinary Integration**: Image and media management

## 🛠️ Tech Stack

**Frontend**: React 19, Vite, Tailwind CSS, React Router 7  
**Admin Panel**: React 19, Vite, React Router 6  
**Backend**: Node.js, Express 5, MongoDB, Mongoose  
**Cloud Services**: Cloudinary for image/video hosting  
**Email**: Nodemailer for notifications  

## 📁 Project Structure

```
QuickShow/
├── frontend/      # User-facing React application
├── admin/         # Admin dashboard for management
└── backend/       # Express API server
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+) and npm
- MongoDB database
- Cloudinary account

### Backend Setup
```bash
cd backend
npm install
# Add .env file with PORT, MONGODB_URI, CLOUDINARY credentials
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Admin Setup
```bash
cd admin
npm install
npm run dev
```

## 📦 Dependencies

**Backend**: Express, Mongoose, Cloudinary, CORS, Multer, Nodemailer  
**Frontend/Admin**: React Router, Tailwind CSS, Lucide React icons  

## 🔗 API Routes

- `/api/auth` - Authentication endpoints
- `/api/shows` - Show management
- `/api/bookings` - Ticket bookings
- `/api/videos360` - 360° video management
- `/api/favourites` - Favorite management

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm start` - Start backend server

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

## 📄 License

ISC License

## 👤 Author

Naveen145-ai
