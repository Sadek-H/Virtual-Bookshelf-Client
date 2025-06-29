import {
  createBrowserRouter,

} from "react-router";
import Homelayout from "../Layout/Homelayout";
import Home from "../Pages/Home/Home";
import Addbook from "../Pages/AddBook/Addbook";
import Bookdetails from "../Pages/Bookdetails/Bookdetails";
import Login from "../Firebase/Authentication/Login";
import Register from "../Firebase/Authentication/Register";
import Bookshelf from "../Pages/Bookshelf/Bookshelf";
import Mybooks from "../Pages/MyBook/Mybooks";
import Update from "../Pages/MyBook/Update";
import Profile from "../Pages/Profile/Profile";
import NotFound from "../Pages/Profile/NotFound";
import Privateroutes from "./Privateroutes";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: Homelayout,
    errorElement: <NotFound/>,
    children:[
      {
        index: true,
        Component: Home,
      },
      {
       path: "add-book",
      element: <Privateroutes><Addbook></Addbook></Privateroutes>
       
      },
      {
       path: "books/:id",
       Component: Bookdetails,
       loader: ()=> fetch("http://localhost:3000/books"),
         
      },
      {
       path: "login",
       Component: Login,

      },
      {
       path: "register",
       Component: Register,

      },
      {
       path: "bookshelf",
       Component: Bookshelf,

      },
      {
       path: "my-book",
      element:<Privateroutes><Mybooks></Mybooks></Privateroutes>

      },
      {
       path: "mybook/update/:id",
      element:<Privateroutes><Update></Update></Privateroutes>,
       loader:()=> fetch("http://localhost:3000/books")


      },
      {
       path: "profile",
     element: <Privateroutes><Profile></Profile></Privateroutes>

      },
    ]
  },
]);