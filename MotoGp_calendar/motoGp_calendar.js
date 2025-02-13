import puppeteer from "puppeteer";
import fs from "fs/promises";

import dotenv from "dotenv"
dotenv.config()
const scraperApiKey =process.env.API_KEY;


// Starting puppeteer and proxy server
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

  await page.goto("https://www.motogp.com/en/calendar", {
    waitUntil: "domcontentloaded"
  });

  const dates = await page.evaluate(() => {
    const datesContainer = document.querySelectorAll(".calendar-listings__month-listings");
    const dateArray = {};

    Array.from(datesContainer).forEach((container, index) => {
      const header = Array.from(container.querySelectorAll(".calendar-listing__title")).map((e) =>
        e.innerText.replace(/\s+/g, ' ').trim()
      );
      const text = Array.from(container.querySelectorAll(".calendar-listing__date-container")).map((e) =>
        e.innerText.replace(/\s+/g, ' ').trim()
      );
      const location = Array.from(container.querySelectorAll(".calendar-listing__status-type")).map((e) =>
        e.innerText.replace(/\s+/g, ' ').trim()
      );
      //The slashes / just define the start and end of the regex pattern.
      //The \s matches any kind of whitespace.
      //The + ensures we match one or more of them.
      //The global flag g tells JS to look for all occurrences, not just the first one.
      //After the comma, the ' ' is what you want to replace the matched whitespace with.

      // Add round number as the index + 1 (since index is zero-based)
      for (let i = 0; i < header.length; i++) {
        //`Race-${i+1}`
        
        dateArray[location[i]] = {
          "Circuit_Location":header[i],
          "Date": text[i]
        };
      }
      
    });   
return dateArray
  });

  allData = dates;

  try {
    await fs.writeFile("MotoGp_2025_calendar.json", JSON.stringify(allData, null, 2));
    console.log("Data successfully written to the disk");
  } catch (e) {
    console.log(e);
  }

  await browser.close();
};

getDates();
