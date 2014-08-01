/*
	TODO: add support for captions
*/

$(document).ready(function()
{
	var WIDTH = 50;
	var HEIGHT = 50;
	var CENTERPIECE_HEIGHT = 100;
	var CENTERPIECE_WIDTH = 100;
	var PADDING = 10;
	var MARGIN = 0;
	var TIME_INTERVAL = 1000;

	var carousel = $('.center-carousel');
	var carouselItems = $('.center-carousel-item');
	var currentItem = 0;

	for(var i = 0; i < carouselItems.length; i++)
	{
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
	}

	(function updateCenterPiece()
	{
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
			'height': CENTERPIECE_HEIGHT
		});
		carouselItems.eq(currentItem).find('img').css('border', '1px solid #000000');
		carouselItems.eq((currentItem-1)%carouselItems.length).find('img').css('border', '1px solid #FFFFFF');
		console.log(centerPiece);
		carousel.append(centerPiece);
		currentItem = (currentItem+1) % carouselItems.length;

		setTimeout(updateCenterPiece, TIME_INTERVAL);
	})();
});