const fetch = require("node-fetch");
const fs = require("fs");

// const APPID = "18590bd532b321fa177a498cb55ee455"; // not secure showing API key

// const url = `http://api.openweathermap.org/data/2.5/weather?q=Manchester,uk&appid=${process.env.APPID}`;

//sending request, getting response back
// const getWeather = async () => {
//     let data = await fetch(url).catch((err) => {
//         console.log(err);
//     }); // need to store in value to catch the data


//     console.log(await data.json()) // want in json format so easier to work with
// }

// getWeather()

//2nd version writing data to a file
const getWeather = async(city) => { // if have multiple function can do exports.getWeather
    let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.APPID}`); //promise so have to you await

    let JSONObj = await data.json(); //promise so have to you await
    // fs.writeFileSync('./data.json', JSON.stringify(JSONObj)) //would just return an object so have to add JSON.stringify to make it json data
    return JSONObj;
}
// getWeather()


// const anotherFunction = () => {
//     console.log("Hello")
// }


module.exports = getWeather; //single import - would make an object if have more than 1.

// module.exports = {
//     getWeather,
//     anotherFunction
// }