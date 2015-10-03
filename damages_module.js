/*
	Created by Detrash
	DAMAGES MODULE

	Object response
	pk = {
		base: {			//<- base pk stat
			types: [typeCode1, typeCode2]	// pk types (MAX 2)
		}

		stat : {			//<- dmg object	
		
		}
	}
*/

//matrix of types
var types

function init(pkTypes, pkStat) {
	types = pkTypes;
	stats = pkStat;
}

function getBonus(pk1, pk2) {
	var type = 1;
	for(var t1 in pk1.types)
		for(var t2 in pk2.types)
			type *= types[t1,t2];
	return type;
}

function getDmg(pk1, pk2) {
	var dmgBonus = pk1.base.baseDmg * getBonus(pk1, pk2);
	return dmgBonus();
}

function attack(pk1, pk2){
	var dmg = getDmg(pk1, pk2);

	pk2.base.resLp -=  (pk2.base.isExhausted = !(pk2.base.canFight =  dmg < pk2.base.resLp) ?pk2.base.resLp: dmg;
}