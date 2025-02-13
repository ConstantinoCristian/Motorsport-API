import puppeteer from "puppeteer";
import fs from "fs/promises";
import dotenv from "dotenv"
dotenv.config()
const scraperApiKey =process.env.API_KEY;


const getDates = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      `http://scraperapi:${scraperApiKey}@proxy-server.scraperapi.com:8001`
    ]
  });

  const page = await browser.newPage();
  let allData = {};
  let hof_link=[
    "https://www.formula1.com/en/information/drivers-hall-of-fame-nino-farina.42vZMEuSei8avz76yMDHpf",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-juan-manuel-fangio.6SSng3B5E6j6pxPNbyqQIv",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-alberto-ascari.6zgWYwDIjoQmYSiz48FAZD",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-mike-hawthorn.1ZhSmpnVlO7Pb8peo23YVd",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-jack-brabham.3XK2XWdL0moCmnSC55m84J",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-phil-hill.6lgmSO6KAK9UgCNziJodGB",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-graham-hill.NUqzbttsJ2gsuGtW9PzNG",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-jim-clark.2xXQsIYM7LBHJrP4Gw6rRD",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-john-surtees.7a0aXDMmG4DZeRFpzeN4vz",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-denny-hulme.4Y4lvrNNAQcB0Cf6PQcIqq",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-jackie-stewart.18715uErEG7LS83UDkeqP4",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-jochen-rindt.297CPloKgJFry8fsI3oVyx",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-emerson-fittipaldi.2H5252hs7KMUh5HBXoYdoW",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-niki-lauda.2Ye7VYWdXwhb97ZqLyxvX",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-james-hunt.4vRKjActuXEjrFBR9hzo2A",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-mario-andretti.6F7CXYpxRzHezXe6At2E7E",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-jody-scheckter.xGrSCopMMf1mkdIUX1119",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-alan-jones.2g6TF5HMcodjT4Jd6Xuub2",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-nelson-piquet.7EkDuZAxJN03b0kgFksCzf",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-keke-rosberg.5oGvi8v8jkuvLTXHTgm0bt",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-alain-prost.6xkomcqkRL5K0HgmPX4zAH",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-ayrton-senna.FLD7ZtO0nUn7JzLEn5rOJ",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-nigel-mansell.3mLYxotFMTyLgIRxilGObS",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-michael-schumacher.7KdX5nJlTG55vR5JQSbZ21",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-damon-hill.5Cwo2Aog5nHCR1eduIkq3y",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-jacques-villeneuve.7gsINZWlAMv5jdtvUJKL8e",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-mika-hakkinen.7ptiWW1foQkbFQSp2boc9d",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-fernando-alonso.2Ig4mBh2FaPMgAMjI0bBF9",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-kimi-raikkonen.4Ykdt9U76gWO40cNbjaMXf",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-lewis-hamilton.6TbSwzJA2miTUwtnXUHkjk",
    "https://www.formula1.com/en/information/drivers-hall-of-fame-jenson-button.3BuV7MDE7ykNAThxxLr8vT",
  "https://www.formula1.com/en/information/drivers-hall-of-fame-sebastian-vettel.GBy6vPkxKOKUV89QOhZe5",   
  "https://www.formula1.com/en/information/drivers-hall-of-fame-nico-rosberg.7ryzoUXKrxqhlcNlXEUaTf",
  "https://www.formula1.com/en/information/drivers-hall-of-fame-max-verstappen.2DttvntAuFvHYrBY2tV8fN" 
  ]

for(let label of hof_link){
    await browser.newPage()
    await page.goto(`${label}`, {
    waitUntil: "domcontentloaded"
  });



  const data = await page.evaluate(() => {
    const result = {};
    const container=document.querySelector("p")
    const hof_period=container.querySelector("span").innerText.trim()
    // Get the driver's name
    const nameElement = document.querySelector("h1");
    const name = nameElement ? nameElement.innerText.trim() : "Unknown Driver";

    // Get all text inside `.prose` containers
    const proseContainers = document.querySelectorAll(".prose");
    const paragraphs = Array.from(proseContainers).
    flatMap(containers=>Array.from(containers.querySelectorAll("p")).map(
      (e)=>e.innerText.trim()
    ))
    result[name] = {
      "hall_of_fame":hof_period,
      "data":paragraphs,
      
    };
    return result;
  });


  Object.assign(allData, data)
}


  try {
    await fs.writeFile("F1_hof.json", JSON.stringify(allData, null, 2));
    console.log("Data successfully written to the disk");
  } catch (e) {
    console.log("Error writing file:", e);
  }

  await browser.close();
};

getDates();
