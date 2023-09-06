import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

function ViewMap({ turfLongitude, turfLatitude, userLongitude, userLatitude, turfName,turfLogo }) {
  const startLatitude = parseFloat(userLatitude);
  const startLongitude = parseFloat(userLongitude);
  const endLatitude = parseFloat(turfLatitude);
  const endLongitude = parseFloat(turfLongitude);

  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidWp1YWwiLCJhIjoiY2xrdGFzN2V4MDg3MDNxcGNzanpvNm9zNiJ9.BcpaFJF6wn3SY2XJoRqDyA';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [startLongitude, startLatitude],
      zoom: 10,
    });

    let selectedRouteIndex = 0; // Index of the currently selected route, default to 0 (main route)
    let routes = []; // Array to store all route data

    // Add markers for the starting and ending points
    const userMarker=new mapboxgl.Marker({ color: "#00ff00" }) // Green color for start marker
      .setLngLat([startLongitude, startLatitude])
      .addTo(map);

    const turfMarker = new mapboxgl.Marker({ color: "#0000ff" }) // Blue color for end marker
      .setLngLat([endLongitude, endLatitude])
      .addTo(map);

    // Step 1: Create a custom popup with the turf name and logo
    const turfPopup = new mapboxgl.Popup().setHTML(`
      <div>
        <h3>${turfName}</h3>
        <img src=${turfLogo} alt="${turfName}" width="50" height="50" />
      </div>
    `);

    // Step 2: Attach the custom popup to the turf marker
    turfMarker.setPopup(turfPopup);

    function toRadians(degrees) {
        return (degrees * Math.PI) / 180;
      }

      function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c * 1; // Distance in meters
        return distance;
      }

      const distance = calculateDistance(
        userLatitude,
        userLongitude,
        turfLatitude,
        turfLongitude
      );

      // Display the distance on the map
      const popup = new mapboxgl.Popup().setText(
        `Distance: ${distance.toFixed(2)} KM`
      );

      userMarker.setPopup(popup).togglePopup();

    // Fetch the route data and show the route on the map
    const fetchRouteData = () => {
      axios
        .get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${startLongitude},${startLatitude};${endLongitude},${endLatitude}`,
          {
            params: {
              access_token: mapboxgl.accessToken,
              geometries: 'geojson',
              overview: 'full',
              alternatives: true,
            },
          }
        )
        .then((response) => {
          routes = response.data.routes;
          const routeData = routes[selectedRouteIndex].geometry;

          if (map.getSource('route')) {
            // If the source 'route' already exists, update the data
            map.getSource('route').setData(routeData);
          } else {
            // If the source 'route' doesn't exist, add a new source and layer
            map.on('load', () => {
              map.addSource('route', {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: routeData,
                },
              });

              map.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round',
                },
                paint: {
                  'line-color': '#ff0000', // Red color for the route
                  'line-width': 6,
                },
              });
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching route:', error);
        });
    };

    // Fetch the initial route data
    fetchRouteData();

    // Event listener for map click
    map.on('click', (e) => {
      const clickedPoint = e.lngLat;

      // Find the closest route to the clicked point
      let minDistance = Infinity;
      let closestRouteIndex = 0;

      routes.forEach((route, index) => {
        const routeGeometry = route.geometry;
        const routeCoordinates = routeGeometry.coordinates;

        // Calculate the distance from the clicked point to each coordinate in the route
        const distanceToRoute = routeCoordinates.reduce((minDist, coord) => {
          const distance = clickedPoint.distanceTo(new mapboxgl.LngLat(coord[0], coord[1]));
          return Math.min(minDist, distance);
        }, Infinity);

        // Keep track of the closest route
        if (distanceToRoute < minDistance) {
          minDistance = distanceToRoute;
          closestRouteIndex = index;
        }
      });

      // Only update the route if a different route is selected
      if (closestRouteIndex !== selectedRouteIndex) {
        selectedRouteIndex = closestRouteIndex;
        const routeData = routes[selectedRouteIndex].geometry;
        map.getSource('route').setData(routeData);
      }
    });

    // Clean up the map instance when the component unmounts
    return () => map.remove();
  }, [startLongitude, startLatitude, endLongitude, endLatitude, turfName]);

  return <div className='overflow-hidden md:h-96 sm:h-56 h-40' ref={mapContainerRef} />;
}

export default ViewMap;
