import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../components/hook/useAuthContext.js";

import {BrowserRouter,Routes,Route} from "react-router-dom"



/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const Blog = lazy(() => import("../components/dashboard/Blog.js"));
const Login = lazy(() => import("../components/dashboard/Login.js"));
const Register = lazy(() => import("../components/dashboard/Register.js"));







/*****Routes******/

const ThemeRoutes = () => {

  const {user} = useAuthContext()

  return(

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<FullLayout />}
        >
          <Route path="/" element={<Cards />} />
          <Route path="/starter" element={<Starter />} />
          <Route path="/about" element={<About />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/badges" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/grid" element={<Grid />} />
          <Route path={`/user/${user.id}/cart`} element={<Tables />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/breadcrumbs" element={<Breadcrumbs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Route>
      </Routes>
    </BrowserRouter>


  )


  

};

export default ThemeRoutes;
