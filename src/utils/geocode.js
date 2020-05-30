const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?limit=1&access_token=pk.eyJ1IjoiZ3VydXJhamJzIiwiYSI6ImNrNGVkMmg2dTA5YTQza242eGViMXcycTMifQ.4BDvXqtiZBrNvn4pywPKVg';

    request({url, json: true}, (error, response, body) => {
        if(error) {
            callback('Unable to connect to the weather services!', undefined);
        } else if(body.features.length === 0) {
            callback('Location data incorrect!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
};

module.exports = geoCode