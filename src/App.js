import React, { useState, useEffect } from 'react';
import RealTimeWeather from './components/RealTimeWeather';
import ForecastWeather from './components/ForecastWeather';
import WeatherGraph from './components/WeatherGraphs';
import { fetchRealTimeWeather, fetchForecastWeather } from './services/WeatherService';

function App() {
  const [realTimeWeather, setRealTimeWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch real-time weather data
    const fetchRealTimeData = async () => {
      try {
        // Replace with actual latitude and longitude or implement geolocation
        const latitude = 12.911541;
        const longitude = 77.623495;
        const data = await fetchRealTimeWeather(latitude, longitude);
        setRealTimeWeather(data.data.values);
        setLoading(false);
      } catch (error) {
        setError('Error fetching real-time weather data');
        setLoading(false);
      }
    };

    // Function to fetch forecasted weather data
    const fetchForecastData = async () => {
      try {
        // Replace with actual latitude, longitude, start time, and end time
        const latitude = 12.911541;
        const longitude = 77.623495;
        let startTime = '2024-03-29T00:00:00Z';
        let endTime = '2024-04-30T00:00:00Z';
        const data = await fetchForecastWeather(latitude, longitude, startTime, endTime);
        setForecastWeather(data);
      } catch (error) {
        setError('Error fetching forecasted weather data');
      }
    };

    // Fetch real-time weather data and forecasted weather data on component mount
    fetchRealTimeData();
    fetchForecastData();
  }, []);

  // Render loading state while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if an error occurred during data fetching
  if (error) {
    return <error>Error: {error}</error>;
  }

  // Render real-time and forecasted weather components with fetched data
  return (
    <div className="main">
      <RealTimeWeather realTimeWeather = {realTimeWeather} forecastData={forecastWeather}/>
      <WeatherGraph  realTimeWeather = {realTimeWeather} forecastData={forecastWeather} />
      <ForecastWeather forecastData={forecastWeather} />
    </div>
  );
}

export default App;
