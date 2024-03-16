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
import Blog from "../../components/dashboard/Blog";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";

import { useAuthContext } from "../../components/hook/useAuthContext";
import { useState,useEffect } from "react";




const Cards = () => {

  const { user } = useAuthContext();
  const [course, setCourse] = useState(null);
  const [err,setErr] = useState(false)
  const [err2,setErr2] = useState(false)
  const [text,setText] = useState("")
  const [visibility,setV] = useState("hidden")

  
  
  useEffect(() => {
    async function get_course() {
        try {
            const response = await fetch("http://localhost:3000/api/programming", {
                method: 'GET',
                headers: {},
            });
            const json = await response.json();
  
            if (response.ok) {
                setCourse(json);
                console.log(json);
            } else {
                console.log("hata");
            }
        } catch (error) {
            console.error(error);
        }
    }
    get_course();
  }, []);

  const addcourse = async (courseData) => {
    try {
        const userid = user.id;
        const response = await fetch(`http://localhost:3000/api/user/${userid}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({courseData}),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setText(data.message)
          setErr2(false)
          setV("visible");
          setTimeout(() => {
            setV("hidden");
        }, 2000);
          
        
          
        }

      else{
        setErr2(true)
        const data = await response.json();
        setText(data.error)
        //setErr2(false)
        setV("visible");
        setTimeout(() => {
          setV("hidden");
      }, 2000);
      
    }


    } catch (err) {
        console.log(err);
        setErr(true)
        setTimeout(() => {
          setErr(false);
      }, 2000);
        
    }
  };


  return (
    <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <h5 className="mb-3">Programlama Dilleri Kursları</h5>

      {user ? (
  err2 ? (
    <Alert color="danger" style={{visibility:visibility}}>
      {text ? text :"a"}
    </Alert>
  ) : (
    <Alert color="success"  style={{visibility:visibility}}>
      {text ? text :"a"}
    </Alert>
  )
) : (
  err ? (
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
          {course && course.map((blg, index) => (
            <Col sm="6" lg="6" xl="3" key={index}>
              <Blog
                image={blg.img}
                title={blg.title}
                subtitle={blg.author}
                text={blg.exp}
                color={blg.color}
                category={blg.category}
                price = {blg.price}
                onClick={()=>addcourse(blg)}
                textb ={"Sepete Ekle"}
         
              />
            </Col>
          ))}
        </Row>
      
    
    </div>
  );
};

export default Cards;
