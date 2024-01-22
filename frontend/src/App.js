import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import Received from './pages/Received';
import Sent from './pages/Sent';

function App() {
  
  const authRoot = "http://localhost:4000";
  const serverRoot = "http://localhost:8080";
  const [user, setUser] = useState(null);
  const [startDate, setStartDate] = useState(978287400000);
  const [endDate, setEndDate] = useState(Date.now());
  const [clubName, setClubName] = useState([]);
  const [catName, setCatName] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} authRoot={authRoot} serverRoot={serverRoot} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} clubName={clubName} setClubName={setClubName} catName={catName} setCatName={setCatName} />} />
        <Route path="/login" element={<Login setUser={setUser} authRoot={authRoot} serverRoot={serverRoot} />} />
        <Route path="/received" element={<Received setUser={setUser} authRoot={authRoot} serverRoot={serverRoot} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} clubName={clubName} setClubName={setClubName} catName={catName} setCatName={setCatName} />} />
        <Route path="/sent" element={<Sent setUser={setUser} authRoot={authRoot} serverRoot={serverRoot} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} clubName={clubName} setClubName={setClubName} catName={catName} setCatName={setCatName} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
