import axios from "axios";

// const baseUrl = import.meta.env.VITE_WEATHER_API_BASE;
// const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const BMKG_BASE = import.meta.env.VITE_BMKG_BASE;
const OPEN_METEO_BASE = import.meta.env.VITE_OPEN_METEO_BASE;

// console.log(import.meta.env.VITE_WEATHER_API_BASE)
// console.log(import.meta.env.VITE_WEATHER_API_KEY)

const isIndonesia = (lat, lon) => {
  return lat >= -11 && lat <= 6 && lon >= 95 && lon <= 141;
};

// ambil cuaca dari openmeteo
const getOpenMateo = async (lat, lon) => {
  const response = await axios.get(
    `${OPEN_METEO_BASE}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
  );
  return { source: "Open-Meteo", data: response.data };
};

// ambil cuaca dari bmkg
const getBmkg = async (kodeWilayah) => {
  const response = await axios.get(
    `${BMKG_BASE}/prakiraan-cuaca?adm4=${kodeWilayah}`
  );
  return { source: "BMKG", data: response.data };
};

// fungsi utama - otomatis pilih API yang tepat
export const getData = async ({ city, lat, lon, kodeWilayah = null }) => {

  try {
    // kaalau ada kode wilayah BMKG -> pakai BMKG
    if (kodeWilayah) {
      return await getBmkg(kodeWilayah)
    }

    // kalau ada kordinat dan lokasinya indonesia -> pakai BMKG via kordinat
    else if (lat && lon && isIndonesia(lat, lon)) {
      // fallback ke openmeteo kalau tidak ada kode wilayah
      return await getOpenMateo(lat, lon);
    }

    // lokasi luar indo pakai openmeteo
    else if (lat && lon) {
      return await getOpenMateo(lat, lon);
    }
    throw new Error("Harap berikan kode (lat/lon) atau kode wilayah BMKG.");
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};