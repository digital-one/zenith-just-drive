$(window).on('resize',function(){
	resizeTree();
});

function resizeTree(){
	if($('#poster-tree').length){
	var $width = $('#poster-tree img.trunk').width();
	$('#poster-tree').width($width);

}
}


$(document).ready(function(){

//fix for ie8 background cover
	$("#container").css({backgroundSize: "cover"})

setHistoryLink();
scene2JS();
scene3JS();
scene4JS();
resizeTree();



function showOverlay(state,hide){
	switch(state){
		case true:
		$('body').append('<div id="loading-overlay" />');
	$("#loading-overlay").css({
				position: 'absolute',
				zIndex: 100,
				top: '0px',
				left: '0px',
				width: '100%',
				height: $(document).height(),
				background: '#000',
				opacity: '0'
	});
	if(hide){
		$("#loading-overlay").on('click',function(){
			hidePagePrompt();
		})
	}
		break;
		case false:
		$('#loading-overlay').remove();
		break;
	}
}

function showPagePrompt(msg,type){
	//if(console) console.log('loading page');
	
	$('body').append('<div id="prompt">'+msg+'</div>');
	
	var hideOverlay=true;
	if(type=='load'){
		$('#prompt').addClass('loader');
	} else {
		//form prompt, remove after a few seconds
		hidePagePrompt(2000);
	}
	//showOverlay(true,hideOverlay);
	maintainPagePromptPosition(true);
}
function hidePagePrompt($delay){
	//if(console) console.log('loaded page');
	//showOverlay(false);
	if(!$delay) $delay=200;
	$('#prompt').delay($delay).fadeOut(200,function(){
		$(this).remove();
	});
	maintainPagePromptPosition(false);
}
function repositionPagePrompt(){
	var $top = (($(window).height() / 2) - ($("#prompt").outerHeight() / 2)),
		$left = (($(window).width() / 2) - ($("#prompt").outerWidth() / 2));
		if( $top < 0 ) $top = 0;
		if( $left < 0 ) $left = 0;
		$("#prompt").css({
			top: $top + 'px',
			left: $left + 'px'
		});
		$("#loading-overlay").height( $(document).height());		
}
function maintainPagePromptPosition(status){
	switch(status){
		case true:
			$(window).bind('resize', repositionPagePrompt());
			$(window).bind('scroll', repositionPagePrompt());
			break;
		case false:
			$(window).unbind('resize', repositionPagePrompt());
			$(window).unbind('scroll', repositionPagePrompt());
		}

}
// image preloader

function preloadImages(list,callback) {


   		var $imageCount = list.length,
    		$loaded=0;
for (var i = 0; i < $imageCount; i++) {

var $image = new Image();
$image.onload = function(){ 
    	if(++$loaded==$imageCount){
    		callback();
    	}
}
$image.src = list[i];
     /*$('<img>').attr({ src: list[i] }).load(function() {

    	if(++$loaded==$imageCount){
    		callback();
    	}
    }) */
    //preloadImages.cache.push(img);
}
}

// Browser history

	 var History = window.History;
//History.pushState(null, '', 'index.html');

	  History.Adapter.bind(window,'statechange',function() {
	  	//if(console) console.log('change state');
	  	 var State = History.getState();
	  	// $('#content').load(State.url + ' #container',function(){
	  		//if(console) console.log(State.url);
	  		showPagePrompt('LOADING','load');
			$.get(State.url, function(data) {
	  	 	
	  	 		var $images=[],
	  	 			$preloads = $('.preload',data),
	  	 			$preloads_src = $('img',data);

	  	 			$preloads.each(function(index) {
	  	 				$images.push(this.style.backgroundImage.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, ''));
					});
					if($preloads_src){
					$preloads_src.each(function(index){
	  	 				$images.push($(this).attr('src'));
	  	 			});
				}

	  	 	var $page = $(data).find('#container').html();
	  	 	var $sceneClass = $(data).find('#container').attr('class');
	  	 
	  	 	preloadImages($images,function(){

	  	 			hidePagePrompt();
	  	 		$("#container").attr('class','').addClass($sceneClass).html($page);
	  	 		
	  	 		scene2JS();
	  	 		scene3JS();
	  	 		scene4JS();
	  	 		resizeTree();
	  	 		$(window).bind('resize',function(){
	  	 			resizeTree();
	  	 		});
	  	 		setHistoryLink();

	  	 	})
	  	 });
			
	  });
	  

function scene4JS(){
	
	// tooltips
	
	$('.tooltip-btn').on('click',function(evt){
		evt.preventDefault();
		var $tooltip = $('.tooltip',$(this).parents('p'));
			if($tooltip.hasClass('active')){
		$($tooltip).removeClass('active').slideUp(100);
	} else {
		$('.tooltip').hide().removeClass('active');
		$($tooltip).addClass('active').slideDown(200);
	}
	})
}

function setHistoryLink(){
 $('a.history').click(function(evt) {
        evt.preventDefault();
        History.pushState(null, $(this).text(), $(this).attr('href'));
    });

}


// balloon content regions

function scene2JS(){
/*	if(console) console.log('scene2');
$('a.balloon-link').on('click',function(e){
	e.preventDefault();
	$('.content').fadeOut();
	$('.'+$(this).attr('rel')).fadeToggle();
}) */
}
// tax and age radio buttons

function scene3JS(){
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
		//$radio.attr('checked', 'checked');
		$radio.prop("checked", true);
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
			//$('#'+$rel).attr('checked', 'checked');
			$('#'+$rel).prop("checked", true);
			$parent.addClass('selected');
		})
	})
	$('#calculator').on('submit',function(e){
		e.preventDefault();
		submitForm();
	})

}
// form validation - dont let form submit without the 3 selections

function submitForm(){
	var $tax = $('input[name=tax-banding]:checked').val(),
		$age= $('input[name=age]:checked').val(),
		$car= $('input[name=car]:checked').val();
		
		if($tax && $age && $car){
			showPagePrompt('LOADING','load');
			$.get('scene-4.php', {tax:$tax,age:$age,car:$car},function(data) {
				
				//loaded page, preload images then show
	  	 		var $images=[],
	  	 			$preloads = $('.preload',data),
	  	 			$preloads_src = $('img',data);
	  	 			
					$preloads.each(function(index) {
	  	 				$images.push(this.style.backgroundImage.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, ''));
					});
					
					$preloads_src.each(function(){
						$images.push($(this).attr('src'));
					})
					
				
				var $page = $(data).find('#container').html();
				
	  	 		var $sceneClass = $(data).find('#container').attr('class');

	  	 		preloadImages($images,function(){

	  	 			hidePagePrompt();
	  	 		$("#container").attr('class','').addClass($sceneClass).html($page);
	  	 		resizeTree();
	  	 		scene4JS();
	  	 		setHistoryLink();

	  	 	})

				},'html');
		} else {
			showPagePrompt('Please select all fields');
		}
		
}

//
})