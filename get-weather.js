
const request = require('request');
const { argv } = require('yargs');

const CITY = argv.c || 'Ivano-Frankivsk';
const GOOGLE_API_KEY = process.env.GOOGLE_KEY;
const GOOGLE_URL = `https://maps.googleapis.com/maps/api/geocode/json?&address=${CITY}&key=${GOOGLE_API_KEY}`;
const DARK_SKY_KEY = process.env.DARKSKY_KEY;
const DARK_SKY_URL = `https://api.darksky.net/forecast/${DARK_SKY_KEY}`;

const showWeather = request(GOOGLE_URL, function (err, response, body) {
    if(err){
      console.log('error:', error);
    } else {
      if (JSON.parse(body).status === 'ZERO_RESULTS'){
        console.log('There is no such city, please enter a valid one.')
      }
      let response = JSON.parse(body);
      let location = response.results.find(item => {
        let lat = item.geometry.location.lat;
        let lng = item.geometry.location.lng;
        request(`${DARK_SKY_URL}/${lat},${lng}`, function (err, response, body) {
            if (err) {
                console.log('error: ', error);
            } else {
                let data = JSON.parse(body);
                const toCelsius = (data.currently.temperature - 32) * 5/9;
                console.log(`The temperature in ${CITY} is`, `${parseFloat(toCelsius).toFixed(1)}°`);
            }
        } )
      });
    }
});

module.exports = {
    showWeather
}