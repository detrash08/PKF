/*
	Created by Detrash
	STAT MODULE

	Object response
	pk = {
		base: {			//<- base pk stat
			id: number //the pk number
			types: string[2]	// pk types (MAX 2) {type2}
		}

		stat : {			//<- stat object	
			totalDmg : number != NaN,
			dmgToPk: { pkId-trainerId : number}

		}
	}
*/

function setupStatObject(pk){
	pk.stat = pk.stat || {};
}
function collectDamages(pk1, pk2, effectiveDmg){

	setupStatObject(pk1);
	setupStatObject(pk2);

	pk1.stat.totalDmg += effectiveDmg || 0;
	pk1.stat.dmgToPk[pk2.base.id, pk2.base.trainer.id]
	

}

function getDamagesToPk(pk1, pk2Id){

}

function getTotalDamagesk(pk1){
	return (pk1.stat || {totalDmg:0}).totalDmg;
}