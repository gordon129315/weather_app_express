const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const forecastUrl = "https://api.darksky.net/forecast/396ca1df84c02b1a845534334a727775/"+latitude+","+longitude+"?lang=en&units=si"

    request({url: forecastUrl, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (response.body.error) {
            callback('Unable to find location.', undefined)
        }
        else{
            const summary = response.body.currently.summary 
            const temperature = response.body.currently.temperature
            // const weather = summary + ". It's currently " + temperature + " degree."
            const data = [summary,
                            ". It's currently ",
                            temperature,
                            " degree."
                            ].join('')
            callback(undefined, data)
        }
    })


}



module.exports = forecast

// const forecastUrl = "https://api.darksky.net/forecast/396ca1df84c02b1a845534334a727775/37.8267,-122.4233?lang=en&units=si"

// request({url: forecastUrl, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     }
//     else if (response.body.error) {
//         console.log('Unable to find location.')
//     }
//     else{
//         const summary = response.body.currently.summary 
//         const temperature = response.body.currently.temperature
//         // const weather = summary + ". It's currently " + temperature + " degree."
//         const data = [summary,
//                         ". It's currently ",
//                         temperature,
//                         " degree."
//                         ].join('')
//         console.log(data)
//     }
// })