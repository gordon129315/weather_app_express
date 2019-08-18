const path = require('path')
const express = require('express')
const hbs = require('hbs')
const md = require('markdown').markdown
const fs = require('fs')

const app = express()
const port = process.env.PORT || 3000  //PORT has to be in capital

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use('/weather', require('./weather.js'));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gordon'
    })
})

app.get('/help', (req, res) => {
    let str = fs.readFileSync('./README.md', 'utf-8')
    // console.log(str)
    str = md.toHTML(str)

    res.render('help', {
        title: 'Help Page',
        // text: 'some helpful text',
        text: str,
        name: 'Gordon'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        errorMessage: 'Help article not found',
        name: 'Gordon',
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Gordon'
    })
})

// must put at last one
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: '404 Page not found',
        name: 'Gordon',
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})




// app.get('/help', (req, res) => {
//     res.send([{name: 'Gordon', age: 20},
//     {name: 'Lynn', age: 18}
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })