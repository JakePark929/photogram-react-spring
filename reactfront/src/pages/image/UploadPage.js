import React, {useRef, useState} from 'react';
import './Upload.css';
import {Link, useNavigate} from "react-router-dom";

const UploadPage = (props) => {
    const navigate = useNavigate();
    const imgRef = useRef(null);
    const [imgFile, setImgFile] = useState("");

    const saveImageFile = () => {
        const file = imgRef.current.files[0];
        if (file !== undefined) {
            if (!file.type.match("image.*")) {
                alert("이미지 파일만 업로드 가능합니다.");
                imgRef.current.value = "";
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImgFile(reader.result);
            };
        } else {
            setImgFile("");
        }
    }

    const uploadImage = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if (data.get('caption') === "") {
            data.set('caption', null)
        }
        if (data.get('file').name !== '') {
            fetch("/image", {
                method: "POST",
                body: data
            })
                .then(res => {
                    if (res.status === 200) {
                        alert("사진 업로드에 성공하였습니다.");
                        navigate("/user/"+props.principal.id);
                    } else {
                        alert("사진 업로드에 실패하였습니다.");
                    }
                })
        } else {
            alert("선택된 파일이 없습니다.");
        }
    }

    return (
        <div>
            <main className="uploadContainer">
                <section className="upload">

                    <div className="upload-top">
                        <Link to="/" className="">
                            <img src="/images/logo-old.jpg" alt="logo image"/>
                        </Link>
                        <p>사진 업로드</p>
                    </div>

                    <form className="upload-form" onSubmit={uploadImage}>
                        <input type="file" name="file" accept="image/*" onChange={saveImageFile} ref={imgRef}/>
                        <div className="upload-img">
                            <img
                                src={imgFile ? imgFile : `/images/person.jpeg`}
                                alt="upload image"
                            />
                        </div>

                        <div className="upload-form-detail">
                            <input type="text" placeholder="사진설명" name="caption"/>
                            <button type="submit" className="cta blue">업로드</button>
                        </div>
                    </form>
                </section>
            </main>
            <br/><br/>
        </div>
    );
};

export default UploadPage;
