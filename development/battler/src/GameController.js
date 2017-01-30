
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
	
	this._getNextActorToMove();
};

GameController.prototype._getNextActorToMove = function(){
	
	
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