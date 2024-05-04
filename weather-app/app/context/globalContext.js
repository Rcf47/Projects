"use client";

import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { createContext } from "react";
import defaultState from "../utils/defaultState";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});
  const [geoCodeList, setGeoCodeList] = useState(defaultState);

  const fetchForecast = async () => {
    try {
      const res = await axios.get("api/weather");
      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  // Air quality
  const fetchAirQuality = async () => {
    try {
      const res = await axios.get("api/pollution");
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air quality data: ", error.message);
    }
  };

  // five day forecast
  const fetchFiveDayForecast = async () => {
    try {
      const res = await axios.get("api/fiveday");
      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  //fetch uv indexe
  const fetchUvIndex = async () => {
    try {
      const res = await axios.get("api/uv");
      setUvIndex(res.data);
    } catch (error) {
      console.log("Error fetching uv data: ", error.message);
    }
  };

  // handle input
  const handleInput = (event) => {
    setInputValue(event.target.value);
    if (event.target.value === "") {
      setGeoCodeList(defaultState);
    }
  };
  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDayForecast();
    fetchUvIndex();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        forecast: forecast,
        airQuality: airQuality,
        fiveDayForecast: fiveDayForecast,
        uvIndex: uvIndex,
        geoCodeList: geoCodeList,
        inputValue: inputValue,
        handleInput: handleInput,
      }}
    >
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
export const useGlobalContextUpdate = () => {
  return useContext(GlobalContextUpdate);
};
