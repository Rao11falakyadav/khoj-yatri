import { useState } from 'react';
import { db } from '../services/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { colors } from '../theme';

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
    <div className="page-container">
      <Header />
      <BackgroundAnimation />
      
      <div className="container" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 1rem' }}>
        <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
          <div className="logo-container animate-bounce" style={{ margin: '0 auto 2rem', width: '80px', height: '80px', background: `linear-gradient(135deg, ${colors.primary} 0%, #FF8A65 100%)`, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="40" height="40">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          
          <h1 style={{ color: colors.primary, marginBottom: '1.5rem' }}>Create a Group</h1>
          <p style={{ marginBottom: '2rem', color: colors.text }}>Create a unique group to share your location with friends and family in crowded places.</p>
          
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
          <button
            onClick={handleCreate}
            className="btn btn-primary animate-slide-up"
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
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
            </svg>
            Create Room
          </button>
          
          <div className="animate-fade-in" style={{ marginTop: '1rem' }}>
            <p style={{ color: colors.text, marginBottom: '1rem' }}>Already have a room code?</p>
            <Link to="/join" style={{ color: colors.secondary, fontWeight: 'bold', textDecoration: 'none' }}>
              Join Existing Room
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default CreateRoom;
