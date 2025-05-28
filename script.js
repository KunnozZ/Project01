// ปรับฟังก์ชัน getWeatherClassic เพื่อแสดงไอคอนและข้อมูลสวยงามขึ้น
function getWeatherClassic() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=th`
  )
    .then((res) => res.json())
    .then((data) => {
      const weatherResult = document.getElementById("weatherResult");
      if (data.cod !== 200) {
        weatherResult.innerHTML = `<p style="color:red;">ไม่พบข้อมูลสำหรับเมืองนี้</p>`;
        return;
      }
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      const desc = data.weather[0].description;
      const temp = data.main.temp.toFixed(1);
      const wind = data.wind.speed.toFixed(1);
      const humidity = data.main.humidity;

      weatherResult.innerHTML = `
        <div class="card">
          <img class="weather-icon" src="${iconUrl}" alt="${desc}" />
          <div class="weather-info">
            <div><b>${city}</b></div>
            <div>อุณหภูมิ: ${temp}°C</div>
            <div>สภาพอากาศ: ${desc}</div>
            <div>ลม: ${wind} กม./ชม.</div>
            <div>ความชื้น: ${humidity}%</div>
          </div>
        </div>
      `;
    })
    .catch(() => {
      document.getElementById("weatherResult").innerHTML = `<p style="color:red;">เกิดข้อผิดพลาดในการเชื่อมต่อ</p>`;
    });
}
