import React, {useEffect, useState} from 'react';
import './Profile.css'
import {useLocation, useNavigate} from "react-router-dom";
import {faCog, faHeart} from "@fortawesome/free-solid-svg-icons";
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
        pageOwner: "",
        imageCount: "",
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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const showData = () => {
        console.log(data);
        console.log(data.user.images);
    }

    useEffect(() => {
        fetch(ip + port + "/api/user/" + pageNumber).then(res => res.json()).then(res => {
            setData(res.data);
        });
    }, []);

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
                                data.pageOwner ?
                                    <button className="cta" onClick={() => navigate("/image/upload")}>사진등록</button>
                                    : <button className="cta">구독하기</button>
                            }
                            {/*<button className="cta" onClick={showData}>유저정보</button>*/}
                            <button className="modi" onClick={handleShow}>
                                <FontAwesomeIcon icon={faCog}/>
                            </button>
                        </div>

                        <div className="subscribe">
                            <ul>
                                <li><a href=""> 게시물<span>{data.imageCount}</span>
                                </a></li>
                                <li><a href=""> 구독정보<span>2</span>
                                </a></li>
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


            {/*모달*/}
            <Modal className="modal-info" size="sm" show={show} onHide={handleClose}>
                <Modal.Body className="modal">
                    <button onClick={() => navigate("/user/" + principal.id + "/update")}>
                        회원정보변경
                    </button>
                    <button onClick={logout}>
                        로그아웃
                    </button>
                    <button onClick={handleClose}>
                        취소
                    </button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ProfilePage;
