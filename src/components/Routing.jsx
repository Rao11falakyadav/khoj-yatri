import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { colors } from '../theme';

const Routing = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    // Create a routing control with custom styling
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(from.lat, from.lng),
        L.latLng(to.lat, to.lng)
      ],
      routeWhileDragging: false,
      showAlternatives: false,
      fitSelectedRoutes: false,
      show: false, // Hide the routing instructions
      lineOptions: {
        styles: [
          { color: colors.secondary, opacity: 0.7, weight: 4 },
          { color: 'white', opacity: 0.3, weight: 8 }
        ],
        extendToWaypoints: false,
        missingRouteTolerance: 0
      },
      createMarker: function() { return null; } // Don't create markers for waypoints
    }).addTo(map);

    // Clean up the routing control when component unmounts
    return () => {
      map.removeControl(routingControl);
    };
  }, [map, from, to]);

  return null;
};

export default Routing;
