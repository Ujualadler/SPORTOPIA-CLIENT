import React, { useEffect, useState } from "react";
import axios from "axios";
import UserAxios from "../../../Axios/userAxios";
import { useNavigate } from "react-router-dom";

function Booking() {
  const userAxios = UserAxios();

  const [turfData, setTurfData] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [fromSug, setFromSug] = useState(false);
  const [from, setFrom] = useState("");
  const [nearbyTurfs, setNearbyTurfs] = useState([]);
  const navigate = useNavigate();

  const booking = (id) => {
    navigate(`/booking/${id}`);
  };

  useEffect(() => {
    userAxios
      .get("/getTurfs")
      .then((response) => {
        setTurfData(response.data.result);
      })
      .catch((err) => {
        navigate('/error')
        console.log(err);
      });
  }, []);



  const getLocationSuggestions = async (query) => {
    const MAPBOX_API_KEY =
      "pk.eyJ1IjoidWp1YWwiLCJhIjoiY2xrdGFzN2V4MDg3MDNxcGNzanpvNm9zNiJ9.BcpaFJF6wn3SY2XJoRqDyA";
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`;
    const params = {
      access_token: MAPBOX_API_KEY,
      types: "place,locality", // Include multiple place types separated by commas
      limit: 4, // Number of suggestions to retrieve
      country: "IN",
    };
  
    try {
      const response = await axios.get(endpoint, { params });
      return response.data.features;
    } catch (error) {
      navigate('/error')
      console.error("Error fetching location suggestions:", error);
      return [];
    }
  };
  

  const handleLocationSuggestion = async (query) => {
    // Get location suggestions when the user types
    if (query != ''){
      const suggestions = await getLocationSuggestions(query);
      setLocationSuggestions(suggestions);
    } else {
      setNearbyTurfs(turfData);
    }
  };

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
  useEffect(() => {
    // Initially, show all the turfs
    handleSearch();
  }, [turfData]); 

  const maxDistance = 10; // Maximum distance in kilometers to show turfs
  const handleSearch = (fromLatitude,fromLongitude) => {
    if (fromLatitude && fromLongitude) {
      // Get the turfs near the searched location
      const turfsNearLocation = turfData.filter((turf) => {
        const distance = calculateDistance(
          fromLatitude,
          fromLongitude,
          turf.latitude,
          turf.longitude
        );   
        console.log(Math.floor(distance),turf.turfName);
        return Math.floor(distance) <= Math.floor(maxDistance);
      });
  
      setNearbyTurfs(turfsNearLocation);
    } else {
      // If no search input is provided, show all the turfs
      setNearbyTurfs(turfData);
    }
  };

  return (
    <>
    <div className=" m-1 " >
      <div className="flex justify-center md:justify-between  ">
        <div className="mt-8 mx-11 hidden md:block  md:text-xl text-white font-bold tracking-wide">
          BOOK YOUR FAVOURITE TURF
        </div>
        <div className=" transition-transform duration-100 mt-8   md:text-xl font-bold tracking-wide">
          <div className="  relative">
            <input
              type="search"
              onChange={(e) => {
                setFromSug(true);
                setFrom(e.target.value);
                handleLocationSuggestion(e.target.value); // Fetch suggestions as the user types
              }}
              value={from}
              placeholder={from || "SERACH BY LOCATION"}
              className="border text-center border-black block p-2  md:mr-12  text-sm text-gray-900 max-h-10  rounded-lg w-80 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gradient-to-r from-gray-800 to-gray-600 dark:border-black dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {/* Display location suggestions */}
            <ul className="absolute flex flex-col bg-slate-200 z-30 left-0">
              {fromSug &&
                locationSuggestions.map((suggestion) => (
                  <li className="text-lg border-b-2 border-black pl-5" key={suggestion.id}>
                    <span
                 
                      className=" "
                      onClick={() => {
                        setFromSug(false);
                        setFrom(suggestion.place_name); 
                         // Update the input field with the selected suggestion
                        setLocationSuggestions([]); // Clear the suggestions list
                        // Now you can also get the longitude and latitude from suggestion.geometry.coordinates
                        const [long, lat] = suggestion?.geometry.coordinates;
                        // Update the turfs based on the selected location
                        handleSearch(lat,long);
                      }}
                    >
                      {suggestion.place_name}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="  pt-4 pb-4 mt-2">
        {nearbyTurfs.length>0?nearbyTurfs.map((result) => (
          <div
            key={result._id}
            className="container flex flex-col items-center md:flex-row md:justify-around border border-black mt-7 md:ml-auto bg-gray-900 bg-opacity-60 md:mr-auto rounded-md mb-7 relative shadow-2xl"
          >
            <div className="mb-auto md:mt-auto mt-3 flex ">
              <div className="bg-gradient-to-r from-gray-800 to-gray-600 w-[10rem] h-[10rem] m-auto flex justify-center">
                <img
                  className="w-[6rem] h-[6rem]  mb-auto mt-auto"
                  src={result.logo}
                  alt="Turf Logo"
                />
              </div>
            </div>
            <div>
              <ul className="mt-4 mb-4">
                <h2 className="font-bold mt-4 text-white text-lg tracking-wide">
                  {result.turfName}
                </h2>
                <li className="font-semibold mt-3 text-gray-400">
                  CITY: {result.city}
                </li>
                <li className="font-semibold mt-3 text-gray-400">
                  TYPE: {result.turfType}
                </li>
                <li className="font-semibold mt-3 text-gray-400">
                  PHONE: {result.phone}
                </li>
                <li className="font-semibold mt-3 text-gray-400">
                  AMOUNT: ₹{result.total}
                </li>
              </ul>
            </div>
            <div className="my-auto">
              <button
                onClick={() => {
                  booking(result._id);
                }}
                className="bg-black w-[6rem]  h-[2rem] hover:bg-slate-700 rounded-md mb-3 md:mb-0 text-white font-bold"
              >
                VIEW
              </button>
            </div>
          </div>
        )):( <div className="flex items-center justify-center font-extrabold text-black text-3xl text-center">No turfs found near the searched location.</div>)}
      </div>
    </div>
      
    </>
  );
}

export default Booking;
