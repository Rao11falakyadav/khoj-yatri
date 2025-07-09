import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

function JoinRoom() {
  const [roomCode, setRoomCode] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!userName.trim() || !roomCode.trim()) {
      return alert("Please enter both your name and room code.");
    }

    const memberRef = doc(db, `rooms/${roomCode}/members`, userName);

    try {
      await setDoc(memberRef, {
        lat: null,
        lng: null,
      });

      localStorage.setItem('username', userName);
      navigate(`/room/${roomCode}`);
    } catch (err) {
      console.error("❌ Error joining room:", err.message);
      alert("Could not join room. Please make sure the room code is correct.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Join a Room</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{
          padding: 10,
          width: '100%',
          marginBottom: 10,
          fontSize: 16,
          borderRadius: 5,
        }}
      />
      <input
        type="text"
        placeholder="Enter Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
        style={{
          padding: 10,
          width: '100%',
          marginBottom: 10,
          fontSize: 16,
          borderRadius: 5,
        }}
      />
      <button
        onClick={handleJoin}
        style={{
          padding: 10,
          width: '100%',
          backgroundColor: 'green',
          color: 'white',
          fontSize: 16,
          borderRadius: 5,
          cursor: 'pointer',
        }}
      >
        Join Room
      </button>
    </div>
  );
}

export default JoinRoom;
