
//===================================================
// Constructor
//===================================================

ActorView = function(_actor){

	this._actorParent = _actor;

	//PIXI.Container.call(this);
	DisplayObject.call(this);
		
	this._init();
};

ActorView.prototype = Object.create( DisplayObject.prototype );
ActorView.prototype.constructor = ActorView;

//===================================================
// Constants
//===================================================

ActorView.WIDTH = 110;
ActorView.HEIGHT = 60;
ActorView.HIGHLIGHT_THICKNESS = 5;

ActorView.STAT_TEXT_START_X = 5;
ActorView.STAT_TEXT_START_Y = 5;
ActorView.STAT_TEXT_START_Y_GAP = 15;

//===================================================
// Variables
//===================================================

ActorView.prototype._backgroundRectangle = null;
ActorView.prototype._healthPointText = null;
ActorView.prototype._timePointText = null;

ActorView.prototype._actorParent = null;
ActorView.prototype._parentContainer = null;


ActorView.prototype._selected = null;

// This is the callback for when the view is clicked by the user
ActorView.prototype._callbackFunction = null;

//===================================================
// Private Methods
//===================================================

ActorView.prototype._init = function(){

	DisplayObject.prototype._init.call();

	this._selected = false;
	
	// From Button class
	this._mouseOver = false;
	this._mouseDown = false;
	this.interactive = true;
	this.buttonMode = true;
	////////
	
	var backgroundColour = this._actorParent.getPlayer() === GameGlobals.PLAYER1 ? 0xFFFF00 : 0x02FFDD;
	
	this._backgroundRectangle = new PIXI.Graphics();
	this._backgroundRectangle.lineStyle(1, 0x00FF00);	
	this._backgroundRectangle.beginFill(backgroundColour); 
	this._backgroundRectangle.drawRect(0, 0, ActorView.WIDTH, ActorView.HEIGHT);				
	this.addChild(this._backgroundRectangle);	
	
	this._readyToMoveRectangle = new PIXI.Graphics();
	this._readyToMoveRectangle.lineStyle(0, 0x00FF00);	
	this._readyToMoveRectangle.beginFill(0xFFFFFF); 
	this._readyToMoveRectangle.drawRect(0, 0, ActorView.WIDTH, ActorView.HEIGHT);
	this._readyToMoveRectangle.visible = false;		
	this.addChild(this._readyToMoveRectangle);
	
	this._selectedRectangle = new PIXI.Graphics();
	this._selectedRectangle.lineStyle(0, 0x00FF00);	
	this._selectedRectangle.beginFill(0xFFFFFF); 
	this._selectedRectangle.drawRect(-ActorView.HIGHLIGHT_THICKNESS, -ActorView.HIGHLIGHT_THICKNESS, ActorView.WIDTH + ActorView.HIGHLIGHT_THICKNESS*2, ActorView.HEIGHT + ActorView.HIGHLIGHT_THICKNESS*2);
	this._selectedRectangle.visible = false;		
	this.addChild(this._selectedRectangle);	
	
	this._mouseOverRectangle = new PIXI.Graphics();
	this._mouseOverRectangle.lineStyle(0, 0x00FF00);	
	this._mouseOverRectangle.beginFill(0xAAAAAA); 
	this._mouseOverRectangle.drawRect(0, 0, ActorView.WIDTH, ActorView.HEIGHT);
	this._mouseOverRectangle.visible = false;		
	this.addChild(this._mouseOverRectangle);
	
	this._mouseDownRectangle = new PIXI.Graphics();
	this._mouseDownRectangle.lineStyle(0, 0x00FF00);	
	this._mouseDownRectangle.beginFill(0x888888); 
	this._mouseDownRectangle.drawRect(0, 0, ActorView.WIDTH, ActorView.HEIGHT);
	this._mouseDownRectangle.visible = false;		
	this.addChild(this._mouseDownRectangle);
	
	
						
	this._nameText = new PIXI.Text(this._actorParent.getName(), {align:"left", fontSize:10});
	this._nameText.x = ActorView.STAT_TEXT_START_X;
	this._nameText.y = ActorView.STAT_TEXT_START_Y;		
			
	this._healthPointText = new PIXI.Text("", {align:"left", fontSize:10});
	this._healthPointText.x = ActorView.STAT_TEXT_START_X;
	this._healthPointText.y = ActorView.STAT_TEXT_START_Y + ActorView.STAT_TEXT_START_Y_GAP;
			
	this._timePointText = new PIXI.Text("", {align:"left", fontSize:10});
	this._timePointText.x = ActorView.STAT_TEXT_START_X;
	this._timePointText.y = ActorView.STAT_TEXT_START_Y + ActorView.STAT_TEXT_START_Y_GAP*2;
		
	this._updateStatDisplay();
			
	this.addChild(this._nameText);
	this.addChild(this._healthPointText);
	this.addChild(this._timePointText);		
		
	this.on("mousedown", this.mouseDown.bind(this));
	this.on("mouseup", this.mouseUp.bind(this));
	this.on("mouseover", this.mouseOver.bind(this));
	this.on("mouseout", this.mouseOut.bind(this));
};

ActorView.prototype._updateStatDisplay = function(){
		
	this._healthPointText.text = "HP: " + this._actorParent.getHealthPoints() + "/" + this._actorParent.getMaxHealthPoints();
	this._timePointText.text = "Timer: " + this._actorParent.getTimePoints();	
};

//===================================================
// Public Methods
//===================================================
	
ActorView.prototype.setSelectionCallback = function(_callback){
	
	this._callbackFunction = _callback;
};	
	
ActorView.prototype.setSelected = function(_selected){
	
	this._selected = _selected;
	this._selectedRectangle.visible = this._selected;	
};	
	
ActorView.prototype.updateView = function(){

	this._updateStatDisplay();
};

ActorView.prototype.destroy = function(){
	
	this.removeChild(this._readyToMoveRectangle);
	this._readyToMoveRectangle = null;
	
	this.removeChild(this._backgroundRectangle);
	this._backgroundRectangle = null;
	
	this.removeChild(this._nameText);			
	this._nameText = null;
	
	this.removeChild(this._healthPointText);
	this._healthPointText = null;
	
	this.removeChild(this._timePointText);	
	this._timePointText = null;
	
	this.off("mousedown", this.mouseDown.bind(this));
	this.off("mouseup", this.mouseUp.bind(this));
	this.off("mouseover", this.mouseOver.bind(this));
	this.off("mouseout", this.mouseOut.bind(this));
			
	DisplayObject.prototype.destroy.call(this);
};

ActorView.prototype.setToMove = function(_readyToMove, _callback){
	
	this._readyToMoveRectangle.visible = false;
	
	if(_readyToMove === true && Utils.doesVariableExist(_callback)){
		this.playReadyToMoveAnimation(_callback)
	}			
};

ActorView.prototype.playReadyToMoveAnimation = function(_callback){

	this._readyToMoveRectangle.alpha = 0.0;
	this._readyToMoveRectangle.visible = true;

	TweenMax.to(this._readyToMoveRectangle, 0.6, {alpha:1.0, onComplete:_callback});
};

ActorView.prototype.setPosition = function(_xPos, _yPos){
	
	this.x = _xPos;
	this.y = _yPos;
	
	//this._positionDebugText.text = "x = " + _xPos + " y = " + _yPos;		
};

ActorView.prototype.render = function(){

	
};

//===================================================
// Events
//===================================================

ActorView.prototype.mouseDown = function(e){		
	
	this._mouseDown = true;
	this._mouseDownRectangle.visible = true;
};

ActorView.prototype.mouseUp = function(e){
	
	if(this._mouseDown === true){
	
		Utils.log("Actor clicked");
	
		if(this._callbackFunction !== null){
								
			this._callbackFunction(this._actorParent);
		}
	}
			
	this._mouseDown = false;
	this._mouseDownRectangle.visible = false;
};

ActorView.prototype.mouseOver = function(e){

	this._mouseOver = true;
	this._mouseOverRectangle.visible = true;
};

ActorView.prototype.mouseOut = function(e){

	this._mouseOver = false;
	this._mouseOverRectangle.visible = false;
	
	this._mouseDown = false;
	this._mouseDownRectangle.visible = false;
};

//===================================================
// GETTERS & SETTERS
//===================================================

ActorView.prototype.getWidth = function(){ return ActorView.WIDTH; };
ActorView.prototype.getHeight = function(){ return ActorView.HEIGHT; };