import React, { useEffect, useState } from "react";

const WeatherSrch = () => {
  const [weather, setWeather] = useState("lagos");
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weather}&appid=8437d49e1b52ac1e495c690eaeb03c4f`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        console.log(data);
        console.log(data.sys?.country)
      })
      .catch(err => console.log(err));
  }, [weather]);


  let emoji = null;
  if(typeof data.main != "undefined"){
    if(data.weather?.[0].main == "clouds"){
      emoji = "fa-clouds"
    }else if(data.weather?.[0].main == "Thunderstorm"){
      emoji = "fa-bolt"
    }else if(data.weather?.[0].main == "Drizzle"){
      emoji = "fa-cloud-rain"
    }else if(data.weather?.[0].main == "Rain"){
      emoji = "fa-cloud-shower-heavy"
    }else if(data.weather?.[0].main == "Snow"){
      emoji = "fa-snow-flake"
    }else {
      emoji = "fa-smog"
    } 
  }else{
    return (
      <div className="wrong-input rounded">
        <h1 className="text-3xl md:text-5xl font-bold">Input A Valid Location</h1>
        <a href="/">Click to search</a>
      </div>
    )
  }

  let temp = (data.main?.temp - 273.15).toFixed(2);
  let temp_min = (data.main?.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main?.temp_max - 273.15).toFixed(2);

  // SETTING CURRENT DATE AND TIME
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", {month:'long'});
  let day = d.toLocaleString("default", {weekday:'long'});

  let time = d.toLocaleString([],{
    hour: '2-digit',
    minute: '2-digit',
    second:'2-digit'
  })

   const handleSubmit =  (event) => {
     event.preventDefault();
     setWeather(term);
  }

  return (
    <div>
      <div className="wthbody p-6">
        <div className="toppart flex flex-col items-center justify-center">
          <form className="border-[2px] border-white rounded mb-4" onSubmit={handleSubmit}>
            <div className="formgroup">
              <input
                type="search"
                name="search"
                value={term}
                onChange= {(e) => setTerm(e.target.value)}
                placeholder="Search City"
                aria-label="Search City"
                aria-describedby="basic-addon2"
              />
              <button type="submit" id="basic-addon2">
                <i className="fas fa-search md:px-2"></i>
              </button>
            </div>
          </form>
          
          <div className="weather-2 flex flex-col items-center justify-center rounded pt-7 pb-6">
            <h1 className="text-3xl md:text-[40px] font-bold pb-2 md:pb-3">{data.name},<span className="text-[18px] md:text-3xl">({data.sys?.country})</span></h1>
            <p className="text-[18px] md:text-3xl pb-1 text-center">
              {day}, {month} {date}, {year}
            </p>
            <p className="text-[18px] lg:text-3xl pb-2 md:pb-3 text-center lg:mt-3">{time}</p>
            <hr />
            <i className={`fas ${emoji} fa-4x pt-6 pb-4`}></i>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">{temp}&deg;C</h1>
            <p className="font-semibold text-2xl lg:text-3xl pb-2 lg:pb-3">{data.weather?.[0].main}</p>
            <p className="font-semibold pb-2 capitalize md:text-3xl">{data.weather?.[0].description}</p>
            <p className="font-semibold text-1xl lg:text-2xl">{temp_min}&deg;C | {temp_max}&deg;C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSrch;
