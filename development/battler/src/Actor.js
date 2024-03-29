
//===================================================
// Constructor
//===================================================

Actor = function(_type){
	
	this._type = _type;	
	this._id = Utils.GetRandomString(Actor.ID_LENGTH);
	
	this._init();
};

//===================================================
// Variables
//===================================================

Actor.ID_LENGTH = 10;
Actor.prototype._id = null;
Actor.prototype._type = null;
Actor.prototype._name = null;
Actor.prototype._timePoints = null;
Actor.prototype._healthPoints = null;
Actor.prototype._maxHealthPoints = null;
Actor.prototype._speed = null;

// This gets set to true when it needs to be re-rendered as it has been changed
Actor.prototype._changed = null;

// This is set when the actor is told to wait so they can do combo attacks etc.
Actor.prototype._waitingTurn = null;

Actor.prototype._grid = null;

Actor.prototype._readyToMove = null;

// This stores if there is currently a gameEvent happening and if so then it may need to be re-rendered
// Actor.prototype._gameEventHappening = null;

// This is the graphics of the actor, it is stored here, but not referenced here
Actor.prototype._actorView = null;

Actor.prototype._position = null;

// This stores which player owns the unit
Actor.prototype._player = null;

//===================================================
// Private Methods
//===================================================

Actor.prototype._init = function(){
	
	var schema = this._getActorSchema();
	
	this._readyToMove = false;
	this._timePoints = 0;
	
	this._changed = true;	
	
	this._waitingTurn = false;
	
	this._name = schema.name;
	this._healthPoints = schema.healthPoints;	
	this._maxHealthPoints = schema.healthPoints;	
	this._speed = schema.speed;	
	
	this._position = {};

	//this._actorView = new ActorView(this);
};

Actor.prototype._getActorSchema = function(){
	
	if(ActorData.ACTORS_SCHEMA.hasOwnProperty(this._type)){
		return ActorData.ACTORS_SCHEMA[this._type];
	}
	else{
		Utils.log("ERROR cannot find actors scheme with type: " + this._type);
		return null;
	}
};

//===================================================
// Public Methods
//===================================================

Actor.prototype.setActorReadyToMove = function(){

	this._readyToMove = true;
};

Actor.prototype.advanceTimePoints = function(){	
	
	this._timePoints += this._speed;
	
	//this._timePoints = Math.min(this._timePoints, GameGlobals.TIME_POINT_THRESHOLD);
	
	// Update the new time points on the actor view
	this._actorView.updateView();
};

Actor.prototype.addActorView = function(){

	this._actorView = new ActorView(this);
};

//===================================================
// Events
//===================================================

//===================================================
// GETTERS & SETTERS
//===================================================

Actor.prototype.getId = function(){ return this._id; }
Actor.prototype.getName = function(){ return this._name; };

Actor.prototype.getHealthPoints = function(){ return this._healthPoints; };

// *********** NOT USED YET ***********
Actor.prototype.changeHealthPoints = function(){ 

	this._healthPoints += changeHealthPoints;	
	this._healthPoints = Utils.clamp(0, this._maxHealthPoints);
};

Actor.prototype.getMaxHealthPoints = function(){ return this._maxHealthPoints; };

Actor.prototype.getTimePoints = function(){ return this._timePoints; };
Actor.prototype.getActorView = function(){ return this._actorView; };
Actor.prototype.isChanged = function(){ return this._changed; };
Actor.prototype.setChanged = function(_changed){ return this._changed = _changed; };

Actor.prototype.setPosition = function(_row, _col){
	this._position.row = _row;
	this._position.col = _col;
};

Actor.prototype.getPosition = function(){ return this._position; };
Actor.prototype.setGrid = function(_grid){ this._grid = _grid; };
Actor.prototype.setPlayer = function(_player){ this._player = _player; };
Actor.prototype.getPlayer = function(){ return this._player; };

// NOT USED YET
Actor.prototype.isWaitingTurn = function(){ return this._waitingTurn; };
Actor.prototype.setWaitingTurn = function(_waitingTurn){ this._waitingTurn = _waitingTurn; };



//===================================================
// LOADING & SAVING
//===================================================