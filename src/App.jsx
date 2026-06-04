import { CloudRain } from "lucide-react";
import axios from "axios";
import { useRef, useState, useEffect } from "react";

 const API_KEY = "bafdca1dbccc4a399c671305262505";

function App() {
  // variabel nama kota yang akan dicari datanya, defaultnya adalah London
  const [city, setCity] = useState("london");
  // menyimpan data cuaca yang didapat dari API
  const [weatherData, setWeatherData] = useState(null);
 // variable input untuk menyimpan nilai input dari user, defaultnya adalah nilai dari variable city
  const [input, setInput] = useState(city);
   // mengindari pemanggilan API yang berulang-ulang saat komponen di-render ulang
  const isFetched = useRef(false);
  // variabel eror
  const [error, setError] = useState(null);
 
  
  
  useEffect(() => {
    // jika data sudah di-fetch, jangan lakukan apa-apa
    if (isFetched.current) return;
    // fungsi untuk mengambil data cuaca dari API
    const getData = async () => {
    try {
      
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      console.log(response.data);
      // set variabel weatherData dengan data yang didapat dari API
      setWeatherData(response.data);
      setError(null)
    }catch (error) {
      setError(error); 
      console.error(error.message)
  }
};
    // untuk menghindari pemanggilan API yang berulang-ulang saat komponen di-render ulang, kita set isFetched.current menjadi true setelah memanggil fungsi getData
    isFetched.current = true;
    // mendapatkan data cuaca dari API
    getData();

}, [city]);


  if (error) return <main>Error: {error}</main>;
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
            <button onClick={
              () => {
                isFetched.current = false; 
                setCity(input)
            }}>Search</button>
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