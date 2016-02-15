var express = require('express');

var app = express();

// import the fortnes array file

var fortune = require('./lib/fortune.js');

//set up handlebars view engine
var handlebars = require('express3-handlebars')
        .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || process.env.IP );


// the public static middleware
app.use(express.static(__dirname + '/public'));




app.use(function(req, res, next){
     res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
     next();
});


// main route
app.get('/', function(req, res){
    res.render('home');
});

// about route
app.get('/about', function(req, res) {
 res.render('about', {
 fortune: fortune.getFortune(),
 pageTestScript: '/qa/tests-about.js'
 } );
});

app.get('/tours/hood-river', function(req, res){
 res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
 res.render('tours/request-group-rate');
});

// custom 404 page

app.use(function(req, res, next){
   res.status(404);
   res.send('404');
});

//custom 500 page
app.use(function(err, req, res, next){
   console.error(err.stack);
   res.status(500);
   res.send('500');
});



app.listen(app.get('port'), function(){
   console.log('Express started on local host:' +
   app.get('port') + '; press ctrl-c to terminate.'); 
});







