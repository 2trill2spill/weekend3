var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

function minus(first, second) {
	return first - second;
}

function add(first, second) {
	return first + second;
}

function multiply(first, second) {
	return first * second;
}

function divide(first, second) {
	return first / second;
}

app.post("/calculate", function(req, res) {
	var math = req.body;

	var first = parseInt(math.first);
	var second = parseInt(math.second);
	var result = 0;

    switch(math.operand) {
    	case 'minus':
    	  result = minus(first, second);
    	  break;
    	case 'plus':
    	  result = add(first, second);
    	  break;
    	case 'star':
    	  result = multiply(first, second);
    	  break;
    	case 'divide':
    	  result = divide(first, second);
    	  break;

    	default:
    	   res.sendStatus(500);
    	   return;
    }

	res.send({result: result});
})

// serve static files
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './server/public', file));
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
  console.log('Server is running on port ', app.get('port'));
});
