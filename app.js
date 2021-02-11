const express = require('express')
const https = require('https')

const app = express()

app.get('/', function (req, res) {
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=London&appid={API-KEY}&units=metric'

  // REMOVE THE API KEY BEFORE SAVING!!!!!!!!!

  https.get(url, function (response) {
    response.on('data', function (data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = `http://openweathermap.org/img/wn/${icon}.png`

      res.write(`<p>The weather is currenty ${weatherDescription}</p>`)
      res.write(`<h1>The temperature in London is ${temp} degrees Celcius.</h1>`)
      res.write(`<img src="${imageURL}" alt="">`)
      res.send()
    })
  })
})

app.post('/', function (req, res) {
  res.send(`lalallaa`)
})

app.listen(3000, function () {
  console.log('server is running on port 3000')
})
