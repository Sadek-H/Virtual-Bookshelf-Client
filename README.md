# 📚 Virtual Bookshelf

A modern web application to manage your personal bookshelf — built with **React**, **Vite**, **Tailwind CSS**, and **Firebase**.

**🔗 Live Client:** [https://fir-job-4414a.web.app](https://fir-job-4414a.web.app)  
**🔗 Live Server:** [https://virtual-bookshelf-server-sooty.vercel.app](https://virtual-bookshelf-server-sooty.vercel.app)

---

## 🎯 Purpose

Virtual Bookshelf helps you organize, track, and discover books. Whether you're managing your own collection or exploring what others are reading, it offers a beautiful, responsive interface packed with modern features.

---

## 🚀 Key Features

- 🔍 **Browse & Search:** Discover books by title, author, or category.
- ➕ **Add & Update Books:** Add new entries or edit book details.
- 🗂️ **Featured Categories:** Filter books by genres or tags.
- 👍 **Upvote System:** Highlight your favorite books with upvotes.
- 📝 **Reviews:** Read and post reviews for any book.
- 👤 **User Authentication:** Secure login and registration with Firebase.
- 📊 **Profile Analytics:** Visual chart of user reading stats.
- 🔐 **Protected Routes:** Role-based route protection with JWT.
- 🎨 **Responsive UI:** Mobile-friendly and visually rich interface using Tailwind CSS + DaisyUI.
- 💬 **Real-time Feedback:** Toast and alert notifications for user actions.

---

## 📦 Tech Stack & NPM Packages

| Tech | Description |
|------|-------------|
| [`react`](https://react.dev/) | JavaScript UI Library |
| [`vite`](https://vitejs.dev/) | Fast build tool |
| [`tailwindcss`](https://tailwindcss.com/) | Utility-first CSS framework |
| [`daisyui`](https://daisyui.com/) | Tailwind component library |
| [`framer-motion`](https://www.framer.com/motion/) | Animations and transitions |
| [`axios`](https://axios-http.com/) | HTTP requests |
| [`react-toastify`](https://fkhadra.github.io/react-toastify/) | Toast notifications |
| [`sweetalert2`](https://sweetalert2.github.io/) | Stylish alerts |
| [`firebase`](https://firebase.google.com/) | Authentication and backend |
| [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken) | Secure token verification |

---

## 🛠️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/virtual-bookshelf.git
   cd virtual-bookshelf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in your browser**
   Visit: `https://fir-job-4414a.web.app` 

---

## 🗂️ Project Structure

```
src/
│
├── Components/        # Reusable UI components
├── Pages/             # Route-based page components (Home, Books, etc.)
├── Layout/            # Layout wrappers (Header, Footer, etc.)
├── Routes/            # Routing and protected route config
├── Firebase/
│   ├── Authconfig.js  # Firebase setup
│   └── Context/       # Auth context (login, logout, user info)
├── Services/          # API and helper services
└── App.jsx            # Root component
```

---

## ⚙️ Customization Tips

- Update backend API URLs in `axios` calls throughout components.
- Configure Firebase settings in `Firebase/Authconfig.js`.
- Modify routes and protection in `Routes/PrivateRoute.jsx`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ❤️ Made for Book Lovers

Built with love and imagination for those who find joy in turning pages, real or digital. Happy reading!
