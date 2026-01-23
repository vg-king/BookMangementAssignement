# 📚 Book Inventory Management System  
### (React Assignment)

## 📌 Overview
The **Book Inventory Management System** is a React-based web application developed as part of a **company React assignment**.  
It enables users to manage a collection of books through a clean, intuitive, and responsive user interface while supporting complete **CRUD (Create, Read, Update, Delete)** functionality.

The primary focus of this project is **frontend React development**, including component-based architecture, routing, state management, form validation, UI/UX, and deployment.

---

## 🚀 Live Demo
- **Live Application:**  
  https://book-mangement-assignement-broe.vercel.app/
- **GitHub Repository:**  
  https://github.com/vg-king/BookMangementAssignement  

---

## ✨ Key Features

### 🏠 Landing / Home Page
- Modern hero section with clean and minimal UI
- Clear navigation: **Home | View Books | Add Book**
- Fully responsive layout for desktop, tablet, and mobile devices

### 📋 Books Listing (Table View)
- Displays all books in a structured and readable table
- Columns:
  - Title
  - Author
  - Publisher
  - Pages
  - Published Date
- Action buttons for each book:
  - View
  - Edit
  - Remove

### ✏️ CRUD Operations
- **Create:** Add new books using a validated form  
- **Read:** View all books or detailed information of a selected book  
- **Update:** Edit existing book details with pre-filled data  
- **Delete:** Remove books with a confirmation prompt  

### ✅ Form Validation
- Required field validation for all inputs
- Email format validation
- Numeric validation for page count
- Date validation
- Real-time error messages for better user experience

### 📱 Responsive & Interactive Design
- Responsive UI across all screen sizes
- Smooth scrolling
- Clean spacing and modern layout
- User-friendly interactions and navigation

---

## 🗂️ Data Persistence (Important Note)

> **This application uses browser `localStorage` to simulate data persistence.**  
> The assignment focuses on frontend React functionality, UI behavior, and CRUD flow.  
> No external database or backend service is required for the deployed version.

- Initial dummy data is seeded on first load
- User-added books are stored in browser localStorage
- Data persists across page refreshes in the same browser

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **React Router DOM**
- **Axios**
- **CSS3 (modern responsive styling)**

### Deployment
- **Vercel**

### Data Storage
- **Browser localStorage** (for assignment scope)

---

## 📁 Project Structure
BookMangementAssignement/
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── assets/
│ │ └── App.js
│ └── package.json
├── README.md
└── package.json


> Note: Any server-side files (if present) are retained only for reference or local experimentation and are not used in the deployed application.

---

## ⚙️ Installation & Local Setup

### Prerequisites
- Node.js
- npm

### Steps
```bash
git clone https://github.com/vg-king/BookMangementAssignement
cd BookMangementAssignement
npm install
npm start

Open in browser:

http://localhost:3000
