import { useState } from 'react'
import { useEffect } from 'react';
import {Alert,Alerts} from "reactstrap"
import { Link } from "react-router-dom";
import '../../form.css'

const Register= ()=>{

    const [clicked1,setClicked1] = useState(false);
    const [clicked2,setClicked2] = useState(false);
    const [clicked3,setClicked3] = useState(false);

    const [error,setError] = useState(false);
    const [errormsg,setMsg] = useState("")

    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [success,setSucces] = useState(false)
    const [message,setMessage] = useState("")



    const click1 = ()=>{
        setClicked1(true);
    }
    const click2 = ()=>{
        setClicked2(true);
    }
    const click3 = ()=>{
        setClicked3(true);
    }

    const signin = async (e)=>{
        e.preventDefault();

        const bodyy = {email,username,password}
        console.log(bodyy.email,bodyy.username,bodyy.password)

        try{
            const response = await fetch("http://localhost:3000/api/user/register",{
            method:'POST',
            body: JSON.stringify(bodyy),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if(response.ok){
            const data = await response.json();

            setMessage(data.message)
            setSucces(true)
            setError(false)

            localStorage.setItem('user',JSON.stringify(data))

            setEmail('')
            setPassword('')
            setUsername('')

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
            setError(err);
        }

    }

    return(
        <div>
            {error ? <Alert color="danger">{errormsg}</Alert>  : ""}
            {success ? <Alert color="success">{message}</Alert>  : ""}
            
            
            <div class="box" id="box">
        <h2>Kayıt Ol</h2>
        <form action="/register" method="post" onSubmit={signin}>
            <div class="inputarea" id="email" onClick={click3}>
                <i class="fa-solid fa-envelope" onclick="labelfunc()"></i>
                <input type="email" name="email" id="emailvalue" autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                {clicked3 ? <label for="" id="label1" style={{top:"-5px",transitionDuration:"0.4s"}}>E-posta</label> : <label for="" id="label1">E-posta</label>}
            </div>
            <div class="inputarea" id="password" onClick={click2}>
                <i class="fa-solid fa-lock" onclick="labelfunc2()"></i>
                <input type="password" name="password" autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {clicked2 ? <label for="" id="label2" style={{top:"-5px",transitionDuration:"0.4s"}}>Parola</label> : <label for="" id="label1">Parola</label>}
            </div>
            <div class="inputarea" id="username"onClick={click1}>
                <i class="fa-solid fa-user"></i>
                <input type="text" name="username" autoComplete='off' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                {clicked1 ? <label for="" id="label3" style={{top:"-5px",transitionDuration:"0.4s"}}>Kullanıcı Adı</label> : <label for="" id="label1">Kullanıcı Adı</label>}
            </div>
            <div class="button">
                <input type="submit" value="Kayıt Ol" style={{width:"310px",height:"40px",borderRadius:"40px",marginTop:"250px",border:"none",color:"white",backgroundColor:"#0d6efd"}}/>
            </div>
            <div class="stuff">
                <label for="checkbox"></label>
        
                <a href="#"><strong></strong> </a>
            </div>
            <div class="register">
                 Hesabın var mı ? <Link to="/login"><strong>Giriş Yap</strong></Link>.
            </div>
        </form>
    </div>
        </div>
    )
}

export default Register;