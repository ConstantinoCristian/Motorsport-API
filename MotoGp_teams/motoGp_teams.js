import puppeteer from "puppeteer";
import fs from "fs/promises";
import dotenv from "dotenv"
dotenv.config()
const scraperApiKey =process.env.API_KEY;


const getTeams = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      `http://scraperapi:${scraperApiKey}@proxy-server.scraperapi.com:8001`
    ],
  });

  const page = await browser.newPage();

  // Full list of MotoGP teams (updated)
  let teamLink = [
    "aprilia-racing",
    "ducati-lenovo-team",
    "gresini-racing-motogp",
    "repsol-honda-team",
    "lcr-honda",
    "monster-energy-yamaha-motogp",
    "mooney-vr46-racing-team",
    "red-bull-ktm-factory-racing",
    "gasgas-factory-racing-tech3",
    "withu-yamaha-rnf-motogp-team"
  ];

  let allTeamsData = [];

  for (let link of teamLink) {
    const teamUrl = `https://www.crash.net/motogp/teams/${link}`;
    console.log(`Scraping team data from: ${teamUrl}`);

    await page.goto(teamUrl, { waitUntil: "domcontentloaded" });

    const teamData = await page.evaluate(() => {
      const infoContainers = document.querySelectorAll(".views-field");
      const teamName = document.querySelector("h1")?.innerText.trim() || "Unknown"; // Ensure teamName is a string
      const teamsArray = {};

      infoContainers.forEach((container) => {
        const label = container.querySelector(".views-label")?.innerText.trim();
        const text = container.querySelector(".field-content")?.innerText.trim();
        if (label && text) {
          teamsArray[label] = text;
        }
      });

      return {
        teamName,
        teamsArray,
      };
    });

    allTeamsData.push(teamData);
  }

  await fs.writeFile("motogp_teams.json", JSON.stringify(allTeamsData, null, 2), "utf-8");

  console.log("Data scraped and saved:", allTeamsData);

  await browser.close();
};

getTeams();
