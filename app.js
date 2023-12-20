const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const date = require(__dirname + "/date.js")

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));




app.get("/",function(req,res){
   
    res.render("index");

})



app.post("/weather",function(req,res){

   
    const cityName = req.body.cityName;
    const unit = "metric";
    const apiKey = "feb38391d57fd914cbf00c341d723d28";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            console.log(temp);
            console.log(date.getDate());
            console.log(desc);
            const icon = weatherData.weather[0].icon
            imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"

           
            // res.write("<h1>The Temperature in "+cityName+" is "+ temp + " degree celcius </h1>")
            // res.write("<h1>The climate condition is "+desc+" </h1>")
            // res.write("<img src = " + imageUrl  + ">")
            // res.send();
            res.render("weather",{cityName:cityName,temp:temp,url:imageUrl,date:date.getDate(),desc:desc})

        })
        
        
    })
   
   
})





app.listen("3000",function(){
    console.log("server started at port 3000");
})
