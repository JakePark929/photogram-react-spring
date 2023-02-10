import React, {useEffect, useState} from 'react';
import './Story.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";

let page = 0;

const StoryPage = () => {
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
        createDate: "",
        likeState: "",
        likeCount: ""
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
    
    // 좋아요 리스트
    const [select, setSelect] = useState([]);

    const iLike = (id) => {
        let item = images.find((image)=>image.id === id);
        if (item.likeState === false) {
            fetch("/api/image/" + id + "/likes", {
                method: "POST",
            })
                .then(res => {
                    if (res.status === 201) {
                        let findIndex = images.findIndex(item => item.id === id);
                        let copiedImages = [...images];
                        copiedImages[findIndex].likeState = true;
                        copiedImages[findIndex].likeCount++;
                        setImages(copiedImages);
                    } else {
                        alert("좋아요 실패");
                    }
                })
        } else {
            fetch("/api/image/" + id + "/likes", {
                method: "DELETE",
            })
                .then(res => {
                    if (res.status === 200) {
                        let findIndex = images.findIndex(item => item.id === id);
                        let copiedImages = [...images];
                        copiedImages[findIndex].likeState = false;
                        copiedImages[findIndex].likeCount--;
                        setImages(copiedImages);
                    } else {
                        alert("좋아요 취소 실패");
                    }
                })
        }
    }

    // 페이지 불러오기 관련
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
                {
                    Object.keys(images).length === 0 ? '' :
                        images.map((image, idx) =>
                            <article key={idx} className="story-list" id="storyList">
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
                                                    // className={select.includes(image.id) ? "likeButton active" : "likeButton"}
                                                    className={image.likeState ? "likeButton active" : "likeButton"}
                                                    // onClick={() => {
                                                    //     !select.includes(image.id) ?
                                                    //         setSelect(() => [...select, image.id])
                                                    //         : setSelect(select.filter((value) => value !== image.id))
                                                    // }}
                                                    onClick={() => iLike(image.id)}
                                                />
                                            </button>
                                        </div>

                                        <span className="like"><b id="storyLikeCount-1">{image.likeCount}</b>likes</span>


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
