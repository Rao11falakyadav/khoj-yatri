import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import RoomDashboard from './pages/RoomDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateRoom />} />
        <Route path="/join" element={<JoinRoom />} />
        <Route path="/room/:roomId" element={<RoomDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
