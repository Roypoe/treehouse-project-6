const express = require('express');
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');
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
  const pro = parseInt(req.params.id);
  const project = projects[pro];

  if(Number.isInteger(pro) && pro < projects.length && pro >= 0){
    res.render('project',{project});
  } else{
    let err = new Error("This project page doesn't exist");
    err.status = 404;
    next(err);
  }
})

app.get("/project/:id", function(req, res, next){
  const project = projects[req.params.id];
  res.render('project',{project});
})

app.use(function(req, res, next){
  const err = new Error('Not found')
  err.status = 404;
  next(err);
})

app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, function (){
 console.log('The App is listening to port 3000')
})
