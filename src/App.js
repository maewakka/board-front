import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewBoardList from "./pages/ViewBoardList";
import CreateBoard from "./pages/CreateBoard";
import ViewBoard from "./pages/ViewBoard";
const App = () => {
    return (
        <Router>
          <Routes>
              <Route path="/" element={<ViewBoardList/>}/>
              <Route path='/board' element={<ViewBoard/>}/>
              <Route path="/create" element={<CreateBoard/>}/>
          </Routes>
        </Router>
    );
};

export default App;
