
//===================================================
// Constructor
//===================================================

GameController = function(_stage){

	this._stage = _stage;
	this._init();
};

//===================================================
// Variables
//===================================================

GameController.prototype._gameView = null;
GameController.prototype._stage = null;

GameController.prototype._grid = null;

GameController.prototype._gameInitialised = null;
GameController.prototype._gamePaused = null;

GameController.prototype._actorToMove = null;
GameController.prototype._currentPlayerTurn = null;

// This flag is set when we don't want any player input as we're doing some stuff such as animations
GameController.prototype._busy = null;

//===================================================
// Private Methods
//===================================================

GameController.prototype._init = function(){
	
	this._busy = true;			
	
	// The actors are all stored on the grid
	this._grid = new Grid();
	this._grid.initialiseGridActors(GameData.playersStartingGrids);
	
	this._gameView = new GameView(this._grid);			
	this._stage.addChild(this._gameView);
	
	this._gameView.setPlayButtonCallback(this._playButtonClicked.bind(this));
	
	this._currentPlayerTurn = GameGlobals.NO_PLAYER;
	
						
	this._busy = false;	
	this._setPause(true);
		
	//this._updateGameLoop();
};

GameController.prototype._updateGameLoop = function(){

	if(this._busy === false && this._gamePaused === false)
		TweenMax.delayedCall(ViewGlobals.GAME_TIMEPOINT_UPDATE_DELAY, this._getNextActorToMoveRecursive.bind(this, this._nextActorToMoveFound.bind(this), null));		
};

// Updates time points for actors recursively and 
GameController.prototype._getNextActorToMoveRecursive = function(_callback, _actorFound){

	if(this._gamePaused === true)
		return;		

	var actorFound = _actorFound || null;
	
	if(actorFound !== null){
	
		_callback(actorFound);
	}	
	else{
		
		var actorToMove = this._updateTimeActorStuff();
		
		if(actorToMove !== null){
			_callback(actorToMove);
		}
		else{
			TweenMax.delayedCall(ViewGlobals.GAME_TIMEPOINT_UPDATE_DELAY, this._getNextActorToMoveRecursive.bind(this, _callback, null));
		}
	}		
};

GameController.prototype._nextActorToMoveFound = function(_actorToMove){

	if(_actorToMove !== null){
	
		this._busy = true;
		this._setPause(true);
	
		this._actorToMove = _actorToMove;	
		this._actorToMove.setActorReadyToMove();
								
		// We need to highlight the actor here to be moved with the animator and make sure no others are selected
		this._gameView._showActorToMove(this._grid.getActors(), this._actorToMove, this._actorReadyToMoveAnimationCompleted.bind(this));
	}
	else{
		Utils.log("ERROR cannot find actor to move!!!");
	}
};

GameController.prototype._actorReadyToMoveAnimationCompleted = function(){

	Utils.log("_actorReadyToMoveAnimationCompleted()");
	
	// Show which player is going to go next
	this._gameView.setPlayerTurnIndicator(this._actorToMove.getPlayer());
	
	this._busy = false;
};

GameController.prototype._updateTimeActorStuff = function(){

	var actorReadyToMove = false;

	var actors = this._grid.getActors();

	var highestTimePointsFound = 0;
	var actorsWithHighestTimepoints = [];
	
	// Iterate through all the actors and get the one with most timepoints if it has timepoints over the threshold 
	// If there are two with the same timepoints then pick one at random
			
	// Go through the actors and get the ones above the threshold with the highest timepoints
	for(var i=0; i<actors.length; i++){
		
		var tempActorTimePoints = actors[i].getTimePoints()
		
		if(tempActorTimePoints >= GameGlobals.TIME_POINT_THRESHOLD){
		
			actorReadyToMove = true;
		
			if(tempActorTimePoints > highestTimePointsFound){
				highestTimePointsFound = tempActorTimePoints;
				actorsWithHighestTimepoints = [actors[i]];				
			}
			else if(tempActorTimePoints === highestTimePointsFound){					
				actorsWithHighestTimepoints.push(actors[i]);
			}					
		}
	}	
			
	// Return actors ready to move
	if(actorReadyToMove){
		if(actorsWithHighestTimepoints.length === 1)
			return actorsWithHighestTimepoints[0];
		else{
			// Need to pick a member of the array at random
			return Utils.getRandomMemberOfArray(actorsWithHighestTimepoints);
		}
	}
	// If no actor is found that is ready to move then iterate through the actors and increase their timepoints
	else{
		for(var i=0; i<actors.length; i++){		
			actors[i].advanceTimePoints();																						
		}
			
		// We've not found an actor with enough timepoints so return null here
		return null;								
	}			
};

GameController.prototype._setPause = function(_paused){

	// Don't allow the user to unpause if we are currently busy
	if(_paused === false && this._busy === true)
		return;

	this._gamePaused = _paused;
	this._gameView.updatePauseButton(this._gamePaused);
	
	if(this._gamePaused === false)
		this._updateGameLoop();
	
};

GameController.prototype._playButtonClicked = function(){

	this._setPause(!this._gamePaused);				
};

//===================================================
// Public Methods
//===================================================

GameController.prototype.update = function(){

	if(this._busy === false);
		this._gameView.update();

	/*if(this._gameInitialised === true && this._gameView !== null)	
		this._gameView.render(this._player1Grid, this._player2Grid);*/
};