import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import StoryPage from "./image/StoryPage";
import PopularPage from "./image/PopularPage";
import UploadPage from "./image/UploadPage";
import ProfilePage from "./user/ProfilePage";
import UpdatePage from "./user/UpdatePage";
import Header from "../component/Header";
import {useSelector} from "react-redux";

const MainPage = () => {
    const {ip, port} = useSelector((store) => store);
    const [user, setUser] = useState({
        id:"",
        username:""
    });

    useEffect(() => {
        fetch(ip + port + "/user/log-info").then(res => res.json()).then(res => {
            setUser(res);
        });
    }, []);

    return (
        <div>
            <Header user={user}/>
            <Routes>
                <Route path="/" exact={true} element={<StoryPage/>}/>
                <Route path="/image/story" exact={true} element={<StoryPage/>}/>
                <Route path="/image/popular" exact={true} element={<PopularPage/>}/>
                <Route path="/image/upload" exact={true} element={<UploadPage id={user.id}/>}/>
                <Route path={"/user/" + user.id} exact={true} element={<ProfilePage/>}/>
                <Route path={"/user/" + user.id + "/update"} exact={true} element={<UpdatePage/>}/>
            </Routes>
        </div>
    );
};

export default MainPage;
