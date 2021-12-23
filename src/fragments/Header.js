import React from 'react'
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <div className="">
            <nav className="navbar navbar-expand-md navbar-dark navbar-primary">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <span className="brand-text font-weight-light"><strong>RPI Dashboard</strong></span>
                    </Link>
                    <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse order-3" id="navbarCollapse">
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                            <li className="nav-item"> <Link to="/notepad" className="nav-link">NotePad</Link></li>
                            <li className="nav-item"> <Link to="/settings" className="nav-link">Settings</Link></li>
                            {/* Default Dropdown Menu of AdminLTE */}
                            <li className="nav-item dropdown">
                                <Link id="dropdownSubMenu1" to="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">Dropdown</Link>
                                <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow">
                                    <li><Link to="#" className="dropdown-item">Some action </Link></li>
                                    <li><Link to="#" className="dropdown-item">Some other action</Link></li>

                                    <li className="dropdown-divider"></li>

                                    <li className="dropdown-submenu dropdown-hover">
                                        <Link id="dropdownSubMenu2" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">Hover for action</Link>
                                        <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                                            <li>
                                                <Link tabIndex="-1" to="#" className="dropdown-item">level 2</Link>
                                            </li>

                                            <li className="dropdown-submenu">
                                                <Link id="dropdownSubMenu3" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">level 2</Link>
                                                <ul aria-labelledby="dropdownSubMenu3" className="dropdown-menu border-0 shadow">
                                                    <li><Link to="#" className="dropdown-item">3rd level</Link></li>
                                                    <li><Link to="#" className="dropdown-item">3rd level</Link></li>
                                                </ul>
                                            </li>

                                            <li><Link to="#" className="dropdown-item">level 2</Link></li>
                                            <li><Link to="#" className="dropdown-item">level 2</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>                      
                    </div>
                </div>
            </nav>
        </div>
    )
}





