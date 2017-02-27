
//===================================================
// Constructor
//===================================================

Button = function(_width, _height){

	DisplayObject.call(this);

	this._buttonWidth = _width;
	this._buttonHeight = _height;
	
	this._init();
};

Button.prototype = Object.create( DisplayObject.prototype );
Button.prototype.constructor = Button;

//===================================================
// Constants
//===================================================

//===================================================
// Variables
//===================================================

Button.prototype._backgroundRectangle = null;
Button.prototype._parentContainer = null;
Button.prototype._mouseOver = null;
Button.prototype._mouseDown = null;

Button.prototype._buttonWidth = null;
Button.prototype._buttonHeight = null;

Button.prototype._callbackFunction = null;
Button.prototype._calbackParametersArray = null;

//===================================================
// Private Methods
//===================================================

Button.prototype._init = function(){

	this._mouseOver = false;
	this._mouseDown = false;

	this.interactive = true;
	this.buttonMode = true;
		
	this.on("mousedown", this.mouseDown.bind(this));
	this.on("mouseup", this.mouseUp.bind(this));
	this.on("mouseover", this.mouseOver.bind(this));
	this.on("mouseout", this.mouseOut.bind(this));

	this._backgroundRectangle = new PIXI.Graphics();
	this._backgroundRectangle.lineStyle(1, 0x00FF00);	
	this._backgroundRectangle.beginFill(0xFFFF00); 
	this._backgroundRectangle.drawRect(0, 0, this._buttonWidth, this._buttonHeight);
					
	this.addChild(this._backgroundRectangle);	
	
	this._mouseOverRectangle = new PIXI.Graphics();
	this._mouseOverRectangle.lineStyle(1, 0x00FF00);	
	this._mouseOverRectangle.beginFill(0xF00F0F); 
	this._mouseOverRectangle.drawRect(0, 0, this._buttonWidth, this._buttonHeight);
	this._mouseOverRectangle.visible = false;
					
	this.addChild(this._mouseOverRectangle);	

	this._mouseDownRectangle = new PIXI.Graphics();
	this._mouseDownRectangle.lineStyle(1, 0x00FF00);	
	this._mouseDownRectangle.beginFill(0x043FAF); 
	this._mouseDownRectangle.drawRect(0, 0, this._buttonWidth, this._buttonHeight);
	this._mouseDownRectangle.visible = false;
					
	this.addChild(this._mouseDownRectangle);
};

//===================================================
// Public Methods
//===================================================

Button.prototype.setCallbackParameterArray = function(_calbackParametersArray){

	this._calbackParametersArray = _calbackParametersArray;
};

Button.prototype.setCallback = function(_callbackFunction){

	this._callbackFunction = _callbackFunction;
};

Button.prototype.destroy = function(){

	this.off("mousedown", this.mouseDown.bind(this));
	this.off("mouseup", this.mouseUp.bind(this));
	this.off("mouseover", this.mouseOver.bind(this));
	this.off("mouseout", this.mouseOut.bind(this));
	
	DisplayObject.prototype.destroy.call(this);
};

//===================================================
// Events
//===================================================

Button.prototype.mouseDown = function(e){		
	
	this._mouseDown = true;
	this._mouseDownRectangle.visible = true;
};

Button.prototype.mouseUp = function(e){
	
	if(this._mouseDown === true){
	
		Utils.log("Button clicked");
	
		if(this._callbackFunction !== null){
								
			if(this._calbackParametersArray !== null)					
				this._callbackFunction.apply(this, this._calbackParametersArray);		
			else 					
				this._callbackFunction();
		}
	}
			
	this._mouseDown = false;
	this._mouseDownRectangle.visible = false;
};

Button.prototype.mouseOver = function(e){

	this._mouseOver = true;
	this._mouseOverRectangle.visible = true;
};

Button.prototype.mouseOut = function(e){

	this._mouseOver = false;
	this._mouseOverRectangle.visible = false;
	
	this._mouseDown = false;
	this._mouseDownRectangle.visible = false;
};

//===================================================
// GETTERS & SETTERS
//===================================================

Button.prototype.getWidth = function(){ return this._buttonWidth; };
Button.prototype.getHeight = function(){ return this._buttonHeight; };