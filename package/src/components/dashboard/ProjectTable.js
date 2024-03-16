import { Card, CardBody, CardTitle, CardSubtitle, Table,Button } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { useAuthContext } from "../../components/hook/useAuthContext";
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

const ProjectTables = () => {

  const { user } = useAuthContext();
  const [course, setCourse] = useState([])
  const [total,setTotal] = useState(0)
  const [form,setForm] = useState("none")

  const [cardHolderName,setCardname] = useState("John Doe");
  const [cardNumber,setCardnumber] = useState("5528790000000008");
  const [expireMonth,setMonth] = useState("12");
  const [expireYear,setYear] = useState("2030");
  const [cvc,setCvc] = useState("123");

  const [vis,setVis] = useState("hidden")

  const [message,setMessage] = useState("")

  const payment = async ()=>{

    const info = {cardHolderName,cardNumber,expireMonth,expireYear,cvc,course,total}
    console.log(info)

    try{

      let response = await fetch('http://localhost:3000/api/payments',{
        method:'POST',
        body: JSON.stringify(info),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }
      })
      response = await response.json();

      console.log(response)

      if(response.message.status === "success"){
        setMessage("Ödeme başarılı!")
        setCardname("")
        setCardnumber("")
        setMonth("")
        setYear("")
        setCvc("")
        boughtCourseAdd()
        resetCart()

        setVis("visible")
 
      }
      if(response.message.status === "failure"){
        setMessage(response.message.errorMessage + ".")

      }
      
  

    }
    catch(err){
      console.log(err)
    }

  


  }

  
  
  useEffect(() => {
    async function get_cart() {
        try {
          const userid = await user.id
            const response = await fetch(`http://localhost:3000/api/user/${userid}/courses`, {
                method: 'GET',
                headers: {'Authorization': `Bearer ${user.token}`},
            });
            const json = await response.json();

            if (response.ok) {
                setCourse(json.courses);
                setTotal(json.total)
                console.log(json);
            } else {
              setCourse(null)
                console.log("hata");
            }
        } catch (error) {
            console.error(error);
        }
    }
    get_cart();
}, [user]);

const deletecourse = async (courseData) => {
  try {
      const userid = user.id;
      const response = await fetch(`http://localhost:3000/api/user/${userid}/courses`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ courseData }),
      });

      if (response.ok) {
          const data = await response.json();
          console.log(data);
          window.location.reload();
      }
  } catch (err) {
      console.log(err);
  }
};
const resetCart = async () => {
  try {
      const userid = user.id;
      const response = await fetch(`http://localhost:3000/api/user/${userid}/courses/reset`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
          },
      });

      if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTimeout(()=>{
            window.location.reload()
          },4000)
       
      }
  } catch (err) {
      console.log(err);
  }
};

const boughtCourseAdd = async ()=>{

  try {
    const userid = user.id;
    const response = await fetch(`http://localhost:3000/api/user/${userid}/boughtcourses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ course }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        
    }
} catch (err) {
    console.log(err);
}

}


  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Sepetim</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Kurslar
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Kurs Adı</th>
                <th>Eğitmen</th>
                <th>Ücret</th>

                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {course && course.map((tdata, index) => (
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
                  <td>{tdata.price} TL</td>
                  <td></td>
                  
                  <td><Button color="danger" style={{backgroundColor:"danger",border:"danger"}} onClick={()=> deletecourse(tdata)}>Kaldır</Button></td>
                </tr>
              ))}
               {course.length === 0  ? <tr className="border-top" style={{height:"66.5px",marginTop:"20px !important"}}>

                <th>Sepetiniz şu anda boş.</th>
               
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
                 
                   <td>Toplam</td>
                   <td>{total} TL</td>
                   <td></td>
                   
                   <td><Button color="success" style={{backgroundColor:"success",border:"success"}} onClick={()=> setForm("block")}>Ödeme Yap</Button></td>
                 </tr>}
          
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Alert color="primary" style={{visibility:vis}}>
         {message}
     </Alert>
      <Card style={{display:form}}> 
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          Ödeme Formu
        </CardTitle>
        <CardBody>
          <Form>
          <FormGroup>
                <Label for="exampleEmail">Ad Soyad</Label>
                <Input value={cardHolderName} onChange={(e)=> setCardname(e.target.value)}
                  id="exampleEmail"
                  name="email"
                  placeholder="Ad Soyad"
                  type="email"
                />
          </FormGroup>

          <FormGroup>
                <Label for="exampleEmail">Kart no</Label>
                <Input value={cardNumber} onChange={(e)=> setCardnumber(e.target.value)}
                  id="exampleEmail"
                  name="email"
                  placeholder="Kart no"
                  type="email"
                />
          </FormGroup>
          <FormGroup>
                <Label for="exampleEmail">CVC</Label>
                <Input value={cvc} onChange={(e)=> setCvc(e.target.value)}
                  id="exampleEmail"
                  name="email"
                  placeholder="CVC"
                  type="email"
                />
          </FormGroup>
          <FormGroup>
                <Label for="exampleSelect">Ay</Label>
                <Input id="exampleSelect" name="select" type="select" value={expireMonth} onChange={(e)=> setMonth(e.target.value)}>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Yıl</Label>
                <Input id="exampleSelect" name="select" type="select" value={expireYear} onChange={(e)=> setYear(e.target.value)}>
                  <option>2024</option>
                  <option>2025</option>
                  <option>2026</option>
                  <option>2027</option>
                  <option>2028</option>
                  <option>2029</option>
                  <option>2030</option>
                  <option>2031</option>
                  <option>2032</option>
                
                </Input>
              </FormGroup>

          </Form>
          <td><Button color="success" style={{backgroundColor:"success",border:"success"}} onClick={payment}>Ödemeyi Tamamla</Button></td>
        </CardBody>
        
      </Card>
      
      
    </div>
  );
};

export default ProjectTables;