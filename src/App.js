import React, { useState, useEffect } from 'react';
import RealTimeWeather from './components/RealTimeWeather';
import ForecastWeather from './components/ForecastWeather';
import WeatherGraph from './components/WeatherGraphs';
import { fetchRealTimeWeather, fetchForecastWeather, fetchCoordinates } from './services/WeatherService';
import { FiSearch } from "react-icons/fi";

function App() {
  const [realTimeWeather, setRealTimeWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('Bommanahalli, Bengaluru');
  const [coordinates, setCoordinates] = useState({ lat: 12.911541, lng: 77.623495 });
  const [getLocation, setGetLocation] = useState('Bommanahalli, Bengaluru');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (location.trim() !== '') { // Check if there is input in the form
      try {
        const coordinatesData = await fetchCoordinates(location);
        setGetLocation(coordinatesData.items[0].title);
        setCoordinates(coordinatesData.items[0].position);
        setLocation(coordinatesData.items[0].title);
        setLoading(true); // Set loading to true when fetching new coordinates
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        setError('Error fetching coordinates');
      }
    }
  };

  useEffect(() => {

    const fetchRealTimeData = async () => {
      try {
        if (coordinates) { // Check if coordinates are available
          const { lat, lng } = coordinates; // Destructure latitude and longitude
          const data = await fetchRealTimeWeather(lat, lng);
          setRealTimeWeather(data.data.values);
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching real-time weather data');
        setLoading(false);
      }
    };

    // Function to fetch forecasted weather data
    const fetchForecastData = async () => {
      try {
        if (coordinates) { // Check if coordinates are available
          const { lat, lng } = coordinates; // Destructure latitude and longitude
          let startTime = '2024-03-29T00:00:00Z';
          let endTime = '2024-04-30T00:00:00Z';
          const data = await fetchForecastWeather(lat, lng, startTime, endTime);
          setForecastWeather(data);
        }
      } catch (error) {
        setError('Error fetching forecasted weather data');
      }
    };

    // Fetch real-time weather data and forecasted weather data on component mount
    fetchRealTimeData();
    fetchForecastData();
  }, [coordinates]);

  // Render loading state while data is being fetched
  if (loading || !forecastWeather) {
    return (
      <div className='loading'>
        {/* <BsCloudSlashFill/> */}
        Loading...
      </div>
    );
  }

  // Render error message if an error occurred during data fetching
  if (error) {
    return <error>Error: {error}</error>;
  }

  // Render real-time and forecasted weather components with fetched data
  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <div className='search'>
          <input type="text" onChange={(event) => setLocation(event.target.value)} placeholder="Enter location..."/>
          <FiSearch type='submit' onClick={handleSubmit}/>
        </div>
      </form>
      <RealTimeWeather getLocation={getLocation} realTimeWeather = {realTimeWeather} />
      <WeatherGraph  realTimeWeather = {realTimeWeather} forecastData={forecastWeather} />
      <ForecastWeather forecastData={forecastWeather} />
    </div>
  );
}

export default App;