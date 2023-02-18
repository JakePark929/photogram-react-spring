import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import StoryPage from "./image/StoryPage";
import PopularPage from "./image/PopularPage";
import UploadPage from "./image/UploadPage";
import ProfilePage from "./user/ProfilePage";
import UpdatePage from "./user/UpdatePage";
import Header from "../component/Header";
import {useSelector} from "react-redux";
import StoryMyPage from "./image/StoryMyPage";

const MainPage = () => {
    const {ip, port} = useSelector((store) => store);
    const [principal, setPrincipal] = useState({
        id:"",
        username:"",
        profileImageUrl: "",
    });

    useEffect(() => {
        fetch(ip + port + "/user/log-info").then(res => res.json()).then(res => {
            setPrincipal(res);
        });
    }, []);

    return (
        <div>
            <Header principal={principal}/>
            <Routes>
                <Route path="/" exact={true} element={<StoryPage principal={principal}/>}/>
                <Route path="/image/story" exact={true} element={<StoryPage principal={principal}/>}/>
                <Route path="/image/:id" exact={true} element={<StoryMyPage principal={principal}/>}/>
                <Route path="/image/popular" exact={true} element={<PopularPage/>}/>
                <Route path="/image/upload" exact={true} element={<UploadPage principal={principal}/>}/>
                <Route path={"/user/:id"} exact={true} element={<ProfilePage principal={principal}/>}/>
                <Route path={"/user/" + principal.id + "/update"} exact={true} element={<UpdatePage/>}/>
            </Routes>
        </div>
    );
};

export default MainPage;
