$(document).ready(function() {
var wWidth = $('body').width();
var wHeight = $('body').height();

var bgIndex = Math.ceil( Math.random() * 7);
console.log(bgIndex);

$('body').css("background-image", "url(bg/" + bgIndex + ".jpg)")


//CREATE SOUNDOBJECTS & DIVS
var sounds = [];

for (var i = 0; i < 5; i++) {
 	sounds[i] = new WillSound("clarinet",i);
	sounds[i].playSound();
}

// $('body').click( function( event ) {
// 	var newSound = sounds.length + 1;
// 	sounds[newSound] = new WillSound("clarinet",newSound);
// 	sounds[newSound].playSound();	
// });

//CONSTRUCTOR TO CREATE OBJECTS & DIVS
function WillSound(instrument, id) {
	// wWidth = $(window).width();
	// wHeight = $(window).height();
	var newLeft = ((wWidth - 400) * Math.random());
	var newTop = ((wHeight - 400) * Math.random());
	var newHue = Math.random() * 360;
	var newColor = "hsl("+newHue+",80%,70%)";
	var newWidth = Math.random()* 300 + 100;
	var newHeight = Math.random()* 300 + 100;
	var soundUrl = instrument + '.wav';
	var soundObject1 = new Howl({
	  urls: [soundUrl],
	  loop: false,
	  volume:0
	});
	this.soundObject = soundObject1;
	this.id = id;
    this.instrument = instrument;
    // this.soundObject.volume(0.5);
    this.soundObject._volume = 0.5;
    this.soundObject.rate = 1;
    this.duration = 500;
    this.pan = 0.5;
    this.soundObject._pos3d = [this.pan,0.5,0.5];

    this.refID = name+id;

    var self = this;

    //CONSTRUCTOR TO MAKE PLAY FUNCTION
    this.playSound = function () {
    	// console.log(self.soundObject);
    	// console.log("playing sound "+id);

		self._rate = self.rate;		
		self.soundObject.play();

		$('#'+instrument+id).fadeTo(5, 1).fadeTo(100, 0.85);
		setTimeout( self.playSound , self.duration); // loop it according to duration
	}

	//create the ui element using jquery
	// attach .resize and .on to jquery element
	// add the elemnt to the DOM

	$('body').append('<div class="ui" id="'+instrument+id+'" data-id="' + id + '"></div>');

	$( "#"+instrument+id ).css({ // random new position
		"left": newLeft,
		"top": newTop,
		"width": newWidth,
		"height": newHeight,
		"background-color": newColor
	}).fadeTo(100, 1);
	$( "#"+instrument+id ).resizable({
      handles: 'ne, se, sw, nw, e, w, s, n',
  	}).draggable();	
}

var setParams = function($el) {
	// var $el = el;
	var id = $el.attr('data-id');
	var thisTop = $el.offset().top;
	var thisLeft = $el.offset().left;
	var thisHeight = $el.height();
	var thisWidth = $el.width();
	var thisVol = 1 - (thisTop / wHeight);
	var thisPan = thisLeft / wWidth;
	var thisWHRatio = thisHeight / thisWHRatio;
	var thisDuration = thisWidth * 1.5;
	var thisRate = 0.8 - (thisHeight - 100) / 200 / 2 + 0.5;


	//CLIP VALUES BETWEEN 0-1
	if ( thisVol >= 1 ) {
		thisVol = 1;
	} else if ( thisVol <= 0 ) {
		thisVol = 0;
	}

	if ( thisPan >= 1 ) {
		thisPan = 1;
	} else if ( thisPan <= 0 ) {
		thisPan = 0;
	}

	//get the id
	var id = $el.attr('data-id');
	sounds[id].soundObject._volume = thisVol;
	sounds[id].soundObject._pos3d = [thisPan,0.5,0.5];
	// console.log(sounds[id].soundObject._pos3d);
	sounds[id].soundObject._rate = thisRate;	
	sounds[id].duration = thisDuration;
}


//FUNCTION: ON RESIZE, DIVIDE HEIGHT BY WIDTH AND SET LOOP DURATION
$('.ui').resize(function() { 
	// var currentEl = $(this);
	setParams( $(this) );
	// console.log($(this));
});

//ON DRAG, MAP X TO VOLUME AND Y TO PAN
$( ".ui" ).on( "drag", function( event, ui ) {
	// var el = $(this);
	setParams( $(this) );
	// setParams(el);
});

$( ".ui" ).each( function() {
	// var el = $(this);
	setParams( $(this) );
	// setParams(el);
});

//SHOW INSTRUCTIONS ON HOVER

$('#instructions').mouseenter( function(){
	$(this).html('Resize them to change loop duration and pitch. Drag them around to change volume and pan.').fadeTo(400, 1);
}).mouseleave( function() {
	$('#instructions').html('?').fadeTo(200, 0.7);
});


}); //end of document.ready