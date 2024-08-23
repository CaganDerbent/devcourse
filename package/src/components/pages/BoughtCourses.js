import { Card, CardBody, CardTitle, CardSubtitle, Table,Button } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState,useEffect } from "react";
import {

  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert
} from "reactstrap"
import { json } from "react-router-dom";
import GradientCircleProgressbar from "../other/GradientCircleProgressbar";

const ProjectTables = () => {

  const { user } = useAuthContext();
  const [course, setCourse] = useState([])


  const [message,setMessage] = useState("")
  
  
  useEffect(() => {
    async function get_list() {
        try {
          const userid = await user.id
            const response = await fetch(`http://localhost:3000/api/user/${userid}/boughtcourses`, {
                method: 'GET',
                headers: {'Authorization': `Bearer ${user.token}`},
            });
            const json = await response.json();

            if (response.ok) {
                setCourse(json);
                console.log(json);
            } else {
              setCourse(null)
                console.log("hata");
            }
        } catch (error) {
            console.error(error);
        }
    }
    get_list();
}, [user]);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Kurslarım</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Kurs Adı</th>
                <th>Eğitmen</th>
                <th>İlerleme</th>

                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {course && course.map((tdata, index) => (
                //rounded-circle
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.img}
                        className="x"
                        alt="avatar"
                        width="200"
                        height="100"
                        style={{borderRadius:"none !important"}}
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.title}</h6>
                        <span className="text-muted">{tdata.category}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.author}</td>
                  <td>
                  <GradientCircleProgressbar percentage={1} strokeWidth={8} secondaryColor="#f0f0f0"/>


    
                  
                  </td>
                  
                  <td><Button color="secondary" style={{backgroundColor:"secondary",border:"secondary"}}>Devam Et</Button></td>
                </tr>
              ))}
               {course.length === 0  ? <tr className="border-top" style={{height:"66.5px",marginTop:"20px !important"}}>

                <th>Sahip olduğunuz kurs bulunmamaktadır.</th>
               
               <td>
                    <div className="d-flex align-items-center p-2">
                      
                      <div className="ms-3">
                        <h6 className="mb-0">{}</h6>
                        <span className="text-muted">{}</span>
                      </div>
                    </div>
                  </td>
                  
                </tr> : <tr className="border-top" style={{height:"66.5px",marginTop:"60px"}}>
                <td>
                     <div className="d-flex align-items-center p-2">
                       
                       <div className="ms-3">
                         <h6 className="mb-0">{}</h6>
                         <span className="text-muted">{}</span>
                       </div>
                     </div>
                   </td>
                 
                   
                 </tr>}
          
            </tbody>
          </Table>
        </CardBody>
      </Card>
     
      
      
    </div>
  );
};

export default ProjectTables;
