const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a41777955c32dd06270ef3ec7629e252&query=' + latitude +',' + longitude;

    request({url, json: true}, function (error, response, body) { 
        if(error) {
            callback('Unable to connect to the weather services!', undefined);
        } else if(body.error) {
            callback('Location data incorrect!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 
            ' °C. It feels like ' + body.current.feelslike + ' °C. ' + 'Humidity is ' + body.current.humidity + '%.');
        }
    })
};

module.exports = forecast