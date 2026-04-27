# 🚀 Full Stack Product Management System (MERN)

A comprehensive Product Management Application built using the **MERN Stack** (MongoDB, Express, React, Node.js). This project features a secure User Authentication system and complete CRUD functionality for managing products.

---

## ✨ Key Features

* **User Authentication:** Secure Registration and Login powered by JSON Web Tokens (JWT).
* **Protected Routes:** Restricted access to product management features for authenticated users only.
* **Complete CRUD Operations:**
    * **Create:** Add new products with Title, Price, Description, and Category.
    * **Read:** View a dynamic list of products and access individual product details.
    * **Update:** Modify existing product information through a dedicated edit interface.
    * **Delete:** Remove products permanently from the database.
* **Responsive UI:** A modern, clean interface built with Tailwind CSS.
* **State Management:** Utilizes React Context API for global authentication and token management.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Axios, React Router Dom |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Security** | JSON Web Tokens (JWT), CORS Middleware |

---

## ⚙️ Installation & Setup

Follow these steps to get the project running on your local machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
```

### 2. Backend Configuration
1. Navigate to the backend directory: cd backend
2. Install dependencies: npm install
3. Create a .env file in the backend root and add the following:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3010
```
4. Start the server: npm start

### 3. Frontend Configuration
1. Navigate to the frontend directory: cd ../frontend
2. Install dependencies: npm install
3. Start the development server: npm run dev

---

## 📂 Project Structure
```
├── backend/
│   ├── models/        # Mongoose Schemas (User, Product)
│   ├── routes/        # API Endpoints (Auth, Products)
│   ├── middleware/    # Auth & JWT verification
│   └── server.js      # Main server entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # ProtectedRoute.jsx
│   │   ├── context/    # AuthContext.jsx
│   │   ├── pages/      # Login, Register, Products, Details, Add/Edit
│   │   └── App.jsx     # Routing & Provider setup
└── .gitignore         # Ignores node_modules and env files
```
---

## 📝 API Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- |
|POST|/api/auth/register|Register a new user|No|
|POST|/api/auth/login|Login and receive JWT|No|
|GET|/api/products|Fetch all products|Yes|
|GET|/api/products/:id|Fetch single product details|Yes|
|POST|/api/products|Create a new product|Yes|
|PUT|/api/products/:id|Update an existing product|Yes|
|DELETE|/api/products/:id|Delete a product|Yes|

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

---

## Developed by: Muhammad Qasim
