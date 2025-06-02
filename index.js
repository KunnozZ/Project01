import express from "express";
import { Client, middleware } from "@line/bot-sdk";
import dotenv from "dotenv";
import cron from "node-cron";
import { getWeather } from "./weather.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new Client(config);

// Webhook LINE
app.post("/webhook", middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

// รับข้อความจากผู้ใช้
async function handleEvent(event) {
  if (event.type === "message" && event.message.type === "text") {
    const city = event.message.text;
    const weather = await getWeather(city);
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: weather,
    });
  }
}

// ตั้งเวลาแจ้งเตือนทุกวัน 07:00
cron.schedule("1 3 * * *", async () => {
  const weather = await getWeather("Bangkok");
  await client.pushMessage(process.env.USER_ID, {
    type: "text",
    text: `🔔 แจ้งเตือนอากาศรายวัน\n\n${weather}`,
  });
});

app.listen(PORT, () => {
  console.log("LINE Bot รันที่พอร์ต " + PORT);
});
