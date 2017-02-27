
//===================================================
// Constructor
//===================================================

ActorInfoView = function(_grid){

	DisplayObject.call(this);			
	this._init();		
}

ActorInfoView.prototype = Object.create( DisplayObject.prototype );
ActorInfoView.prototype.constructor = ActorInfoView;

//===================================================
// Constants
//===================================================

ActorInfoView.PANEL_WIDTH = 180;
ActorInfoView.PANEL_HEIGHT = 280;
 
ActorInfoView.ELEMENT_START_X = 20;
ActorInfoView.ELEMENT_START_Y = 20;
 
ActorInfoView.MOVES_Y_START = 40;
ActorInfoView.MOVES_Y_GAP = 20;
 
ActorInfoView.MOVE_BUTTON_WIDTH = 100;
ActorInfoView.MOVE_BUTTON_HEIGHT = 15;

//===================================================
// Variables
//===================================================

ActorInfoView.prototype._moveButtonArray = null;
ActorInfoView.prototype._moveDataArray = null;

//===================================================
// Private Methods
//===================================================

ActorInfoView.prototype._init = function(){

	this._moveButtonArray = [];
	this._moveDataArray = [];
		
	/*this._playButton = new ButtonText(90, 45, "Play");
	this._playButton.setPosition(670, 100);
	this.addChild(this._playButton);*/
	
	this._backgroundRectangle = new PIXI.Graphics();
	this._backgroundRectangle.lineStyle(1, 0x00FF00);	
	this._backgroundRectangle.beginFill(0xFF4F0B); 
	this._backgroundRectangle.drawRect(0, 0,  ActorInfoView.PANEL_WIDTH, ActorInfoView.PANEL_HEIGHT);					
	this.addChild(this._backgroundRectangle);	
	
	this._actorNameText = new PIXI.Text("Actor Name", {align:"left", fontSize:12});
	this._actorNameText.x =  ActorInfoView.ELEMENT_START_X;
	this._actorNameText.y =  ActorInfoView.ELEMENT_START_Y;	
	this.addChild(this._actorNameText);
};

ActorInfoView.prototype._moveButtonClicked = function(_index){
	
	console.log("MOVE CHOSEN = " + this._moveDataArray[_index]);
};

//===================================================
// Public Methods
//===================================================

ActorInfoView.prototype.setActor = function(_actor){
	
	this._actorNameText.text = _actor.getName();
	
	this._moveDataArray = ["Attack", "Defend", "Wait"];
	
	for(var i=0; i<dummyMovesList; i++){
		
		var newButton = new ButtonText(ActorInfoView.MOVE_BUTTON_WIDTH, ActorInfoView.MOVE_BUTTON_HEIGHT , dummyMovesList[i]);
		this._playButton.setPosition(ActorInfoView.ELEMENT_START_X, ActorInfoView.MOVES_Y_START + ActorInfoView.MOVES_Y_GAP*i);
		this._playButton.setCallback(this._moveButtonClicked.bind(this));
		this._playButton.setCallbackParameterArray([i]);
		this.addChild(newButton);
	
	}
	
};

ActorInfoView.prototype.clear = function(){


};

ActorInfoView.prototype.destroy = function(){


};

ActorInfoView.prototype.update = function(){


};