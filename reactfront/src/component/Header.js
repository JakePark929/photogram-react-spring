import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import {faCompass, faUser} from "@fortawesome/free-regular-svg-icons";

const Header = () => {

    return (
        <div>
            <header className="header">
                <div className="container">
                    <a href="/" className="logo">
                        <img src="/images/logo.jpg" alt=""/>
                    </a>
                    <nav className="navi">
                        <ul className="navi-list">
                            <li className="navi-item">
                                <FontAwesomeIcon icon={faHouse} />
                            </li>
                            <li className="navi-item">
                                <FontAwesomeIcon icon={faCompass} />
                            </li>
                            <li className="navi-item">
                                <FontAwesomeIcon icon={faUser} />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Header;
