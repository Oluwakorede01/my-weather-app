


import { useState } from "react";
import axios from "axios";
import nigeriaData from "./nigeriaData";
import bgImage from "./assets/2713.jpg";










 const App=()=> {


  const API_KEY = "14b9f4bf391079071305a79b59ad16bd";

  
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!selectedState || !selectedCity) return;
    setError("");
    setWeather(null);

    try {
      // Step 1: Get city coordinates
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${selectedCity},${selectedState},Nigeria&limit=1&appid=${API_KEY}`
      );

      if (geoResponse.data.length === 0) {
        throw new Error("City not found!");
      }

      const { lat, lon } = geoResponse.data[0];

      // Step 2: Get weather data using coordinates
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      setWeather(weatherResponse.data);
    } catch (err) {
      setError("City not found! Try again.");
    }
  };

  return (
    <div       className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4  bg-gray-600"
    style={{ backgroundImage: `url(${bgImage})` }} >
      <h1 className="text-3xl mb-4 font-bold text-black  pt-10">Weather App</h1>

      {/* State Dropdown */}
      <select
        className="p-2 border rounded-md w-full text-lg "
        value={selectedState}
        onChange={(e) => {
          setSelectedState(e.target.value);
          setSelectedCity(""); // Reset city selection
        }}
      >
        <option value=""  className=" bold" >Select State</option>
        {Object.keys(nigeriaData).map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      {selectedState && (
        <select
          className="p-2 border rounded-md mt-2 text-lg bg-white  text-black"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Select City</option>
          {nigeriaData[selectedState].map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      )}

      {/* Get Weather Button */}



     <div className="flex  justify-around   items-center  gap-10 "> 


     <button onClick={()=> setSelectedState("")}  className="bg-white text-black px-4 py-2 rounded-md hover:bg-blue-700 transition mt-4  text-lg disabled:bg-gray-400  disabled:cursor-not-allowed">
      Back
      </button>



      <button
        onClick={fetchWeather}
        className="bg-white text-black px-4 py-2 rounded-md hover:bg-blue-700 transition mt-4  text-lg disabled:bg-gray-400  disabled:cursor-not-allowed"
        disabled={!selectedCity}
      >
        Get Weather

      </button>



     </div>

      {error && <p>{error}</p>}

      {weather && (
        <div className="mt-6 bg-green-400 p-6 rounded-lg shadow-lg  text-white w-full">
          <h2 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
          <p className="text-lg">{weather.main.temp}°C</p>
          <p className="capitalize text-lg">{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="Weather Icon"
            className="w-20"
          />
        </div>
      )}

    </div>
  );
}
export default App;