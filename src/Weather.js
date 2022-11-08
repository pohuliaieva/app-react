import React, { useState } from "react";
import axios from "axios";

export default function Weather(props) {
    const [weatherData, setWeatherData] = useState({ ready: false });
    const [city, setCity] = useState(props.defaultCity);

    function handleResponse(response) {
        setWeatherData({
            ready: true,
            temperature: response.data.main.temp,
            wind: response.data.wind.speed,
            humidity: response.data.main.humidity,
            icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            description: response.data.weather[0].description
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        search();
    }

    function handleUpdateCity(event) {
        setCity(event.target.value);
    }

    function search() {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=49813f7b6218c304bf646ff9c4c866c4&units=metric`;
        axios.get(url).then(handleResponse);
    }

    if (weatherData.ready) {
        return (
            <div className="Weather">
                <form onSubmit={handleSubmit}>
                    <input
                        type="search"
                        placeholder="Enter a city.."
                        className="form-control"
                        autoFocus="on"
                        onChange={handleUpdateCity}
                    />
                    <input
                        type="submit"
                        value="Search"
                        className="btn btn-primary w-100"
                    />
                </form>
                <p>It is currently {Math.round(weatherData.temperature)}°C</p>
                <p>Description: {weatherData.description}</p>
                <p>Humidity: {weatherData.humidity}%</p>
                <p>Wind: {weatherData.wind}km/h</p>
                <p>
                    <img src={weatherData.icon} alt={weatherData.description} />{" "}
                </p>
            </div>
        );
    } else {
        search();
    }
}
