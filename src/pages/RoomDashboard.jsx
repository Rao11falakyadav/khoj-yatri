import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, setDoc, onSnapshot, collection } from 'firebase/firestore';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import Routing from '../components/Routing';
import CustomMarker from '../components/CustomMarker';
import MapStats from '../components/MapStats';
import MembersList from '../components/MembersList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import { colors } from '../theme';
import '../components/MapStyles.css';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

// Component to center map on user's location
const CenterMapOnUser = ({ userLocation }) => {
  const map = useMap();
  
  useEffect(() => {
    if (userLocation && userLocation.lat && userLocation.lng) {
      map.setView([userLocation.lat, userLocation.lng], 16);
    }
  }, [map, userLocation]);
  
  return null;
};

// Note: We're now using the CustomMarker component instead of these icons

function RoomDashboard() {
  const { roomId } = useParams();
  const username = localStorage.getItem('username');
  const [members, setMembers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);
  const [yourLocation, setYourLocation] = useState(null);

  // Update current location
  useEffect(() => {
    if (!username || !roomId) return;
    
    // Set a timeout to hide the loading spinner after a minimum time
    const loadingTimeout = setTimeout(() => {
      if (yourLocation) {
        setIsLoading(false);
      }
    }, 2000); // Minimum 2 seconds of loading screen

    const updateLocation = (position) => {
      const { latitude, longitude } = position.coords;
      const location = { lat: latitude, lng: longitude };
      setUserLocation(location);
      setYourLocation({ lat: latitude, lng: longitude });
      
      // Hide loading spinner once we have location
      setTimeout(() => setIsLoading(false), 500);

      const userRef = doc(db, `rooms/${roomId}/members`, username);
      setDoc(userRef, { lat: latitude, lng: longitude }, { merge: true });
    };

    const watchId = navigator.geolocation.watchPosition(
      updateLocation,
      (error) => {
        console.error("❌ Location error:", error.message);
        alert("Please allow location access.");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 10000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      clearTimeout(loadingTimeout);
    };
  }, [roomId, username, yourLocation]);

  // Listen to all members in the room
  useEffect(() => {
    if (!roomId) return;
    
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
  
  // Handle selecting a member to show route
  const handleMemberSelect = (member) => {
    setSelectedMember(member === selectedMember ? null : member);
  };

  return (
    <div className="page-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {isLoading && <LoadingSpinner />}
      
      <Header username={username} roomId={roomId} />
      
      <div style={{ position: 'relative', flex: 1 }}>
        <MapContainer
          center={[28.6139, 77.2090]} // Default to Delhi
          zoom={16}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Center map on user's location */}
          <CenterMapOnUser userLocation={userLocation} />
          
          {/* Render all members as custom markers */}
          {members.map((member) =>
            member.lat && member.lng ? (
              <CustomMarker 
                key={member.name} 
                position={{ lat: member.lat, lng: member.lng }}
                name={member.name}
                isCurrentUser={member.name === username}
              />
            ) : null
          )}
          
          {/* Show routing line if a member is selected */}
          {selectedMember && userLocation && selectedMember.lat && selectedMember.lng && (
            <Routing 
              from={userLocation} 
              to={{ lat: selectedMember.lat, lng: selectedMember.lng }} 
            />
          )}
        </MapContainer>
        
        {/* Map overlay components */}
        <MapStats members={members} roomId={roomId} />
        <MembersList 
          members={members} 
          username={username} 
          onSelectMember={handleMemberSelect}
          selectedMember={selectedMember}
        />
      </div>
      
      <Footer />
    </div>
  );
}

export default RoomDashboard;
