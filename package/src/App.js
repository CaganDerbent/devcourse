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
import { useAuthContext } from "./hooks/useAuthContext.js";

import {BrowserRouter,Routes,Route} from "react-router-dom"



/****Layouts*****/
const FullLayout = lazy(() => import("./layouts/FullLayout.js"))

/***** Pages ****/

const Starter = lazy(() => import("./components/other/Starter.js"));
const About = lazy(() => import("./components/pages/About.js"));
const Alerts = lazy(() => import("./components/views/ui/Alerts.js"));
const Badges = lazy(() => import("./components/views/ui/Badges.js"));
const Buttons = lazy(() => import("./components/views/ui/Buttons.js"));
const Cards = lazy(() => import("./components/pages/Cards.js"));
const Grid = lazy(() => import("./components/views/ui/Grid.js"));
const Tables = lazy(() => import("./components/other/Tables.js"));
const Forms = lazy(() => import("./components/views/ui/Forms.js"));
const Breadcrumbs = lazy(() => import("./components/views/ui/Breadcrumbs.js"));
const Blog = lazy(() => import("./components/views/ui/Blog.js"));
const Login = lazy(() => import("./components/pages/Login.js"));
const Register = lazy(() => import("./components/pages/Register.js"));
const Programming = lazy(() => import("./components/pages/Programming.js"));
const Datasc = lazy(() => import("./components/pages/Datasc.js"));
const Database = lazy(() => import("./components/pages/Database.js"));
const Game = lazy(() => import("./components/pages/Game.js"));
const Web = lazy(() => import("./components/pages/Web.js"));
const Mobile = lazy(() => import("./components/pages/Mobile.js"));
const Software = lazy(() => import("./components/pages/Software.js"));








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

