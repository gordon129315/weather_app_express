var express = require('express');
var router = express.Router();
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')


router.get('/', function (req, res) {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        // const {latitude, longitude, location} = geocodeData
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })
})



module.exports = router;