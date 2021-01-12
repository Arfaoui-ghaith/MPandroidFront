import React from 'react'
import {Link, BrowserRouter as Router} from 'react-router-dom';

export default function Header() {
    return (
        <Router>
        <div className="page-header">
            <nav className="navbar navbar-expand">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="navbar-nav">
                    
                    <li className="nav-item small-screens-sidebar-link">
                        <Link to="#" className="nav-link"><i className="material-icons-outlined">menu</i></Link>
                    </li>
                    <li className="nav-item nav-profile dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src="../../assets/images/avatars/profile-image-1.png" alt="profile_image"/>
                            <span>Sarra GB</span><i className="material-icons dropdown-icon">keyboard_arrow_down</i>
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="#">Log out</Link>
                        </div>
                    </li>
                    
                    <li className="nav-item">
                        <Link to="#" className="nav-link" id="dark-theme-toggle"><i className="material-icons-outlined">brightness_2</i><i className="material-icons">brightness_2</i></Link>
                    </li>
                </ul>
                
            </nav>
        </div>
        </Router>
    )
}
