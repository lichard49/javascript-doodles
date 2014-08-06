/*
	TODO: add support for captions
	TODO: make margins respect element attributes
*/

$(document).ready(function()
{
	var carousel = $('.center-carousel');
	var carouselItems = $('.center-carousel-item');
	var currentItem = 0;

	var CENTERPIECE_HEIGHT = carouselItems.eq(0).find('img').height();
	var CENTERPIECE_WIDTH = carouselItems.eq(0).find('img').width();
	

	var PADDING = 10;
	var MARGIN = 0;	
	var WIDTH = (CENTERPIECE_WIDTH-PADDING*carouselItems.length)/carouselItems.length-(PADDING/carouselItems.length);
	var HEIGHT = 50;

	var TIME_INTERVAL = 1000;

	console.log(carousel.css('margin'));

	for(var i = 0; i < carouselItems.length; i++)
	{
		carouselItems.eq(i).data('index', i);
		carouselItems.eq(i).css(
		{
			'left': i*(WIDTH+PADDING)+MARGIN+PADDING,
			'top': CENTERPIECE_HEIGHT+PADDING
		});
		carouselItems.eq(i).find('img').css(
		{
			'width': WIDTH,
			'height': HEIGHT,
			'border': '1px solid #FFFFFF'
		});
		carouselItems.eq(i).on('click', function() { updateCenterPiece($(this).data('index')); } );
	}

	function updateCenterPiece(index)
	{
		console.log(currentItem);
		carouselItems.eq(currentItem).find('img').css('border', '1px solid #FFFFFF');
		currentItem = index;
		console.log(currentItem);

		$('#centerPiece').remove();
		var centerPiece = carouselItems.eq(currentItem).clone();
		centerPiece.attr('id', 'centerPiece');
		centerPiece.css(
		{
			'top': 0,
			'left': 0
		});
		centerPiece.find('img').css(
		{
			'width': CENTERPIECE_WIDTH,
			'height': CENTERPIECE_HEIGHT,
			'-moz-border-radius-topleft': '6px',
			'border-top-left-radius': '6px',
			'-moz-border-radius-topright': '6px',
			'border-top-right-radius': '6px'
		});
		centerPiece.find('div').css(
		{
			'display': 'block',
			'position': 'relative',
			'top': '-30px',
			'width': CENTERPIECE_WIDTH-10
		});
		carouselItems.eq(currentItem).find('img').css('border', '1px solid #000000');
		carousel.append(centerPiece);
		
		setTimeout(incrementCenterPiece, TIME_INTERVAL);
	};
	function incrementCenterPiece()
	{
		updateCenterPiece((currentItem+1) % carouselItems.length);
	}
	updateCenterPiece(0);
});