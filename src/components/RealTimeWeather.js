import React from "react";
import { IoIosPartlySunny, IoMdRainy } from "react-icons/io";
import { FaDroplet, FaClock, FaTemperatureHalf, FaCalendarDays, FaWind } from "react-icons/fa6";
import { BsCloudsFill, BsCloudSlashFill } from "react-icons/bs";
import weatherCodes from '../weatherCodes';

const RealTimeWeather = ({ getLocation, realTimeWeather }) => {
  const { weatherCode, temperature, humidity, windSpeed, cloudCover, precipitationProbability } = realTimeWeather;
  console.log(realTimeWeather);

  const getWeatherCondition = (weatherCode) => {
    return weatherCodes[weatherCode] || 'Unknown';
  };

  const getWeatherIcon = (weatherCode) => {
    if (weatherCode === 1001) return <BsCloudsFill />;
    if (weatherCode === 1000) return <IoIosPartlySunny />;
    if (weatherCode >= 4000 && weatherCode < 5000) return <IoMdRainy />;
    return <BsCloudSlashFill />;
  };

  const timestamp = new Date().getTime();
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  const getMonthName = (monthNumber) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[monthNumber - 1];
  };

  const getDayOfWeek = () => {
    const date = new Date(timestamp);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];
  };

  const getDateAndMonth = () => {
    const date = new Date(timestamp);
    return `${date.getDate()}, ${getMonthName(date.getMonth() + 1)}`;
  };

  return (
    <div className='real-time'>
      <div className='location'>{getLocation}</div>
      <div className='time'><FaClock /> {currentHour}:{currentMinute}</div>
      <div className='weather-condition'>{getWeatherIcon(weatherCode)}{getWeatherCondition(weatherCode)}</div>
      <div className='wind-calendar'> 
        <div className='calendar'><FaCalendarDays /> {getDayOfWeek()} {getDateAndMonth()}</div>
        <div className='wind'><FaWind /> {windSpeed} m/s</div>
      </div>
      <div className='temperature'><FaTemperatureHalf /> {temperature}°C</div>
      <div className='humidity'><FaDroplet /> Humidity: {humidity}%</div>
    </div>
  );
};

export default RealTimeWeather;
