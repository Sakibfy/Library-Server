
# 📚 Library Management System API

A simple RESTful API for managing books and borrowing using **Express**, **TypeScript**, and **MongoDB** (with **Mongoose**).  
Includes validation, business logic, and aggregation-based reporting.

---

### 🚀 Features

- 📖 Add, retrieve, update, and delete books
- 📦 Borrow books with stock validation
- 📊 Borrow summary using MongoDB Aggregation
- ✅ Schema validation & error handling
- ⚙️ Mongoose middleware, static method

---

### 🛠️ Tech Stack

- **Backend Framework:** Express.js  
- **Language:** TypeScript  
- **Database:** MongoDB with Mongoose  
- **Validation:** Mongoose Schema  
- **Runtime:** Node.js  
- **Others:** dotenv, ts-node-dev

---

## 📂 Project Structure

```
src/
│
├── app.ts
├── server.ts
├── config/
│   └── index.ts
├── modules/
│   ├── book/
│   │   ├── book.model.ts
│   │   ├── book.controller.ts
│   │   ├── book.route.ts
│   └── borrow/
│       ├── borrow.model.ts
│       ├── borrow.controller.ts
│       ├── borrow.route.ts
├── routes/
│   └── index.ts
├── utils/
│   └── sendResponse.ts
```

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Sakibfy/Library-Management 
   cd library-management-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   Create a `.env` file in the root directory and add:

   ```env
   PORT=5000
   DATABASE_URL=mongodb://localhost:27017/library-db
   NODE_ENV=development
   ```

4. **Run the Server**
   ```bash
   npm run dev
   ```

   Server will start on `http://localhost:5000/`

---

## 📡 API Endpoints

### 📘 Books

| Method | Endpoint             | Description           |
|--------|----------------------|-----------------------|
| POST   | `/api/books`         | Create a new book     |
| GET    | `/api/books`         | Get all books         |
| GET    | `/api/books/:id`     | Get book by ID        |
| PUT    | `/api/books/:id`     | Update book           |
| DELETE | `/api/books/:id`     | Delete book           |

#### ✅ Sample Book Schema:

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

Supports filtering & sorting:
```
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

---

### 📦 Borrow

| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| POST   | `/api/borrow`      | Borrow a book                |
| GET    | `/api/borrow`      | Get borrow summary (report)  |

#### ✅ Borrow Book Payload:

```json
{
  "book": "BOOK_OBJECT_ID",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### 📊 Borrow Summary Response:

```json
{
  "book": {
    "title": "The Theory of Everything",
    "isbn": "9780553380163"
  },
  "totalQuantity": 5
}
```

---

## ⚠️ Error Response Format

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
```


- 🔗 **Live URL:** [https://l-2-a-3-library-management.vercel.app](#)

---

## 🧑‍💻 Author

**Your Name**  
🔗 GitHub: [github.com/your-username](https://github.com/Sakibfy/Library-Management)


