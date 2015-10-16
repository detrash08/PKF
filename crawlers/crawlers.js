require('yql')

function getMovesByLevel(app, http) {

    app.get('getPkListAtks', function () {
        var yqlQueryLivello = "select content from html where url='http://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)/Generation_I_learnset' and xpath='//table[@class=\"roundy\"][1]//tr[position()!=1][position()!=2]//td[position()=1]/span'";
        var yqlQueryNomeMossa = "select content from html where url='http://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)/Generation_I_learnset' and xpath='//table[@class=\"roundy\"][1]//tr[position()!=1][position()!=2]//td[position()=2]//a//span'";
        var query = new YQL(yqlQueryLivello);
        var levels = [], moves = [];
        var crawledData = {};
        query.exec(function (res) {
            if (!res || !res.results) return console.log('ERROR ' + res);

            levels = res.results;
            var query1 = new YQL(yqlQueryNomeMossa);
            query1.exec(function (resM) {
                if (!resM || !resM.results) return console.log('ERROR ' + resM);

                moves = resM.results;

                if (levels.length != moves.length) return console.log('ERROR Lengh mismatch');

                //TODO: if multiple moves with same name for different levels take last
                //TODO: if multiple moves with same name for different levels and there is another move with same level take the move that doesn't match
                for (var i in levels) //if multiple moves are defined
                    crawledData[results[i]] = levels[i];
            });
        });

    })
}
/**
 * Created by tvannoni on 16/10/2015.
 */
