import axios from "axios";

export const getData = async (city) => {
  const baseUrl = import.meta.env.VITE_WEATHER_API_BASE;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  console.log(import.meta.env.VITE_WEATHER_API_BASE)
  console.log(import.meta.env.VITE_WEATHER_API_KEY)

  if (!baseUrl || !apiKey) {
    throw new Error("Environment variables VITE_WEATHER_API_BASE or VITE_WEATHER_API_KEY are not set.");
  }

  const response = await axios.get(
    `${baseUrl}/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`
  );

  // mengembalikan data cuaca untuk disimpan di App.jsx
  return response.data;
};