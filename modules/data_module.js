var engineData = require('./config.json');

var pokemon, moves, types;

(function init(){
	//retrive data from json
	pkData = engineData.pokemon;
	movData = engineData.moves;
	typesData = engineData.types;

	//create map from json
	pokemon = new Map()
	for(var i in pkData)
		pokemon.set(i, pkData[i]);

	moves = new Map();
	for(var i in movData){
		var el = movData[i];
		moves.set(el.name, el);
	}

	types = new Map()
	for(var i in typesData){
		var el = typesData[i];
		var mapItem = new Map();
		for(var j in el)
			mapItem.set(j, el[j]);
		types.set(i, mapItem);
	}
})();

module.exports = {
	pokemon: pokemon,
	moves: moves,
	types: types
};

