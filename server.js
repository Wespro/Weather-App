// Setup empty JS object to act as endpoint for all routes
 projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
//Dependencies

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000 ;

const server = app.listen(port, listening);

function listening(){
  console.log('server is runing on port ' + port);
}


//get route that returns porjectData
app.get('/getData', function(req, res){
  res.send(projectData);
})

//post route that puts data in projectData
app.post('/postData', function(req, res){
//using this methoud of adding so that i can add only the data i want
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.feelings = req.body.feelings; 
  res.end();

})
