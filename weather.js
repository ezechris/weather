const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");



const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function (req, res) {

res.sendFile(__dirname + "/index.html")    
});

app.post("/", function (req, res) {

var city = req.body.city;
var key = "e2fb32d2299ea80b778445843f025a13"

    var url =  "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key + "&lang=sp&units=standard"
    
    https.get(url, function (response) {

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const cod = weatherData.cod;
            const name = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            res.write("<h1> the weather data for " + city + " is " + temperature + " fahrenheit </h1>");
            res.write(" status code: " + cod + " and here's the weather description: " + weatherDescription)
            res.send()
        })
    })



})




app.listen(3000, function (req, res) {
    console.log("yo dawg, server starts at 3000");
})