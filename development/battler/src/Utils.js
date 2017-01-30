
Utils = {};

Utils.log = function(){
	if(true) // Globals.console_debug === true)
	{
		//console.log(_string)	
		console.log.apply(null, arguments);	
	}
};

Utils.GetRandomString = function(_length){
	var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < _length; i++ )
        text += possible.charAt(Math.floor(ROT.RNG.getUniform() * possible.length));

    return text;
};

Utils.clamp = function(_value, _min, _max){

	_value = Math.min(_value, _max);
	_value = Math.max(_value, _min);
	
	return _value;
};

Utils.inBounds = function(_value, _min, _max){

	return (_value >= _min && _value <= _max);
};

Utils.doesVariableExist = function(_variable){
	
	return (typeof _variable !== 'undefined' && _variable !== null);	
};