const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path') // don't install
const bodyParser = require('body-parser');


require('dotenv').config();

//defined function
const getWeather = require('./lib/openWeather') //object that contains getwWeather function - good for single

const harryPotter = require('./lib/harryPotter')
// multiple imports
// const openWeather = require('./openWeather') 

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//template
app.use(express.static(path.join(__dirname, 'public'))) // static content path to use public folder as the first e.g your index

//saying to use hbs
app.engine('.hbs', hbs ({
    defaultLayout: 'layout', //layout.hbs - all other pages will use this pages template/styling
    extname: 'hbs'
}));

//confirming when use engine need to set it all hbs file
app.set('view engine', '.hbs');
//end of template


app.get('/', async(req,res) => {
    // let data = await getWeather(); //getWeather returns a promise so have to use async here
    //if have multiple functions [object.functionName] would do openWeather.function();
    // res.send(data)
    // console.log(data) // when load page will log the data in the console

    //original grabbing info 
    // let temp = data.main.temp;
    // let country = data.sys.country;
    // let clouds = data.clouds.all;
    // let windSpeed = data.wind.speed;
    // let description = data.weather[0].description
    // let weather = data.weather[0].icon;
    // res.render('index', { temp, country, clouds, windSpeed, description, weather })

    //shortened version
    // let weatherInfo = {
    //     temp: data.main.temp,
    //     country: data.sys.country,
    //     clouds: data.clouds.all,
    //     windSpeed: data.wind.speed,
    //     description: data.weather[0].description,
    //     weather: data.weather[0].icon
    // }
    // res.render('index', { weatherInfo });
    res.render('index');
});

app.post('/', async(req,res) => {
    let city = req.body.city;
    let data = await getWeather(city);
    console.log(data);
    let weatherInfo = {
        temp: data.main.temp,
        feelslike: data.main.feels_like,
        country: data.sys.country,
        main: data.weather[0].main,
        description: data.weather[0].description,
        name: data.name,
        icon: ""
    };
    if (weatherInfo.main === "Clouds") {
        weatherInfo.icon ="https://img.icons8.com/color/96/000000/clouds.png";
    } else if (weatherInfo.main === "Clear") {
        weatherInfo.icon="https://img.icons8.com/color/96/000000/partly-cloudy-day.png";
    } else if (weatherInfo.main === "Rain") {
        weatherInfo.icon="https://img.icons8.com/color/96/000000/rain.png";
    }
    console.log(weatherInfo);
    // let clouds = data.clouds.all
    res.render('index', { weatherInfo });
})


// app.get('/about', async(req,res) => {
//     let data = await openWeather.anotherFunction(); //getWeather returns a promise so have to use async here
//     //if have multiple functions [object.functionName] would do openWeather.function();
//     res.send(data)
// });

app.get('/harrypotter', async (req,res) => {
    let data = await harryPotter.getSortingHat();
    console.log(data)
    res.render('harrypotter', { data });
})


app.listen(3001, () => {
    console.log("you are listening on port 3001")
});