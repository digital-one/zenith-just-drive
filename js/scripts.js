$(document).ready(function(){

var $radios = $('input[type=radio]');
$radios.each(function(){
	var $label = $(this).prev('label').html();
	$(this).prepend('<a>'+$label+'</a>')
})


})