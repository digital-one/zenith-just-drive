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
		var $btn = $("<a/>",{class:'radio'})
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
			if(console) console.log('select all fields')
		}
	
	});

})