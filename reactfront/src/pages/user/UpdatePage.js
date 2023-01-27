import React from 'react';
import './Update.css';

const UpdatePage = () => {
    return (
        <main className="main">
            <section className="setting-container">
                <article className="setting__content">

                    <div className="content-item__01">
                        <div className="item__img">
                            <img src="#"/>
                        </div>
                        <div className="item__username">
                            <h2>TherePrograming</h2>
                        </div>
                    </div>
                    <form id="profileUpdate">
                        <div className="content-item__02">
                            <div className="item__title">이름</div>
                            <div className="item__input">
                                <input type="text" name="name" placeholder="이름"
                                       value="겟인데어" />
                            </div>
                        </div>
                        <div className="content-item__03">
                            <div className="item__title">유저네임</div>
                            <div className="item__input">
                                <input type="text" name="username" placeholder="유저네임"
                                       value="TherePrograming" readOnly="readonly" />
                            </div>
                        </div>
                        <div className="content-item__04">
                            <div className="item__title">패스워드</div>
                            <div className="item__input">
                                <input type="password" name="password" placeholder="패스워드"  />
                            </div>
                        </div>
                        <div className="content-item__05">
                            <div className="item__title">웹사이트</div>
                            <div className="item__input">
                                <input type="text" name="website" placeholder="웹 사이트"
                                       value="https://github.com/codingspecialist" />
                            </div>
                        </div>
                        <div className="content-item__06">
                            <div className="item__title">소개</div>
                            <div className="item__input">
                                <textarea name="bio" id="" rows="3">프로그래머</textarea>
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
                                       value="getinthere@naver.com" readOnly="readonly" />
                            </div>
                        </div>
                        <div className="content-item__09">
                            <div className="item__title">전회번호</div>
                            <div className="item__input">
                                <input type="text" name="tel" placeholder="전화번호"
                                       value="0102222" />
                            </div>
                        </div>
                        <div className="content-item__10">
                            <div className="item__title">성별</div>
                            <div className="item__input">
                                <input type="text" name="gender" value="남" />
                            </div>
                        </div>

                        <div className="content-item__11">
                            <div className="item__title"></div>
                            <div className="item__input">
                                <button>제출</button>
                            </div>
                        </div>

                    </form>
                </article>
            </section>
        </main>
    );
};

export default UpdatePage;
