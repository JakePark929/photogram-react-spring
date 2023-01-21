import React from 'react';
import './Sign.css';
import {Link, useNavigate} from "react-router-dom";

const SignUpPage = () => {
    const url="http://localhost:9000"
    const navigate = useNavigate();
    const signUp = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const user = {
            username: data.get('username'),
            password: data.get('password'),
            email: data.get('email'),
            name: data.get('name')
        }
        console.log(user);
        fetch(url + "/auth/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                console.log(1, res);
                if (res.status === 200) {
                    alert("회원가입에 성공하였습니다.");
                    navigate("/auth/sign-in");
                } else {
                    alert("회원가입에 실패하였습니다.");
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

                            <form className="login__input" onSubmit={signUp}>
                                <input type="text" name="username" placeholder="유저네임" required="required" maxLength={20}/>
                                <input type="password" name="password" placeholder="비밀번호" required="required"/>
                                <input type="email" name="email" placeholder="이메일" required="required"/>
                                <input type="text" name="name" placeholder="이름" required="required"/>
                                <button type="submit">가입</button>
                            </form>
                        </div>

                        <div className="login__register">
                            <span>계정이 있으신가요?</span>
                            <Link to={"/auth/sign-in"} style={{textDecoration: 'none'}}>
                                <label>로그인</label>
                            </Link>
                        </div>

                    </article>
                </section>
            </main>
        </div>
    );
};

export default SignUpPage;
