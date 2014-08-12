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

   		var $imageCount = list.length,
    		$loaded=0;
    		console.log($imageCount);


   // if (!preloadImages.cache) {
   // preloadImages.cache = [];
//}
for (var i = 0; i < $imageCount; i++) {
    //$img = new Image();
    //$img.src = list[i];
   //console.log(list[i]);
     $('<img>').attr({ src: list[i] }).load(function() {

    	if(++$loaded==$imageCount){
    		callback();
    	}
    })
    //preloadImages.cache.push(img);
}
}

// Browser history

	 var History = window.History;
	  History.Adapter.bind(window,'statechange',function() {
	  	console.log('change state');
	  	 var State = History.getState();
	  	// $('#content').load(State.url + ' #container',function(){
			$.get(State.url, function(data) {
	  	 		
	  	 		var $images=[],
	  	 			$preloads = $('.preload',data),
	  	 			$preloads_src = $('img',data).attr('src');

	  	 			$preloads.each(function(index) {
	  	 				$images.push(this.style.backgroundImage.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, ''));
					});
					if($preloads_src){
					$preloads_src.each(function(index){
	  	 				$images.push($(this));
	  	 			});
				}
	  	 	console.log($images);
	  	 	var $page = $(data).find('#container').html();
	  	 
	  	 	preloadImages($images,function(){
	  	 		$("#container").html($page);
	  	 	})
	  	 });
	  });
	   $('a.history').click(function(evt) {
        evt.preventDefault();
        History.pushState(null, $(this).text(), $(this).attr('href'));
    });

resizeTree();

//form submit

/*
function submitForm(){
	$.get('scene-4.php',)	
}
*/

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
		var $parentClass = $(this).parent('div').removeClass('preload').attr('class'),
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

// form validation - dont let form submit without the 3 selections


//
})