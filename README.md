# Quiz Application

A full-stack Quiz Web Application built with React, Node.js, Express, and MongoDB.

## Features
- User registration (Username & Topic selection)
- Quiz interface with multiple choice questions
- Image-based questions (Science topic)
- Real-time score calculation
- Result submission to MongoDB
- Admin Dashboard with sorting and review capabilities

## Tech Stack
- **Frontend**: React (Vite), CSS
- **Backend**: Node.js, Express, MongoDB (Mongoose)

## Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB Atlas connection string (or local MongoDB)

### 2. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - The `.env` file is pre-configured with a placeholder MongoDB URI.
   - Update `MONGO_URI` in `.env` with your actual connection string.
4. Start the server:
   ```bash
   node server.js
   ```
   Server runs on `http://localhost:5000`.

### 3. Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Client runs on `http://localhost:5173`.

## Usage
1. Open `http://localhost:5173` in your browser.
2. Enter a username and select a topic to start the quiz.
3. To access the Admin Dashboard, click "Admin Login" on the homepage.
   - **Email**: `admin@example.com`
   - **Password**: `admin`
