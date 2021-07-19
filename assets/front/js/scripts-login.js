jQuery(document).ready(function($){


	//$("label[for='user_login'").text("Username or Email Address or Phone Number");




	$(document).on('click', '#send-otp', function() {

		user_login = $('#user_login').val();

		//console.log(user_login);

		$.ajax(
			{
				type: 'POST',
				context: this,
				url:user_verification_ajax.user_verification_ajaxurl,
				data: {"action": "user_verification_send_otp", 'user_login': user_login},
				success: function(response)
				{
					var data = JSON.parse( response );
					otp_via_mail = data['otp_via_mail'];
					otp_via_sms = data['otp_via_sms'];
					uv_otp_count = data['uv_otp_count'];

					if(uv_otp_count > 3){
						$(this).text('Sorry you have tried too many times.');

						setTimeout( function(){

							$('#send-otp').remove();

						}, 2000 );

					}

					if(otp_via_sms || otp_via_mail){

						$(this).text('OTP has been sent');

						setTimeout( function(){

							//$('#send-otp').fadeOut();

						}, 2000 );

					}

					console.log(data);
					$('.user-pass-wrap, .forgetmenot, .submit').fadeIn('slow');
					//$(this).fadeOut();
					$('#user_pass').removeAttr('disabled');
					$("label[for='user_pass'").text("Enter OTP");

					//location.reload();
				}
			});



	})










})
