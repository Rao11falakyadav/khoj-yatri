import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { colors } from '../theme';

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
    <div className="page-container">
      <Header />
      <BackgroundAnimation />
      
      <div className="container" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 1rem' }}>
        <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
          <div className="logo-container animate-bounce" style={{ margin: '0 auto 2rem', width: '80px', height: '80px', background: `linear-gradient(135deg, ${colors.secondary} 0%, #64B5F6 100%)`, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="40" height="40">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
          
          <h1 style={{ color: colors.secondary, marginBottom: '1.5rem' }}>Join a Room</h1>
          <p style={{ marginBottom: '2rem', color: colors.text }}>Enter your name and the room code to join your group.</p>
          
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="animate-slide-up"
            style={{
              padding: '1rem',
              width: '100%',
              marginBottom: '1.5rem',
              fontSize: '1rem',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              outline: 'none',
              transition: 'all 0.3s ease',
            }}
          />
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            className="animate-slide-up"
            style={{
              padding: '1rem',
              width: '100%',
              marginBottom: '1.5rem',
              fontSize: '1rem',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              outline: 'none',
              transition: 'all 0.3s ease',
            }}
          />
          <button
            onClick={handleJoin}
            className="btn btn-secondary animate-slide-up"
            style={{
              width: '100%',
              marginBottom: '1.5rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
            Join Room
          </button>
          
          <div className="animate-fade-in" style={{ marginTop: '1rem' }}>
            <p style={{ color: colors.text, marginBottom: '1rem' }}>Don't have a room code?</p>
            <Link to="/" style={{ color: colors.primary, fontWeight: 'bold', textDecoration: 'none' }}>
              Create New Room
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default JoinRoom;
