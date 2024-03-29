import React from "react";
import { IoIosPartlySunny } from "react-icons/io";
import { FaDroplet, FaClock, FaTemperatureHalf, FaCalendarDays, FaWind } from "react-icons/fa6";
import { BsCloudsFill, BsCloudSlashFill } from "react-icons/bs";

const RealTimeWeather = ({ realTimeWeather }) => {
  const { precipitationProbability, cloudCover, weatherCode } = realTimeWeather;

  // Determine weather condition based on available data
  let weatherCondition;
  let weatherIcon;
  if (precipitationProbability > 0) {
    weatherIcon = <BsCloudsFill/>;
    weatherCondition = 'Rainy';
  } else if (cloudCover > 50) {
    weatherIcon = <BsCloudsFill/>;
    weatherCondition = 'Cloudy';
  } else if (weatherCode >= 1000) {
    weatherIcon = < IoIosPartlySunny />
    weatherCondition = 'Sunny';
  } else {
    weatherIcon = < BsCloudSlashFill/>
    weatherCondition = 'Unknown';
  }
  
  let currentHour =  new Date().getHours();
  let currentMinute = new Date().getMinutes();

  const getMonthName = (monthNumber) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[monthNumber - 1]; // Month numbers are zero-based, so subtract 1
  };

  const timestamp = new Date().getTime();

  // Function to get the day of the week
  const getDayOfWeek = () => {
    const date = new Date(timestamp);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeekIndex = date.getDay();
    return daysOfWeek[dayOfWeekIndex];
  };

  // Function to get the date in the format "day, date month"
  const getDateAndMonth = () => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = getMonthName(date.getMonth() + 1); // Get month name using the function
    return `${day}, ${month}`;
  };

  return (
    <div className='real-time'>
      <div className='location'>Bommanahalli, Bengaluru</div>
      <div className='time'><FaClock/> {currentHour} : {currentMinute} </div>
      <div className='weather-condition'> {weatherIcon}{weatherCondition}</div>
      <div className='wind-calendar'> 
        <div className='calendar'><FaCalendarDays/> {getDayOfWeek()} {getDateAndMonth()}</div>
        <div className='wind'><FaWind/>{realTimeWeather?.windSpeed} km/h</div>
      </div>
      <div className='temperature'><FaTemperatureHalf/>  {realTimeWeather?.temperature}&deg;C</div>
      <div className='humidity'><FaDroplet /> Humidity:   {realTimeWeather?.humidity} %</div>
    </div>
  );
};

export default RealTimeWeather;