<?php
if (!defined('ABSPATH')) exit;  // if direct access




//add_filter("wpum_after_registration", "uv_wpum_after_registration",99,3);

function uv_wpum_after_registration($user_id, $values, $form)
{


    //error_log($user_id);


    $userdata = get_user_by($user_id, 'ID');

    do_action('user_register', $user_id,  $userdata);
}


























add_action('wpum_auto_login_user_after_registration', 'uv_wpum_auto_login_user_after_registration', 100, 1);
function uv_wpum_auto_login_user_after_registration($user_id)
{
    $user_verification_settings = get_option('user_verification_settings');
    $disable_auto_login = isset($user_verification_settings['wp_user_manager']['disable_auto_login']) ? $user_verification_settings['wp_user_manager']['disable_auto_login'] : 'yes';


    if ($disable_auto_login == 'yes') {

        wp_logout();
    }
}




add_action('submit_wpum_form_validate_fields', 'uv_submit_wpum_form_validate_fields', 10, 5);
function uv_submit_wpum_form_validate_fields($bool, $fields, $values, $form_name, $class)
{

    $user_email = isset($fields['register']['user_email']['value']) ? $fields['register']['user_email']['value'] : '';
    $field = isset($fields['register']['user_email']) ? $fields['register']['user_email'] : [];



    // your code here
    $user_verification_settings = get_option('user_verification_settings');

    $enable_username_block = isset($user_verification_settings['spam_protection']['enable_username_block']) ? $user_verification_settings['spam_protection']['enable_username_block'] : 'yes';
    $enable_domain_block = isset($user_verification_settings['spam_protection']['enable_domain_block']) ? $user_verification_settings['spam_protection']['enable_domain_block'] : 'yes';



    if ($enable_username_block == 'yes') {

        $is_blocked = user_verification_is_username_blocked($user_email);
        if ($is_blocked) {
            //UM()->form()->add_error('user_login', __('Username is blocked','user-verification') );
            return new WP_Error('validation-error', sprintf(__('<strong>%s</strong> Username is blocked', 'wp-user-manager'), $field['value']));
        }
    }


    if ($enable_domain_block == 'yes') {

        $email_parts = explode('@', $user_email);
        $email_domain = isset($email_parts[1]) ? $email_parts[1] : '';

        $is_blocked = user_verification_is_emaildomain_blocked($user_email);
        if ($is_blocked) {
            //UM()->form()->add_error('user_email', __('This email domain is not allowed!','user-verification') );
            return new WP_Error('validation-error', sprintf(__(' This email domain <strong>%s</strong> is not allowed!', 'wp-user-manager'), $email_domain));
        }
    }
}
