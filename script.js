const apiKey = "7febccc953407aa9329823c1eca045d5";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("weatherResult");
  result.innerHTML = "";

  if (!city) return alert("กรุณากรอกชื่อเมือง");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=th`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("ไม่พบข้อมูล");
    const data = await res.json();

    result.innerHTML = `
      <h2>📍 ${data.name}</h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
      <p>🌤️ ${data.weather[0].description}</p>
      <p>🌡️ อุณหภูมิ: ${data.main.temp} °C</p>
      <p>💧 ความชื้น: ${data.main.humidity}%</p>
      <p>💨 ลม: ${data.wind.speed} km/h</p>
    `;
  } catch (error) {
    result.innerHTML = `<p style="color: red;">❌ ${error.message}</p>`;
  }
}
