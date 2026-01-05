# FindMyProperty - w2153120

A modern property search application built with React and Vite. Search for properties, filter by various criteria, and save your favourites.

## Features

- Search and filter properties by type, price, bedrooms, location, and date
- Save favourite properties for easy access
- Responsive design that works on all devices
- Fast performance with Vite and React

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **pnpm** (package manager) - Install it globally if you don't have it:
  ```bash
  npm install -g pnpm
  ```

## Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd findmyproperty
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Running the Project

### Development Server

To start the development server with hot module replacement:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

Open your browser and navigate to the URL shown in the terminal.

### Build for Production

To create a production build:

```bash
pnpm build
```

The optimized production files will be created in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
pnpm preview
```

## Testing

This project uses **Vitest** and **React Testing Library** for testing.

### Run Tests

To run all tests:

```bash
pnpm test
```

This will run tests in watch mode by default. Press `q` to quit.

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and development server
- **React Testing Library** - Testing utilities
- **Lucide React** - Icon library
