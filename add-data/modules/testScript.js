var https = require('http');


https.get('http://bit.ly/2BoyLtq' , function(res){

	var data = "";
	res.on('data', function(chunk){
		data += chunk;
	});

	res.on('end', function(){
		console.log(data);
	});
});

console.log('hello this is not your nigro key = clear ')