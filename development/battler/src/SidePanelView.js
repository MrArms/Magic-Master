
//===================================================
// Constructor
//===================================================

SidePanelView = function(_grid){

	PIXI.Container.call(this);
	
	this._init();		
}

SidePanelView.prototype = Object.create( PIXI.Container.prototype );
SidePanelView.prototype.constructor = SidePanelView;

//===================================================
// Constants
//===================================================

// SidePanelView.PLAYER1_UNIT_START_X = 80;

//===================================================
// Variables
//===================================================

// SidePanelView.prototype._backgroundRectangle = null;

//===================================================
// Private Methods
//===================================================

SidePanelView.prototype._init = function(){

	this._playButton = new ButtonText(90, 45, "Play");
	this._playButton.setPosition(670, 100);
	this.addChild(this._playButton);
	
	this._player1Text = new PIXI.Text("Player 1", {align:"center"});
	this._player1Text.x = GameGlobals.SCREEN_WIDTH * 0.5 - 120;
	this._player1Text.y = GameView.PLAYER1_UNIT_START_Y + GameGlobals.NUMBER_ROWS * (GameView.UNIT_Y_GAP +  ActorView.HEIGHT) + 10;	
		
	this._player2Text = new PIXI.Text("Player 2", {align:"center"});
	this._player2Text.x = GameGlobals.SCREEN_WIDTH * 0.5 - 120;
	this._player2Text.y = GameView.PLAYER2_UNIT_START_Y - 45;	
		
	this.setPlayerTurnIndicator(GameGlobals.NO_PLAYER);
	
	this.addChild(this._player1Text);
	this.addChild(this._player2Text);
					
	// Add the initial actor views to the gameView
	this._addActorViewsOnGrid();
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

GameView.prototype._updateActorViewsSelectStatus = function(){
	
	// Set other actors to unselected
	var player1Actors = this._grid.getActors(GameGlobals.PLAYER1);
	var player2Actors = this._grid.getActors(GameGlobals.PLAYER2);
	
	for(var i=0; i<player1Actors.length; i++){
						
		if(this._actorSelected.getId() !== player1Actors[i].getId() || this._actorSelected === null ){
			var tempActorView = player1Actors[i].getActorView();	
			tempActorView.setSelected(false);
		}								
	}
	
	for(var i=0; i<player2Actors.length; i++){
						
		if(this._actorSelected.getId() !== player2Actors[i].getId() || this._actorSelected === null  ){
			var tempActorView = player2Actors[i].getActorView();	
			tempActorView.setSelected(false);
		}								
	}
	
	if(this._actorSelected !== null)
		this._actorSelected.setSelected(true);
	else
		this._actorSelected.setSelected(false);	
	
};	
	
GameView.prototype._actorClicked = function(_actorSelected){
	
	this._actorSelected = _actorSelected;	
	this._updateActorViewsSelectStatus();
	
	//this._sidePanel.updateActorDetails(this._actorSelected);	
};

//===================================================
// Public Methods
//===================================================

GameView.prototype.setPlayerTurnIndicator = function(_playerTurn){

	if(_playerTurn === GameGlobals.NO_PLAYER){
		this._player1Text.style  = {fill: 0x000000};
		this._player2Text.style  = {fill: 0x000000};
	}
	else if(_playerTurn === GameGlobals.PLAYER1){
		this._player1Text.style  = {fill: 0xFFFFFF};
		this._player2Text.style  = {fill: 0x000000};
	}
	else if(_playerTurn === GameGlobals.PLAYER2){
		this._player1Text.style  = {fill: 0x000000};
		this._player2Text.style  = {fill: 0xFFFFFF};
	}
};

GameView.prototype.updatePauseButton = function(_paused){

	if(_paused)
		this._playButton.setButtonText("Play");
	else
		this._playButton.setButtonText("Pause");
};


// ----------- These functions "pass through" from GameController to the playButton -----------

GameView.prototype.setPlayButtonCallback = function(_playButtonCallback){
	
	this._playButton.setCallback(_playButtonCallback);
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