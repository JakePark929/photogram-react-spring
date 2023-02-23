import React, {useEffect, useState} from 'react';
import './Story.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

let page = 0;

const StoryPage = (props) => {
        const {ip, port} = useSelector((store) => store);
        const principal = props.principal;
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
        const [comment, setComment] = useState({
            content: "",
            id: "",
            user: {
                username: "",
            }
        });
        const [comments, setComments] = useState([]);

        // 좋아요 리스트
        const iLike = (id) => {
            let item = images.find((image) => image.id === id);
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
            page = 0;
            getPage();
        }, []);

        // 무한 스크롤 관련
        const getNextPage = () => {
            fetch(ip + port + "/api/image?page=" + page).then(res => res.json()).then(res => {
                setImages([...images, ...res.data.content]);
            });
        }

        useEffect(() => {
            const onScrollFn = () => {
                let checkNum = window.scrollY - (document.documentElement.scrollHeight - window.outerHeight);

                if ((95 < checkNum && checkNum < 101) && page < data.totalPages - 1) {
                    page = page + 1;
                    getNextPage();
                }
            }

            window.addEventListener('scroll', onScrollFn)
            return () => {
                window.removeEventListener('scroll', onScrollFn)
            };
        }, [images]);

        // 댓글 쓰기 관련
        const addComment = (imageId) => {
            let commentInput = document.getElementById("storyCommentInput-" + imageId);

            if (commentInput.value === "") {
                alert("댓글을 작성해 주세요!");
                return;
            }

            let request = {
                imageId: imageId,
                content: commentInput.value
            }

            fetch("/api/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(request)
            })
                .then(res => {
                    if (res.status === 201) {
                        return res.json();
                    } else if (res.status === 400) {
                        alert("댓글쓰기 실패");
                    }
                })
                .then(res => {
                    let comment = res.data;
                    let image = images.find(i => i.id === imageId);
                    image.comments.push(comment);
                    setImages([...images, image]);
                    commentInput.value = "";
                })
        }

        // 댓글 삭제
        const commentRemove = (imageId, commentId) => {
            fetch("/api/comment/" + commentId, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
            })
                .then(res => {
                    if (res.status === 200) {
                        let image = images.find(i => i.id === imageId);
                        image.comments = image.comments.filter(comment => comment.id !== commentId);
                        setImages([...images, image]);
                    } else if (res.status === 400) {
                        alert("댓글 삭제 실패");
                    }
                })
        }

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
                                                <img className="profile-image"
                                                     src={
                                                         image.user.profileImageUrl ?
                                                             "/upload/profile/" + image.user.profileImageUrl
                                                             : `/images/person.jpeg`
                                                     }
                                                     alt="profile image"
                                                />
                                            </div>
                                            <a href={"/user/" + image.user.id}
                                               style={{textDecoration: "none", color: "black"}}>
                                                <div>{image.user.username}</div>
                                            </a>
                                        </div>

                                        <div className="sl__item__img">
                                            <img src={"/upload/" + image.postImageUrl} alt="profile image"/>
                                        </div>

                                        <div className="sl__item__contents">
                                            <div className="sl__item__contents__icon">

                                                <button>
                                                    <FontAwesomeIcon
                                                        icon={faHeart}
                                                        // className={select.includes(image.id) ? "likeButton active" : "likeButton"}
                                                        // onClick={() => {
                                                        //     !select.includes(image.id) ?
                                                        //         setSelect(() => [...select, image.id])
                                                        //         : setSelect(select.filter((value) => value !== image.id))
                                                        // }}
                                                        className={image.likeState ? "likeButton active" : "likeButton"}
                                                        onClick={() => iLike(image.id)}
                                                    />
                                                </button>
                                            </div>

                                            <span className="like"><b
                                                id="storyLikeCount-1">{image.likeCount}</b>likes</span>


                                            <div className="sl__item__contents__content">
                                                <p>{image.caption}</p>
                                            </div>

                                            <div id={"storyCommentList-" + image.id}>
                                                {
                                                    image.comments.map((comment, idx) =>
                                                        <div className="sl__item__contents__comment"
                                                             key={idx}
                                                        >
                                                            <p>
                                                                <b>
                                                                    <a href={"/user/" + comment.user.id}
                                                                       style={{textDecoration: "none", color: "black"}}>
                                                                        {comment.user.username}
                                                                    </a>
                                                                    &nbsp;:
                                                                </b> {comment.content}
                                                            </p>
                                                            {
                                                                principal.id === comment.user.id || principal.id === image.user.id ?
                                                                    <button>
                                                                        <FontAwesomeIcon icon={faTimes}
                                                                                         onClick={() => commentRemove(image.id, comment.id)}/>
                                                                    </button>
                                                                    : ""
                                                            }
                                                        </div>
                                                    )
                                                }


                                            </div>

                                            <div className="sl__item__input">
                                                <input type="text" placeholder="댓글 달기..."
                                                       id={"storyCommentInput-" + image.id}/>
                                                <button type="button" onClick={() => addComment(image.id)}>게시</button>
                                            </div>

                                        </div>
                                    </div>
                                </article>
                            )
                    }
                </section>
            </main>
        );
    }
;

export default StoryPage;
