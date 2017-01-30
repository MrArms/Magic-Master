
//===================================================
// Constructor
//===================================================

Action = function(_type){
	
	this._type = _type;
	
	this._targetGridCellArray = [];
};

//===================================================
// Constants
//===================================================

Action.MELEE_ATTACK = "melee_attack";

//===================================================
// Variables
//===================================================

Action.prototype._type = null;
Action.prototype._originGridCell = null;
Action.prototype._targetGridCellArray = null;

//===================================================
// Private Methods
//===================================================

/*Action.prototype._init = function(){
	
};*/

//===================================================
// Public Methods
//===================================================

Action.prototype.addOriginGridCell = function(_gridCell){

	this._originGridCell = _gridCell;
};

Action.prototype.addTargetGridCell = function(_gridCell){

	this._targetGridCellArray.push(_gridCell);
};

//===================================================
// Events
//===================================================

//===================================================
// GETTERS & SETTERS
//===================================================

Action.prototype.getOriginGridCell = function(){ return this._originGridCell; }
Action.prototype.getTargetGridCellArray = function(){ return this._targetGridCellArray; }

//===================================================
// LOADING & SAVING
//===================================================