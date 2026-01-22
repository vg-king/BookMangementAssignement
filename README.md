# Book Inventory Management System

A modern, full-stack web application for managing a collection of books with CRUD operations, responsive design, and comprehensive data validation.

## Overview

The Book Inventory Management System is a web application built using React that allows users to manage a collection of books efficiently. The application provides a user-friendly interface for performing CRUD (Create, Read, Update, Delete) operations on the inventory of books. It fetches book data dynamically from an API and displays it on the landing page. Users can view details of specific books and perform various management operations.

## Features

### 1. **Landing Page/Home Page**
- Displays a comprehensive overview of the application
- Shows summary statistics of the book collection
- Provides quick access to view all books and add new titles
- Modern hero section with engaging UI design

### 2. **API Integration**
- Fetches book data dynamically from a Node.js Express backend
- RESTful API endpoints for all CRUD operations
- Real-time data synchronization between client and server
- Automatic updates reflect changes across the application

### 3. **Book Details Page**
- Detailed view of individual books
- Displays comprehensive information including:
  - Title and Author
  - Publisher information
  - Contact email for publisher
  - Publication date
  - Number of pages
  - Book synopsis/description

### 4. **Responsive and Interactive Design**
- Fully responsive layout adapting to desktop, tablet, and mobile devices
- Smooth animations and transitions
- Intuitive navigation with sticky header
- Modern glassmorphic design elements
- Smooth scrolling across all pages

### 5. **Data Table Display**
- Organized table view of all books in the inventory
- Columns: Title, Author, Publisher, Pages, Published Date
- Inline action buttons (View, Edit, Delete)
- Responsive table with horizontal scrolling on smaller screens

### 6. **Form Validation**
- Comprehensive input validation on all form fields
- Email validation using regex pattern
- Integer validation for page count
- Required field validation
- Real-time error feedback
- Form fields:
  - Title (required string)
  - Author (required string)
  - Publisher (required string)
  - Contact Email (required email format)
  - Number of Pages (required positive integer)
  - Publication Date (required)
  - Synopsis (required string, minimum 10 characters)

### 7. **CRUD Operations**
- **Create**: Add new books with validated form input
- **Read**: View all books in table format or individual book details
- **Update**: Edit existing book information with pre-populated forms
- **Delete**: Remove books from inventory with confirmation

## Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **React Router DOM 6.11.1** - Client-side routing
- **Axios 1.4.0** - HTTP client for API calls
- **React Icons** - Icon components
- **Animate.css 4.1.1** - Animation library
- **CSS3** - Custom styling with Flexbox and CSS Grid

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.18.2** - Web framework
- **Nodemon 2.0.12** - Development tool
- **CORS** - Cross-origin resource sharing
- **JSON File Storage** - Data persistence

## Project Structure

```
bookmanagementsystem/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar/             # Navigation component
│   │   ├── pages/
│   │   │   ├── Home/               # Landing page
│   │   │   └── Books/              # Book management pages
│   │   │       ├── Books.jsx        # Book list with table
│   │   │       ├── AddBook.jsx      # Create book form
│   │   │       ├── EditBook.jsx     # Update book form
│   │   │       └── BookDetails.jsx  # Book details page
│   │   ├── service/
│   │   │   └── api.js              # API integration
│   │   ├── assets/                 # Images and logos
│   │   ├── App.js                  # Main app component
│   │   └── index.js                # React entry point
│   └── package.json
│
└── server/                          # Express backend
    ├── controllers/
    │   └── booksController.js      # Request handlers
    ├── routes/
    │   └── api/
    │       └── books.js            # API routes
    ├── config/
    │   └── corsOptions.js          # CORS configuration
    ├── model/
    │   └── books.json              # Data storage
    ├── index.js                    # Server entry point
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup
```bash
cd server
npm install
npm start
```
Server runs on: `http://localhost:8083`

### Frontend Setup
```bash
cd client
npm install
npm start
```
Frontend runs on: `http://localhost:3000`

## Usage

1. **View Books**: Navigate to "View Books" to see all books in the inventory displayed in a responsive table
2. **Add Book**: Click "Add Book" in the menu to create a new book entry with full validation
3. **View Details**: Click the "View" button on any book to see complete details
4. **Edit Book**: Click the "Edit" button to modify existing book information
5. **Delete Book**: Click the "Remove" button to delete a book from inventory

## API Endpoints

### Books
- `GET /books` - Fetch all books
- `GET /books/:id` - Fetch specific book details
- `POST /books` - Create a new book
- `PUT /books/:id` - Update book information
- `DELETE /books/:id` - Delete a book

## Form Validation Examples

```javascript
// Email validation
Email pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

// Page count validation
Must be: positive integer

// Required fields
All fields are mandatory

// Synopsis
Minimum 10 characters required
```

## Design Features

- **Color Scheme**: Modern gradient-based design with purple (#6C63FF), cyan (#00C2FF), and warm accents
- **Typography**: Space Grotesk font family for modern appearance
- **Animations**: Smooth transitions, floating effects, and scale animations
- **Responsive Grid**: Mobile-first design with breakpoints for all screen sizes
- **Glassmorphic UI**: Semi-transparent card designs with backdrop blur effects

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contact

**Developer**: Vishnu Gupta  
**Email**: vg3772285@gmail.com

## License

This project is provided as-is for educational and portfolio purposes.
