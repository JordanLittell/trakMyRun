$(document).ready(function () {
  $('.nav li').click(function(ev){
    $('.nav').find('li.active').removeClass('active');
    $('.nav').find('.glyphicon.active').removeClass('active');
    $(ev.currentTarget).addClass('active');
    $(ev.currentTarget).find('.glyphicon').addClass('active');
  })
	TrakMyRun.initialize();
	$('.dropdown-toggle').dropdown();
	$('body').removeClass("main-background");	
	$('.infinite').val(0);
	
});