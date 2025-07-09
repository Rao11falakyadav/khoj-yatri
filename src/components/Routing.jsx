import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, setDoc, onSnapshot, collection } from 'firebase/firestore';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import { useMap } from 'react-leaflet'; // ❌ Removed unused import
// import Routing from '../components/Routing'; // Optional, for future use

// ✅ Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

function RoomDashboard() {
  const { roomId } = useParams();
  const username = localStorage.getItem('username');
  const [members, setMembers] = useState([]);

  // ✅ Update current user location to Firestore
  useEffect(() => {
    if (!username || !roomId) return;

    const updateLocation = (position) => {
      const { latitude, longitude } = position.coords;
      console.log(`📍 ${username} location:`, latitude, longitude);
      const userRef = doc(db, `rooms/${roomId}/members`, username);
      setDoc(userRef, { lat: latitude, lng: longitude }, { merge: true });
    };

    const watchId = navigator.geolocation.watchPosition(
      updateLocation,
      (error) => {
        console.error('❌ Location error:', error.message);
        alert('Please allow location access for tracking.');
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 10000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [roomId, username]);

  // ✅ Listen to all members in the room
  useEffect(() => {
    const membersRef = collection(db, `rooms/${roomId}/members`);
    const unsubscribe = onSnapshot(membersRef, (snapshot) => {
      const updated = snapshot.docs.map((doc) => ({
        name: doc.id,
        ...doc.data(),
      }));
      setMembers(updated);
    });

    return () => unsubscribe();
  }, [roomId]);

  return (
    <div style={{ height: '100vh' }}>
      <h2 style={{ padding: 10 }}>Room: {roomId}</h2>
      <h3 style={{ padding: '0 10px' }}>Logged in as: {username}</h3>

      <MapContainer
        center={[28.6139, 77.2090]} // Default to Delhi
        zoom={16}
        style={{ height: '90%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {members.map((member) =>
          member.lat && member.lng ? (
            <Marker key={member.name} position={[member.lat, member.lng]}>
              <Popup>{member.name}</Popup>
            </Marker>
          ) : null
        )}

        {/* ✅ Placeholder for route lines */}
        {/* Example: <Routing from={[user.lat, user.lng]} to={[other.lat, other.lng]} /> */}
      </MapContainer>
    </div>
  );
}

export default RoomDashboard;
