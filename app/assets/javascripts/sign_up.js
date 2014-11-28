$('#show-contact-info').on('click', function(event) {
    event.preventDefault(); 
    var inputs = $('#required-info').find('input')
    inputs.each(function(idx, el){
        if ($(el).val().length < 1) {
            //validate form
        } else {
            //hide button, required info and show other fields 
            $('#required-info').hide();
            $('#show-contact-info').hide();
            $('#contact-info').fadeIn('fast');
        }
    })
})