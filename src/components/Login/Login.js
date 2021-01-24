import React from 'react'
import {Link, BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';

export default function Login() {

    /*React.useEffect(()=>{
        login();
    });*/

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState("Connect");

    const login = async () => {

        setLoading("Loading ...");
        const data = {email,password};
        const url = "https://miniprojetandroid.herokuapp.com/api/v1/users/login";

        try{
            const result = await axios({
               method: 'post',
               data,
               url
            });

            localStorage.setItem("tokenIsetApp",result.data.token);
            window.location.replace("/");
            
       }catch(err){
        setLoading("Connect");
           setMessage("email or password invalid.");
           console.log(err.message);
       }
    };
    
    return (
        <Router>
        <div className="connect-container align-content-stretch d-flex flex-wrap">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="auth-form">
                            <div className="row">
                                <div className="col">
                                    <div className="logo-box"><Link to="#" className="logo-text">{ loading }</Link></div>
                                    
                                
                                        <div className="form-group">
                                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={ e => setEmail(e.target.value)} placeholder="Enter email"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" id="password" onChange={ e => setPassword(e.target.value)} placeholder="Password"/>
                                        </div>
                                        <span onClick={ e => login()} className="btn btn-primary btn-block btn-submit">Sign In</span>
                                        <div className="auth-options">
                                        <div className="form-group">{ message !== "" ? <p style={{color: "red"}}>{message}</p> : "" }</div>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 d-none d-lg-block d-xl-block">
                        <div className="auth-image"></div>
                    </div>
                </div>
            </div>
        </div>
        </Router>
    )
}
