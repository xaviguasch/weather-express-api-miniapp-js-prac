const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', function (req, res) {
  const query = req.body.cityName
  const apiKey = 'INSERT OPENWEATHER API KEY HERE!!!!!!!' // IT NEEDS THE API KEY
  const units = 'metric'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`

  // REMOVE THE API KEY BEFORE SAVING!!!!!!!!!

  https.get(url, function (response) {
    response.on('data', function (data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = `http://openweathermap.org/img/wn/${icon}.png`

      res.write(`<p>The weather is currenty ${weatherDescription}</p>`)
      res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius.</h1>`)
      res.write(`<img src="${imageURL}" alt="">`)
      res.send()
    })
  })
})

app.listen(3000, function () {
  console.log('server is running on port 3000')
})
