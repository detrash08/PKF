
require('yql')
function(app, http){

    app.get('getPkListAtks', function(){
        var yqlQueryLivello = "select * from html where url='http://wiki.pokemoncentral.it/Pikachu/Mosse_apprese_nella_prima_generazione'" +
            " and xpath='//table[@class=\"roundy\"][1]//tr//td[position()=1]/text()";
        var yqlQueryNomeMossa = "select * from html where url='http://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)/Generation_I_learnset' and xpath='//table[@class=\"roundy\"][1]//tr//td[position()=2]//a//span'";
        var query = new YQL(yqlQuery);

        query.exec(function(){

        });
        var query1 = new YQL(yqlQueryNomeMossa);
        query1.exec(function(){

        });
    })
}/**
 * Created by tvannoni on 16/10/2015.
 */
