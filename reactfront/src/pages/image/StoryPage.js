import React, {useRef} from 'react';
import './Story.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faTimes} from "@fortawesome/free-solid-svg-icons";

const StoryPage = () => {
    const likeRef = useRef();

    const toggleLike = () => {
        const color = likeRef.current.style.color;
        console.log(likeRef.current)
        if (color === "red") {
            likeRef.current.style.color = "";
        } else {
            likeRef.current.style.color = "red";
        }
    }

    return (
        <main className="main">
            <section className="container">
                <article className="story-list" id="storyList">

                    <div className="story-list__item">
                        <div className="sl__item__header">
                            <div>
                                {/*<img className="profile-image" src="#"/>*/}
                            </div>
                            <div>TherePrograming</div>
                        </div>

                        <div className="sl__item__img">
                            <img src="/images/home.jpg"/>
                        </div>

                        <div className="sl__item__contents">
                            <div className="sl__item__contents__icon">

                                <button>
                                    <FontAwesomeIcon icon={faHeart} style={{color: ""}} ref={likeRef}
                                                     onClick={toggleLike}/>
                                </button>
                            </div>

                            <span className="like"><b id="storyLikeCount-1">3</b>likes</span>


                            <div className="sl__item__contents__content">
                                <p>등산하는 것이 너무 재밌네요</p>
                            </div>

                            <div id="storyCommentList-1">

                                <div className="sl__item__contents__comment" id="storyCommentItem-1">
                                    <p>
                                        <b>Lovely :</b> 부럽습니다.
                                    </p>

                                    <button>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </button>

                                </div>

                            </div>

                            <div className="sl__item__input">
                                <input type="text" placeholder="댓글 달기..." id="storyCommentInput-1"/>
                                <button type="button">게시</button>
                            </div>

                        </div>
                    </div>

                </article>
            </section>
        </main>
    );
};

export default StoryPage;
