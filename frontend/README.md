# Inventory Management System

This is an Inventory Management System built with Next.js, React, and TypeScript.

## Branches

This repository has two branches:

1. **main** - Full-stack version with backend API integration
2. **local-storage** - Frontend-only version using localStorage (current branch)

### Switching Branches

To switch between branches, use:

```bash
# For the full-stack version with backend
git checkout main

# For the frontend-only version with localStorage
git checkout local-storage
```

## Features

- User authentication (login/signup) using local storage
- Inventory management (add, update, delete items)
- Dashboard with inventory statistics
- Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Demo Account

You can use the following demo account to log in:

- Username: demo
- Password: password123

## How It Works (local-storage branch)

This version of the application uses local storage to store data instead of a backend API. All data is stored in the browser's local storage, which means:

1. Data persists between browser sessions
2. Data is not shared between different browsers or devices
3. Clearing browser data will delete all stored information

## Implementation Details

- **main branch**: Uses a backend API for data storage and authentication
- **local-storage branch**:
  - Authentication is simulated using local storage
  - Inventory items are stored in local storage with a unique key for each user
  - API calls have been replaced with local storage operations
  - Network delays are simulated to provide a realistic experience

## Development

This project is built with:

- Next.js
- React
- TypeScript
- Tailwind CSS

## License

This project is licensed under the MIT License.
