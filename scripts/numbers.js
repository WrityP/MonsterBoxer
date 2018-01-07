var randomItem = function(array){
	return array[Math.floor(Math.random()*array.length)];
}

var roll = function(mini,maxi){
	if(mini && maxi){
		return (Math.ceil(Math.random()*(1+maxi*1-mini*1))+(mini*1-1));
	}
	else{
		return null;
	}
}