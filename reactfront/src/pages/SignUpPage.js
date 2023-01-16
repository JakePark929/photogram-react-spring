import React from 'react';
import '../style.css';
import {Link} from "react-router-dom";

const SignUpPage = () => {
    return (
        <div className="container">
            <main className="loginMain">
                <section className="login">
                    <article className="login__form__container">

                        <div className="login__form">
                            <h1><img src="/images/logo.jpg"/></h1>

                            <form className="login__input">
                                <input type="text" name="username" placeholder="유저네임" required="required"/>
                                <input type="password" name="password" placeholder="패스워드" required="required"/>
                                <input type="email" name="email" placeholder="이메일" required="required"/>
                                <input type="text" name="name" placeholder="이름" required="required"/>
                                <button>가입</button>
                            </form>
                        </div>

                        <div className="login__register">
                            <span>계정이 있으신가요?</span>
                            <Link to={"/auth/sign-in"} style={{textDecoration: 'none'}}>
                                <text>로그인</text>
                            </Link>
                        </div>

                    </article>
                </section>
            </main>
        </div>
    );
};

export default SignUpPage;
