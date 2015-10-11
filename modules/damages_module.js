/*
	Created by Detrash
	DAMAGES MODULE

	Object response
	pk = {
		base: {			//<- base pk stat
			types: [typeCode1][typeCode2]	// pk types (MAX 2) {type2}
			lvl: integer,
			stats:{
				spe: int, // <- speed
				atk: int, // <- base attack
				def: int // <- base defense
			}
			attacks: { 
				number : {
					type: string,
					dmg: float 
				}, 
				...
			},
			exp: float
		},
		_stat : {			//<- stat object	
		
		}
	}
*/

var statModule, dataModule;

//initialize module passing 
function init(data_module, stat_module) {
	statModule = stat_module;
	dataModule = data_module;
}

//Calculates STAB: Same-type attack bonus
function getStab(pk1, pk2) {
	for(var t1 in pk1.types)
		if(pk1.types[t1] != undefined)
			return 1.5;
	return 1;
}
function getBaseDamage(pk1, pk2){
	//TODO: check if attack is special attack to use SpecialAtack/SpecialDefense instead Attack/Defense
	return (2*pk1.base.lvl+10)/250*(pk1.base.atk/pk2.base.def)*pk1.base.baseDmg+2;
}

/*
* calculates type bonus multiplier checking atkType against 
* defender pk types
*/
function getTypeBonus(pk1, pk2, atkNumber) {
	var bonus = 1;
	var atkType =  pk1.base.attacks[atkNumber].type;
	var pk2Types = pk2.base.types;

	//retrieve atk type from types
	var typeMap = types.get(atkType)
	
	for(var t2 in types)
		bonus *= types.has(t2) ? typeMap.get(t2) : 1;

	return bonus;
}
function getCriticalHit(pk1, atkNumber){
	var multiplier = 1000;
	
	var pkLvl = pk1.base.lvl;
	var dmg = (2*pkLvl+5)/(pkLvl+5);

	var divider = pk1.attacks[atkNumber].hightRatio? 64: 512;

	return Math.random()*multiplier <= pk1.base.spe/divider * multiplier;
}
function getRandomAdjust(){
	return Math.random() * (1-0.85)+0.85
}

function getDmg(pk1, pk2) {
	var dmgBonus = getBaseDmg(pk1,pk2)*
				   getStab(pk1,pk2)*
				   getTypeBonus(pk1, pk2)*
				   getCriticalHit()*
				   getRandomAdjust();
	return dmgBonus();
}


/**
* Damage module interface function. Implements attack damages calculation
*
*/
function attack(pk1, pk2, atkNumber){
	var dmg = getDmg(pk1, pk2);

	pk1.base.attacks
	pk2.base.resLp -=  (pk2.base.isExhausted = !(pk2.base.canFight =  dmg < pk2.base.resLp) ?pk2.base.resLp: dmg;

	statModule.collectDamages(pk1, pk2);
}

module.exports = {
	attack: attack;
};


//UTILS
function getRandomInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}