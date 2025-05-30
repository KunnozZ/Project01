const API_KEY = "21e5c24721bf3a24456717c359a41932"; // 🔁 ใส่ API Key จริงจาก openweathermap

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
      const desc = data.weather[0].description;
      const temp = data.main.temp;
      const wind = data.wind.speed;
      const reply = `${city} ตอนนี้ ${temp}°C ${desc}, ลม ${wind} กม./ชม.`;
      callback(reply);
    })
    .catch(() => {
      callback("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    });
}
