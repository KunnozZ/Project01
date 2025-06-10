const API_KEY = "ddb4e3c410ddf97dce05edfb8fee1856"; // 🔁 ใส่ API Key จริงจาก openweathermap

// สลับโหมด
function showMode(mode) {
  document.getElementById("classicMode").style.display = mode === "classic" ? "block" : "none";
  document.getElementById("chatMode").style.display = mode === "chat" ? "block" : "none";
}

// ------------------ โหมดเดิม ------------------
function getWeatherClassic() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;
  fetchWeather(city, (text) => {
    document.getElementById("weatherResult").innerText = text;
  });
}

// ------------------ โหมดแชท ------------------
function handleChat() {
  const input = document.getElementById("chatInput");
  const city = input.value.trim();
  if (!city) return;
  addChatMessage(city, "user");
  input.value = "";
  fetchWeather(city, (reply) => {
    addChatMessage(reply, "bot");
  });
}

function addChatMessage(text, sender = "bot") {
  const box = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = `msg ${sender}`;
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

// ------------------ ดึงข้อมูลอากาศ ------------------
function fetchWeather(city, callback) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=th`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== 200) {
        callback("ไม่พบข้อมูลสำหรับเมืองนี้");
        return;
      }

      const reply = `
       📍 ${data.name}
       🌤️ ${data.weather[0].description}
       🌡️ อุณหภูมิ: ${data.main.temp} °C
       💧 ความชื้น: ${data.main.humidity}%
       💨 ลม: ${data.wind.speed} km/h
    `.trim();

    callback(reply);
  })
  .catch(() => {
    callback("เกิดข้อผิดพลาดในการเชื่อมต่อ");
  });
}

  // 🔤 อัปเดตข้อความคำอธิบาย
  const hint = document.getElementById('layerHint');
  switch (type) {
    case 'precipitation_new':
      hint.textContent = "แสดงปริมาณน้ำฝนตามพื้นที่";
      break;
    case 'clouds_new':
      hint.textContent = "แสดงความหนาแน่นของกลุ่มเมฆ";
      break;
    case 'temp_new':
      hint.textContent = "แสดงอุณหภูมิพื้นผิวทั่วประเทศ";
      break;
    case 'wind_new':
      hint.textContent = "แสดงความเร็วและทิศทางลม";
      break;
    default:
      hint.textContent = "";

function changeLayer(type) {
  if (weatherLayer) {
    map.removeLayer(weatherLayer);
  }
  weatherLayer = L.tileLayer(`https://tile.openweathermap.org/map/${type}/{z}/{x}/{y}.png?appid=${apiKey}`, {
    attribution: 'Weather data © OpenWeatherMap',
    opacity: 0.6
  });
  weatherLayer.addTo(map);

  }
}