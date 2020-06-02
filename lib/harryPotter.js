const fetch = require('node-fetch');
const URL = `https://www.potterapi.com/v1/sortingHat`

const getSortingHat = async() => {
    let data = await fetch(URL);
    // console.log(data) //check get the data
    let JSObject = await data.json();
    return JSObject;
}

module.exports = {
    getSortingHat
}