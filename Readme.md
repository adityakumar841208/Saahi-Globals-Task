# Saahi Globals Task

This is a full-stack web application for managing categories, subcategories, and products.

## Project Structure

- **backend/**: Node.js, Express, and MongoDB API
  - Controllers, Models, and Routes for categories, subcategories, and products
  - Main files: `server.js`, `dbConnection.js`
- **client/**: React frontend (Vite + Tailwind CSS)
  - Components and Forms for UI and CRUD operations

## Getting Started

### Backend
1. Navigate to the `backend` folder:
   ```powershell
   cd backend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the server:
   ```powershell
   npm start
   ```

### Frontend
1. Navigate to the `client` folder:
   ```powershell
   cd client
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```

## Features
- Admin login for protected access
- Manage categories, subcategories, and products
- Edit and update product details
- Responsive UI with React and Tailwind CSS

---

> Make sure MongoDB is running locally or update the connection string in `backend/dbConnection.js`.
