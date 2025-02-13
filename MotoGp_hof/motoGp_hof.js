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
    `https://www.motogp.com/en/riders/dani-pedrosa/a8071fde-27fa-49f0-96c8-a53030fcd0dc?tab=overview`,
    `https://www.motogp.com/en/riders/andrea-dovizioso/fe9fa956-0cd0-4009-9484-25e7cb5bdf88?tab=overview`,
    `https://www.motogp.com/en/riders/jorge-lorenzo/d4eaf846-05bc-4a2a-86e4-0f93c27d3234?tab=overview`,
    `https://www.motogp.com/en/riders/valentino-rossi/d6f009a8-5a57-49b1-8c68-a9c78349d500?tab=overview`,
    `https://www.motogp.com/en/riders/nicky-hayden/e6bee675-310c-4083-9183-1e2ee7b297aa`,
    `https://www.motogp.com/en/riders/casey-stoner/9d0d31fb-c7de-4f56-b2ef-ab1829c96e43`,
   `https://www.motogp.com/en/riders/marco-simoncelli/2f1b11d9-7a0b-4a1d-b9b4-b22c53b5aa13`,
   `https://www.motogp.com/en/riders/kenny-roberts-jr/efc8f0f9-1888-4e1a-8891-9f3a733456fc?tab=overview`,
   `https://www.motogp.com/en/riders/max-biaggi/b8a2f851-270e-4e62-aae0-35b99146a859?tab=overview`,
   `https://www.motogp.com/en/riders/daijiro-kato/c8d64e40-8458-4147-a7b2-e9f8c6d19b1b?tab=overview`,
   `https://www.motogp.com/en/riders/alex-criville/32534617-d195-4505-ae65-47980a814ee1?tab=overview`,
   `https://www.motogp.com/en/riders/mick-doohan/3b535544-17ca-491e-849d-f38c61003dc2?tab=overview`,
   `https://www.motogp.com/en/riders/jorge-martinez/29c408e3-7eb7-47b2-b702-a92f3e142081?tab=overview`,
   `https://www.motogp.com/en/riders/kevin-schwantz/1c49a953-e918-463b-9136-23431f08a003?tab=overview`,
    `https://www.motogp.com/en/riders/wayne-rainey/368b37c0-5a72-475b-85c3-434a50cdb62f`,
    `https://www.motogp.com/en/riders/freddie-spencer/20e83b35-5a8e-4b8e-8b06-6a5ddb131a40?tab=overview`,
    `https://www.motogp.com/en/riders/wayne-gardner/3259fade-4b3b-44d6-92ad-f0fc999a275b?tab=overview`,    
    `https://www.motogp.com/en/riders/eddie-lawson/3678d39c-a4df-4fd0-8e17-8645365a47ce?tab=overview`,
    `https://www.motogp.com/en/riders/randy-mamola/d96637e6-d376-43e5-b379-49e4468e0fab`,
    `https://www.motogp.com/en/riders/stefan-dorflinger/70c4d846-c6fa-4b4b-9dbf-877fdab56a72?tab=overview`,
    `https://www.motogp.com/en/riders/anton-mang/7389bee8-9da0-4d45-b08a-f92210bc558b?tab=overview`,
    `https://www.motogp.com/en/riders/angel-nieto/e5c82868-d3a9-46b2-b6bd-956129000f1d?tab=overview`,
    `https://www.motogp.com/en/riders/franco-uncini/519e7bff-06cf-44c8-ab47-03071b5b0cc5?tab=overview`,
    `https://www.motogp.com/en/riders/barry-sheene/12ebb38a-6385-4380-bf49-c143b0ffa217?tab=overview`,
    `https://www.motogp.com/en/riders/marco-lucchinelli/a3cef8b7-d874-454c-b7be-08a6f0c9bada?tab=overview`,
    `https://www.motogp.com/en/riders/kenny-roberts/9cb1d90f-bcca-4e81-90ed-59d97b857bb3?tab=overview`,
  `https://www.motogp.com/en/riders/kork-ballington/2eafd94a-1feb-445a-85d5-11d14d673ee6?tab=overview`,
    `https://www.motogp.com/en/riders/giacomo-agostini/a31b9149-6b76-4adb-a677-8bbe0e9383ab?tab=overview`,
    `https://www.motogp.com/en/riders/phil-read/7bdcbfe1-ce1e-4bc2-8a2f-f3f31853d139?tab=overview`,
    `https://www.motogp.com/en/riders/jarno-saarinen/10a71c14-8778-4375-aff3-26f2d7af6952?tab=overview`,
    `https://www.motogp.com/en/riders/hans-georg-anscheidt/a04ea1a6-9646-475f-bfe6-24760fa536cd?tab=overview`,
    `https://www.motogp.com/en/riders/mike-hailwood/449a1f23-8b83-4561-be0e-a767a7b36c29`,
    `https://www.motogp.com/en/riders/hugh-anderson/8dcce8e4-6477-4501-8173-6eb3f89db6c3?tab=overview`,
    `https://www.motogp.com/en/riders/jim-redman/7435f9e4-13f7-4053-be64-975735860cc4?tab=overview`,
    `https://www.motogp.com/en/riders/luigi-taveri/2dcffe93-88c9-4691-a19b-c2b3ccda8397?tab=overview`,
    `https://www.motogp.com/en/riders/john-surtees/adc5a02a-d0c7-4c97-96ad-439b71ed31b0`,
    `https://www.motogp.com/en/riders/carlo-ubbiali/f8f693b0-e633-4b9c-90d0-a6b9125f6ac2`,
    `https://www.motogp.com/en/riders/geoff-duke/a164eeec-39cd-4ab2-ac25-11665ddf8420?tab=overview`,
  
    // // `https://www.motogp.com/en/riders/mike-trimby/b48af5ec-3803-418e-ba66-b46022c7e391?tab=overview`,
  ];
  const page = await browser.newPage();
  let allData = {};

  for (let label of labels_link) {
     await browser.newPage();
    await page.goto(label, { waitUntil: "networkidle0"},);
    
     

    const contentData = await page.evaluate(() => {
      const rider_container = document.querySelector(".rider-hero__info-container");
      const ridernameElement = rider_container?.querySelector(".rider-hero__info-name");
      const ridername = ridernameElement ? ridernameElement.innerText.trim() : "Unknown Rider";
    
      const rider_info_container = document.querySelector(".rider-hero__details-container");
      const riderCareerElement = rider_info_container?.querySelector(".rider-hero__details-years-active-container");
      const rider_career = riderCareerElement ? riderCareerElement.innerText.trim() : "Unknown Career";
    
      const riderCountryElement = rider_info_container?.querySelector(".rider-hero__details-country");
      const rider_country = riderCountryElement ? riderCountryElement.innerText.trim() : "Unknown Country";
    
      
       let dataArray={}
    
      const L_container=document.querySelector(".rider-story")
      

      let L_text = "No legend story available"; // Default text in case the rider has no story
      
      if (L_container) {
        const pElement = L_container.querySelector("p");
        if (pElement) {
          L_text = pElement.innerText.trim();
          if (L_text.length < 1) {
            L_text = "No legend story available"; // Fallback if the text is empty
          }
        }
      }
    
      return dataArray[ridername]={
        ridername:ridername,
        rider_career:rider_career,
        rider_country:rider_country,
        story:L_text
      };
    });

    // Use the rider's name as the key
    allData[contentData.ridername] = contentData;
    //Object.assign(allData,contentData)
    console.log(contentData);
  }

  try {
    await fs.writeFile("motogp_HOF.json", JSON.stringify(allData, null, 2)); // print in a readable JSON format
    console.log("Data successfully written to disk");
  } catch (error) {
    console.log("Something went wrong while writing data", error);
  }finally{
      await browser.close();
  }


};

getQuotes();
