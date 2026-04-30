document.addEventListener("DOMContentLoaded", function (event) {

    var loginform = document.querySelector('#loginform');


    var passwordLbl = document.querySelector('.user-pass-wrap label');

    var passwordInput = document.querySelector('.user-pass-wrap input[type=password]');
    var passwordHidePass = document.querySelector('.wp-pwd button');


    var submitBtn = document.querySelector('.submit input[type=submit]');
    var submitBtnText = submitBtn.value;
    var messageWrap = document.getElementById('user_verification-message');



    submitBtn.value = 'Send OTP';
    passwordLbl.innerHTML = 'Enter OTP';

    passwordLbl.style.display = 'none';

    passwordInput.style.display = 'none';
    passwordHidePass.style.opacity = 0;
    submitBtn.setAttribute('sendotp', 'true');


    loginform.addEventListener("submit", (event) => {


        var sendotp = submitBtn.getAttribute("sendotp");




        if (sendotp != null) {
            event.preventDefault();
            var formData = new FormData(loginform);
            var log = formData.get('log');
            var user_verification_otp_nonce = formData.get('user_verification_otp_nonce');


            messageWrap.innerHTML = '<i class="fas fa-spin fa-spinner"></i>';

            if (log != undefined && log.length == 0) {
                messageWrap.innerHTML = 'Username should not empty';

                return '';

            }

            jQuery.ajax({
                type: 'POST',
                context: this,
                url: user_verification_ajax.user_verification_ajaxurl,
                data: {
                    "action": "user_verification_send_otp",
                    'user_login': log,
                    'nonce': user_verification_otp_nonce,
                },
                success: function (response) {
                    var data = JSON.parse(response);
                    otp_via_mail = data['otp_via_mail'];
                    otp_via_sms = data['otp_via_sms'];
                    error = data['error'];
                    success_message = data['success_message'];

                    passwordInput.value = '';

                    if (error) {
                        messageWrap.innerHTML = error;

                    } else {

                        messageWrap.innerHTML = success_message;

                        submitBtn.removeAttribute('sendotp');
                        submitBtn.value = submitBtnText;
                        passwordLbl.style.display = 'block'

                        passwordInput.style.display = 'block'

                    }

                }
            });

        }


    });







})