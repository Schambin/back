# Backend - Authentication and User Management API

This repository contains the backend API built with Node.js, Express, Prisma, and MongoDB. It provides user authentication, registration, and user management functionalities.

## Features

- User registration with email and password encryption.
- User authentication using JWT (JSON Web Token).
- Private routes protected with JWT middleware.
- Fetch a list of registered users (only accessible for authenticated users).

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **Prisma**: ORM for database management (MongoDB).
- **MongoDB**: NoSQL database.
- **JWT**: JSON Web Token for user authentication.
- **Bcrypt**: Library to hash and compare passwords.

## Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/yourusername/backend-repo.git

   ```

2. Navigate to the project directory:

   ```bash
    cd backend-repo

   ```

3. Install dependencies:

   ```bash
    npm install

   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```bash
    DATABASE_URL=your_mongodb_connection_string
    JWT_SECRET_KEY=your_jwt_secret_key

   ```

5. Run the application:

   ```bash
    npm start
   ```

The server will start on `http://localhost:3333`

## API Endpoints

### Public Routes

**POST** `/register`: Register a new user.

**POST** `/signin`: Authenticate a user and get a JWT token.

### Private Routes (Require JWT)

**GET** `/p/list-users`: Fetch a list of all registered users.

## License

**This project is licensed under the MIT License.**
