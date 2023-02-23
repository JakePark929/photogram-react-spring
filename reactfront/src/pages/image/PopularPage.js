import React, {useEffect, useState} from 'react';
import './Popular.css';
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faEllipsisVertical, faHeart} from "@fortawesome/free-solid-svg-icons";
import {Modal} from "react-bootstrap";

const PopularPage = () => {
    const {ip, port} = useSelector((store) => store);
    const [imageIdx, setImageIdx] = useState(0);
    const [images, setImages] = useState({});
    const [image, setImage] = useState({
        id: "",
        caption: "",
        postImageUrl: "",
        createDate: "",
        likeState: "",
        likeCount: "",
        commentCount: ""
    });

    useEffect(() => {
        fetch(ip + port + "/api/image/popular").then(res => res.json()).then(res => {
            setImages(res.data);
        });
    }, []);

    // 댓글쓰기 관련
    const addComment = (imageId, imageIdx) => {
        let commentInput = document.getElementById("storyCommentInput");

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
                let copiedImages = [...images];
                copiedImages[imageIdx].comments.push(comment);
                copiedImages[imageIdx].commentCount++;
                setImages(copiedImages);
                commentInput.value = "";
            })
    }

    // 모달관련
    const [viewImage, setViewImage] = useState(false);
    const closeViewImage = () => setViewImage(false);
    const showViewImage = (e) => {
        setImageIdx(Number(e.currentTarget.id));
        setViewImage(true);
    }

    return (
        <main className="popular">
            <div className="exploreContainer">
                <div className="popular-gallery">
                    {
                        Object.keys(images).length === 0 ? ""
                            : images.map((image, idx) =>
                                <div id={idx} key={idx} className="p-img-box" onClick={showViewImage}>
                                    <img src={"/upload/" + image.postImageUrl}/>
                                    <div className="p-comment">
                                        <div className="profile-image-box">
                                            <img className="profile-image"
                                                 src={
                                                     image.user.profileImageUrl ?
                                                         "/upload/profile/" + image.user.profileImageUrl
                                                         : `/images/person.jpeg`
                                                 }
                                                 alt="profile image"
                                            />
                                            <span>{image.user.username}</span>
                                        </div>
                                        <div className="like-comment-box">
                                            <FontAwesomeIcon icon={faHeart}/>
                                            <span>{image.likeCount}</span>
                                            &nbsp;&nbsp;
                                            <FontAwesomeIcon icon={faComment}/>
                                            <span>{image.commentCount}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>

            {/*게시글 모달*/}
            <Modal className="modal-view" size="sm" show={viewImage} onHide={closeViewImage}
                   backdropClassName={"backdrop-view"} id="modal-view">
                <div className="view-image">
                    {
                        images[0] !== undefined ?
                            <img
                                src={"/upload/" + images[imageIdx].postImageUrl}
                                alt="myImage"
                            />
                            : ""
                    }
                </div>
                <Modal.Body className="view-content">
                    <div className="view-header">
                        <div>
                            <img className="profile-image"
                                 src={
                                     images[0] !== undefined ?
                                         "/upload/profile/" + images[imageIdx].user.profileImageUrl
                                         : `/images/person.jpeg`
                                 }
                                 alt="profile image"
                            />
                            <a href={images[0] !== undefined ? "/user/" + images[imageIdx].user.id : ""}>
                                <label style={{cursor: "pointer"}}>{images[0] !== undefined ? images[imageIdx].user.username : ""}</label>
                            </a>
                            <button onClick={() => {
                            }}>
                                <FontAwesomeIcon icon={faEllipsisVertical}/>
                            </button>
                        </div>
                    </div>
                    <div className="view-contents">
                        <div className="view-content-list">
                            {
                                images[0] !== undefined ?
                                    images[imageIdx].caption
                                    : ""
                            }
                        </div>
                        <div className="view-comment-list">
                            {
                                images[0] !== undefined ?
                                    images[imageIdx].comments.map((comment) =>
                                        <div key={comment.id} className="comment"
                                            // onMouseEnter={() => showTimes(comment.id)}
                                            // onMouseLeave={() => hideTimes(comment.id)}
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
                                            {/*{*/}
                                            {/*    (principal.id === comment.user.id || principal.id === Number(pageNumber)) && times.includes(comment.id) ?*/}
                                            {/*        <button>*/}
                                            {/*            <FontAwesomeIcon icon={faTimes}*/}
                                            {/*                             onClick={() => commentRemove(imageIdx, comment.id)}/>*/}
                                            {/*        </button>*/}
                                            {/*        : ""*/}
                                            {/*}*/}
                                        </div>
                                    )
                                    : ""
                            }
                        </div>
                    </div>
                    <div className="view-footer">
                        <div className="profile__item__input">
                            <input type="text" placeholder="댓글 달기..."
                                   id={"storyCommentInput"}/>
                            <button type="button"
                                    onClick={() => addComment(images[imageIdx].id, imageIdx)}
                            >게시
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </main>
    )
        ;
};

export default PopularPage;
