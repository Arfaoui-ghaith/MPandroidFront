import React from 'react'
import {Link, BrowserRouter as Router} from 'react-router-dom';

export default function Login() {
    return (
        <Router>
        <div className="connect-container align-content-stretch d-flex flex-wrap">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="auth-form">
                            <div className="row">
                                <div className="col">
                                    <div className="logo-box"><Link to="#" className="logo-text">Connect</Link></div>
                                    <form>
                                        <div className="form-group">
                                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" id="password" placeholder="Password"/>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block btn-submit">Sign In</button>
                                        <div className="auth-options">
                                            
                                        </div>
                                    </form>
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
