$(window).on('resize',function(){
	resizeTree();
});

function resizeTree(){
	var $width = $('#poster-tree img.trunk').width();
	$('#poster-tree').width($width);
}


$(document).ready(function(){

// image preloader

function preloadImages(list,callback) {
    var $img,
   		$imageCount = list.length,
    	$loaded=0;
   // if (!preloadImages.cache) {
   // preloadImages.cache = [];
//}
for (var i = 0; i < list.length; i++) {
    //$img = new Image();
    //$img.src = list[i];
     $('<img>').attr({ src: list[i] }).load(function() {
     	console.log(list[i]);
     	console.log(++$loaded);
    	if(++$loaded==$imageCount){
    		callback();
    	}
    })
    //preloadImages.cache.push(img);
}
}

// Browser history
	 //var History = window.History;
	  History.Adapter.bind(window,'statechange',function() {
	  	 var State = History.getState();
	  	 $('#content').load(State.url + ' #container',function(){
	  	 	var $page = $(this);
	  	 	//get all background images to preload
	  	 	var $preloads = $('.preload',$page),
	  	 		$images=[];
	  	 	$preloads.each(function(){
	  	 		$images.push($(this).css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, ''));
	  	 	})
	  	 	preloadImages($images,function(){
	  	 		$page.fadeIn();
	  	 	})

	  	 });
	  });
	   $('a.history').click(function(evt) {
        evt.preventDefault();
        History.pushState(null, $(this).text(), $(this).attr('href'));
    });

resizeTree();

// tooltips

$('a.tooltip-btn').on('click',function(e){
	e.preventDefault();
	$('.tooltip',$(this).parents('p')).fadeToggle();
})

// balloon content regions

$('a.balloon-link').on('click',function(e){
	e.preventDefault();
	$('.content').fadeOut();
	$('.'+$(this).attr('rel')).fadeToggle();
})

// tax and age radio buttons

var $radios = $('#tax input[type=radio], #age input[type=radio]');
$radios.each(function(){
	var $label = $(this).prev('label').html(),
		$parent = $(this).parent('div'),
		$section = $(this).parents('section'),
		$radio = $(this),
		$allRadios = $('input[type=radio]',$section);

	$(this).before('<a><span>'+$label+'</span></a>');
	$('a',$parent).on('click',function(e){
		e.preventDefault();
		$allRadios.attr('checked', false);
		$('div',$section).removeClass('selected');
		$radio.attr('checked', 'checked');
		$parent.addClass('selected');
	});
})

// car type radio buttons

var $radios = $('#car-type input[type=radio]');
	$radios.each(function(){
		var $parentClass = $(this).parent('div').attr('class'),
			$parent = $(this).parent('div'),
			$label = $(this).prev('label').html(),
			$section = $(this).parents('section'),
			$allRadios = $('input[type=radio]',$section),
			$id = $(this).attr('id'),
			$desc = $('small',$parent).text();
			$('small',$parent).remove();
		$(this).before('<span>'+$label+'<small>'+$desc+'</small></span>').parent('div').before('<a class="'+$parentClass+'-link" rel="'+$id+'"></a>');

		$('a.'+$parentClass+'-link').on('mouseover',function(){
			var $rel = $(this).attr('rel'),
			$section = $('#'+$rel).parents('section'),
			$parent = $('#'+$rel).parent('div');
			//$('div',$section).removeClass('hovered');
			$parent.addClass('hovered');
		});
			$('a.'+$parentClass+'-link').on('mouseout',function(){
				var $rel = $(this).attr('rel'),
				$section = $('#'+$rel).parents('section'),
				$parent = $('#'+$rel).parent('div');
				$parent.removeClass('hovered');
			});

		$('a.'+$parentClass+'-link').on('click',function(e){
			e.preventDefault();
			var $rel = $(this).attr('rel'),
			$parent = $('#'+$rel).parent('div');
			$section = $('#'+$rel).parents('section');
			$('div',$section).removeClass('selected');
			$allRadios.attr('checked', false);
			$('#'+$rel).attr('checked', 'checked');
			$parent.addClass('selected');
		})
	})
})