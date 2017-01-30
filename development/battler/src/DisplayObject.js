
//===================================================
// Constructor
//===================================================

DisplayObject = function(){

	PIXI.Container.call(this);

	this._init();
};

DisplayObject.prototype = Object.create( PIXI.Container.prototype );
DisplayObject.prototype.constructor = DisplayObject;

//===================================================
// Constants
//===================================================

//===================================================
// Variables
//===================================================

DisplayObject.prototype._parentContainer = null;

//===================================================
// Private Methods
//===================================================

DisplayObject.prototype._init = function(){


};

//===================================================
// Public Methods
//===================================================

DisplayObject.prototype.destroy = function(){
	

};

DisplayObject.prototype.setVisible = function(_visible){

	if(Utils.doesVariableExist(_visible)){
		this._visible === _visible;
	}
};

DisplayObject.prototype.setPosition = function(_xPos, _yPos){
	
	this.x = _xPos;
	this.y = _yPos;
};

DisplayObject.prototype.addToContainer = function(_parentContainer){
	
	this._parentContainer = _parentContainer;
	this._parentContainer.addChild(this);
};

DisplayObject.prototype.removeFromParent = function(){

	if(this._parentContainer){
		this._parentContainer.removeChild(this)
	}
};


//===================================================
// GETTERS & SETTERS
//===================================================

DisplayObject.prototype.getWidth = function(){ };
DisplayObject.prototype.getHeight = function(){ };