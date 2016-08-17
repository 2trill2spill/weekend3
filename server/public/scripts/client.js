$(document).ready(function() {

  var operand;

  $('#cal').on('submit', function(event) {
    event.preventDefault();

    // If operand is null, it means one of the operand buttons have not
    // been pressed.
    if(operand == null) {
      alert("Press one of the operand buttons.");
      return;
    }

    // initialize a new variable as an empty object
    var values = {};

    // convert the form inputs into an array
    var fields = $('#cal').serializeArray();

    // iterate over the array and transfer each index into a new property on an object with the value of what was entered.
    fields.forEach(function(element, index, array) {
      // review index notation vs. dot notation on objects
      // here, dot notation wouldn't work
      values[element.name] = element.value;
    });
      
    // clear out inputs
    $('#cal').find('input[type=text]').val('');

    // Make sure an operand was selected.
    if(operand.length == 0) {
    	console.log("Click a operand button");
    	return;
    } else {
      values.operand = operand;
      
      operand = null;

      sendDataToCalculate(values);
    }
  });

    $('#plus').on('click', function() {
      operand = "plus";
    });

    $('#minus').on('click', function() {
       operand = "minus";
    });

    $('#star').on('click', function() {
       operand = "star";
    });

    $('#divide').on('click', function() {
       operand = "divide";
    });

    $('#clearBtn').on('click', function() {
      $('#book-list').empty();
    });

    function sendDataToCalculate(obj) {
      $.ajax({
        type: 'POST',
        url: '/calculate',
        data: { first: obj.first, second: obj.second, operand: obj.operand },
        success: function(response) {
          $('#book-list').append('<li>' + 'Result: ' + response.result + '</li>');
          console.log("result: ", response.result)
        }
      })
    }
});