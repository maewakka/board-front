import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import './Board.css';
const ViewBoard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [board, SetBoard] = useState({title: '', content: ''});
    const [relatedBoard, SetRelateBoards] = useState([]);

    const getRelation = (id) => {
        axios.get("/api/board/relation", {params: {id: id}})
            .then((res) => {
                console.log(res.data)
                SetRelateBoards(res.data);
            })
    }

    const moveBoard = (e) => {
        let id = e.target.id;
        navigate('/board', {state: {id: id}});
        window.location.reload();
    }

    useEffect(() => {
        axios.get("/api/board", {params: {id: location.state.id}})
            .then((res) => {
                SetBoard(res.data);
            });
        getRelation(location.state.id);
    }, [])

    return (
        <>
            <div className='container'>
                <div className="btn-group" role="group">
                    <button className='btn btn-primary' onClick={() => navigate("/")}>돌아가기</button>
                </div>
                <div className='create-board'>
                    <div className='row'>
                        <div className='division'>제목</div>
                        <div className='input'>{board.title}</div>
                    </div>
                    <div className='row'>
                        <div className='division'>본문</div>
                        <div className='input'>{board.content}</div>
                    </div>
                </div>
            </div>

            <div className='container' style={{marginTop:'30px'}}>

                {relatedBoard.length > 0 ?
                    <>
                        <div style={{fontSize:'larger', fontWeight:'bold'}}>[연관게시글]</div>
                        <table className="table">
                            <thead>
                            <tr>
                                <th className="col-md-3">ID</th>
                                <th className="col-md-3">제목</th>
                                <th className="col-md-3">생성시간</th>
                            </tr>
                            </thead>
                            <tbody>
                            {relatedBoard.map((component, idx) => {
                                return(
                                    <tr className='element' key={idx} >
                                        <th>{component.board.id}</th>
                                        <td className='title' id={component.board.id} onClick={moveBoard}>{component.board.title}</td>
                                        <td>{`${component.board.createdDate.split('T')[0]} ${component.board.createdDate.split('T')[1].split('.')[0]}`}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </>
                    : <></>}
            </div>

        </>
    );
};

export default ViewBoard;
