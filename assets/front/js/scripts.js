jQuery(document).ready(function ($) {



	$(document).on('click', '.uv_popup_box_container .uv_popup_box_content .uv_popup_box_close i', function () {

		$('.uv_popup_box_container').fadeOut();


	})

	$(document).on('submit', '#user-verification-resend', function (ev) {

		ev.preventDefault();

		var formData = $(this).serialize();

		console.log(formData);



		$.ajax(
			{
				type: 'POST',
				context: this,
				url: user_verification_ajax.user_verification_ajaxurl,
				data: { "action": "user_verification_resend_form_submit", 'formData': formData },
				success: function (response) {
					var data = JSON.parse(response);
					var message = data['message'];



					$('.form-area.message').html(message);
					$('.form-area.message').fadeIn();

					// setTimeout(() => {
					// 	$('.form-area.message').fadeOut();

					// }, 2000)


				}
			});





	})





});


