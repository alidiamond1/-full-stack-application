# Inventory Management System

A modern, full-stack inventory management application built with React and Node.js. This application allows you to manage products, track inventory levels, view analytics, and monitor stock status through an intuitive dashboard interface.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/alidiamond1/-full-stack-application)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)](https://www.mysql.com/)

## 📸 Screenshots

### Dashboard Overview
![Dashboard](screenshots/Screenshot%202025-12-07%20204033.png)
*Main dashboard showing inventory statistics, charts, and product table*

### Product Management
![Product Table](screenshots/Screenshot%202025-12-07%20204056.png)
*Product table displaying products with images, prices, quantities, and action buttons for edit/delete operations with real-time search functionality*

### Add/Edit Product Modal
![Add Product](screenshots/Screenshot%202025-12-07%20204113.png)
*Responsive modal for adding or editing products with live image preview and form validation*

### Product Details View
![Product Details](screenshots/Screenshot%202025-12-07%20204135.png)
*Detailed product editing interface showing all product fields with image preview functionality*

## 📋 Project Description

This is a comprehensive inventory management system that provides:

- **Product Management**: Create, read, update, and delete products with detailed information
- **Inventory Tracking**: Monitor stock levels with visual indicators for low stock items
- **Analytics Dashboard**: View inventory statistics and stock level charts
- **Image Support**: Display product images from URLs
- **Search Functionality**: Quickly find products by name or description
- **Real-time Updates**: Instant updates when products are added, modified, or deleted

## ✨ Features

- 🎨 **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- 📊 **Data Visualization**: Interactive charts showing stock levels using Recharts
- 🔍 **Search & Filter**: Real-time product search functionality
- ⚠️ **Low Stock Alerts**: Visual warnings for products with low inventory
- 🖼️ **Image Management**: Support for product images with preview functionality
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library for building interactive user interfaces
- **TypeScript** - Type-safe JavaScript for better code quality and developer experience
- **Vite** - Next-generation frontend build tool for fast development and optimized production builds
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Recharts** - Composable charting library built on React components
- **Axios** - Promise-based HTTP client for API communication
- **Lucide React** - Beautiful, customizable icon library
- **React Router** - Declarative routing for React applications

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework for Node.js
- **Sequelize** - Promise-based ORM for MySQL, providing easy database interactions
- **MySQL** - Reliable, open-source relational database management system
- **CORS** - Middleware for enabling Cross-Origin Resource Sharing

### Why This Tech Stack?

#### Frontend Choices:
- **React + TypeScript**: Provides component reusability, strong typing, and excellent developer experience. React's virtual DOM ensures efficient updates, while TypeScript catches errors at compile-time.
- **Vite**: Chosen over Create React App for its superior performance, faster hot module replacement, and better build times. It uses native ES modules for instant server start.
- **Tailwind CSS**: Enables rapid UI development without writing custom CSS. The utility-first approach makes it easy to create consistent, responsive designs quickly.
- **Recharts**: Selected for its React-native approach, making it easy to integrate charts that respond to data changes seamlessly.

#### Backend Choices:
- **Node.js + Express**: JavaScript on both frontend and backend allows code sharing and a unified development experience. Express provides a minimal, flexible framework.
- **Sequelize ORM**: Simplifies database operations with an object-relational mapping approach. It handles migrations, relationships, and provides type-safe queries.
- **MySQL**: Reliable, widely-used relational database that's perfect for structured inventory data with relationships and transactions.

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/alidiamond1/-full-stack-application.git
cd "-full-stack-application"
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd Backend
npm install
```

### 3. Database Configuration

Create a MySQL database:

```sql
CREATE DATABASE inventory_db;
```

Create a `.env` file in the `Backend` directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=inventory_db
PORT=5000
```

Replace `your_mysql_password` with your actual MySQL root password.

### 4. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../Frontend
npm install
```

## 🏃 Running the Application

### Start the Backend Server

From the `Backend` directory:

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Seed the Database (Optional)

To populate the database with sample data:

```bash
cd Backend
npm run seed
```

### Start the Frontend Development Server

From the `Frontend` directory:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or the next available port)

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
-full-stack-application/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Database configuration
│   │   ├── controllers/
│   │   │   └── productController.js  # Product business logic
│   │   ├── middleware/
│   │   │   └── validation.js        # Request validation
│   │   ├── models/
│   │   │   ├── index.js              # Model exports
│   │   │   └── product.js            # Product model
│   │   ├── routes/
│   │   │   └── products.js           # Product API routes
│   │   ├── server.js                  # Server entry point
│   │   └── seed.js                   # Database seeder
│   ├── package.json
│   └── .env                          # Environment variables (create this)
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard/
    │   │   │   ├── ProductTable.tsx      # Product table component
    │   │   │   └── InventoryCharts.tsx  # Charts component
    │   │   └── ProductModal/
    │   │       └── ProductModal.tsx      # Add/Edit product modal
    │   ├── pages/
    │   │   └── Dashboard.tsx              # Main dashboard page
    │   ├── services/
    │   │   └── api.ts                     # API service layer
    │   ├── types/
    │   │   └── Product.ts                 # TypeScript type definitions
    │   ├── App.tsx                        # Root component
    │   ├── main.tsx                       # Application entry point
    │   └── index.css                      # Global styles
    ├── package.json
    └── vite.config.ts                     # Vite configuration
```

## 🔌 API Endpoints

The backend provides the following RESTful API endpoints:

- `GET /products` - Get all products
- `POST /products` - Create a new product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

## 🎯 Usage

1. **View Products**: The dashboard displays all products in a table with images, prices, quantities, and descriptions.

2. **Add Product**: Click the "Add Product" button, fill in the form (including an optional image URL), and click "Create Product".

3. **Edit Product**: Click the edit icon (pencil) next to any product to modify its details.

4. **Delete Product**: Click the delete icon (trash) next to any product and confirm the deletion.

5. **Search Products**: Use the search bar to filter products by name or description.

6. **Monitor Inventory**: 
   - View statistics in the dashboard cards
   - Check the stock levels chart
   - Products with low stock (< 5 units) are highlighted in red

### Environment Variables

Make sure to set up your `.env` file in the Backend directory with the correct database credentials.

## 📝 Notes

- The application uses MySQL as the database. Make sure MySQL is running before starting the backend server.
- Product images are loaded from URLs. Ensure image URLs are publicly accessible.
- The database tables are automatically created/synced when the backend server starts (using Sequelize's `sync` method).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 🔗 Repository

**GitHub Repository**: [https://github.com/alidiamond1/-full-stack-application](https://github.com/alidiamond1/-full-stack-application)



**Happy Coding! Ali Nor Abdulle🚀**

