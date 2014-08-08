$(document).ready(function(){

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
			$id = $(this).attr('id');

		$(this).before('<span>'+$label+'</span>').parent('div').before('<a class="'+$parentClass+'-link" rel="'+$id+'"></a>');
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