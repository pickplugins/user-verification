<?php


if (! defined('ABSPATH')) exit;  // if direct access 




function mepr_validate_signup_uv($errors)
{
    $user_email = isset($_POST['user_email']) ? sanitize_email($_POST['user_email']) : false;
    $user_login = isset($_POST['user_login']) ? sanitize_text_field($_POST['user_login']) : false;

    $is_blocked = user_verification_is_emaildomain_blocked($user_email);


    $email_parts = explode('@', $user_email);
    $email_domain = isset($email_parts[1]) ? $email_parts[1] : '';



    if ($is_blocked) {
        /* translators: %s is the blocked email domain */
        $errors[] = sprintf(__('This <strong>%s</strong> domain is blocked!', 'user-verification'), esc_url_raw($email_domain));
    }



    $is_allowed = user_verification_is_emaildomain_allowed($user_email);



    if (!$is_allowed) {
        /* translators: %s is the not allowed domain */
        $errors[] = sprintf(__('This <strong>%s</strong> domain is not allowed!', 'user-verification'), esc_url_raw($email_domain));
    }

    $username_blocked = user_verification_is_username_blocked($user_login);

    //var_dump($user_login);

    if ($username_blocked) {
        /* translators: %s is username not allowed */
        $errors[] = sprintf(__('This <strong>%s</strong> username is not allowed!', 'user-verification'), esc_html($user_login));
    }









    return $errors;
}

add_filter('mepr-validate-signup', 'mepr_validate_signup_uv');


// function mepr_disable_auto_login($auto_login, $membership_id, $mepr_user)
// {
//     return false;
// }
// add_filter('mepr_auto_login', 'mepr_disable_auto_login', 10, 3);
