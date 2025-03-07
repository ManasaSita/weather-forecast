import React, { useState } from "react";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';


const WeatherGraph = ({ realTimeWeather, forecastData }) => {
    const extractHourlyData = () => {
        // Get the current date
        const currentDate = new Date();
        const currentDay = currentDate.toDateString();
        
        // Find the data for the current day
        const currentDayData = forecastData.timelines.hourly.filter(data => {
        const date = new Date(data.time);
        return date.toDateString() === currentDay;
        });
    
        // Extract temperature and humidity data for the current day
        if (currentDayData) {
        const temperatureData = currentDayData.map(data => data.values.temperature);
        const humidityData = currentDayData.map(data => data.values.humidity);
        const times = currentDayData.map(data =>  {
            const date = new Date(data.time);
            const hour = date.getHours();
            return hour;
        });
        return { temperatureData, humidityData, times };
        } else {
        return { temperatureData: [], humidityData: [] }; // Return empty arrays if no data found
        }
    };
    
    // Function to create graphs for hourly temperature and humidity for the current day
    const createHourlyGraphs = () => {
        const { temperatureData, humidityData, times } = extractHourlyData();

        //For separate hourlyTemparature graph
        const temperatureGraphData = {
            labels: Array.from({ length: temperatureData.length }, (_, i) => i + 1),
            datasets: [
                {
                    label: 'Hourly Temperature',
                    data: temperatureData,
                    fill: true,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                }
            ]
        };

        //For separate hourlyHumidity graph
        const humidityGraphData = {
            labels: Array.from({ length: humidityData.length }, (_, i) => i + 1),
            datasets: [
                {
                    label: 'Hourly Humidity',
                    data: humidityData,
                    fill: false,
                    borderColor: 'rgb(54, 162, 235)',
                    tension: 0.1
                }
            ]
        };

        const combinedGraphData = {
            // labels: times,
            datasets: [
                {
                    label: 'Temperature',
                    data: temperatureData,
                    fill: true,
                    borderColor: '#d92c2ccc',
                    tension: 1,
                },
                {
                    label: 'Humidity',
                    data: humidityData,
                    fill: true,
                    borderColor: '#218eedc9',
                    tension: 0.1,
                }
            ]
        };

        const options = {
            plugins: {
                legend: {
                  labels: {
                    pointStyle: 'circle',
                    fontSize: '20px',
                    color: '#fafafa', // Change legend font color
                  },
                },
            },
            scales: {
              x: {
                overflowX: 'auto',
                labels: times,
                grid: {
                  display: false, // Remove grid lines from the x-axis
                },
                ticks: {
                    label: times,
                    color: '#fafafa', // Change x-axis ticks font color
                },
                title: {
                    display: true,
                    color: '#fafafa',
                    text: 'Time (24 Hr format)', // X-axis title
                },
              },
              y: {
                // display: false,
                grid: {
                  display: false, // Remove grid lines from the y-axis
                },
                ticks: {
                    color: '#fafafa', // Change x-axis ticks font color
                },
                title: {
                    display: true,
                    color: '#fafafa',
                    text: 'Temperature (°C) / Humidity (%)', // Y-axis title
                },
              },
            },
          };
        

    return [
      <div className="graph-container" key="combined">
        <h3 className="graph-title">Today</h3>
        <Line className="graph" style={{ width: '1000px !important', height: '400px', overflowX: 'auto'}} data={combinedGraphData} options={options} />
      </div>
    ];
  };

  const hourlyGraphs = createHourlyGraphs();

    return (
      <div className="weather-graph">
        {hourlyGraphs}
      </div>
    ); 

};

export default WeatherGraph;