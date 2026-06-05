import { CloudRain } from "lucide-react";
import { useState, useEffect } from "react";
import { getData } from "../utils/api";

function App() {
  // variabel nama kota yang akan dicari datanya, defaultnya adalah London
  const [city, setCity] = useState("london");
  // menyimpan data cuaca yang didapat dari API
  const [weatherData, setWeatherData] = useState(null);
  // variable input untuk menyimpan nilai input dari user, defaultnya adalah nilai dari variable city
  const [input, setInput] = useState(city);
  // variabel eror
  const [error, setError] = useState(null);

  useEffect(() => {
    // fungsi untuk mengambil data cuaca dari API setiap kali kota berubah
    const fetchWeatherData = async () => {
      try {
        setError(null);
        const data = await getData(city);
        setWeatherData(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchWeatherData();
  }, [city]);

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
              <span>{weatherData.current.temp_c}</span>
              <span className="text-base">°C</span>
            </p>
            <p className="text-white text-2xl">{weatherData.location.name}</p>
            <p className="text-white text-base">{weatherData.current.last_updated}</p>
          </div>

          <div className="flex-1/3 backdrop-blur-xs backdrop-grayscale rounded-4xl flex flex-col gap-4 max-h-1/3 justify-center px-6 py-4">
            <p>Thunderstorms expected around 00:00</p>
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