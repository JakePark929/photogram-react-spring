import React, {useEffect, useState} from 'react';
import './Update.css';
import {useSelector} from "react-redux";
import {json, useNavigate} from "react-router-dom";

const UpdatePage = () => {
    const navigate = useNavigate();
    const {ip, port} = useSelector((store) => store);
    const [updated, setUpdated] = useState(false);
    const [user, setUser] = useState({
        id: "",
        username: "",
        name: "",
        website: "",
        bio: "",
        email: "",
        phone: "",
        gender: "",
    });

    useEffect(() => {
        fetch(ip + port + "/user/log-info").then(res => res.json()).then(res => {
            setUser(res);
        });
    }, [updated]);

    const updateUser = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let details = {
            name: data.get('name'),
            password: data.get('password'),
            website: data.get('website'),
            bio: data.get('bio'),
            phone: data.get('phone'),
            gender: data.get('gender')
        };
        console.log(details);
        fetch(ip + port + "/api/user/" + user.id + "/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(details)
        })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    alert("업데이트 성공")
                    setUpdated(!updated);
                    navigate("/user/" + user.id)
                } else if (res.status === 400) {
                    alert("업데이트 실패");
                }
            })
            .then(res => {
                console.log("성공", res.json())
            })
    }

    return (
        <main className="main">
            <section className="setting-container">
                <article className="setting__content">

                    <div className="content-item__01">
                        <div className="item__img">
                            <img src={require('../../images/person.jpeg')}/>
                        </div>
                        <div className="item__username">
                            <h2>{user.username}</h2>
                        </div>
                    </div>
                    <form id="profileUpdate" onSubmit={updateUser}>
                        <div className="content-item__02">
                            <div className="item__title">이름</div>
                            <div className="item__input">
                                <input type="text" name="name" placeholder="이름"
                                       defaultValue={user.name} required/>
                            </div>
                        </div>
                        <div className="content-item__03">
                            <div className="item__title">유저네임</div>
                            <div className="item__input">
                                <input type="text" name="username" placeholder="유저네임"
                                       defaultValue={user.username} readOnly="readonly"/>
                            </div>
                        </div>
                        <div className="content-item__04">
                            <div className="item__title">패스워드</div>
                            <div className="item__input">
                                <input type="password" name="password" placeholder="패스워드" required/>
                            </div>
                        </div>
                        <div className="content-item__05">
                            <div className="item__title">웹사이트</div>
                            <div className="item__input">
                                <input type="text" name="website" placeholder="웹 사이트"
                                       defaultValue={user.website}/>
                            </div>
                        </div>
                        <div className="content-item__06">
                            <div className="item__title">소개</div>
                            <div className="item__input">
                                <textarea name="bio" id="" rows="3">{user.bio}</textarea>
                            </div>
                        </div>
                        <div className="content-item__07">
                            <div className="item__title"></div>
                            <div className="item__input">
                                <span><b>개인정보</b></span> <span>비즈니스나 반려동물 등에 사용된 계정인 경우에도
							회원님의 개인 정보를 입력하세요. 공개 프로필에는 포함되지 않습니다.</span>
                            </div>
                        </div>
                        <div className="content-item__08">
                            <div className="item__title">이메일</div>
                            <div className="item__input">
                                <input type="text" name="email" placeholder="이메일"
                                       defaultValue={user.email} readOnly="readonly"/>
                            </div>
                        </div>
                        <div className="content-item__09">
                            <div className="item__title">전화번호</div>
                            <div className="item__input">
                                <input type="text" name="phone" placeholder="전화번호"
                                       defaultValue={user.phone}/>
                            </div>
                        </div>
                        <div className="content-item__10">
                            <div className="item__title">성별</div>
                            <div className="item__input">
                                <input type="text" name="gender" defaultValue={user.gender}/>
                            </div>
                        </div>

                        <div className="content-item__11">
                            <div className="item__title"></div>
                            <div className="item__input">
                                <button type="submit">제출</button>
                            </div>
                        </div>

                    </form>
                </article>
            </section>
        </main>
    );
};

export default UpdatePage;
