$(document).ready(function(){

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
		console.log('click');
		$(this).next('dd').slideToggle(200);
	})
})