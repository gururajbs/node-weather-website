const path = require('path')
const express = require('express');
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const app = express();
const port = process.env.PORT || 3000 //get the port from heroku when running, 3000 if locally

const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gururaj'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Gururaj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This will not help!!!',
        name: 'Gururaj'
    })
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address) {
        return res.send({
            error: 'Address is required'
        });
    }

    geoCode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if(error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: foreCastData, 
                location: location,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    // res.send('Help article not found!');
    res.render('error', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Gururaj'
    })
});

app.get('*', (req, res) => {
    // res.send('My 404 Page!');
    res.render('error', {
        title: '404',
        errorMessage: 'Page not found!',
        name: 'Gururaj'
    })
});

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>');
// });
// app.get('/help', (req, res) => {
//     res.send('Help page');
// });
// app.get('/about', (req, res) => {
//     res.send('<h1>Weather Data</h1>');
// });

app.listen(3000, () => {
    console.log('Server running on port 3000');
})