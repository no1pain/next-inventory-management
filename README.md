# Next.js Inventory Management System

A modern, full-stack inventory management system built with Next.js, Express, and MongoDB. This application provides a robust solution for managing inventory, tracking sales, and handling user authentication.

## Features

- 🔐 User Authentication (Login/Register)
- 📊 Dashboard with Sales Overview
- 📦 Inventory Management
- 🛍️ Order Management
- 👥 Supplier Management
- 📈 Reports Generation
- ⚙️ System Settings

## Tech Stack

### Frontend

- Next.js 14
- TypeScript
- Tailwind CSS for styling
- React Icons
- Axios for API calls
- Yup for form validation

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

## Branches

This repository has two branches:

1. **main** - Full-stack version with backend API integration
2. **local-storage** - Frontend-only version using localStorage (no backend required)

### Switching Branches

To switch between branches, use:

```bash
# For the full-stack version with backend
git checkout main

# For the frontend-only version with localStorage
git checkout local-storage
```

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd next-inventory-management
```

2. Install Backend Dependencies

```bash
cd backend
npm install
```

3. Configure Backend Environment
   Create a `.env` file in the backend directory with:

```
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=inventory-management
PORT=5001
NODE_ENV=development
```

4. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

5. Configure Frontend Environment
   Create a `.env.local` file in the frontend directory with:

```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Running the Application

1. Start the Backend Server

```bash
cd backend
npm run dev
```

2. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## Project Structure

### Frontend Structure

```
frontend/
├── src/
│   ├── app/          # Next.js app router pages
│   ├── components/   # Reusable React components
│   ├── shared/       # Shared utilities, types, and API
│   └── styles/       # Global styles
├── public/          # Static assets
└── ...config files
```

### Backend Structure

```
backend/
├── routes/          # API route definitions
├── models/          # Mongoose models
├── db/             # Database configuration
└── server.js       # Express app entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
