# Contact Management System

A full-stack web application for managing contacts with user authentication.

## Features

### Backend

- JWT-based authentication system
- Complete CRUD operations for contacts
- MongoDB database integration
- User-specific contact management (users can only access their own contacts)
- Input validation and error handling
- Secure password hashing

### Frontend

- User registration and login
- Implemented (`CreateContact` component)
- Implemented (`MyContacts` component)
- Fixed Toast notifications
- Changed localstorage to sessionstorage.

### Backend

- Added crud for contacts
- Added scope in GET calls to only get current user contact data
- Added test cases for contacts
- Used a new JWT-secret

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the server directory with:

   ```
   MONGO_DB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application:

   ```bash
   # Start the backend server (from server directory)
   npm run dev

   # Start the frontend (from client directory)
   npm run dev
   ```

## Testing

The backend includes a test suite for the contacts API. To run the tests:

```bash
cd server
npm test
```

## Room for Enhancements

- Frontend - separate api calls into separate dedicated modules to be reused across the entire app
- Password reset functionality
- Expire JWT token periodically and add implementation for refresh token to create fresh access tokens
-
