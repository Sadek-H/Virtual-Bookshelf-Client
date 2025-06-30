# Virtual Bookshelf 📚

A modern web application to manage your personal bookshelf, built with **React** and **Vite**.

**Live Demo:** [https://virtual-bookshelf-server-sooty.vercel.app/]

---

## Purpose

Virtual Bookshelf helps you organize, track, and discover books. Add your own books, update their status, upvote favorites, and explore what others are reading—all in a beautiful, responsive interface.

---

## Key Features

- 🔍 **Browse & Search:** Find books by title, author, or category.
- 📖 **Add & Update Books:** Easily add new books or update existing ones.
- 🗂️ **Categories:** Explore books by featured categories.
- 👍 **Upvote:** Upvote your favorite books.
- 📝 **Reviews:** Leave and read reviews for books.
- 👤 **User Authentication:** Secure login, registration, and profile management.
- 📱 **Responsive Design:** Works great on desktop and mobile.
- 🎨 **Beautiful UI:** Built with Tailwind CSS and DaisyUI.

---

## NPM Packages Used

- [`react`](https://react.dev/) – UI library
- [`vite`](https://vitejs.dev/) – Fast build tool
- [`react-router-dom`](https://reactrouter.com/) – Routing
- [`tailwindcss`](https://tailwindcss.com/) – Utility-first CSS
- [`daisyui`](https://daisyui.com/) – Tailwind CSS component library
- [`framer-motion`](https://www.framer.com/motion/) – Animations
- [`react-toastify`](https://fkhadra.github.io/react-toastify/) – Toast notifications
- [`sweetalert2`](https://sweetalert2.github.io/) – Alert popups
- [`axios`](https://axios-http.com/) – HTTP requests

---

## Getting Started

1. **Clone the repository:**
   ```
   git clone https://github.com/your-username/virtual-bookshelf.git
   cd virtual-bookshelf
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Start the development server:**
   ```
   npm run dev
   ```

4. **Open in your browser:**
   ```
  https://fir-job-4414a.web.app
   ```

---

## Project Structure

```
src/
  Components/      # Reusable UI components
  Pages/           # Page components (Home, Bookshelf, etc.)
  Layout/          # Layout components
  Routes/          # Route definitions and guards
  Firebase/        # Auth context and config
  ...
```

---

## Customization

- Update the backend API endpoints in the fetch/axios calls as needed.
- Configure authentication in `Firebase/Context/AuthContext.js`.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Made with ❤️ for book lovers!