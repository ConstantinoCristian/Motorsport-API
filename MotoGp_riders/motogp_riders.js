import puppeteer from "puppeteer";
import fs from "fs/promises";

import dotenv from "dotenv"
dotenv.config()
const scraperApiKey =process.env.API_KEY;


const getQuotes = async () => {
  // Start Puppeteer with ScraperAPI proxy
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      `http://scraperapi:${scraperApiKey}@proxy-server.scraperapi.com:8001`
    ],
  });

 
  let labels_link = [
    `https://www.crash.net/motogp/racer/889478/alex-rins`,
    `https://www.crash.net/motogp/racer/911998/fabio-quartararo`,
    `https://www.crash.net/motogp/racer/973236/jorge-martin`,
    `https://www.crash.net/motogp/racer/995158/marco-bezzecchi`,
    `https://www.crash.net/motogp/racer/1654/marc-marquez`,
    `https://www.crash.net/motogp/racer/911999/francesco-bagnaia`,
    `https://www.crash.net/motogp/racer/935450/alex-marquez`,
    `https://www.crash.net/motogp/racer/1043650/fermin-aldeguer`,
    `https://www.crash.net/motogp/racer/911973/joan-mir`,
    `https://www.crash.net/motogp/racer/973240/luca-marini`,
    `https://www.crash.net/motogp/racer/889489/johann-zarco`,
    `https://www.crash.net/motogp/racer/1043651/somkiat-chantra`,
    `https://www.crash.net/motogp/racer/889477/franco-morbidelli`,
    `https://www.crash.net/motogp/racer/995149/fabio-di-giannantonio`,
    `https://www.crash.net/motogp/racer/1452/jack-miller`,
    `https://www.crash.net/motogp/racer/911996/miguel-oliveira`,
    `https://www.crash.net/motogp/racer/1040772/pedro-acosta`,
    `https://www.crash.net/motogp/racer/939427/brad-binder`,
    `https://www.crash.net/motogp/racer/973238/enea-bastianini`,
    `https://www.crash.net/motogp/racer/1689/maverick-vinales`,
    `https://www.crash.net/motogp/racer/995154/raul-fernandez`,
    `https://www.crash.net/motogp/racer/1043649/ai-ogura`,
  ];

  let allData = {};

  for (let label of labels_link) {
    const newPage = await browser.newPage();
    await newPage.goto(label, { waitUntil: "domcontentloaded" });

    const ridersName=await newPage.evaluate(()=>{
      const name=document.querySelector("h1").innerText.trim()
      return name
    })

    const contentData = await newPage.evaluate(() => {
      const containers = document.querySelectorAll(".views-element-container");
      const contentArray = {};

      Array.from(containers).forEach((quote) => {
        const label = Array.from(quote.querySelectorAll(".views-label")).map((el) =>
          el.innerText.trim()
        );

        const content = Array.from(quote.querySelectorAll(".field-content")).map((el) =>
          el.innerText.trim()
        );

        for (let i = 0; i < label.length; i++) {
          contentArray[label[i]] = content[i];
        }
      });

      return contentArray;
    });

    // Use the rider's name as the key
    allData[ridersName]=contentData
    
    console.log(contentData);
  }

  try {
    await fs.writeFile("motogp_content.json", JSON.stringify(allData, null, 2)); // print in a readable JSON format
    console.log("Data successfully written to disk");
  } catch (error) {
    console.log("Something went wrong while writing data", error);
  }

  await browser.close();
};

getQuotes();
