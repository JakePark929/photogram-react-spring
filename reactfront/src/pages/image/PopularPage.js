import React, {useEffect, useState} from 'react';
import './Popular.css';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const PopularPage = () => {
    const {ip, port} = useSelector((store) => store);
    const [images, setImages] = useState({});
    const [image, setImage] = useState({
        id: "",
        caption: "",
        postImageUrl: "",
        createDate: "",
        likeState: "",
        likeCount: ""
    });

    useEffect(() => {
        fetch(ip + port + "/api/image/popular").then(res => res.json()).then(res => {
            setImages(res.data);
        });
    }, []);

    return (
        <main className="popular">
            <div className="exploreContainer">
                <div className="popular-gallery">
                    {
                        Object.keys(images).length === 0 ? ""
                            : images.map((image, idx) =>
                                <div key={idx} className="p-img-box">
                                    <Link to={"/user/" + image.user.id}>
                                        <img src={"/upload/" + image.postImageUrl}/>
                                    </Link>
                                </div>
                            )
                    }
                </div>

            </div>
        </main>
    );
};

export default PopularPage;
