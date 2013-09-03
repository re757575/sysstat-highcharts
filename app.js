
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
var exec = require('child_process').exec;
var sar = require('sysstat');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var obj ={};
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});
app.get('/myjsonp/memory', function (req, res) {

     var obj ={};

		sar(['-r','1','1']).on('stats', function(o){
			console.log(o);
			obj.result = o;
  			console.log(JSON.stringify(o));
  			res.send(obj);
			res.end(); 	  

		});
});
app.get('/myjsonp/cpu', function (req, res) {
		var obj ={};

		sar(['1','1']).on('stats', function(o){
			console.log(o);
			obj.result = o;
  			console.log(JSON.stringify(o));
  			res.send(obj);
			res.end(); 	  

		});
});

	
app.get('/myjsonp/all', function (req, res) {

		sar(['-r','1','1']).on('stats', function(o){
			console.log(o);
			obj.result = o;
		});

		sar(['1','1']).on('stats', function(o){
			console.log(o);
			obj.result = o;
		});

  		res.send(obj);
		res.end(); 	  
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



