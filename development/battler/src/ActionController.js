
//===================================================
// Constructor
//===================================================

ActionController = function(_gameGridData){

	// This stores all the data on the grid
	this._gameGridData = _gameGridData;

	this._init();
};

//var p = ActionController.prototype;

//===================================================
// Variables
//===================================================

ActionController.prototype._gameGridData = null;

ActionController.prototype._actionQueue = null;

ActionController.prototype._actionRound = null;

ActionController.prototype._currentAction = null;

// A list of gameEvents which are things that happen to an actor that also can be grabbed by the renderer to animate
// When the animations have played on the actors then the actors get updated with the event
// Game events contain the actor that the event is on
//ActionController.prototype._gameEventList = null;

// This contains the animations that are going to be passed to the gameController to be passed on to the GameView to animate before calling back to here
ActionController.prototype._gameAnimationList = null;

// This is called when the ActionController has created some animations that need to be played before continuing
ActionController.prototype._animationsCreatedCallback = null;

// This is called when all the actions have been completed and we can return control to the GameController completely
ActionController.prototype._actionsFinishedCallback = null;

//===================================================
// Private Methods
//===================================================

ActionController.prototype._init = function(){	
	
	this._reset();
};

ActionController.prototype._reset = function(){

	this._currentAction = null;
	this._actionQueue = [];
};

// This needs breaking up into different functions *****
ActionController.prototype._processAction = function(){
	// Get the action and remove it from the queue
	this._currentAction = this._actionQueue.splice(0, 1)[0];
	
	// Need to get the event list for the action and any subsequent actions need to be added to the action queue	
	if(this._currentAction.getActionType() === Action.MELEE_ATTACK){				
		MeleeAttack.processAttack(this, this._currentAction);
	}			
};

// This applies the action to the actors after the animation has been completed
ActionController.prototype._resolveAction = function(){				
	// if we have any actions left then we need to start the next one in the queue
	// Check the actor to perform the action is still alive too
	if(this._actionQueue.length > 0){						
		this._actionRound += 1;
	
		/*if(this._currentAction.hasBetweenActionsDelay())
		{
			// We put a slight delay between actions
			TweenMax.delayedCall( Globals.DELAY_BETWEEN_ACTIONS, this._processAction, [], this);		
		}
		else*/
		
		this._processAction();
	}
	// Otherwise tell the game that the "turn" that contained all the actions in the actionQueue (and any ones subsequently added to it) has completely finished
	else{
		this._reset();
		this._actionsFinishedCallback();
	}
};

//===================================================
// Public Methods
//===================================================

ActionController.prototype.addAnimationsCreatedCallback = function(_callback){

	this._animationsCreatedCallback = _callback;
};

ActionController.prototype.addActionsFinishedCallback = function(_callback){

	this._actionsFinishedCallback = _callback;
};

ActionController.prototype.startAction = function(){

	// This stores which action round we're in and is used to prevent endless counter attack loops
	this._actionRound = 1;
		
	this._gameAnimationList = [];		
	
	// Processes the first action in the list (there's only one at the moment)
	this._processAction();		
};

ActionController.prototype.addAction = function(_action){
	// Add the action to the action queue
	this._actionQueue.push(_action);
};

/*ActionController.prototype.addActionAtFront = function(_action){	
	this._actionQueue.unshift(_action);
}*/

ActionController.prototype.animFinished = function(){
	
	
};

ActionController.prototype.addGameAnimation = function(_gameAnimation){
	
	this._gameAnimationList.push(_gameAnimation);
};

/*ActionController.prototype.addGameEvent = function(_gameEvent){
	this._gameEventList.push( _gameEvent );	
}*/

//===================================================
// Events
//===================================================

//===================================================
// GETTERS & SETTERS
//===================================================

// ActionController.prototype.getActionRound = function() {return this._actionRound;}
