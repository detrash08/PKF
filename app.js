/**
 * Created by tvannoni on 16/10/2015.
 */

var express = require('express');
var app = express();
var crawlers = require('./crawlers/crawlers.js');

//app.use(app.router);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/crawlers', crawlers);
app.get('/', function(req, res){
        return res.render('./index', {title:"PKF Tester"})
});

app.listen(3000, function(){console.log('app started');});