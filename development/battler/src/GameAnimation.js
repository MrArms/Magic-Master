
// Components are of the form:
// { animationType : "MELEE_DAMAGE", damage : "12" }

//===================================================
// Constructor
//===================================================

GameAnimation = function(){
	
	this._componentArray = [];			
};

//===================================================
// Constants
//===================================================

// This is the animation that the attacker plays
GameAnimation.MELEE_ATTACK = "melee_attack";

// This is the animation when an actor gets attacked
GameAnimation.MELEE_DAMAGE = "melee_damage";
GameAnimation.DEATH = "death";

// This is the damage animation when an actor is attacked with a poison attack
GameAnimation.POISON_DAMAGE = "poison_damage";

// This is the status animation when an actor gets affected by the poison status
GameAnimation.POISON_STATUS = "poison_status";

//===================================================
// Variables
//===================================================

GameAnimation.prototype._componentArray = null;
GameAnimation.prototype._cellPosition = null;

//===================================================
// Private Methods
//===================================================


//===================================================
// Public Methods
//===================================================

GameAnimation.prototype.addCellPosition = function(_cellPosition){
	this._cellPosition = _cellPosition;
}

GameAnimation.prototype.addMeleeAttackComponent = function(){
	
	this._componentArray.push({ animationType : GameAnimation.MELEE_ATTACK});
};

GameAnimation.prototype.addMeleeDamageComponent = function(_damageAmount){
	
	this._componentArray.push({ animationType : GameAnimation.MELEE_DAMAGE, damage : _damageAmount});
};

GameAnimation.prototype.addDeathComponent = function(_damageAmount){
	
	this._componentArray.push({ animationType : GameAnimation.DEATH});
};

//===================================================
// GETTERS & SETTERS
//===================================================

GameAnimation.prototype.getComponentArray = function(){ return this._componentArray; };
GameAnimation.prototype.getCellPosition = function() {return this._cellPosition; };

