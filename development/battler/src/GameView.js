
//===================================================
// Constructor
//===================================================

GameView = function(_grid){

	PIXI.Container.call(this);
	
	this._grid = _grid;	

	this._init();
	
	// Add the initial actor views to the gameView
	this._addActorViewsOnGrid();
}

GameView.prototype = Object.create( PIXI.Container.prototype );
GameView.prototype.constructor = GameView;

//===================================================
// Constants
//===================================================

GameView.PLAYER1_UNIT_START_X = 80;
GameView.PLAYER1_UNIT_START_Y = 300;

GameView.PLAYER2_UNIT_START_X = 80;
GameView.PLAYER2_UNIT_START_Y = 50;

GameView.UNIT_X_GAP = 15;
GameView.UNIT_Y_GAP = 15;

//===================================================
// Variables
//===================================================

GameView.prototype._backgroundRectangle = null;

GameView.prototype._grid = null;
GameView.prototype._playButton = null;
//GameView.prototype._playButtonCallback = null;

//===================================================
// Private Methods
//===================================================

GameView.prototype._init = function(){

	this._playButton = new ButtonText(90, 45, "Play");
	this._playButton.setPosition(670, 100);
	this.addChild(this._playButton);
};

// Position the ActorViews in the GameView
GameView.prototype._addActorViewsOnGrid = function(){
			
	var player1Actors = this._grid.getActors(GameGlobals.PLAYER1);
	var player2Actors = this._grid.getActors(GameGlobals.PLAYER2);
						
	for(var i=0; i<player1Actors.length; i++){
	
		var tempActorView = player1Actors[i].getActorView();
		var xPos = GameView.PLAYER1_UNIT_START_X + player1Actors[i].getPosition().col * (GameView.UNIT_X_GAP + player1Actors[i].getActorView().getWidth());
		var yPos = GameView.PLAYER1_UNIT_START_Y + player1Actors[i].getPosition().row * (GameView.UNIT_Y_GAP + player1Actors[i].getActorView().getHeight());

		tempActorView.setPosition(xPos, yPos);
		
		this.addChild(tempActorView);
	}	
	
	for(i=0; i<player2Actors.length; i++){
	
		var tempActorView = player2Actors[i].getActorView();
		var xPos = GameView.PLAYER2_UNIT_START_X + player2Actors[i].getPosition().col * (GameView.UNIT_X_GAP + player2Actors[i].getActorView().getWidth());
		var yPos = GameView.PLAYER2_UNIT_START_Y + (GameGlobals.NUMBER_ROWS - 1 - player2Actors[i].getPosition().row) * (GameView.UNIT_Y_GAP + player2Actors[i].getActorView().getHeight());					
		
		tempActorView.setPosition(xPos, yPos);
		
		this.addChild(tempActorView);
	}	
			
	/*for(var player=0; player<=1; player++){
			
		var unitStartX = player === 0 ? GameView.PLAYER1_UNIT_START_X : GameView.PLAYER2_UNIT_START_X;
		var unitStartY = player === 0 ? GameView.PLAYER1_UNIT_START_Y : GameView.PLAYER2_UNIT_START_Y;
			
		for(var i=0; i<GameGlobals.NUMBER_ROWS; i++){

			for(var j=0; j<GameGlobals.NUMBER_COLS; j++){
			
				var tempActor = this._grid[player][i][j];
				
				// If there is an actor then create the associated ActorView
				if(tempActor !== null){
															
					var tempActorView = tempActor.getActorView();
					tempActorView.x = unitStartX + j*GameView.UNIT_X_GAP;
					tempActorView.y = unitStartY + i*GameView.UNIT_Y_GAP;					
					this.addChild(tempActorView);					
				}
			}
		}
	}*/
};

GameView.prototype._showActorToMove = function(_actors, _actorToMove, _callback){

	for(var i=0; i<_actors.length; i++){
		if(_actors[i].getId() !== _actorToMove.getId()){
		
			var tempActorView = _actors[i].getActorView();
			
			tempActorView.setToMove(false);
			tempActorView.updateView();
		}
	}
	
	// Animate actor to move here
	var actorView = _actorToMove.getActorView();
	
	// Set actor to move and send callback for when it is completed
	actorView.setToMove(true, _callback);
};

//===================================================
// Public Methods
//===================================================


// ----------- These functions "pass through" from GameController to the playButton -----------

GameView.prototype.setPlayButtonCallback = function(_playButtonCallback){
	
	this._playButton.setCallback(_playButtonCallback);
};

GameView.prototype.updatePauseButton = function(_paused){

	if(_paused)
		this._playButton.setButtonText("Play");
	else
		this._playButton.setButtonText("Pause");
};

// --------------------------------------------------------------------------------------------

GameView.prototype.destroy = function(){


};

GameView.prototype.update = function(){

	/*for(var i=0; i<GameGlobals.NUMBER_ROWS; i++){	
		for(var j=0; j<GameGlobals.NUMBER_COLS; j++){
			
			var tempActor = _player1Grid[i][j];
			
			if(tempActor !== null){
			
				var tempActorView = tempActor.getActorView();
				
				// If the actor does not have an actor view then add it here
				// A BIT CLUNKY DOING THIS IN HERE ***** 
				if(tempActorView === null){
					
					tempActorView = tempActor.addActorView();
					tempActorView.x = GameView.PLAYER1_UNIT_START_X + j*GameView.UNIT_X_GAP;
					tempActorView.y = GameView.PLAYER1_UNIT_START_Y + i*GameView.UNIT_Y_GAP;
					
					this.addChild(tempActorView);
				}
			
				if(tempActor.isChanged()){
				
					tempActorView.render();
					tempActor.setChanged(false);
				}												
			}
		}
	}*/	
};