
//===================================================
// Constructor
//===================================================

function Main() {
	
	console.log("Main");
	
	this._init();
}

//===================================================
// Variables
//===================================================

Main.prototype._gameController = null;

//===================================================
// Private Methods
//===================================================

Main.prototype._init = function() {

	console.log("init");
	
	this._setUpPixiRenderer();
	
	this._gameController = new GameController(this.stage);	
}

Main.prototype._setUpPixiRenderer = function(){
						
	var myView = document.getElementById('game-canvas');
	this.renderer = new PIXI.autoDetectRenderer(myView.width, myView.height, {view:myView});		
	this.renderer.backgroundColor = 0xff0000;

	// The renderer will create a canvas element for you that you can then insert into the DOM.
	//document.body.appendChild(this.renderer.view);
		
	// You need to create a root container that will hold the scene you want to draw.
	this.stage = new PIXI.Container();	
						
	this._animate();
}

// This is called every frame
Main.prototype._update = function() {
	
	if(this._gameController !== null)	
		this._gameController.update();
}

Main.prototype._animate = function() {
    
	// start the timer for the next animation loop
    requestAnimationFrame((this._animate).bind(this));
    
    // this is the main render call that makes pixi draw your container and its children.
    this.renderer.render(this.stage);
	
	this._update();
}
