/**
  import { useRoutes } from "react-router-dom";
  import Themeroutes from "./routes/Router";
  //import AppRoutes from "./routes/Router"
  //{//routing}
  
  const App = () => {
    //const routing = useRoutes(Themeroutes);
  
    return <div className="dark">
      <Themeroutes></Themeroutes>
      
    </div>;
  };
  
  export default App;
*/

import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./components/hook/useAuthContext.js";

import {BrowserRouter,Routes,Route} from "react-router-dom"



/****Layouts*****/
const FullLayout = lazy(() => import("./layouts/FullLayout.js"))

/***** Pages ****/

const Starter = lazy(() => import("./views/Starter.js"));
const About = lazy(() => import("./views/About.js"));
const Alerts = lazy(() => import("./views/ui/Alerts"));
const Badges = lazy(() => import("./views/ui/Badges"));
const Buttons = lazy(() => import("./views/ui/Buttons"));
const Cards = lazy(() => import("./views/ui/Cards"));
const Grid = lazy(() => import("./views/ui/Grid"));
const Tables = lazy(() => import("./views/ui/Tables"));
const Forms = lazy(() => import("./views/ui/Forms"));
const Breadcrumbs = lazy(() => import("./views/ui/Breadcrumbs"));
const Blog = lazy(() => import("./components/dashboard/Blog.js"));
const Login = lazy(() => import("./components/dashboard/Login.js"));
const Register = lazy(() => import("./components/dashboard/Register.js"));
const Programming = lazy(() => import("./views/ui/Programming.js"));
const Datasc = lazy(() => import("./views/ui/Datasc.js"));
const Database = lazy(() => import("./views/ui/Database.js"));
const Game = lazy(() => import("./views/ui/Game.js"));
const Web = lazy(() => import("./views/ui/Web.js"));
const Mobile = lazy(() => import("./views/ui/Mobile.js"));
const Software = lazy(() => import("./views/ui/Software.js"));







/*****Routes******/

const App = () => {

  const {user} = useAuthContext()

  return(

   
      <Routes>
        <Route
          path="/"
          element={<FullLayout />}
        >
    
          <Route path={user ? `/user/${user.id}/kurslarim`:'/'} element={<Starter />} />
          <Route path="/" element={<Cards />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/form" element={<Forms to="/" />} />

          <Route path="/kurslar/progamlama-dilleri" element={<Programming />} />
          <Route path="/kurslar/veri-bilimi" element={<Datasc />} />
          <Route path="/kurslar/veritabani" element={<Database />} />
          <Route path="/kurslar/web-gelistirme" element={<Web />} />
          <Route path="/kurslar/mobil-gelistirme" element={<Mobile />} />
          <Route path="/kurslar/oyun-gelistirme" element={<Game />} />
          <Route path="/kurslar/yazilim-muhendisligi" element={<Software />} />

          <Route path="/buttons" element={<Buttons />} />
          <Route path="/kurslar" element={<Cards />} />
          <Route path="/grid" element={<Grid />} />
          
          <Route path="/forms" element={<Forms />} />
          <Route path="/breadcrumbs" element={<Breadcrumbs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path={user ? `/user/${user.id}/cart`:'/'} element={<Tables />} />
        </Route>
      </Routes>
   


  )


  

};

export default App;

