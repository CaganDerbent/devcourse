import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import BoughtCourses from "../components/dashboard/BoughtCourses";

import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import { useAuthContext } from "../components/hook/useAuthContext";
import About from "./About";


const Starter = () => {
  const {user} = useAuthContext();
  return (
    <div>
      {user && (<Row>
        <Col lg="12">
          <BoughtCourses />
        </Col>
      </Row>) }
      {!user && (<About/>) }
   
    </div>
  );
};

export default Starter;
