import puppeteer from "puppeteer";
import fs from "fs/promises"
import dotenv from "dotenv"
dotenv.config()
const scraperApiKey =process.env.API_KEY;

const getTeamDrivers= async()=>{
  const browser= await puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:[
      `http://scraperapi:${scraperApiKey}@proxy-server.scraperapi.com:8001`
    ]
  })

const page= await browser.newPage()
let allData={}

await page.goto("https://www.formula1.com/en/teams",{
  waitUntil:"domcontentloaded"
})


const teamDrivers=await page.evaluate(()=>{
  const grids=document.querySelectorAll(".group")
  const teamDriversArray={}

  Array.from(grids).forEach(grid=>{
    const teams=Array.from(grid.querySelectorAll("span")).map((e)=>e.innerText.trim())
    const drivers=Array.from(grid.querySelectorAll(".f1-team-driver-name")).map((e)=>e.innerText.trim())

    
      teamDriversArray[teams]=drivers
    
  })
  return teamDriversArray
})
allData=teamDrivers

try{
  fs.writeFile("F1_team_drivers.json",JSON.stringify(allData,null,2)) //Parses the JSON data
  console.log(allData)
  console.log("Data succesfully writen to the disk")
}
catch(e){
  console.log(`Something went wrong ${e}`)
}
await browser.close()
}
getTeamDrivers()


