console.log('javaScript file')

// fetch('http://localhost:3000/weather?address=abc123').then(res => {
//     const {test} = undefined   //test for catch
//     return res.json()
// }).then(data => {
//     if (data.error) {
//         return console.log(data.error)
//     }
//     console.log(data.location)
//     console.log(data.forecast)
// }).catch(error => {
//     console.log('It\'s an error!!')
//     console.log(error)
// })

// fetch('http://localhost:3000/weather?address=montreal').then(res => {
//      res.json().then(data => {
//         if (data.error) {
//             return console.log(data.error)
//         }
//         console.log(data.location)
//         console.log(data.forecast)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()     //prevent refresh browser after submit

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent =''

    // http://localhost:3000/weather...
    fetch('/weather?address=' + encodeURIComponent(location)).then(res => {
        res.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error
                console.log(data.error)
            }
            else {
                console.log(data.location)
                console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            
        })
    })





})