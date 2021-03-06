$(function() {

    // Define the loader/spinner
	var loader = '<i class="fa fa-spinner w3-spin loader" style="font-size:64px"></i>';

    // Get the form.
    var form = $('form');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        //show the loader
        $('.loading').show().html(loader).fadeIn();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('w3-hide');
            $(formMessages).removeClass('w3-red');
            $(formMessages).show().addClass('w3-green');
            $(formMessages).find('span').addClass('w3-green');

            // Set the message text.
            $(formMessages).find('h3').text('Success!');
            $(formMessages).find('p').html(response);

            // Clear the form.
            $('input[type=text], textarea').val('');
            $('#scriptDiv > p > input[type=checkbox]').attr('checked', false);

            //hide the loader
            $('.loading').fadeOut();
            $("html, body").animate({ scrollTop: 0 }, "slow");

            // Custom Process for DCSI Campaign
            if($(form).hasClass('dcsiForm')) {
                setTimeout(function() { 
                    alert("Success! You will be redirect to Initial Page");   
                    window.location.replace("/_dcsi/index.php");
                }, 1000);
            }
        })
        .fail(function(data) {
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('w3-hide');
            $(formMessages).removeClass('w3-green');
            $(formMessages).show().addClass('w3-red');
            $(formMessages).find('span').addClass('w3-red');

            $(formMessages).find('h3').text('Error!');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).find('p').html(data.responseText);
            } else {
                $(formMessages).find('p').text('Oops! An error occured and your message could not be sent.');
            }

            //hide the loader
            $('.loading').fadeOut();
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });

    });

});
