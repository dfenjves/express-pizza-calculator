"use strict"

//Import the correct libraries
const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser")


//Create an instance of the express app
var app = express()

//Use ejs as the templating engine
app.set('view engine', 'ejs')

//Configure static content to be in views folder
app.use(express.static('views'))

app.set('views', __dirname + "/views")


app.use(logger('dev')) //Use a logger to print requests and responses

// Gives the server access to the response, allows it to parse it
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


//Get and Post requests
app.get("/", function(request, response){
    response.render('home.ejs')
})

app.post("/", (request,response) => {
    const students = request.body.students
    const hungerLevel = request.body.hungerlevel
    
    let pizzas = Math.ceil((Number(students) * (1.5 + (hungerLevel/10)))/8)
    
    
    response.render('results.ejs', {pizzas: pizzas})
})

// app.get("/more", (req, res) => {
//     res.send('<h1>another</h1>')
// })

var port = process.env.port || 3000

app.listen(port, function(){
    console.log("app running at port " + port)
})