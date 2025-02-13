import puppeteer from "puppeteer";
import fs from "fs/promises";

import dotenv from "dotenv"
dotenv.config()
const scraperApiKey =process.env.API_KEY;



//Starting puppeteer and proxy server
const getDates=async()=>{
  const browser=await puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:[
       `http://scraperapi:${scraperApiKey}@proxy-server.scraperapi.com:8001`
    ]
  })

const page= await browser.newPage()
let allData={}

await page.goto("https://www.formula1.com/en/racing/2025",{
  waitUntil:"domcontentloaded"
})

const dates= await page.evaluate(()=>{
  const datesContainer=document.querySelectorAll(".f1-container")
  const dateArray={}

  Array.from(datesContainer).forEach(container=>{
      const header=Array.from(container.querySelectorAll(".f1-text")).map((e)=>e.innerText.trim())

      const text=Array.from(container.querySelectorAll("a")).map((e)=>e.innerText.trim())
      

      for(let i=0;i<header.length;i++){
        dateArray[header[i]]=text[i]
      }   
    })
    return dateArray
})

  allData=dates

try{
  await fs.writeFile("F1_2025_calendar.json",JSON.stringify(allData,null,2))
  console.log("Data succesfully written on the disk")
}
catch (e){
  console.log(e) 
}

await browser.close();

}
getDates()