
//===================================================
// Constructor
//===================================================

ButtonText = function(_width, _height, _text){

	Button.call(this, _width, _height);

	this._textString = _text;
	
	this._init();
};

ButtonText.prototype = Object.create( Button.prototype );
ButtonText.prototype.constructor = ButtonText;

//===================================================
// Constants
//===================================================

//===================================================
// Variables
//===================================================

ButtonText.prototype._textString = null;
ButtonText.prototype._textObject = null;

//===================================================
// Private Methods
//===================================================

ButtonText.prototype._init = function(){
		
	Button.prototype._init.call(this);	
		
	this._textObject = new PIXI.Text(this._textString, {align:"center"});
	
	this.setButtonText();
	
	this.addChild(this._textObject);	
};

//===================================================
// Public Methods
//===================================================

ButtonText.prototype.setButtonText = function(_textString){
			
	if(_textString)
		this._textObject.text = _textString;
	
	//this._textObject.updateTexture();
	
	this._textObject.x = this._buttonWidth * 0.5 - this._textObject.width * 0.5;
	this._textObject.y = this._buttonHeight * 0.5 - this._textObject.height * 0.5;
};

ButtonText.prototype.destroy = function(){
	
	this.removeChild(this._textObject);
	
	Button.destroy.call(this);
};

//===================================================
// Events
//===================================================


//===================================================
// GETTERS & SETTERS
//===================================================

