<?php
if (!defined('ABSPATH')) exit;  // if direct access

add_filter('user_verification_form_wrap_process_otpLogin', 'user_verification_form_wrap_process_otpLogin', 99,);
function user_verification_form_wrap_process_otpLogin($request)
{
    $response = [];
    $error = new WP_Error();

    $email = $request->get_param('email');
    $steps = (int) $request->get_param('steps');
    $otp_code =  $request->get_param('otp');
    // $gRecaptchaResponse = $request->get_param('g-recaptcha-response');



    $user_verification_settings = get_option('user_verification_settings');
    $secretkey = isset($user_verification_settings['recaptcha']['secretkey']) ? $user_verification_settings['recaptcha']['secretkey'] : '';

    $messages = isset($user_verification_settings['messages']) ? $user_verification_settings['messages'] : '';

    $captcha_error = isset($messages['captcha_error']) ? $messages['captcha_error'] : '';
    $otp_sent_success = isset($messages['otp_sent_success']) ? $messages['otp_sent_success'] : '';
    $otp_sent_error = isset($messages['otp_sent_error']) ? $messages['otp_sent_error'] : '';



    // if (isset($gRecaptchaResponse)) :
    //     $captcha = isset($gRecaptchaResponse) ? sanitize_text_field($gRecaptchaResponse) : '';

    //     $response = wp_remote_get("https://www.google.com/recaptcha/api/siteverify?secret=" . $secretkey . "&response=" . $captcha);
    //     $response = json_decode($response["body"], true);

    //     if ($response["success"] != true) {
    //         $error->add('recaptcha', $captcha_error);
    //     }
    // endif;



    $user = get_user_by('email', $email);
    if (empty($user)) {
        $user = get_user_by('login', $email);
    }
    if (!$user) {
        // $response['loginUsernotExist'] = 'User not exist';
        $response['errors']['UsernotExist'] = __('User not exist', 'user-verification');
        return $response;
    }

    $email = isset($user->user_email) ? $user->user_email : '';
    $user_id = isset($user->ID) ? $user->ID : '';

    $uv_otp_count = get_transient('uv_otp_count_' . $user_id);


    if ($uv_otp_count >= 4) {
        $error->add('tried_limit_reached', 'Sorry you have tried too many times.');
    }





    $required_email_verified = isset($user_verification_settings['email_otp']['required_email_verified']) ? $user_verification_settings['email_otp']['required_email_verified'] : 'no';


    if ($required_email_verified == 'yes') {

        $is_verified = user_verification_is_verified($user_id);

        if (!$is_verified) {
            $response['errors']['emailNotVerified'] = __('Email is not verified', 'user-verification');
            return $response;
        }
    };


    if ($error->has_errors()) {
        $error_messages = $error->get_error_messages();

        $response['errors'] = $error_messages;
        return $response;
    }

    if ($steps == 1) {


        $user_email = isset($user->user_email) ? $user->user_email : '';


        if (!empty($uv_otp_count)) {
            $uv_otp_count += 1;
        } else {
            $uv_otp_count = 1;
        }



        set_transient('uv_otp_count_' . $user_id, $uv_otp_count, 60);


        $user_data = array();
        $user_data['user_email'] = $user_email;
        $user_data['user_id'] = $user_id;


        $otp_via_mail = user_verification_send_otp_via_mail($user_data);

        $UserVerificationStats = new UserVerificationStats();


        if ($otp_via_mail) {
            $response['success']['otp_sent'] = $otp_sent_success;

            // stats record start
            $UserVerificationStats->add_stats('email_otp_sent');
            // stats record end
        } else {
            $response['errors']['otp_sent_error'] = $otp_sent_error;
            $UserVerificationStats->add_stats('email_otp_sent_error');

            // $response['success']['otp_sent'] = $otp_sent_success;
        }


        $response['otp_sent'] = $otp_via_mail;
        // $response['otp_sent'] = true;
        $response['count'] = $uv_otp_count;
        $response['steps'] = $steps;
    }


    if ($steps == 2) {

        $saved_otp = get_user_meta($user_id, 'uv_otp', true);




        if ($saved_otp != $otp_code) {
            $response['errors']['wrong_otp'] = __('Wrong OTP used.', 'user-verification');
            return $response;
        }


        if (!is_wp_error($user)) {
            wp_set_current_user($user_id, $user->user_login);
            wp_set_auth_cookie($user_id);
            do_action('wp_login', $user->user_login, $user);

            $response['success']['logged'] = __('OTP login success.', 'user-verification');
            $response['steps'] = $steps;


            delete_user_meta($user_id, 'uv_otp');

            return $response;
        } else {
            $response['errors']['wrong_otp'] = __('OTP login failed.', 'user-verification');
            return $response;
        }
    }







    return $response;
}



add_action('wp_print_footer_scripts', function () {

    global $postGridBlocksVars;
?>
    <script>
        <?php

        $user_verification_scripts_vars =  wp_json_encode($postGridBlocksVars);
        echo "var user_verification_scripts_vars=" . $user_verification_scripts_vars;
        ?>
    </script>
<?php
});



function user_verification_send_otp_via_mail($user_data)
{


    $error = new WP_Error();



    $user_email = $user_data['user_email'];
    $user_id = $user_data['user_id'];

    $length = isset($user_verification_settings['email_otp']['length']) ? $user_verification_settings['email_otp']['length'] : 6;
    $character_source = isset($user_verification_settings['email_otp']['character_source']) ? $user_verification_settings['email_otp']['character_source'] : ['uppercase', 'lowercase'];
    $password = user_verification_random_password($length, $character_source);


    if (empty($password)) :
        $error->add('empty_otp', __('ERROR: OTP generation failed.', 'user-verification'));
    endif;


    update_user_meta($user_id, 'uv_otp', $password);



    $user_verification_settings = get_option('user_verification_settings');


    $class_user_verification_emails = new class_user_verification_emails();
    $email_templates_data = $class_user_verification_emails->email_templates_data();

    $logo_id = isset($user_verification_settings['logo_id']) ? $user_verification_settings['logo_id'] : '';
    $mail_wpautop = isset($user_verification_settings['mail_wpautop']) ? $user_verification_settings['mail_wpautop'] : 'yes';

    $email_templates_data =  $email_templates_data['send_mail_otp'];
    // $email_templates_data = isset($user_verification_settings['email_templates_data']['send_mail_otp']) ? $user_verification_settings['email_templates_data']['send_mail_otp'] : $email_templates_data['send_mail_otp'];


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

        '{otp_code}' => $password,

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

    // stats record start
    $UserVerificationStats = new UserVerificationStats();
    $UserVerificationStats->add_stats('email_otp_sent');
    // stats record end


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



    return $password;
}
