import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function getWeather(city = "Bangkok") {
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=th`;

  try {
    const { data } = await axios.get(url);
    return `
📍 ${data.name}
🌤️ ${data.weather[0].description}
🌡️ อุณหภูมิ: ${data.main.temp} °C
💧 ความชื้น: ${data.main.humidity}%
💨 ลม: ${data.wind.speed} km/h
    `.trim();
  } catch {
    return "❌ ไม่สามารถดึงข้อมูลอากาศได้";
  }
}
