$(document).ready(function(){

	//fix for ie8 background cover

	$("#container").css({backgroundSize: "cover"})

	//tooltip

	$('.tooltip-btn').on('click',function(evt){
		evt.preventDefault();
		var $content = $(this).parent('dt').next('dd');
		$('.tooltip',$content).slideToggle(200);
	})

	//menu

	$('a#menu').on('click',function(evt){
		evt.preventDefault();
		$('#nav').slideToggle(200);
	})

	//accordion

	$('dt','#accordion').on('click',function(){
		if($(this).next('dd').hasClass('open')){
			$(this).next('dd').slideUp(50).removeClass('open');
		}else{
			$('dd','#accordion').not($(this).next('dd')).slideUp(10).removeClass('open');
			$(this).next('dd').slideDown(100).addClass('open');
		}
		
	})

	//checkboxes

	var $radios = $('input[type=radio]','#calculator');

	$('input[type=radio]','#calculator').each(function(){
		var $btn = $("<a/>",{'class':'radio'})
		$(this).before($btn);
		$btn.on('click',function(e){
			e.preventDefault();
			var $groupedRadios = $('a.radio',$(this).parents('ul').eq(0));
			if($(this).hasClass('checked')){

			} else {
				$groupedRadios.removeClass('checked');
				$(this).addClass('checked');
				$(this).next('input').prop("checked",true);

			}
		})
	});

	//form validation

	$('#calculator').on('submit',function(e){
		e.preventDefault();
		var $tax = $('input[name=tax]:checked').val(),
		$age= $('input[name=age]:checked').val(),
		$car= $('input[name=car]:checked').val();

		if($tax && $age && $car){
			$('#calculator').unbind().submit();
		} else {
			showPagePrompt('Please select all fields');
		}
	
	});

	// form validation prompt

	function showPagePrompt(msg,type){
	
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

})