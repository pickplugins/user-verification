<?php
if (!defined('ABSPATH')) exit;  // if direct access


/*
OTP on default login form
callback: user_verification_login_form_otp
*/
add_action('login_form', 'user_verification_login_form_otp');
function user_verification_login_form_otp()
{

    $user_verification_settings = get_option('user_verification_settings');
    $enable_default_login = isset($user_verification_settings['email_otp']['enable_default_login']) ? $user_verification_settings['email_otp']['enable_default_login'] : 'no';

    if ($enable_default_login != 'yes') return;
    $nonce = wp_create_nonce("user_verification_otp_nonce");

?>
    <?php
    wp_enqueue_script('scripts-login');
    wp_localize_script('scripts-login', 'user_verification_ajax', array('user_verification_ajaxurl' => admin_url('admin-ajax.php')));
    wp_enqueue_style('font-awesome-5');

    $send_otp_text =  apply_filters('user_verification_send_otp_text', __('Send OTP', 'user-verification'));
    $resend_otp_text =  apply_filters('user_verification_resend_otp_text', __('Resend OTP', 'user-verification'));


    ?>


    <input type="hidden" id="user_verification_otp_nonce" name="user_verification_otp_nonce" value="<?php echo esc_attr($nonce); ?>">

    <p class="" id="user_verification-message"></p>
    <style>
        /* .user-pass-wrap,
        .forgetmenot,
        .submit {
            display: none;
        }

        #send-otp {
            text-align: center;
            padding: 10px;
            background: #2271b1;
            margin: 0 0 15px 0;
            color: #fff;
            border-radius: 3px;
            cursor: pointer;
        }

        #send-otp .icon-loading {
            display: none;
        }

        #send-otp.loading .icon-loading {
            display: inline-block;
        } */

        .login .button.wp-hide-pw {
            display: none;
        }
    </style>


<?php
    //endif;
}


/*
WooCommerce Login OTP
callback: user_verification_woocommerce_login_form_otp_scripts
*/


add_action('woocommerce_login_form', 'user_verification_woocommerce_login_form_otp_scripts', 99);
function user_verification_woocommerce_login_form_otp_scripts()
{


    $user_verification_settings = get_option('user_verification_settings');
    $enable_wc_login = isset($user_verification_settings['email_otp']['enable_wc_login']) ? $user_verification_settings['email_otp']['enable_wc_login'] : 'no';

    if ($enable_wc_login != 'yes') return;


    wp_enqueue_script('scripts-otp');
    wp_localize_script('scripts-otp', 'user_verification_ajax', array('user_verification_ajaxurl' => admin_url('admin-ajax.php')));
    $nonce = wp_create_nonce("user_verification_otp_nonce");
    wp_enqueue_style('font-awesome-5');

?>
    <input type="hidden" id="user_verification_otp_nonce" name="user_verification_otp_nonce" value="<?php echo esc_attr($nonce); ?>">

    <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide" id="user_verification-message"></p>


    <style>
        .woocommerce-form-login label[for=password],
        .woocommerce-form-login input[type=password],
        .woocommerce-form-login .password-input,
        .woocommerce-form-login .woocommerce-form-login__rememberme,
        .woocommerce-form-login .lost_password {
            display: none;
        }

        .woocommerce-form-login .show-password-input {
            display: none !important;
        }
    </style>
    <script>
        //var submitBtn = $('.woocommerce-form-login__submit');

        document.addEventListener("DOMContentLoaded", function(event) {

            jQuery(document).ready(function($) {


                var messageWrap = document.getElementById('user_verification-message');

                var passwordLbl = document.querySelector('.woocommerce-form-login label[for=password]');
                var passwordInput = document.querySelector('.woocommerce-form-login input[type=password]');

                var submitBtn = document.querySelector('.woocommerce-form-login__submit');
                var submitBtnText = submitBtn.innerHTML;
                var passwordInputWrap = document.querySelector('.password-input');

                submitBtn.innerHTML = 'Send OTP';
                passwordLbl.innerHTML = 'Enter OTP';

                submitBtn.setAttribute('sendotp', 'true');


                $(document).on('submit', '.woocommerce-form-login', function(event) {

                    user_login = $('#user_login, #username').val();
                    nonce = $(this).attr("data-nonce")
                    sendotp = submitBtn.getAttribute("sendotp")


                    if (sendotp != null) {
                        event.preventDefault();

                        messageWrap.innerHTML = '<i class="fas fa-spin fa-spinner"></i>';

                        var formDataObj = {}

                        $(this).serializeArray().map(function(x) {
                            formDataObj[x.name] = x.value;
                        });


                        if (formDataObj.username != undefined && formDataObj.username.length == 0) {
                            messageWrap.innerHTML = 'Username should not empty';

                            return '';

                        }

                        $.ajax({
                            type: 'POST',
                            context: this,
                            url: user_verification_ajax.user_verification_ajaxurl,
                            data: {
                                "action": "user_verification_send_otp",
                                'user_login': formDataObj.username,
                                'nonce': formDataObj.user_verification_otp_nonce,
                            },
                            success: function(response) {
                                var data = JSON.parse(response);
                                otp_via_mail = data['otp_via_mail'];
                                otp_via_sms = data['otp_via_sms'];
                                error = data['error'];
                                success_message = data['success_message'];



                                if (error) {
                                    messageWrap.innerHTML = error;

                                } else {

                                    messageWrap.innerHTML = success_message;

                                    submitBtn.removeAttribute('sendotp');
                                    submitBtn.innerHTML = submitBtnText;
                                    passwordLbl.style.display = 'block'
                                    passwordInputWrap.style.display = 'block'

                                    passwordInput.style.display = 'block'

                                }

                            }
                        });

                    }
                })
            })


        })
    </script>
    <?php

}


add_action('wp_ajax_user_verification_send_otp', 'user_verification_send_otp');
add_action('wp_ajax_nopriv_user_verification_send_otp', 'user_verification_send_otp');


function user_verification_send_otp()
{




    $response = array();
    $error = new WP_Error();

    $nonce = isset($_REQUEST['nonce']) ? sanitize_text_field($_REQUEST['nonce']) : '';

    if (!wp_verify_nonce($nonce, "user_verification_otp_nonce")) {
        $error->add('empty_user_login', __('ERROR: Security check failed.', 'user-verification'));
    }


    $user_login = isset($_POST['user_login']) ? sanitize_text_field($_POST['user_login']) : '';

    // Check if username is empty or null
    if (empty($user_login)) :
        $error->add('empty_user_login', __('ERROR: User login should not empty.', 'user-verification'));
    endif;





    // Check if user name or user email is valid or not
    $user = (is_email($user_login)) ? get_user_by('email', $user_login) :  get_user_by('login', $user_login);
    $user_id = isset($user->ID) ? $user->ID : '';

    //error_log($user_id);

    if (empty($user_id)) {
        $error->add('user_not_found', __('ERROR: User not found.', 'user-verification'));
    }


    $user_verification_settings = get_option('user_verification_settings');
    //$default_login_page = isset($user_verification_settings['recaptcha']['default_login_page']) ? $user_verification_settings['recaptcha']['default_login_page'] : '';
    $captcha_error = isset($user_verification_settings['messages']['captcha_error']) ? $user_verification_settings['messages']['captcha_error'] : '';
    $secretkey = isset($user_verification_settings['recaptcha']['secretkey']) ? $user_verification_settings['recaptcha']['secretkey'] : '';


    $length = isset($user_verification_settings['email_otp']['length']) ? $user_verification_settings['email_otp']['length'] : 6;
    $character_source = isset($user_verification_settings['email_otp']['character_source']) ? $user_verification_settings['email_otp']['character_source'] : ['uppercase', 'lowercase'];


    $password = user_verification_random_password($length, $character_source);


    if (empty($password)) :
        $error->add('empty_otp', __('ERROR: OTP generation failed.', 'user-verification'));
    endif;


    if (isset($_POST['g-recaptcha-response'])) :
        $captcha = isset($_POST['g-recaptcha-response']) ? sanitize_text_field($_POST['g-recaptcha-response']) : '';

        $response = wp_remote_get("https://www.google.com/recaptcha/api/siteverify?secret=" . $secretkey . "&response=" . $captcha);
        $response = json_decode($response["body"], true);

        if ($response["success"] != true) {
            $error->add('recaptcha', $captcha_error);
        }
    endif;


    $uv_otp_count = get_transient('uv_otp_count_' . $user_id);


    if ($uv_otp_count >= 4) {
        $error->add('tried_limit_reached', 'Sorry you have tried too many times.');
    }




    if (!$error->has_errors()) {


        $user_email = isset($user->user_email) ? $user->user_email : '';
        $phone_number = get_user_meta($user_id, 'phone_number', true);



        update_user_meta($user_id, 'uv_otp', $password);


        if (!empty($uv_otp_count)) {
            $uv_otp_count += 1;
        } else {
            $uv_otp_count = 1;
        }

        set_transient('uv_otp_count_' . $user_id, $uv_otp_count, 60);


        $user_data = array();
        $user_data['user_email'] = $user_email;
        $user_data['phone_number'] = $phone_number;
        $user_data['user_id'] = $user_id;
        $user_data['otp'] = $password;


        $otp_via_mail = user_verification_send_otp_via_mail($user_data);


        if ($otp_via_mail) {
            $response['success_message'] = '<div class="message otp-message error">OTP has been sent successfully.</div>';
        } else {
            $response['success_message'] = '<div class="message otp-message error">OTP generated, but unable to send mail.</div>';
        }


        $response['otp_via_mail'] = $otp_via_mail;
        $response['uv_otp_count'] = $uv_otp_count;
    } else {

        $error_messages = $error->get_error_messages();

        ob_start();
        if (!empty($error_messages))
            foreach ($error_messages as $message) {
    ?>
            <div class="message otp-message error"><?php echo wp_kses_post($message); ?></div>
<?php
            }

        $response['error'] = ob_get_clean();
    }

    echo json_encode($response);
    die();
}




add_filter('check_password', 'user_verification_check_password_otp_default_login', 90, 4);
function user_verification_check_password_otp_default_login($check, $password, $hash, $user_id)
{

    $user_verification_settings = get_option('user_verification_settings');
    $enable_default_login = isset($user_verification_settings['email_otp']['enable_default_login']) ? $user_verification_settings['email_otp']['enable_default_login'] : 'no';
    $enable_wc_login = isset($user_verification_settings['email_otp']['enable_wc_login']) ? $user_verification_settings['email_otp']['enable_wc_login'] : 'no';


    if ($enable_default_login != 'yes') return $check;
    //if ($enable_wc_login != 'yes') return $check;



    return true;
}









/*
Authenticate user via OTP
*/

add_filter('wp_authenticate_user', 'user_verification_auth_otp_default_login', 99, 2);
function user_verification_auth_otp_default_login($user, $password)
{
    require_once(ABSPATH . 'wp-includes/class-phpass.php');
    $user_id = isset($user->ID) ? $user->ID : '';
    $saved_otp = get_user_meta($user_id, 'uv_otp', true);
    $error = new WP_Error();

    $wp_hasher = new PasswordHash(8, TRUE);

    $isvalidPass = false;
    if ($wp_hasher->CheckPassword($password, $user->user_pass)) {
        $isvalidPass = true;
    } else {
        $isvalidPass = false;
    }


    $user_verification_settings = get_option('user_verification_settings');
    $enable_default_login = isset($user_verification_settings['email_otp']['enable_default_login']) ? $user_verification_settings['email_otp']['enable_default_login'] : 'no';
    $enable_wc_login = isset($user_verification_settings['email_otp']['enable_wc_login']) ? $user_verification_settings['email_otp']['enable_wc_login'] : 'no';
    $allow_password = isset($user_verification_settings['email_otp']['allow_password']) ? $user_verification_settings['email_otp']['allow_password'] : 'yes';


    if ($allow_password == 'yes') {

        if ($isvalidPass) {
            return $user;
        } else {

            if ($enable_default_login != 'yes') return $user;

            if (empty($password)) {
                $error->add('empty_password', __('OTP should not empty. 1', 'user-verification'));
            }

            if (empty($saved_otp)) {
                $error->add('otp_not_found', __('OTP not found.', 'user-verification'));
            }

            if ($saved_otp != $password) {
                $error->add('otp_not_match', __('OTP is not correct.', 'user-verification'));
            }

            if (!$error->has_errors()) {
                delete_user_meta($user_id, 'uv_otp');

                return  $user;
            } else {
                return  $error;
            }
        }
    } else {

        if ($enable_default_login != 'yes') return $user;

        if (empty($password)) {
            $error->add('otp_empty', __('OTP should not empty. 1', 'user-verification'));
        }

        if (empty($saved_otp)) {
            $error->add('otp_not_found', __('OTP not found.', 'user-verification'));
        }

        if ($saved_otp != $password) {
            $error->add('otp_not_match', __('OTP is not correct.', 'user-verification'));
        }

        if (!$error->has_errors()) {
            delete_user_meta($user_id, 'uv_otp');

            return  $user;
        } else {
            return  $error;
        }
    }
}








/*
Clean OTP on user logged-out 
callback: user_verification_clear_otp_on_logout
*/
add_action('wp_logout', 'user_verification_clear_otp_on_logout');

function user_verification_clear_otp_on_logout($user_id)
{

    $user_verification_settings = get_option('user_verification_settings');
    $enable_default_login = isset($user_verification_settings['email_otp']['enable_default_login']) ? $user_verification_settings['email_otp']['enable_default_login'] : 'no';

    if ($enable_default_login != 'yes') return;

    delete_user_meta($user_id, 'uv_otp');

    //delete_transient( 'wpdocs_transient_name' );
}


/*
Send OTP mail
function: user_verification_send_otp_via_mail
*/


function user_verification_send_otp_via_mail($user_data)
{


    $user_email = $user_data['user_email'];
    $phone_number = $user_data['phone_number'];
    $user_id = $user_data['user_id'];
    $otp = $user_data['otp'];



    $user_verification_settings = get_option('user_verification_settings');


    $class_user_verification_emails = new class_user_verification_emails();
    $email_templates_data = $class_user_verification_emails->email_templates_data();

    $logo_id = isset($user_verification_settings['logo_id']) ? $user_verification_settings['logo_id'] : '';
    $mail_wpautop = isset($user_verification_settings['mail_wpautop']) ? $user_verification_settings['mail_wpautop'] : 'yes';

    $email_templates_data =  $email_templates_data['send_mail_otp'];
    // $email_templates_data = isset($user_verification_settings['email_templates_data']['send_mail_otp']) ? $user_verification_settings['email_templates_data']['send_mail_otp'] : $email_templates_data['send_mail_otp'];


    //error_log(serialize($email_templates_data));

    $email_bcc = isset($email_templates_data['email_bcc']) ? $email_templates_data['email_bcc'] : '';
    $email_from = isset($email_templates_data['email_from']) ? $email_templates_data['email_from'] : '';
    $email_from_name = isset($email_templates_data['email_from_name']) ? $email_templates_data['email_from_name'] : '';
    $reply_to = isset($email_templates_data['reply_to']) ? $email_templates_data['reply_to'] : '';
    $reply_to_name = isset($email_templates_data['reply_to_name']) ? $email_templates_data['reply_to_name'] : '';
    $email_subject = isset($email_templates_data['subject']) ? $email_templates_data['subject'] : '';
    $email_body = isset($email_templates_data['html']) ? $email_templates_data['html'] : '';

    $email_body = do_shortcode($email_body);

    if ($mail_wpautop == 'yes') {
        $email_body = wpautop($email_body);
    }


    $user_data     = get_userdata($user_id);




    $site_name = get_bloginfo('name');
    $site_description = get_bloginfo('description');
    $site_url = get_bloginfo('url');
    $site_logo_url = wp_get_attachment_url($logo_id);

    $vars = array(
        '{site_name}' => esc_html($site_name),
        '{site_description}' => esc_html($site_description),
        '{site_url}' => esc_url_raw($site_url),
        '{site_logo_url}' => esc_url_raw($site_logo_url),

        '{first_name}' => esc_html($user_data->first_name),
        '{last_name}' => esc_html($user_data->last_name),
        '{user_display_name}' => esc_html($user_data->display_name),
        '{user_email}' => esc_html($user_data->user_email),
        '{user_name}' => esc_html($user_data->user_nicename),
        '{user_avatar}' => get_avatar($user_data->user_email, 60),

        '{otp_code}' => $otp,

    );



    $vars = apply_filters('user_verification_mail_vars', $vars, $user_data);



    $email_data['email_to'] =  $user_data->user_email;
    $email_data['email_bcc'] =  $email_bcc;
    $email_data['email_from'] = $email_from;
    $email_data['email_from_name'] = $email_from_name;
    $email_data['reply_to'] = $reply_to;
    $email_data['reply_to_name'] = $reply_to_name;

    $email_data['subject'] = strtr($email_subject, $vars);
    $email_data['html'] = strtr($email_body, $vars);
    $email_data['attachments'] = array();




    return $class_user_verification_emails->send_email($email_data);
}




function user_verification_random_password($length, $character_source)
{


    $characters = '';

    if (in_array('number', $character_source)) {
        $characters .= '0123456789';
    }
    if (in_array('uppercase', $character_source)) {
        $characters .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (in_array('lowercase', $character_source)) {
        $characters .= 'abcdefghijklmnopqrstuvwxyz';
    }
    if (in_array('special', $character_source)) {
        $characters .= '!@#$%^&*()';
    }

    if (in_array('extraspecial', $character_source)) {
        $characters .= '-_ []{}<>~`+=,.;:/?|';
    }


    $characters = !empty($characters) ? $characters : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';



    $length = ($length < 4) ? 4 : $length;
    $password = '';
    for ($i = 0; $i < $length; $i++) {
        $password .= substr($characters, wp_rand(0, strlen($characters) - 1), 1);
    }

    // error_log($password);


    return $password;
}
