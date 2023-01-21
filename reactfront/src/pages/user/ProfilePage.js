import React from 'react';
import './Profile.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faTimes} from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
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
                                  id="userProfileImage" />
                        </div>
                    </div>

                    <div className="profile-right">
                        <div className="name-group">
                            <h2>TherePrograming</h2>

                            <button className="cta" >사진등록</button>
                            <button className="cta" >구독하기</button>
                            <button className="modi" >
                                <i className="fas fa-cog"></i>
                            </button>
                        </div>

                        <div className="subscribe">
                            <ul>
                                <li><a href=""> 게시물<span>3</span>
                                </a></li>
                                <li><a href=""> 구독정보<span>2</span>
                                </a></li>
                            </ul>
                        </div>
                        <div className="state">
                            <h4>자기 소개입니다.</h4>
                            <h4>https://github.com/codingspecialist</h4>
                        </div>
                    </div>

                </div>
            </section>

            <section id="tab-content">
                <div className="profileContainer">
                    <div id="tab-1-content" className="tab-content-item show">
                        <div className="tab-1-content-inner">


                            <div className="img-box">
                                <a href=""> <img src="/images/home.jpg" />
                                </a>
                                <div className="comment">
                                    <a href="#" className=""> <i className="fas fa-heart"></i><span>0</span>
                                    </a>
                                </div>
                            </div>

                            <div className="img-box">
                                <a href=""> <img src="/images/home.jpg" />
                                </a>
                                <div className="comment">
                                    <a href="#" className=""> <i className="fas fa-heart"></i><span>0</span>
                                    </a>
                                </div>
                            </div>

                            <div className="img-box">
                                <a href=""> <img src="/images/home.jpg" />
                                </a>
                                <div className="comment">
                                    <a href="#" className=""> <i className="fas fa-heart"></i><span>0</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProfilePage;
