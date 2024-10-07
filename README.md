# PrimeLifeFit Backend API

This is the backend API for an PrimeLifeFit application built with Express.js and TypeScript. It provides endpoints for user authentication, product management, and order processing.

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [API Endpoints](#api-endpoints)
4. [Middleware](#middleware)
5. [Getting Started](#getting-started)
6. [Technologies Used](#technologies-used)
7. [Contributing](#contributing)
8. [License](#license)

## Features

- User authentication (signup, login)
- Role-based authorization (admin, user)
- Product management (CRUD operations)
- Order management
- Input validation using Zod schemas
- Middleware for request validation and authorization

## Project Structure

The project follows a modular structure:

```
\BACKEND\SRC
|   app.ts
|   server.ts
|
\---app
    +---config
    |       index.ts
    |
    +---errors
    |       AppError.ts
    |       handleCastError.ts
    |       handleDuplicateError.ts
    |       handleValidationError.ts
    |       handleZodError.ts
    |
    +---interface
    |       error.ts
    |       index.d.ts
    |
    +---middlewares
    |       authorization.ts
    |       globalErrorHandler.ts
    |       notFoundRouteHandler.ts
    |       validateRequess.ts
    |
    +---modules
    |   +---auth
    |   |       auth.controller.ts
    |   |       auth.interface.ts
    |   |       auth.model.ts
    |   |       auth.route.ts
    |   |       auth.service.ts
    |   |       auth.utils.ts
    |   |       auth.validation.ts
    |   |
    |   +---order
    |   |       order.controller.ts
    |   |       order.interface.ts
    |   |       order.model.ts
    |   |       order.route.ts
    |   |       order.service.ts
    |   |       order.validation.ts
    |   |
    |   \---product
    |           product.controller.ts
    |           product.interface.ts
    |           product.model.ts
    |           product.route.ts
    |           product.service.ts
    |           product.utils.ts
    |           product.validation.ts
    |
    +---routes
    |       index.ts
    |
    \---utils
            catchAsync.ts
            noDataFoundResponse.ts
            sendResponse.ts
```

## API Endpoints

### Auth Routes

- POST /auth/signup - User registration
- POST /auth/login - User login
- GET /auth/users - Get all users (admin only)
- PATCH /auth/users/:userId/role - Update user role (admin only)

### Product Routes

- POST /products/create - Create a new product (admin only)
- GET /products - Get all products
- GET /products/:id - Get a single product
- PATCH /products/:id - Update a product (admin only)
- DELETE /products/:id - Delete a product (admin only)

### Order Routes

- POST /orders/create - Create a new order (admin and user)
- GET /orders - Get all orders (admin only)
- GET /orders/:id - Get a single order (admin only)
- PATCH /orders/:id - Update an order (admin only)

## Middleware

- `validateRequest`: Validates incoming request data using Zod schemas
- `authorization`: Checks user roles for protected routes

## Getting Started

1. Clone the repository
   git clone `https://github.com/the-pujon/PrimeLifeFit-backend.git`
   cd `PrimeLifeFit-backend`

2. Install dependencies
   `npm install`

3. Set up environment variables
   Create a `.env` file in the root directory and add the following variables:

   ````PORT=50000
   MONGODB_URI=your_mongodb_connection_string
   JWT_ACCESS_SECRET=your_jwt_secret
   NODE_ENV=development
   BCRYPT_SALT_ROUNDS=your_salt_rounds```

   ````

4. Run the development server
   `npm run start:dev`

## Technologies Used

- Express.js
- TypeScript
- MongoDB
- Mongoose
- Zod (for validation)
- JSON Web Tokens (for authentication)
