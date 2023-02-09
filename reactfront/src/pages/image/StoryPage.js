import React, {useEffect, useMemo, useRef, useState} from 'react';
import './Story.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {throttle} from "lodash";
import {click} from "@testing-library/user-event/dist/click";

let page = 0;
let htnActive = 0;

const StoryPage = () => {
    let hata = [0, 1, 2, 3, 4];

    const toggleActive = (e) => {
        console.log("클릭");
        console.log(e.target.value);
        htnActive = e.target.value;
        console.log(htnActive);
    };

    const {ip, port} = useSelector((store) => store);
    const [data, setData] = useState({
        totalPages: "",
    });
    const [images, setImages] = useState({
        // user: {
        // }
    });
    const [image, setImage] = useState({
        id: "",
        caption: "",
        postImageUrl: "",
        createDate: ""
    });
    const [user, setUser] = useState({
        id: "",
        username: "",
        name: "",
        email: "",
        phone: "",
        gender: "",
        website: "",
        bio: "",
        profileImageUrl: "",
        privateFileUrl: "",
    });

    const [btnActive, setBtnActive] = useState("");
    const toggleLike = (e) => {
       setBtnActive((prev) => {
           return e.target.value;
       })
    }

    const showData = () => {
        console.log(images);
    }

    const getPage = () => {
        fetch(ip + port + "/api/image?page=" + page).then(res => res.json()).then(res => {
            setData(res.data);
            setImages(res.data.content);
        });
    }

    useEffect(() => {
        getPage();
    }, []);

    const getNextPage = () => {
        fetch(ip + port + "/api/image?page=" + page).then(res => res.json()).then(res => {
            setImages([...images, ...res.data.content]);
        });
    }

    useEffect(() => {
        const onScrollFn = () => {
            let checkNum = window.scrollY - (document.documentElement.scrollHeight - window.outerHeight);

            if ((95 < checkNum && checkNum < 101) && page < data.totalPages) {
                page = page + 1;
                getNextPage();
            }
        }

        window.addEventListener('scroll', onScrollFn)
        return () => {
            window.removeEventListener('scroll', onScrollFn)
        };
    }, [images]);

    return (
        <main className="main">
            <section className="container">
                <button onClick={showData}>정보보기</button>
                <div className="container">
                    {hata.map((item, idx) => {
                        return (
                            <>
                                <button
                                    value={idx}
                                    className={"btn" + (idx === htnActive ? " active" : "")}
                                    onClick={toggleActive}
                                >
                                    {item}
                                </button>
                            </>
                        );
                    })}
                </div>
                {
                    Object.keys(images).length === 0 ? '' :
                        images.map((image, idx) =>
                            <article key={image.id} className="story-list" id="storyList">
                                <div className="story-list__item">
                                    <div className="sl__item__header">
                                        <div>
                                            {/*<img className="profile-image" src="#"/>*/}
                                        </div>
                                        <div>{image.user.username}</div>
                                    </div>

                                    <div className="sl__item__img">
                                        <img src={"/upload/" + image.postImageUrl}/>
                                    </div>

                                    <div className="sl__item__contents">
                                        <div className="sl__item__contents__icon">

                                            <button>
                                                <FontAwesomeIcon
                                                    icon={faHeart}
                                                    value = {idx}
                                                    className={"btn" + (idx === btnActive ? " active" : "")}
                                                    onClick={toggleLike}
                                                />
                                            </button>
                                        </div>

                                        <span className="like"><b id="storyLikeCount-1">3</b>likes</span>


                                        <div className="sl__item__contents__content">
                                            <p>{image.caption}</p>
                                        </div>

                                        <div id="storyCommentList-1">

                                            <div className="sl__item__contents__comment" id="storyCommentItem-1">
                                                <p>
                                                    <b>Lovely :</b> 부럽습니다.
                                                </p>

                                                <button>
                                                    <FontAwesomeIcon icon={faTimes}/>
                                                </button>

                                            </div>

                                        </div>

                                        <div className="sl__item__input">
                                            <input type="text" placeholder="댓글 달기..." id="storyCommentInput-1"/>
                                            <button type="button">게시</button>
                                        </div>

                                    </div>
                                </div>
                            </article>
                        )
                }
            </section>
        </main>
    );
};

export default StoryPage;
