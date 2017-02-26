
//===================================================
// Constructor
//===================================================

Grid = function(){
			
	//this._init();
};

//===================================================
// Constants
//===================================================

//===================================================
// Variables
//===================================================

// This stores all the grid data in a 3 dimensional array, the first entry is which player it is
// Each entry contains either a pointer to an actor or null
// 0 = player 1 grid data and 1 = player 2 grid data
// Entries are listed ROW first rather than COLOMN for simplicity

Grid.prototype._gridData = null;

//===================================================
// Private Methods
//===================================================

/*Grid.prototype._init = function(){
	
	this._initialiseGridActors();		
};*/



// This creates the actors for the game from the GameData
/*Grid.prototype._createActors = function(_playerGrid, _playerStartGridData){
		
	_playerGrid = [];	
		
	for(var i=0; i<GameGlobals.NUMBER_ROWS; i++){
	
		_playerGrid[i] = [];
	
		for(var j=0; j<GameGlobals.NUMBER_COLS; j++){
								
			if(_playerStartGridData[i,j] !== null){
				
				var actorType = _playerStartGridData[i,j];				
				var newActor = new Actor(actorType);
				
				_playerGrid[i][j] = newActor; //newActor.getID();
			}
			else{
				
				_playerGrid[i][j] = null;
			}													
		}
	}		
};*/

//===================================================
// Public Methods
//===================================================

Grid.prototype.initialiseGridActors = function(_startingGrid){

	this._gridData = [[],[]];
			
	for(var player=0; player<=1; player++){
			
		for(var i=0; i<GameGlobals.NUMBER_ROWS; i++){

			this._gridData[player][i] = [];

			for(var j=0; j<GameGlobals.NUMBER_COLS; j++){
									
				if(_startingGrid[player][i][j] !== null){
					
					var actorType = _startingGrid[player][i][j];				
					var newActor = new Actor(actorType);
					
					newActor.setGrid(this);
					newActor.setPlayer(player);
					newActor.addActorView();
					newActor.setPosition(i,j);
					
					this._gridData[player][i][j] = newActor; 
				}
				else{
				
					this._gridData[player][i][j] = null;
				}													
			}
		}							
	}		
};


/*Actor.prototype.addActorView = function(_parentContainer){

	this._actorView = new ActorView();	
	this._actorView.addToContainer(_parentContainer);
	
	this._changed = true;
	
	return this._actorView;
};*/

// The _player parameter determines which actors are returned, leaving it out returns all actors
// _player = null or -1 returns all actors
// _player = 0 returns player 1 actors
// _player = 1 returns player 2 actors
Grid.prototype.getActors = function(_playerIndex){
	
	if(Utils.doesVariableExist(_playerIndex) === false)
		_playerIndex = -1;
	
	var newArray = [];
	
	for(var player=0; player<=1; player++){		
		for(var i=0; i<GameGlobals.NUMBER_ROWS; i++){			
			for(var j=0; j<GameGlobals.NUMBER_COLS; j++){
			
				if(_playerIndex === -1 || _playerIndex === player){
				
					if(this._gridData[player][i][j] !== null)
						newArray.push(this._gridData[player][i][j]);					
				}			
			}
		}
	}
	
	return newArray;
};

// ******** NOT USED YET *********
Grid.prototype.getPlayerGrid = function(_player){

	if(_player === GameGlobals.PLAYER1){
		return this._gridData[0];
	}
	else if(_player === GameGlobals.PLAYER2){
		return this._gridData[1];
	}
};

//===================================================
// Events
//===================================================

//===================================================
// GETTERS & SETTERS
//===================================================

//Actor.prototype.getID = function(){ return this._id; }
Actor.prototype.getHealthPoints = function(){ return this._healthPoints; }
Actor.prototype.getTimePoints = function(){ return this._timePoints; }
Actor.prototype.getActorView = function(){ return this._actorView; }
Actor.prototype.isChanged = function(){ return this._changed; }
Actor.prototype.setChanged = function(_changed){ return this._changed = _changed; }

//===================================================
// LOADING & SAVING
//===================================================