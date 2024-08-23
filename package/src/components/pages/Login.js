import { useState } from 'react'
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';
import {Alert,Alerts} from "reactstrap"
import { Link } from "react-router-dom";
import '../../form.css'


const Login = ()=>{

    const {user} = useAuthContext();

    const {dispatch} = useAuthContext();

    const [clicked1,setClicked1] = useState(false);
    const [clicked2,setClicked2] = useState(false);

    const [error,setError] = useState(false);
    const [errormsg,setMsg] = useState("")


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    const click1 = ()=>{
        setClicked1(true);
    }
    const click2 = ()=>{
        setClicked2(true);
    }

    const login = async (e)=>{
        e.preventDefault();

        const bodyy = {email,password}
        console.log(bodyy.email,bodyy.password)

        try{
            const response = await fetch("http://localhost:3000/api/user/login",{
            method:'POST',
            body: JSON.stringify(bodyy),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if(response.ok){
            navigate("/")
            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data))

            // update authContext
            dispatch({type:'LOGIN',payload: data})
            

            setEmail('')
            setPassword('')
            
        }
        else{
            const data = await response.json();
            console.log(data)
            setError(true)
            setMsg(data.error)
            
        }
       
        }
        catch(err){
            console.log(err)
        }

    }

    return(
        <div>
            {error ? <Alert color="danger">{errormsg}</Alert>  : ""}
           
             <div className="box" id="box">
        <h2>Giriş Yap</h2>
        <form action=""method="post" id="loginForm" onSubmit={login}>
            <div className="inputarea" id="email" onClick={click1}>
                <i className="fa-solid fa-envelope"></i>
                <input type="text"name="username" autoComplete='off' onChange={(e)=>setEmail(e.target.value)}/>
                {clicked1 ? <label htmlFor="" id="label1" style={{top:"-5px",transitionDuration:"0.4s"}}>E-posta</label> : <label htmlFor="" id="label1">E-posta</label>}
            </div>
            <div className="inputarea" id="password" onClick={click2} >
                <i className="fa-solid fa-lock" ></i>
                <input type="password" name="password" autoComplete='off' onChange={(e)=>setPassword(e.target.value)}/>
                {clicked2 ? <label htmlFor="" id="label2" style={{top:"-5px",transitionDuration:"0.4s"}}>Parola</label> : <label htmlFor="" id="label1">Parola</label>}
            </div>
            <div className="button" >
                <input type="submit"value="Giriş Yap" id='inp' style={{width:"310px",height:"40px",borderRadius:"40px",marginTop:"50px",border:"none",color:"white",backgroundColor:"#0d6efd"}}/>
            </div>
            <div className="stuff">
                <label htmlFor="checkbox"></label>
                <a href="#"><strong></strong> </a>
            </div>
            <div className="register">
                Hesabın yok mu ? <Link to="/register"><strong>Kayıt Ol</strong></Link>.
            </div>
        </form>
    </div>
        </div>
    )
}

export default Login;