import React from 'react';
import './style.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import {Link, useNavigate} from "react-router-dom";

const SignInPage = () => {
    const url="http://localhost:9000"
    const navigate = useNavigate();
    const signIn = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const details = {
            username: data.get('username'),
            password: data.get('password'),
        }
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(url + "/auth/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: formBody,
        })
            .then(res => {
                const form = res.url.substring(res.url.lastIndexOf(":"));
                const url = form.slice(form.indexOf("/"));
                if (res.status === 200) {
                    navigate(url);
                } else {
                    alert("로그인 실패!");
                }
            })
    }

    return (
        <div className="container">
            <main className="loginMain">
                <section className="login">
                    <article className="login__form__container">
                        <div className="login__form">
                            <h1><img src="/images/logo.jpg"/></h1>

                            <form className="login__input" onSubmit={signIn}>
                                <input type="text" name="username" placeholder="유저네임" required="required"/>
                                <input type="password" name="password" placeholder="비밀번호" required="required"/>
                                <button type="submit">로그인</button>
                            </form>

                            <div className="login__horizon">
                                <div className="br"></div>
                                <div className="or">또는</div>
                                <div className="br"></div>
                            </div>

                            <div className="login__facebook">
                                <button>
                                    <FontAwesomeIcon icon={faFacebook} />
                                    <span>Facebook으로 로그인</span>
                                </button>
                            </div>
                        </div>

                        <div className="login__register">
                            <span>계정이 없으신가요?</span>
                            <Link to={"/auth/sign-up"} style={{textDecoration: 'none'}}>
                                <label>가입하기</label>
                            </Link>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    );
};

export default SignInPage;
