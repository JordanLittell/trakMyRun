$(document).ready(function () {
	
  if(TrakMyRun.CurrentUser) {
    $('body').removeClass("main-background"); 
    $('.close-form').on('click',function(ev) {
      ev.preventDefault();
      $("#filepicker-form").slideUp();
    });
  }

	$('.dropdown-toggle').dropdown();
	$('.infinite').val(0);
	
  });

TrakMyRun.updateURL = function (fragment) {
  $('.nav').children().removeClass('active');
  $("a[href*='#']").find('.glyphicon').removeClass('active');
  var item = $("a[href$='"+fragment+"']");
  item.parent().addClass('active');
  item.find('.glyphicon').addClass('active');
}