# OctoFit Tracker - Multi-Tier Application

A modern multi-tier web application built with React 19, Express, and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite
│   └── Port: 5173
└── backend/           # Node.js + Express + TypeScript + Mongoose
    └── Port: 8000
```

## Database

- **MongoDB**: Runs on port 27017
- **Connection String**: `mongodb://localhost:27017/octofit`

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally)

### Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### Backend Setup

```bash
cd octofit-tracker/backend
npm install
npm run dev
```

Backend will be available at: `http://localhost:8000`

### Production Build

#### Frontend
```bash
cd octofit-tracker/frontend
npm run build
npm run preview
```

#### Backend
```bash
cd octofit-tracker/backend
npm run build
npm start
```

## Configuration

### Frontend Environment Variables
Copy `.env.example` to `.env.local`:
```bash
VITE_API_URL=http://localhost:8000
```

### Backend Environment Variables
Copy `.env.example` to `.env`:
```bash
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit
NODE_ENV=development
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linter
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

## Technologies

### Frontend
- React 19
- Vite
- Oxlint

### Backend
- Node.js
- Express
- TypeScript
- Mongoose (MongoDB ODM)

---

**Happy coding! 🚀**
