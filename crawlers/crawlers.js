var YQL = require('yql');
var http = require('http');
var express = require('express');
var router = express.Router();
var util = require('util');
/*var engine = require('../engine.json');
var pokemon = engine.pokemon;*/
var pokemon = {'#1':{name:'Pikachu'}, '#2': {name:'Bulbasaur'}, '#3':{name:'Charmender'}};

router.get('/getPkListAtks', function (req, res) {
    var crawledForPks = new Map();
    var counter  = 0;
    for (var pk in pokemon) {
        var current = pokemon[pk];
        console.log('current:'+current+" |pk:"+ pk);
        var yqlQueryLivello = "select content from html where url='http://bulbapedia.bulbagarden.net/wiki/"+current.name+"_(Pok%C3%A9mon)/Generation_I_learnset' and xpath='//table[@class=\"roundy\"][1]//tr[position()!=1][position()!=2]//td[position()=1]/span'";
        var yqlQueryNomeMossa = "select content from html where url='http://bulbapedia.bulbagarden.net/wiki/"+current.name+"_(Pok%C3%A9mon)/Generation_I_learnset' and xpath='//table[@class=\"roundy\"][1]//tr[position()!=1][position()!=2]//td[position()=2]//a//span'";
        var query = new YQL(yqlQueryLivello);
        console.log('query1:' + util.inspect(query, {showHidden: false, depth: null}));
        var levels = [], moves = [];
        var crawledData = {};
        query.exec(function (err, resp) {
            console.log('RES1: ' + util.inspect(resp, {showHidden: false, depth: null}));
            if (err) return res.send('ERROR Q1: ' + err);

            levels = (resp.query.results|| {span:null}).span;
            if (!levels) return console.log('ERROR: empty result levels query');

            var query1 = new YQL(yqlQueryNomeMossa);
            console.log('queryw:' + util.inspect(query1, {showHidden: false, depth: null}));
            query1.exec(function (errM, respM) {

                if (errM) return res.send('ERROR: ' + err1);

                console.log('RESM: ' + util.inspect(respM, {showHidden: false, depth: null}));

                moves = (respM.query.results || {span:null}).span;
                if (!levels) return console.log('ERROR: empty result levels query');

                if (levels.length != moves.length) return console.log('ERROR Lengh mismatch');

                //TODO: if multiple moves with same name for different levels take last
                //TODO: if multiple moves with same name for different levels and there is another move with same level take the move that doesn't match
                for (var i in levels) //if multiple moves are defined
                    crawledData[moves[i]] = levels[i];
                console.log('RESM: ' + util.inspect(crawledData, {showHidden: false, depth: null}));
                //res.send(crawledData);
                crawledForPks.add(pk, crawledData);
            });
        });
        counter++;
        if(Object.keys(pokemon) == counter)
        res.send('performing operation');
    }
});

module.exports = router;
