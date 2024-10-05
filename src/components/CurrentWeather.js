import React from "react";

const CurrentWeather = ({ data, isCelsius }) => {
    const formatTemperature = (temp) => {
        const tempInCelsius = temp - 273.15;
        return isCelsius ? `${tempInCelsius.toFixed(1)}°C` : `${(tempInCelsius * 9 / 5 + 32).toFixed(1)}°F`;
    };

    const getWeatherBackground = (weather) => {
        switch (weather) {
            case "Clear":
                return "url('https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618_1280.jpg')"; // sunny background image
            case "Clouds":
                return "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fcloudy%2F&psig=AOvVaw0IPhyPgx1Ru5m11vRH5ifv&ust=1727982894796000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMijgYm08IgDFQAAAAAdAAAAABAE')"; // cloudy background image
            case "Rain":
                return "url('https://images.theconversation.com/files/436774/original/file-20211209-172173-1watr8u.jpg?ixlib=rb-4.1.0&rect=7%2C241%2C4874%2C2433&q=45&auto=format&w=1356&h=668&fit=crop')"; // rainy background image
            case "Snow":
                return "url('/path/to/snowy-background.jpg')"; // snowy background image
            case "Mist":
                return "url('https://static.vecteezy.com/system/resources/thumbnails/003/643/444/small_2x/cloudy-sky-background-with-clouds-or-fog-free-vector.jpg')";
            case "Haze":
                return "url('https://d2h8hramu3xqoh.cloudfront.net/blog/wp-content/uploads/2022/08/Hazy-Skies-scaled.webp')";
            default:
                return "url('https://preview.redd.it/x-plane-12-default-weather-engine-keeps-improving-live-v0-dtwaydo0tdka1.png?width=640&crop=smart&auto=webp&s=aeded245f5690c21138c0249d54b51177844c323')"; // default background image
        }
    };

    const currentWeather = data.weather[0].main;
    const backgroundStyle = {
        backgroundImage: getWeatherBackground(currentWeather),
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        borderRadius: "10px",
    };

    return (
        <div className="current-weather" style={backgroundStyle}>
            {/* Display city name */}
            <h1>{data.name}</h1>
            <h2>Current Weather</h2>
            <img
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="weather-icon"
            />
            <p>{data.weather[0].description}</p>
            <p className="temperature">{formatTemperature(data.main.temp)}</p>
        </div>
    );
};

export default CurrentWeather;