//paste on page using  var engine = engine_bak.json
//http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number#Generation_I
function getPkIds(){
	pokemon = engine.pokemon;
	var resPokemon = {};
	for(var i in pokemon){
		var pk = pokemon[i];

		var name = pk.name;
		switch (name){
			case 'Nidoran-M':
				name = 'Nidoran♂';
			break; 
			case 'Nidoran-F':
				name='Nidoran♀';
			break
		}

		var parsedPk = {
			name: pk['name'],
			dispName: name,
			stats: pk['alts'][0],
			evos: pk['evos'],
			genfamily: pk['genfamily']
		}

		var pkId = $('a[title="'+parsedPk.dispName+'"]').parent().prev().text().trim()
		parsedPk['ndex'] = pkId;
		resPokemon[pkId] = parsedPk;
	}
	return resPokemon;
}

//format types in old engine.json
function getTypes(){
	var list = {}
	for(var i in engine.types){
	   var el = engine.types[i];
	   var type = {
	   		genfamily: el['genfamily'],
	   		name: el['name']
	   }
	   for(var j in el.atk_effectives){
	   		var subEl = el.atk_effectives[j];
	   		type[subEl[0]] = subEl[1]
	   }
	   list[el.name] = type
	}
	return list;
}

