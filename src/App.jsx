import { CloudRain } from "lucide-react";
import { useState, useEffect } from "react";
import { getData } from "../utils/api";

function App() {
  // variabel nama kota yang akan dicari datanya, defaultnya adalah London
  const [city, setCity] = useState("Jakarta");
  // menyimpan data cuaca yang didapat dari API
  const [weatherData, setWeatherData] = useState(null);
  // variable input untuk menyimpan nilai input dari user, defaultnya adalah nilai dari variable city
  const [input, setInput] = useState(city);
  // variabel eror
  const [error, setError] = useState(null);
  // menyimpan sumber API yang di gunakan (BMKG atau Open-Meteo)
  const [source, setSource] = useState(null);

  useEffect(() => {
    // fungsi untuk mengambil data cuaca dari API setiap kali kota berubah
    const fetchWeatherData = async () => {
      try {
        setError(null);
        setWeatherData(null);

        // gunakan geocoding API dari Open-Meteo untuk konversi nama kota menjadi koordinat
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=id`
        );
        const geoData = await geoRes.json();

        // jika kota tdk ada, lempar error
        if (!geoData.results || geoData.results.length === 0) {
          throw new Error(`Kota "${city}" tidak ditemukan.`);
        }

        const { latitude, longitude, country_code } = geoData.results[0];

        // tentukan lokasi nya apakah ada di indonesia
        const isIndonesia = country_code === "ID";

        // panggil getData koordinat, BMKG hany unutuk indoneisa
        const result = await getData({
          city,
          lat: latitude,
          lon: longitude,

          kodeWilayah: null,
        });

        setSource(result.source);
        setWeatherData({ raw: result.data, lat: latitude, lon: longitude, isIndonesia});
      } catch (error) {
        setError(error);
      }
    };

    fetchWeatherData();
  }, [city]);

  // normalisasi data dari Open-Meteo agar bisa di tampilkan
  const getDisplayData = () => {
    if (!weatherData) return null;
    const { raw } = weatherData;

    // format data Open-Meteo
    if(source === "Open-Meteo") {
      return{
        temp: raw.current.temperature_2m,
        locationName: city,
        lastUpdated: raw.current.time,
        humidity: raw.current.relative_humidity_2m,
        windSpeed: raw.current.wind_speed_10m,
      };
    }

    // format data BMKG
    if (source === "BMKG"){
      const cuaca = raw.data?.[0]?.[0];
      return {
        temp: cuaca?.t ?? "-",
        locationName: raw.data?.[0]?.lokasi?.kecamatan ?? city,
        lastUpdated: cuaca?.local_datetime ?? "-",
        humidity: cuaca?.hu ?? "-",
        windSpeed: cuaca?.ws ?? "-",
      };
    }
    return null;
  };

  const display = getDisplayData();

  // tampilkan pesan error jika fetch gagal
  if (error) return <main>Error: {error.message || String(error)}</main>;
  if (!weatherData) return <main>Loading...</main>;

      
  return (
    <main
      className="w-full min-h-screen bg-no-repeat bg-cover bg-bottom flex"
      style={{ backgroundImage: "url(/rain.jpeg)" }}
    >
      <div className="flex flex-col items-center flex-1/2 text-white">
        <div className="flex flex-col flex-1/2 justify-center p-6 text-center gap-4">
          <div>
            <input 
            className="px-8 py-4 backdrop-blur-xs rounded-2xl active:outline-none bg-white/20 text-white" placeholder="Cari nama kota...." 
            value={input} 
            onChange={(e) => setInput(e.target.value)}

            >
            </input>
            <button onClick={() => setCity(input)}>Search</button>
          </div>
          <div className="flex flex-col">
            <p className="text-white text-8xl flex items-center justify-center">
              <span>{display.temp}</span>
              <span className="text-base">°C</span>
            </p>
            <p className="text-white text-2xl">{display.locationName}</p>
            <p className="text-white text-base">{display.lastUpdated}</p>
            {/*tampilkan sumber API*/}
            <p className="text-white/60 text-xs mt-1">Sumber: {source}</p>
          </div>

          <div className="flex-1/3 backdrop-blur-xs backdrop-grayscale rounded-4xl flex flex-col gap-4 max-h-1/3 justify-center px-6 py-4">
            <p>💧 Kelembaban: {display.humidity}% &nbsp;|&nbsp; 🌬️ Angin: {display.windSpeed} km/h</p>
            <div className="h-px w-full bg-white/25" />
            <div className="flex justify-between">
              <div className="flex flex-col items-center justify-center">
                <span>Now</span>
                <CloudRain />
                <p>
                  <span>23</span>
                  <span>°C</span>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span>Now</span>
                <CloudRain />
                <p>
                  <span>23</span>
                  <span>°C</span>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span>Now</span>
                <CloudRain />
                <p>
                  <span>23</span>
                  <span>°C</span>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span>Now</span>
                <CloudRain />
                <p>
                  <span>23</span>
                  <span>°C</span>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span>Now</span>
                <CloudRain />
                <p>
                  <span>23</span>
                  <span>°C</span>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span>Now</span>
                <CloudRain />
                <p>
                  <span>23</span>
                  <span>°C</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-2/3"></div>
      </div>
    </main>
  );
}

export default App;