
//===================================================
// Constructor
//===================================================

ActorView = function(_actor){

	this._actorParent = _actor;

	//PIXI.Container.call(this);
	DisplayObject.call(this);
		
	this._init();
};

//ActorView.prototype = Object.create( PIXI.Container.prototype );
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

//===================================================
// Private Methods
//===================================================

ActorView.prototype._init = function(){

	DisplayObject.prototype._init.call();

	this._readyToMoveRectangle = new PIXI.Graphics();
	this._readyToMoveRectangle.lineStyle(0, 0x00FF00);	
	this._readyToMoveRectangle.beginFill(0xFFFFFF); 
	this._readyToMoveRectangle.drawRect(-ActorView.HIGHLIGHT_THICKNESS, -ActorView.HIGHLIGHT_THICKNESS, ActorView.WIDTH + ActorView.HIGHLIGHT_THICKNESS*2, ActorView.HEIGHT + ActorView.HIGHLIGHT_THICKNESS*2);
	this._readyToMoveRectangle.visible = false;
		
	this.addChild(this._readyToMoveRectangle);	
	
	this._backgroundRectangle = new PIXI.Graphics();
	this._backgroundRectangle.lineStyle(1, 0x00FF00);	
	this._backgroundRectangle.beginFill(0xFFFF00); 
	this._backgroundRectangle.drawRect(0, 0, ActorView.WIDTH, ActorView.HEIGHT);
					
	this.addChild(this._backgroundRectangle);	
			
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
};

ActorView.prototype._updateStatDisplay = function(){
		
	this._healthPointText.text = "HP: " + this._actorParent.getHealthPoints() + "/" + this._actorParent.getMaxHealthPoints();
	this._timePointText.text = "Timer: " + this._actorParent.getTimePoints();	
};

//===================================================
// Public Methods
//===================================================

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
			
	DisplayObject.prototype.destroy.call(this);
};

ActorView.prototype.setToMove = function(_readyToMove, _callback){
	
	this._readyToMoveRectangle.visible = _readyToMove;
	
	// ******* Will have an animation here eventually, just have a delay in here for now for functionality ********
	if(_readyToMove === true)		
		TweenMax.delay(1.0, _callback);
};

ActorView.prototype.setPosition = function(_xPos, yPos){
	
};

ActorView.prototype.render = function(){

	
};

//===================================================
// GETTERS & SETTERS
//===================================================

ActorView.prototype.getWidth = function(){ return ActorView.WIDTH; };
ActorView.prototype.getHeight = function(){ return ActorView.HEIGHT; };