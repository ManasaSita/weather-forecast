import axios from 'axios';

const API_KEY = 'SBIL1sKsdU7hlhIDQUh14iBBOLzOt0F7';
const BASE_URL = 'https://api.tomorrow.io/v4';


const fetchRealTimeWeather = async (latitude, longitude) => {
  const cacheKey = `realTimeWeather_${latitude},${longitude}`;
  
  // Check if data is available in the cache
  const cachedData = localStorage.getItem(cacheKey);
  const cachedExpiration = localStorage.getItem(`${cacheKey}_expiration`);
  
  if (cachedData && cachedExpiration && new Date().getTime() < parseInt(cachedExpiration, 10)) {
    return JSON.parse(cachedData);
  }
  
  // Fetch real-time weather data from the API
  try {
    const response = await axios.get(
      `${BASE_URL}/weather/realtime?location=${latitude},${longitude}&apikey=${API_KEY}`
    );
    
    const data = response.data;
    
    // Cache the fetched data with an expiration time (e.g., 1 hour)
    localStorage.setItem(cacheKey, JSON.stringify(data));
    const expirationTime = new Date().getTime() + 3600000; // 1 hour in milliseconds
    localStorage.setItem(`${cacheKey}_expiration`, expirationTime);
    
    return data;
  } catch (error) {
    console.error('Error fetching real-time weather:', error);
    return null;
  }
};

const fetchForecastWeather = async (latitude, longitude, startTime, endTime) => {
  const cacheKey = `forecastWeather_${latitude}_${longitude}_${startTime}_${endTime}`;

  // Check if data is available in the cache
  const cachedData = localStorage.getItem(cacheKey);
  const cachedExpiration = localStorage.getItem(`${cacheKey}_expiration`);

  if (cachedData && cachedExpiration && new Date().getTime() < parseInt(cachedExpiration, 10)) {
    return JSON.parse(cachedData);
  }

  // Fetch forecasted weather data from the API
  try {
    const response = await axios.get(
      `${BASE_URL}/weather/forecast?location=${latitude},${longitude}&startTime=${startTime}&endTime=${endTime}&apikey=${API_KEY}`
    );

    const data = response.data;

    // Cache the fetched data with an expiration time (e.g., 1 hour)
    localStorage.setItem(cacheKey, JSON.stringify(data));
    const expirationTime = new Date().getTime() + 3600000; // 1 hour in milliseconds
    localStorage.setItem(`${cacheKey}_expiration`, expirationTime);

    return data;
  } catch (error) {
    console.error('Error fetching forecasted weather:', error);
    return null;
  }
};

export { fetchRealTimeWeather, fetchForecastWeather };
