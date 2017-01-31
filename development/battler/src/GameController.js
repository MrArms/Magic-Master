
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

// These are the arrays of actors for each player
/*GameController.prototype._player1Actors = null;
GameController.prototype._player2Actors = null;*/

// Grids are listed as i for rows and j for colomns (the opposite to the usual way these are listed)
/*GameController.prototype._player1Grid = null;
GameController.prototype._player2Grid = null;*/

GameController.prototype._grid = null;

GameController.prototype._gameInitialised = null;
GameController.prototype._gamePaused = null;

GameController.prototype._actorToMove = null;

//===================================================
// Private Methods
//===================================================

GameController.prototype._init = function(){
	
	this._gameInitialised = false;
	
	this._gamePaused = true;
	
	// The actors are all stored on the grid
	this._grid = new Grid();
	this._grid.initialiseGridActors(GameData.playersStartingGrids);
	
	this._gameView = new GameView(this._grid);			
	this._stage.addChild(this._gameView);
	
	this._gameView.setPlayButtonCallback(this._playButtonClicked.bind(this))
						
	this._gameInitialised = true;
		
	this._startGameLoop();
};

GameController.prototype._startGameLoop = function(){

	this._actorToMove = this._getNextActorToMove();
	
	if(this._actorToMove !== null){
		// We need to highlight the actor here to be moved with the animator and make sure no others are selected
		this._gameView._showActorToMove(this._grid.getActors(), this._actorToMove, this._actorMoveAnimationCompleted.bind(this));
	}
	else{
		Utils.log("ERROR cannot find actor to move!!!");
	}
};

GameController.prototype._actorMoveAnimationCompleted = function(){

	Utils.log("_actorMoveAnimationCompleted()");
};

GameController.prototype._getNextActorToMove = function(){
	
	// Iterate through all the actors and get the one with most timepoints
	// If there are two with the same timepoints then pick one at random
	
	var actorReadyToMove = false;
	
	// ***** INSTEAD OF A WHILE LOOP THIS WILL EVENTUALLY TO ONE LOOP AND THEN CALLBACK TO ALLOW THE ANIMATION OF TIMEPOINTS BAR TO INCREASE (if we are going to do that) ******
	while(actorReadyToMove === false){
		
		var actors = this._grid.getActors();
		
		var highestTimePointsFound = 0;
		var actorsWithHighestTimepoints = [];
				
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
			for(var i=0; i<actors.length; i++)
				actors[i].advanceTimePoints();																			
				
			// ********** WILL POSSIBLY HAVE CALLBACK HERE WITH ANIMATION FOR INCREASING TIMEPOINTS *******					
		}
						
	}	
};

GameController.prototype._playButtonClicked = function(){

	this._gamePaused = !this._gamePaused;
	
	this._gameView.updatePauseButton(this._gamePaused)
};

//===================================================
// Public Methods
//===================================================

GameController.prototype.update = function(){

	this._gameView.update();

	/*if(this._gameInitialised === true && this._gameView !== null)	
		this._gameView.render(this._player1Grid, this._player2Grid);*/
};