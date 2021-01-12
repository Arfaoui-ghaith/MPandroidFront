import React from 'react';
import {Link, BrowserRouter as Router} from 'react-router-dom';

export default function SideBar() {

    
    const active = (e) => {
        console.log(e.target);
    }

    return (
    <Router>
            <div className="page-sidebar">
                <div className="logo-box">
                    <Link to="#" className="logo-text" style={{"color": "#ffffff"}}>Iset App</Link>
    
    
                </div>
                <div className="page-sidebar-inner slimscroll">
                    <ul className="accordion-menu">
                        <li className="sidebar-title">
                            Management
                        </li>
                        <li>
                            <Link to="/users"><i className="material-icons-outlined">group</i>Users</Link>
                        </li>
                        <li>
                            <Link to="/classes" onClick={active}><i className="material-icons-outlined">school</i>Classes</Link>
                        </li>
                        <li>
                            <Link to="/courses"><i className="material-icons-outlined" style={{width: "18px"}}>books</i>Courses</Link>
                        </li>
                        <li>
                            <Link to="/teachings"><i className="material-icons">cast_for_education</i>Teachings</Link>
                        </li>
                        <li>
                            <Link to="/lectures"><i className="material-icons-outlined">local_library</i>Lectures</Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
    </Router>
    )
}
