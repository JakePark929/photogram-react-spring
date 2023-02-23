import React, {useEffect, useRef, useState} from 'react';
import './Profile.css'
import {useLocation, useNavigate} from "react-router-dom";
import {faCog, faComment, faEllipsisVertical, faHeart, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Modal} from "react-bootstrap";
import {useSelector} from "react-redux";

const ProfilePage = (props) => {
    const {ip, port, storeIp, storePort} = useSelector((store) => store);
    const navigate = useNavigate();
    const url = useLocation().pathname;
    let pageNumber = url.substring(url.lastIndexOf("/") + 1);
    const principal = props.principal;
    const imgRef = useRef(null);
    const [imageIdx, setImageIdx] = useState(0);
    const [times, setTimes] = useState("");
    const [saveState, setSaveState] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [profile, setProfile] = useState("");
    const [data, setData] = useState({
        pageOwnerState: "",
        imageCount: "",
        subscribeState: "",
        subscribeCount: "",
        subscribedCount: "",
        user: {
            images: [],
        },
    });
    // const [user, setUser] = useState({
    //     id: "",
    //     username: "",
    //     name: "",
    //     email: "",
    //     phone: "",
    //     gender: "",
    //     website: "",
    //     bio: "",
    //     profileImageUrl: "",
    //     privateFileUrl: "",
    //     images: {
    //         id: "",
    //         caption: "",
    //         postImageUrl: "",
    //         createDate: "",
    //     },
    //     isPageOwner: ""
    // });
    const [image, setImage] = useState({
        id: "",
        caption: "",
        postImageUrl: "",
        createDate: "",
        likeCount: "",
        commentCount: ""
    });

    const changeProfileImage = () => {
        const file = imgRef.current.files[0];

        if (file !== undefined) {
            if (!file.type.match("image.*")) {
                alert("이미지 파일만 업로드 가능합니다.");
                imgRef.current.value = "";
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProfile(reader.result);
                saveProfileImage()
                // setSaveState(true);
            };
        } else {
            setProfile("");
        }
    }

    const saveProfileImage = () => {
        let profile = imgRef.current.files[0];
        let formData = new FormData();
        formData.append("profileImageFile", profile)
        fetch("/api/user/" + principal.id + "/profileImageUrl", {
            method: "PUT",
            body: formData
            // contentType: false, // 필수: x-www-form-urlencoded 로 파싱되는 것을 방지
            // processData: false, // contentType을 false로 줬을 때 QueryString 자동 설정 됨. 해제
            // enctype: "multipart/form-data",
            // datatype: "json",
        })
            .then(res => {
                if (res.status === 200) {
                    alert("프로필이미지 수정에 성공하였습니다.");
                    setSaveState(false);
                    setUpdated(!updated);
                } else {
                    alert("프로필이미지 수정에 실패하였습니다.");
                }
            })
    }

    const cancelProfileImage = () => {
        setProfile("");
        setSaveState(false);
    }

    const profileImageUpload = () => {
        document.getElementById('userProfileImageInput').click();
        closeProfileImage();
    }

    useEffect(() => {
        fetch(ip + port + "/api/user/" + pageNumber).then(res => res.json()).then(res => {
            setData(res.data);
        });
    }, [updated, url]);

    const subscribe = () => {
        fetch(ip + port + "/api/subscribe/" + pageNumber, {
            method: "POST",
        })
            .then(res => {
                console.log(1, res)
                if (res.status === 200) {
                    let copiedData = {...data};
                    copiedData.subscribeState = true;
                    copiedData.subscribedCount++;
                    setData(copiedData);
                } else {
                    alert("구독 실패");
                }
            })
    }

    const unSubscribe = () => {
        fetch(ip + port + "/api/subscribe/" + pageNumber, {
            method: "DELETE",
        })
            .then(res => {
                console.log(1, res)
                if (res.status === 200) {
                    let copiedData = {...data};
                    copiedData.subscribeState = false;
                    copiedData.subscribedCount--;
                    setData(copiedData);
                } else {
                    alert("구독취소 실패");
                }
            })
    }

    const logout = () => {
        fetch(ip + port + "/logout", {
            method: "GET",
        })
            .then(res => {
                console.log(1, res)
                if (res.status === 200) {
                    navigate("/auth/sign-in");
                }
            })
    }

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
                let copiedData = {...data};
                copiedData.user.images[imageIdx].comments.push(comment);
                copiedData.user.images[imageIdx].commentCount++;
                setData(copiedData);
                commentInput.value = "";
            })
    }

    // 댓글 삭제 관련
    const showTimes = (commentId) => {
        setTimes([commentId]);
    }

    const hideTimes = (commentId) => {
        setTimes([times.filter((v) => v !== commentId)]);
    }

    const commentRemove = (imageIdx, commentId) => {
        console.log("삭제", imageIdx, commentId);
        fetch("/api/comment/" + commentId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
        })
            .then(res => {
                if (res.status === 200) {
                    let copiedData = {...data};
                    copiedData.user.images[imageIdx].comments
                        = copiedData.user.images[imageIdx].comments.filter(comment => comment.id !== commentId);
                    copiedData.user.images[imageIdx].commentCount--;
                    setData(copiedData);
                } else if (res.status === 400) {
                    alert("댓글 삭제 실패");
                }
            })
    }

    // 게시글 삭제 관련
    const deletePost = () => {
        let imageId = data.user.images[imageIdx].id
        fetch("/api/image/" + imageId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
        })
            .then(res => {
                if (res.status === 200) {
                    setImageIdx(0);
                    closePostSetting();
                    closeViewImage();
                    let copiedData = {...data};
                    copiedData.user.images = copiedData.user.images.filter(image => image.id !== imageId);
                    setData(copiedData);
                } else {
                    alert("게시글 삭제에 실패하였습니다.");
                }
            })
    }

    // 파일 다운로드 관련
    const imageDownload = () => {

    }

    // 모달 관련
    const [profileImage, setProfileImage] = useState(false);
    const closeProfileImage = () => setProfileImage(false);
    const showProfileImage = () => setProfileImage(true);

    const [userSetting, setUserSetting] = useState(false);
    const closeUserSetting = () => setUserSetting(false);
    const showUserSetting = () => setUserSetting(true);

    const [followingList, setFollowingList] = useState(false);
    const closeFollowingList = () => setFollowingList(false);
    const showFollowingList = () => setFollowingList(true);

    const [viewImage, setViewImage] = useState(false);
    const closeViewImage = () => setViewImage(false);
    const showViewImage = (e) => {
        setImageIdx(Number(e.currentTarget.id));
        setViewImage(true);
    }

    const [postSetting, setPostSetting] = useState(false);
    const closePostSetting = () => setPostSetting(false);
    const showPostSetting = () => setPostSetting(true);

    const showData = () => {
        console.log(data.user.images);
        console.log(typeof Object.keys(data.user.images));
    }

    return (
        <>
            <section className="profile">
                <div className="profileContainer">

                    <div className="profile-left">
                        <div className="profile-img-wrap story-border"
                             onClick={pageNumber === String(principal.id) ? showProfileImage : null}
                        >
                            <form id="userProfileImageForm">
                                <input type="file" name="profileImageFile" style={{display: "none"}}
                                       id="userProfileImageInput" ref={imgRef} onChange={changeProfileImage}/>
                            </form>

                            <img
                                className="profile-image"
                                src={
                                    data.user.profileImageUrl ?
                                        "/upload/profile/" + data.user.profileImageUrl
                                        : `/images/person.jpeg`
                                }
                                id="userProfileImage"
                                alt="upload image"
                            />
                        </div>
                        {
                            saveState ?
                                <div>
                                    <button style={{marginTop: '-1px'}} onClick={saveProfileImage}>저장</button>
                                    <button style={{marginTop: '-1px', marginLeft: '7px'}}
                                            onClick={cancelProfileImage}>취소
                                    </button>
                                </div>
                                : ""
                        }
                    </div>

                    <div className="profile-right">
                        <div className="name-group">
                            <h2>{data.user.username}</h2>
                            {
                                data.pageOwnerState ?
                                    <button className="cta" onClick={() => navigate("/image/upload")}>사진등록</button>
                                    : data.subscribeState ?
                                        <button className="cta blue" onClick={unSubscribe}>구독취소</button>
                                        : <button className="cta" onClick={subscribe}>구독하기</button>
                            }
                            <button className="cta" onClick={showData}>유저정보</button>
                            <button className="modi" onClick={showUserSetting}>
                                <FontAwesomeIcon icon={faCog}/>
                            </button>
                        </div>

                        <div className="subscribe">
                            <ul>
                                <li>
                                    게시물 <span>{data.imageCount}</span>
                                </li>
                                <li onClick={showFollowingList}>
                                    팔로잉 <span>{data.subscribeCount}</span>
                                </li>
                                <li onClick={showFollowingList}>
                                    팔로워 <span>{data.subscribedCount}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="state">
                            <h4>{data.user.bio}</h4>
                            <h4>{data.user.website}</h4>
                        </div>
                    </div>

                </div>
            </section>

            <section id="tab-content">
                <div className="profileContainer">
                    <div id="tab-1-content" className="tab-content-item show">
                        <div className="tab-1-content-inner">
                            {
                                data.user.images.length === '' ? '' :
                                    data.user.images.map((image, idx) =>
                                        <div id={String(idx)} key={idx} className="img-box" onClick={showViewImage}>
                                            <img
                                                src={"/upload/" + image.postImageUrl}
                                                alt="myImage"
                                            />
                                            <div className="comment">
                                                <a href="#" className="">
                                                    <FontAwesomeIcon icon={faHeart}/>
                                                    <span>{image.likeCount}</span>
                                                </a>
                                                <a href="#" className="">
                                                    <FontAwesomeIcon icon={faComment}/>
                                                    <span>{image.commentCount}</span>
                                                </a>
                                            </div>
                                        </div>)
                            }
                        </div>
                    </div>
                </div>
            </section>

            {/*프로필사진 바꾸기 모달*/}
            <Modal className="modal-image" size="sm" show={profileImage} onHide={closeProfileImage}>
                <Modal.Body className="modal">
                    <p>프로필 사진 바꾸기</p>
                    <button onClick={profileImageUpload}>사진 업로드</button>
                    <button onClick={closeProfileImage}>취소</button>
                </Modal.Body>
            </Modal>

            {/*회원정보 모달*/}
            <Modal className="modal-info" size="sm" show={userSetting} onHide={closeUserSetting}>
                <Modal.Body className="modal">
                    <button onClick={() => navigate("/user/" + principal.id + "/update")}>
                        회원정보변경
                    </button>
                    <button onClick={logout}>
                        로그아웃
                    </button>
                    <button onClick={closeUserSetting}>
                        취소
                    </button>
                </Modal.Body>
            </Modal>

            {/*팔로잉리스트 모달*/}
            <Modal className="modal-subscribe" size="sm" show={followingList} onHide={closeFollowingList}>
                <Modal.Body className="subscribe">
                    <div className="subscribe-header">
                        <span>구독정보</span>
                        <button onClick={closeFollowingList}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                    </div>

                    <div className="subscribe-list" id="subscribeModalList">

                        <div className="subscribe__item" id="subscribeModalItem-1">
                            <div className="subscribe__img">
                                <img src="#"/>
                            </div>
                            <div className="subscribe__text">
                                <h2>love</h2>
                            </div>
                            <div className="subscribe__btn">
                                <button className="cta blue" onClick={()=>{}}>구독취소</button>
                            </div>
                        </div>

                        <div className="subscribe__item" id="subscribeModalItem-2">
                            <div className="subscribe__img">
                                <img src="#"/>
                            </div>
                            <div className="subscribe__text">
                                <h2>ssar</h2>
                            </div>
                            <div className="subscribe__btn">
                                <button className="cta blue" onClick={unSubscribe}>구독취소</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/*게시글 모달*/}
            <Modal className="modal-view" size="sm" show={viewImage} onHide={closeViewImage}
                   backdropClassName={"backdrop-view"} id="modal-view">
                <div className="view-image">
                    {
                        data.pageOwnerState !== '' && data.user.images[0] !== undefined ?
                            <img
                                src={"/upload/" + data.user.images[imageIdx].postImageUrl}
                                alt="myImage"
                            />
                            : ""
                    }
                </div>
                <Modal.Body className="view-content">
                    <div className="view-header">
                        <span>{data.user.username}</span>
                        <button onClick={showPostSetting}>
                            <FontAwesomeIcon icon={faEllipsisVertical}/>
                        </button>
                    </div>
                    <div className="view-contents">
                        <div className="view-content-list">
                            {
                                data.pageOwnerState !== '' && data.user.images[0] !== undefined ?
                                    data.user.images[imageIdx].caption
                                    : ""
                            }
                        </div>
                        <div className="view-comment-list">
                            {
                                data.pageOwnerState !== '' && data.user.images[0] !== undefined ?
                                    data.user.images[imageIdx].comments.map((comment) =>
                                        <div key={comment.id} className="comment"
                                             onMouseEnter={() => showTimes(comment.id)}
                                             onMouseLeave={() => hideTimes(comment.id)}>
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
                                                (principal.id === comment.user.id || principal.id === Number(pageNumber)) && times.includes(comment.id) ?
                                                    <button>
                                                        <FontAwesomeIcon icon={faTimes}
                                                                         onClick={() => commentRemove(imageIdx, comment.id)}/>
                                                    </button>
                                                    : ""
                                            }
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
                                    onClick={() => addComment(data.user.images[imageIdx].id, imageIdx)}>게시
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/*게시글 수정 모달*/}
            <Modal className="modal-post" size="sm" show={postSetting} onHide={closePostSetting}
                   backdropClassName={"backdrop-set"} id="modal-post">
                <Modal.Body className="modal-post-body">
                    {
                        principal.id === data.user.id ?
                        <button style={{color: "#F35369", fontWeight: 600}} onClick={deletePost}>
                            게시글 삭제
                        </button> : ""
                    }
                    {
                        principal.id === data.user.id ?
                        <button onClick={() => {
                        }}>
                            게시글 수정
                        </button>  : ""
                    }
                    <button style={{color: "#77DD77", fontWeight: 600}} onClick={imageDownload}>
                        사진 다운로드
                    </button>
                    <button onClick={closePostSetting}>
                        취소
                    </button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ProfilePage;
