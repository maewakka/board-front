import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import './Board.css';
import {Pagination} from "@mui/material";

const ViewBoardList = () => {
    const navigate = useNavigate();
    const [pageNo, SetPageNo] = useState(1);
    const [pageNum, SetPageNum] = useState();
    const [boardList, SetBoardList] = useState([]);

    const getBoardNum = () => {
        axios.get("/api/board/num")
            .then((res) => {
                SetPageNum(Math.floor((res.data) / 10) + 1);
            })
    }

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        SetPageNo(nowPageInt);
        getBoardList(nowPageInt);
    }
    const getBoardList = (pageNo) => {
        axios.get("/api/board/list", {params: {pageNo: pageNo-1}})
            .then((res) => {
                SetBoardList(res.data.content);
            })
    }

    const moveBoard = (e) => {
        let id = e.target.id;
        navigate('/board', {state: {id: id}});
    }

    useEffect(() => {
        getBoardNum();
        getBoardList(pageNo);
    }, [])

    return (
        <>
            <div className='container'>
                <button className='btn btn-primary' onClick={() => navigate("/create")}>글쓰기</button>
                <table className="table">
                    <thead>
                    <tr>
                        <th className="col-md-3">ID</th>
                        <th className="col-md-3">제목</th>
                        <th className="col-md-3">생성시간</th>
                    </tr>
                    </thead>
                    <tbody>
                    {boardList.map((board, idx) => {
                        return(
                            <tr className='element' key={idx} >
                                <th>{board.id}</th>
                                <td className='title' id={board.id} onClick={moveBoard}>{board.title}</td>
                                <td>{`${board.createdDate.split('T')[0]} ${board.createdDate.split('T')[1].split('.')[0]}`}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <Pagination count={pageNum} defaultPage={1} boundaryCount={2}
                        color="primary" size="large" sx={{margin: 2}} onChange={(e) => handlePage(e)}/>
        </>



    );
};

export default ViewBoardList;
