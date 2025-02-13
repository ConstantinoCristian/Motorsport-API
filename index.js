const express=require("express");
const path=require("path");
const fs=require("fs")
const app=express()
const PORT=process.env.PORT || 5000;

app.use(express.json());

//F1 ENDPOINTS

//1st F1 path
app.get("/f1/calendar", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../F1_2025_cal/F1_2025_calendar.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);

    const cleanData=Object.fromEntries( //forming entrties , then taking the entries of data and replacing 
      Object.entries(data).map(([key,value])=>[key,value.replace(/\n/g, ' ')])
    )
    res.json(cleanData);
  } catch (e) {
    console.log(`Something went wrong: ${e}`);
    res.status(500).send("Internal Server Error");
  }
});

//2nd F1 path
app.get("/f1/drivers",async(req,res)=>{
  try{
    const filePath=path.join(__dirname,"../F1_drivers/F1_drivers.json")
    const data=fs.readFileSync(filePath,"utf8")
    res.json(JSON.parse(data))
  }
  catch(e){
    console.log(`Sorry but there was an error ${e}`)
  }
})


//3rd F1 path
app.get("/f1/fun-facts",async(req,res)=>{
  try{
    const filePath=path.join(__dirname,"../F1_funfacts/F1_funfacts.json")
    const data=fs.readFileSync(filePath,"utf-8")
    res.json(JSON.parse(data))
  }
  catch(e){
    res.json(e)
    console.log(e)
  }
})

//4th F1 path
app.get("/f1/general",async(req,res)=>{
  try{
    const filePath=path.join(__dirname,"../F1_general_info/f1_general_info.json")
    const data=fs.readFileSync(filePath,"utf-8")
    res.json(JSON.parse(data))
  }
  catch(e){
    console.log(e)
    res.json(e)
  }
})


//5h F1 path
app.get("/f1/hof",async(req,res)=>{
  try{
    const filePath=path.join(__dirname,"../F1_hof/F1_hof.json")
    const data=fs.readFileSync(filePath,"utf-8")
    res.json(JSON.parse(data))
  }
  catch(e){
    console.log(e)
    res.json(e)
  }
})



//6th F1 path
app.get("/f1/team-data",async(req,res)=>{
  try{
    const filePath=path.join(__dirname,"../F1_team_data/F1_Teams_Data.json")
    const data=fs.readFileSync(filePath,"utf-8")
    res.json(JSON.parse(data))
  }
  catch(e){
    console.log(e)
    res.json(e)
  }
})


//7th F1 path
app.get("/f1/teams-drivers",async(req,res)=>{
  try{
    const filePath=path.join(__dirname,"../F1_team_drivers/F1_team_drivers.json")
    const data=fs.readFileSync(filePath,"utf-8")
    res.json(JSON.parse(data))
  }
  catch(e){
    console.log(e)
    res.json(e)
  }
})


//8th F1 path
app.get("/f1/tracks",async(req,res)=>{
  try{
    const filePath=path.join(__dirname,"../F1_tracks/All_F1_circuits.json")
    const data=fs.readFileSync(filePath,"utf-8")
    res.json(JSON.parse(data))
  }
  catch(e){
    console.log(e)
    res.json(e)
  }
})



//.......................................................................................//

//MotoGp endpoints

//1st MotoGp path "../MotoGp_hof/motogp_HOF.json"
app.get("/motogp/hof",async(req,res)=>{
  try{
    const filePath=path.join(__dirname,"../MotoGp_hof/motogp_HOF.json")
    const data=fs.readFileSync(filePath,"utf8")
    res.json(JSON.parse(data))
  }
  catch(e){
    console.log(`Sorry but there was an error ${e}`)
  }
})


//2nd MotoGp path
app.get("/motogp/calendar",async(req,res)=>{
  try{
    const filePath=path.join(__dirname,"../MotoGp_calendar/MotoGp_2025_calendar.json")
    const data=fs.readFileSync(filePath,"utf-8")
    res.json(JSON.parse(data))
  }
  catch(e){
    console.log(e)
    res.json(e)
  }
})

//3rd MotoGp path
app.get("/motogp/fun-facts",async(req,res)=>{
  try{
    const filePath=path.join(__dirname,"../MotoGp_funfacts/moto_funfacts.json")
    const data=fs.readFileSync(filePath,"utf-8")
    res.json(JSON.parse(data))
  }
  catch(e){
    console.log(e)
    res.json(e)
  }
})


//4th MotoGp path
app.get("/motogp/general",async(req,res)=>{
  try{
    const filePath=path.join(__dirname,"../MotoGp_general_info/motoGp_general_info.json")
    const data=fs.readFileSync(filePath,"utf-8")
    res.json(JSON.parse(data))
  }
  catch(e){
    console.log(e)
    res.json(e)
  }
})

//5th MotoGp path
app.get("/motogp/riders",async(req,res)=>{
  try{
    const filePath=path.join(__dirname,"../MotoGp_riders/motogp_content.json")
    const data=fs.readFileSync(filePath,"utf-8")
    res.json(JSON.parse(data))
  }
  catch(e){
    console.log(e)
    res.json(e)
  }
})

//6th MotoGp path
app.get("/motogp/teams",async(req,res)=>{
  try{
    const filePath=path.join(__dirname,"../MotoGp_teams/motogp_teams.json")
    const data=fs.readFileSync(filePath,"utf-8")
    res.json(JSON.parse(data))
  }
  catch(e){
    console.log(e)
    res.json(e)
  }
})


//7th MotoGp path
app.get("/motogp/tracks",async(req,res)=>{
  try{
    const filePath=path.join(__dirname,"../MotoGp_tracks/motogp_tracks.json")
    const data=fs.readFileSync(filePath,"utf-8")
    res.json(JSON.parse(data))
  }
  catch(e){
    console.log(e)
    res.json(e)
  }
})






//tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt







app.listen(PORT,()=>console.log(`running on port ${PORT}`))