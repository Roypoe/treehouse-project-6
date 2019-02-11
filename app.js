const express = require('express');
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {projects} = require('./data.json');

const app = express();
app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get("/", function(req, res, next){
  res.render('index', {projects});
})

app.get("/about", function(req, res, next){
  res.render('about');
})

app.get("/project/:id", function(req, res, next){
  const project = projects[req.params.id];
    // findUserByUsername(username, function(error, user) {
  //   if (error) return next(error);
  //   return response.render('user', user);
  // });
  res.render('project',{project});
})


app.listen(3000, function (){
 console.log('The App is listening to port 3000')
})
