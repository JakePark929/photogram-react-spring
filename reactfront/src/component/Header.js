import React, {useEffect, useState} from 'react';
import './Header.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {faCompass, faUser} from "@fortawesome/free-regular-svg-icons";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const {ip, port} = useSelector((store) => store);
    const [user, setUser] = useState({
        id: "",
        username: ""
    });

    useEffect(() => {
        fetch(ip + port + "/user/log-info").then(res => res.json()).then(res => {
            setUser(res);
        });
    }, []);

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
                                <FontAwesomeIcon icon={faHouse} onClick={() => navigate("/image/story")} style={{cursor:"pointer"}}/>
                            </li>
                            <li className="navi-item">
                                <FontAwesomeIcon icon={faCompass} onClick={() => navigate("/image/popular")} style={{cursor:"pointer"}}/>
                            </li>
                            <li className="navi-item">
                                <FontAwesomeIcon icon={faUser} onClick={() => navigate("/user/"+user.id)} style={{cursor:"pointer"}}/>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Header;
