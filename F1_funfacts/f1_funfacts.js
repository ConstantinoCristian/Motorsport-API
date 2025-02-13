import puppeteer from "puppeteer";
import fs from "fs/promises"
import { DEFAULT_VIEWPORT } from "puppeteer";
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
let allData={}
const page=await browser.newPage()
await page.goto("https://www.mdd-europe.com/blogs/news/50-incredible-formula-one-facts",{
  waitUntil:"domcontentloaded"
})

const factsData=await page.evaluate(()=>{
     const containers=document.querySelector(".article-template__content")
      const factsHeader=Array.from(containers.querySelectorAll("h2")).map((e)=>e.innerText.trim())
      const funcfact=Array.from(containers.querySelectorAll("div")).map((e)=>e.innerText.trim())  
      funcfact.filter(funcfacts=>funcfacts)
      let dataArray={}
      
      return dataArray[factsHeader]=funcfact 
   
})

allData=factsData
try{
  await fs.writeFile("F1_funfacts.json",JSON.stringify(factsData,null,2))
  console.log("Data has been succesfully written to the disk")
}
catch(e){
  console.log(e)
}
await browser.close()
}

getQuotes()

