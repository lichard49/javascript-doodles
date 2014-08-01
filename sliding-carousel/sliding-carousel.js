/*
	TODO: add proper buttons
	TODO: make scalable for multiple instances
*/

$(document).ready(function()
{
	var NUM_VISIBLE_ELEMENTS = 2;
	var WIDTH = 100;
	var HEIGHT = 100;
	var PADDING = 10;
	var MARGIN = 0;

	var carousel = $('.sliding-carousel');
	var carouselItems = $('.sliding-carousel-item');
	var currentItem = 0;

	carousel.css('float', 'left');
	carouselItems.wrapAll('<div class="sliding-carousel-wrapper"></div>');
	var wrapper = $('.sliding-carousel-wrapper');
	wrapper.css(
	{
		'width': NUM_VISIBLE_ELEMENTS*(WIDTH+PADDING)+PADDING,
		'height': HEIGHT
	});
	wrapper.before('<a id="prev" href="#"><</a>');
	$('#prev').css(
	{
		'visibility': 'hidden',
		'display': 'inline-block',
		'position': 'relative',
		'float': 'left',
		'top': HEIGHT/2-10,
		'padding-right': '10px',
		'text-decoration': 'none'
	});
	wrapper.after('<a id="next" href="#">></a>');
	$('#next').css(
	{
		'display': 'inline-block',
		'position': 'relative',
		'float': 'left',
		'top': HEIGHT/2-10,
		'padding-left': '10px',
		'text-decoration': 'none'
	});

	for(var i = currentItem; i < carouselItems.length; i++)
	{
		if(i < currentItem+NUM_VISIBLE_ELEMENTS)
		{
			carouselItems.eq(i).css('left', i*(WIDTH+PADDING)+MARGIN+PADDING);
		}
		else
		{
			carouselItems.eq(i).hide();
		}
	}

	$('#prev').click(function()
	{
		if(currentItem > 0)
		{
			carouselItems.eq(currentItem+NUM_VISIBLE_ELEMENTS-1).hide();
			for(var i = currentItem; i < currentItem+NUM_VISIBLE_ELEMENTS; i++)
			{
				var callback = i==currentItem+NUM_VISIBLE_ELEMENTS-1 ? function()
				{
					carouselItems.eq(currentItem-1).show();
					carouselItems.eq(currentItem-1).css('left', MARGIN+PADDING);
					currentItem -= 1;
					if(currentItem == 0)
					{
						$('#prev').css('visibility', 'hidden');
					}
					if(currentItem < NUM_VISIBLE_ELEMENTS-1)
					{
						$('#next').css('visibility', 'visible');
					}
				} : null;
				carouselItems.eq(i).animate({'left': '+='+(WIDTH+PADDING)}, callback);
			}
		}
	});

	$('#next').click(function()
	{
		if(currentItem <= carouselItems.length-NUM_VISIBLE_ELEMENTS)
		{
			carouselItems.eq(currentItem).hide();
			for(var i = currentItem; i < currentItem+NUM_VISIBLE_ELEMENTS; i++)
			{
				var callback = i==currentItem+NUM_VISIBLE_ELEMENTS-1 ? function()
				{
					carouselItems.eq(currentItem+NUM_VISIBLE_ELEMENTS).show();
					carouselItems.eq(currentItem+NUM_VISIBLE_ELEMENTS).css('left', (NUM_VISIBLE_ELEMENTS-1)*(WIDTH+PADDING)+MARGIN+PADDING);
					currentItem += 1;
					if(currentItem >= carouselItems.length-NUM_VISIBLE_ELEMENTS)
					{
						$('#next').css('visibility', 'hidden');
					}
					if(currentItem > 0)
					{
						$('#prev').css('visibility', 'visible');
					}
				} : null;
				carouselItems.eq(i).animate({'left': '-='+(WIDTH+PADDING)}, callback);
			}
		}
	});
});