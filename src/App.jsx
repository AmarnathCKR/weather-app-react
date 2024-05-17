import { useEffect, useState } from "react";
import "./App.css";
import Location from "./components/Location";
import CurrentWeather from "./components/CurrentWeather";
import ForeCast from "./components/ForeCast";
import { PushSpinner } from "react-spinners-kit";

import { useQuery } from "@apollo/client";
import { GET_WEATHER, GET_FORECAST } from "./api/queries";

function App() {
  const [currentWeather, setWeather] = useState(null);
  const [currentForecast, setForecast] = useState(null);
  const [search, setSearch] = useState("kozhikode");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data: weatherData, loading: weatherLoading } = useQuery(GET_WEATHER, {
    variables: { location: coords? coords : "" },
  });

  const styles = {
    backgroundImage: `url("https://res.cloudinary.com/dqrpxoouq/image/upload/v1688369767/ct1iksngdvatvgv3bykn.webp")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    backgroundSize: "cover",
  };

  const { data: forecastData, loading: forecastLoading } = useQuery(
    GET_FORECAST,
    {
      variables: { location: coords? coords : "" },
    }
  );

  const onDataChange = async (searchData) => {

    setCoords(searchData.value)
    setLoading(true);
    setWeather(null);
    setForecast(null);
    setSearch(searchData.value);
  };

  useEffect(() => {
    if (weatherData?.getWeather && forecastData?.getForecast) {
      setWeather({
        city: `${weatherData.getWeather.name} ${weatherData.getWeather.sys.country}`,
        ...weatherData.getWeather,
      });
      setForecast({
        city: `${weatherData.getWeather.name} ${weatherData.getWeather.sys.country}`,
        ...forecastData.getForecast,
      });
      setLoading(false);
    }
  }, [weatherData, forecastData]);

  return (
    <>
      <div
        style={styles}
        className={`w-full ${
          currentWeather ? "md:h-full h-screen" : "h-screen"
        } md:p-20 p-5 text-xs md:text-md`}
      >
        {loading && (
          <div className="z-40  md:p-64 loader-local bg-secondary">
            {" "}
            <PushSpinner size={30} color="#ffff" loading={loading} />
          </div>
        )}
        <div className="w-full bg-black opacity-70 md:p-10 p-2 rounded-lg ">
          <p className="text-white md:text-3xl py-2 text-2xl font-bold text-center">
            Weather App
          </p>
          <Location
            search={search}
            setSearch={setSearch}
            onDataChange={onDataChange}
          />
          <div className="grid grid-cols-5 m-5 z-0">
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {currentForecast && <ForeCast data={currentForecast} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
