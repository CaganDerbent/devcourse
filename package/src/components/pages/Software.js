import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardGroup,
  Button,
  Row,
  Col,
  Alert,
  Badge
} from "reactstrap";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";
import Blog from "../../components/views/ui/Blog";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState,useEffect } from "react";

import useCourses from "../../hooks/useCourses"; 

const Software = () => {

  const { user } = useAuthContext();
  const { courses, addCourse, getCourses, err2, text, isVisible, error } = useCourses(user);

  useEffect(() => {
    getCourses("http://localhost:3000/api/software");
    
  }, []);

  return (
    <div>
  
      <h5 className="mb-3">Yazılım Mühendisliği Kursları</h5>

      {user ? (
  err2 ? (
    <Alert color="danger" style={{visibility:isVisible}}>
      {text ? text :"a"}
    </Alert>
  ) : (
    <Alert color="success"  style={{visibility:isVisible}}>
      {text ? text :"a"}
    </Alert>
  )
) : (
  error ? (
    <Alert color="primary">
      Sepete eklemek için giriş yapmanız gerekmektedir.
    </Alert>
  ) : (
    <Alert color="primary" style={{ visibility: "hidden" }}>
      Sepete eklemek için giriş yapmanız gerekmektedir.
    </Alert>
  )
)}
      
        <Row>
          {courses && courses.map((blg, index) => (
            <Col sm="6" lg="6" xl="3" key={index}>
              <Blog
                image={blg.img}
                title={blg.title}
                subtitle={blg.author}
                text={blg.exp}
                color={blg.color}
                category={blg.category}
                price = {blg.price}
                onClick={()=>addCourse(blg)}
                textb ={"Sepete Ekle"}
         
              />
            </Col>
          ))}
        </Row>
      
    
    </div>
  );
};

export default Software;
