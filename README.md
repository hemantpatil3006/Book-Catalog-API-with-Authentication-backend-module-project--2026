# Backend Module Project - Book Catalog API

A professional, secure, and modular backend API for managing a book catalog. Built with Node.js, Express, and MongoDB, following industry best practices for security, modularity, and error handling.

## 🚀 Features

- **Standardized API Responses**: Consistent `{ success, message, data }` format for all endpoints.
- **Robust Authentication**: JWT-based authentication for protecting sensitive operations.
- **Secure Password Storage**: Industry-standard `bcryptjs` hashing for user passwords.
- **Advanced Architecture**: Professional **Route-Controller-Service-Model** layer separation.
- **Input Validation**: Middleware-based validation using `express-validator`.
- **Security & Performance**:
  - Global error handling (hides internal errors in production).
  - Rate limiting to prevent abuse.
  - Environment variable management for sensitive data.
- **Full CRUD Support**: Complete management of Books and User accounts.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Security**: JWT, bcryptjs, express-rate-limit
- **Validation**: express-validator

## 📂 Project Structure

```text
├── src
│   ├── config        # Database configuration
│   ├── controllers   # Request logic handlers
│   ├── services      # Business & Database logic
│   ├── models        # MongoDB Schemas
│   ├── routes        # API endpoints
│   ├── middleware    # Auth & Validation middleware
│   └── utils         # Helper utilities (e.g., response handler)
├── server.js         # Entry point
└── .env              # Environment variables
```

## ⚙️ Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd backend-module-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

4. **Start the server**:
   ```bash
   # Production mode
   npm start

   # Development mode (with nodemon)
   npm run dev
   ```

## 🛤️ API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Auth user & get token

### Book Routes (Protected require Bearer Token)
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get single book details
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update an existing book
- `DELETE /api/books/:id` - Delete a book
