# 🧠 Forgetto

Forgetto is a web application built on the MERN stack. It acts as your **second brain** 🧠, helping you store and share your most important resources—like YouTube links, Twitter posts, and more. Effortlessly organize, access, and share your collection with others! 🚀

---

## ✨ Features

- 📥 Add content of different types (YouTube links, Twitter posts, etc.)
- 🔗 Share your content publicly with a unique link
- 🔍 Search and view other users' public profiles and saved content
- 🔒 Sign up and sign in with secure authentication

---

## 🗂️ Project Structure

```
.
├── backend/                  # Express.js backend API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── CreateContentModel.tsx
│   │   │   │   └── SideBar.tsx
│   │   ├── hooks/
│   │   │   └── useContent.ts
│   │   ├── Icons/
│   │   │   ├── PlusIcon.tsx
│   │   │   └── ShareIcon.tsx
│   │   ├── pages/
│   │   │   ├── dashboard.tsx
│   │   │   ├── SignIn.tsx
│   │   │   └── SignUp.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
│
├── README.md                 # Project overview and instructions
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- 🟢 Node.js (v18+ recommended)
- 📦 npm or yarn
- 🍃 MongoDB instance (local or cloud)

### 🛠️ Clone the Repository

```sh
git clone https://github.com/yourusername/forgetto.git
cd forgetto
```

### 🔧 Backend Setup

1. Go to the backend folder:
    ```sh
    cd backend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file with your MongoDB URI:
    ```
    MONGO_URI=your_mongodb_connection_string
    ```
4. Start the backend server:
    ```sh
    npm run dev
    ```
    The backend will run on [http://localhost:3000](http://localhost:3000).

### 🎨 Frontend Setup

1. Open a new terminal and go to the frontend folder:
    ```sh
    cd frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the frontend development server:
    ```sh
    npm run dev
    ```
    The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

---

## 💡 Usage

- 📝 Visit `/signup` to create a new account.
- 🔑 Sign in at `/signin`.
- 📚 Add, view, and share your content from the dashboard.
- 🌐 Share your collection using the generated public link.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. 🍴 Fork the repository.
2. 🌱 Create a new branch: `git checkout -b feature/your-feature-name`
3. 💾 Commit your changes: `git commit -m "Add your feature"`
4. 🚀 Push to your branch: `git push origin feature/your-feature-name`
5. 📬 Open a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

For any questions or suggestions, feel free to open an issue or contact the maintainer!