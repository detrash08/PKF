/*
	Created by Detrash
	DAMAGES MODULE

	Object response
	pk = {
		base: {			//<- base pk stat
			types: [typeCode1][typeCode2]	// pk types (MAX 2) {type2}
		}

		stat : {			//<- dmg object	
		
		}
	}
*/

//contains list of types with theirs rispective bonus against other types
var stat_module = require("./stat_module.js");

var types = {},

function init(pkTypes, pkStat) {
	types = pkTypes;
}

function getBonus(pk1, pk2) {
	var type = 1;
	for(var t1 in pk1.types)
		for(var t2 in pk2.types)
			type *= types[t1] ? types[t1][t2] : 1;
	return type;
}

function getDmg(pk1, pk2) {
	var dmgBonus = pk1.base.baseDmg * getBonus(pk1, pk2);
	return dmgBonus();
}

function attack(pk1, pk2){
	var dmg = getDmg(pk1, pk2);

	pk2.base.resLp -=  (pk2.base.isExhausted = !(pk2.base.canFight =  dmg < pk2.base.resLp) ?pk2.base.resLp: dmg;

	stat_module.collectDamages(pk1, pk2);
}

module.exports = {
	attack = attack;
};