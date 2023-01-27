import React from 'react';
import './Upload.css';

const UploadPage = () => {
    return (
        <div>
            <main className="uploadContainer">
                <section className="upload">

                    <div className="upload-top">
                        <a href="home.html" className="">
                            <img src="/images/logo.jpg"/>
                        </a>
                        <p>사진 업로드</p>
                    </div>

                    <form className="upload-form">
                        <input  type="file" name="file" onchange="imageChoose(this)"/>
                        <div className="upload-img">
                            <img src="/images/person.jpeg" alt="" id="imageUploadPreview"/>
                        </div>

                        <div className="upload-form-detail">
                            <input type="text" placeholder="사진설명" name="caption"/>
                                <button className="cta blue">업로드</button>
                        </div>
                    </form>
                </section>
            </main>
            <br/><br/>  
        </div>
    );
};

export default UploadPage;
