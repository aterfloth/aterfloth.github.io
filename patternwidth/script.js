$(document).ready(function() {
	
	

	// var randomNum = Math.floor(Math.random() * 43 )

	// 	$('.one').css('background-image','url("' + randomNum + '.png")' );

	for (var i = 1; i <= 1800; i++) {
		$('body').append('<div class="one"></div>');
	}
	
	$(function() {
	    $( ".one" ).resizable({
	      alsoResize: ".one"
	    });
	});

	var counter = 0;
	// var counter2 = 0;

	// counter2 = counter2 - 740;
 $(document).keydown(function(){
 	var currentKey = event.keyCode

 	counter = (counter + 10) % 240;
 	// counter2 = counter2 + 10;
 	$(".one").css("width", counter+30);
 

 	// if (counter2 <= 741){
 	// 	$(".one").css("height", counter2 );
 	// }

		console.log(randomNum);

  });

});