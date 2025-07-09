import { useState } from 'react';
import { db } from '../services/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function CreateRoom() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!userName.trim()) return alert("Please enter your name");

    const roomCode = uuidv4().slice(0, 6).toUpperCase();
    const roomRef = doc(collection(db, 'rooms'), roomCode);
    const memberRef = doc(db, `rooms/${roomCode}/members`, userName);

    console.log("Creating room:", roomCode);

    try {
      await setDoc(roomRef, { createdAt: Date.now() });
      console.log("✅ Room created");

      await setDoc(memberRef, { lat: null, lng: null });
      console.log("✅ Member added");

      localStorage.setItem('username', userName);
      navigate(`/room/${roomCode}`);
    } catch (err) {
      console.error("❌ Error creating room:", err.message);
      alert("Failed to create room. Please check your internet or Firebase rules.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create a Group</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{
          padding: 10,
          width: '100%',
          marginTop: 10,
          fontSize: 16,
          border: '1px solid #ccc',
          borderRadius: 5,
        }}
      />
      <button
        onClick={handleCreate}
        style={{
          marginTop: 15,
          padding: 10,
          width: '100%',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          fontSize: 16,
          borderRadius: 5,
          cursor: 'pointer',
        }}
      >
        Create Room
      </button>
    </div>
  );
}

export default CreateRoom;
