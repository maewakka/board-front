import React, {useState} from 'react';
import './Board.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";
const CreateBoard = () => {
    const navigate = useNavigate();
    const [title, SetTitle] = useState('');
    const [content, SetContent] = useState('');

    const onClickRegister = () => {
        axios.post("/api/create", {title: title, content: content})
            .then((res) => {
                navigate("/");
            }).catch((err) => {
                alert(err.response.data);
        })
    }

    return (
        <div className='container'>
            <div class="btn-group" role="group">
                <button className='btn btn-primary' onClick={() => navigate("/")}>돌아가기</button>
                <button className='btn btn-primary' onClick={onClickRegister}>등록</button>
            </div>
            <div className='create-board'>
                <div className='row'>
                    <div className='division'>제목</div>
                    <input className='input' onChange={(e) => {SetTitle(e.target.value)}} placeholder="제목을 입력하세요" type='text'/>
                </div>
                <div className='row'>
                    <div className='division'>본문</div>
                    <textarea className='input' onChange={(e) => {SetContent(e.target.value)}} rows="10"/>
                </div>
            </div>
        </div>
    );
};

export default CreateBoard;
