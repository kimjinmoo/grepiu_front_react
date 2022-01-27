import Home from "../components/page/home";
import LoginForm from "../components/page/account/LoginForm";
import About from "../components/page/about";
import Post from "../components/page/post";
import Toy from "../components/page/toy";
import Admin from "../components/page/admin";
import PostManagementDetail
  from "../components/page/admin/post/PostManagementDetail";
import Cloud from "../components/page/cloud";
import Support from "../components/page/support";
import PostDetails from "../components/page/post/PostDetails";

export const webRoutes = [
  {
    path: "/",
    element: <Home/>,
    authorize: false
  },
  {
    path: "login",
    element: <LoginForm/>,
    authorize: false
  }, {
    path: "about",
    element: <About/>,
    authorize: false
  }, {
    path: "post",
    element: <Post/>,
    authorize: false
  },
  {
    path: "post/:id",
    element: <PostDetails/>,
    authorize: false
  },
  {
    path: "toy",
    element: <Toy/>,
    authorize: false
  },
  {
    path: "admin",
    element: <Admin/>,
    authorize: true
  },
  {
    path: "admin/:id",
    element: <PostManagementDetail/>,
    authorize: true
  },
  {
    path: "cloud",
    element: <Cloud/>,
    authorize: true
  },
  {
    path: "support",
    element: <Support/>,
    authorize: false
  },
];
