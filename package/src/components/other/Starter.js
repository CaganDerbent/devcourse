import { Col, Row } from "reactstrap";
import SalesChart from "../views/ui/SalesChart";
import Feeds from "../views/ui/Feeds";
import BoughtCourses from "../pages/BoughtCourses";

import Blog from "../views/ui/Blog";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";
import { useAuthContext } from "../../hooks/useAuthContext";
import About from "../pages/About";


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
