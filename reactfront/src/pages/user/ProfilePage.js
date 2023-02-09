import React, {useEffect, useState} from 'react';
import './Profile.css'
import {useLocation, useNavigate} from "react-router-dom";
import {faCog, faHeart, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Modal} from "react-bootstrap";
import {useSelector} from "react-redux";

const ProfilePage = (props) => {
    const {ip, port, storeIp, storePort} = useSelector((store) => store);
    const navigate = useNavigate();
    const url = useLocation().pathname;
    let pageNumber = url.substring(url.lastIndexOf("/") + 1);
    const principal = props.principal;
    const [data, setData] = useState({
        pageOwnerState: "",
        imageCount: "",
        subscribeState: "",
        subscribeCount: "",
        user: {
            images: "",

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
    });

    useEffect(() => {
        fetch(ip + port + "/api/user/" + pageNumber).then(res => res.json()).then(res => {
            setData(res.data);
        });
    }, []);

    const subscribe = () => {
        fetch(ip + port + "/api/subscribe/" + pageNumber, {
            method: "POST",
        })
            .then(res => {
                console.log(1, res)
                if (res.status === 200) {
                    setData({
                        ...data,
                        subscribeState: true,
                    });
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
                    setData({
                        ...data,
                        subscribeState: false,
                    })
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

    // 모달 관련
    const [userSetting, setUserSetting] = useState(false);
    const closeUserSetting = () => setUserSetting(false);
    const showUserSetting = () => setUserSetting(true);

    const [followingList, setFollowingList] = useState(false);
    const closeFollowingList = () => setFollowingList(false);
    const showFollowingList = () => setFollowingList(true);

    const showData = () => {
        console.log(data);
        console.log(data.user.images);
    }

    return (
        <>
            <section className="profile">
                <div className="profileContainer">

                    <div className="profile-left">
                        <div className="profile-img-wrap story-border"
                        >
                            <form id="userProfileImageForm">
                                {/*<input type="file" name="profileImageFile" style="display: none;"*/}
                                {/*       id="userProfileImageInput" />*/}
                            </form>

                            <img className="profile-image" src="#"
                                 id="userProfileImage"/>
                        </div>
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
                            {/*<button className="cta" onClick={showData}>유저정보</button>*/}
                            <button className="modi" onClick={showUserSetting}>
                                <FontAwesomeIcon icon={faCog}/>
                            </button>
                        </div>

                        <div className="subscribe">
                            <ul>
                                <li><a href="">
                                    게시물 <span>{data.imageCount}</span>
                                </a></li>
                                <li onClick={showFollowingList}>
                                    팔로잉 <span>{data.subscribeCount}</span>
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
                                data.user.images === '' ? '' :
                                    data.user.images.map((image) =>
                                        <div className="img-box">
                                            <a href="">
                                                <img
                                                    src={"/upload/" + image.postImageUrl}
                                                    alt="myImage"
                                                />
                                            </a>
                                            <div className="comment">
                                                <a href="#" className=""><FontAwesomeIcon icon={faHeart}/>
                                                    <span>0</span>
                                                </a>
                                            </div>
                                        </div>)
                            }
                        </div>
                    </div>
                </div>
            </section>


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
                                <button className="cta blue" onClick={unSubscribe}>구독취소</button>
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
        </>
    );
};

export default ProfilePage;
