const request = require('request')


const geocode = (address, callback) => {
    address = encodeURIComponent(address)
    const mapBoxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiZ29yZG9uMTI5MzE1IiwiYSI6ImNqdmsycG9ibTBuZGk0OHBmYXFnZmJwYTEifQ.D91Rz0UwPnNqIfhPCg7tzQ"
    request({url: mapBoxUrl, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to geocode service!', undefined)
        }    
        else if (response.body.message) {
            callback('Not Authorized - Invalid Token', undefined)
        }
        else if (response.body.features.length === 0) {
            
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode







// const mapBoxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZ29yZG9uMTI5MzE1IiwiYSI6ImNqdmsycG9ibTBuZGk0OHBmYXFnZmJwYTEifQ.D91Rz0UwPnNqIfhPCg7tzQ"

// request({url: mapBoxUrl, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to geocode service!')
//     }    
//     else if (response.body.message) {
//         console.log('Not Authorized - Invalid Token')
//     }
//     else if (response.body.features.length == 0) {
//         console.log('Unable to find location. Try another search.')
//     }
//     else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude, longitude)
//     }
// })