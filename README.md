# Forex Landing Page

A modern landing page for forex trading services with a React frontend and Node.js backend.

## Project Structure

```
forex-landing/
├── frontend/           # React frontend application
│   ├── src/           # Source files
│   ├── public/        # Public assets
│   └── package.json   # Frontend dependencies
├── backend/           # Node.js backend application
│   ├── src/          # Source files
│   └── package.json  # Backend dependencies
└── package.json      # Root package.json for project management
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd forex-landing
```

2. Install dependencies for both frontend and backend:
```bash
npm run install:all
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the variables with your values

4. Start the development servers:
```bash
# Start both frontend and backend
npm run dev

# Start frontend only
npm run dev:frontend

# Start backend only
npm run dev:backend
```

## Available Scripts

- `npm run install:all` - Install dependencies for frontend and backend
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend
- `npm run start` - Start both frontend and backend in production mode

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_ENVIRONMENT=development
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/forex_landing
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## Features

- Modern UI with Tailwind CSS
- Real-time market data
- Contact form with validation
- MongoDB database integration
- Secure API endpoints
- Responsive design

## Deployment

### Frontend
1. Build the frontend:
```bash
npm run build:frontend
```
2. Deploy the `frontend/dist` directory to your hosting service

### Backend
1. Build the backend:
```bash
npm run build:backend
```
2. Deploy the `backend/dist` directory to your hosting service

## Security Features

- CORS protection
- Rate limiting
- Input validation
- MongoDB sanitization
- Secure headers with Helmet.js
- Environment variable protection

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License. 