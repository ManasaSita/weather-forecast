import React from 'react';
import { IoIosPartlySunny } from "react-icons/io";
import { BsCloudsFill, BsCloudSlashFill } from "react-icons/bs";
import { FaDroplet, FaClock, FaTemperatureHalf, FaCalendarDays, FaWind } from "react-icons/fa6";

const ForecastWeather = ({ forecastData }) => {

  let weatherCondition;
  let weatherIcon;
  const getWeatherConditiondata = (values) => {
    if (values.precipitationProbabilityAvg > 0) {
      weatherIcon = <BsCloudsFill/>;
      weatherCondition = 'Mostly Rainy';
    } else if (values.cloudCoverAvg > 50) {
      weatherIcon = <BsCloudsFill/>;
      weatherCondition = 'Mostly Cloudy';
    } else if (values.weatherCodeMax >= 1000) {
      weatherIcon = < IoIosPartlySunny />
      weatherCondition = 'Mostly Sunny';
    } else {
      weatherIcon = < BsCloudSlashFill/>
      weatherCondition = 'Unknown';
    }
  };

  const getMonthName = (monthNumber) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[monthNumber - 1]; // Month numbers are zero-based, so subtract 1
  };

  // Function to get the day of the week
  const getDayOfWeek = (timestamp) => {
    const date = new Date(timestamp);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeekIndex = date.getDay();
    return daysOfWeek[dayOfWeekIndex];
  };

  // Function to get the date in the format "day, date month"
  const getDateAndMonth = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = getMonthName(date.getMonth() + 1); // Get month name using the function
    return `${day}, ${month}`;
  };

  return (
    <div className='forecast-weather'>
      <ul>
        {forecastData && forecastData.timelines && forecastData.timelines.daily.map((data, index) => (
          
          <li key={index}>
            <div className='day-date'>
              <div>{getDayOfWeek(data.time)}</div>
              <div>{getDateAndMonth(data.time)}</div> 
            </div>
            <div className='weather'>
              {getWeatherConditiondata(data.values)}
              <div>{weatherIcon}</div>
              <div>{weatherCondition} </div>
            </div>
            <div className='temp'>
              < FaTemperatureHalf/>
              <div>{data.values.temperatureAvg}&deg;C</div>
            </div>
            <div className='humidity'>
              <FaDroplet/>
              <div>{data.values.humidityAvg} %</div>
            </div>
            <div className='wind'>
              <FaWind/>
              <div>{data.values.windSpeedAvg} %</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForecastWeather;
