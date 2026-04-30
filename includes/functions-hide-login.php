<?php
if (!defined('ABSPATH')) exit;  // if direct access




// Change WordPress Login URL 
//add_action('init', "user_verification_hide_login");


function user_verification_hide_login()
{



    $user_verification_settings = get_option('user_verification_settings');
    $hideLogin = isset($user_verification_settings['hideLogin']) ? $user_verification_settings['hideLogin'] : [];

    $enable = isset($hideLogin['enable']) ? $hideLogin['enable'] : 'no';

    if ($enable != 'yes') return;


    $slug = isset($hideLogin['slug']) ? $hideLogin['slug'] : 'xyz-login';
    $redirect = isset($hideLogin['redirect']) ? $hideLogin['redirect'] : '';
    $redirect_url = get_permalink($redirect);

    $UserVerificationStats = new UserVerificationStats();


    $file = basename($_SERVER['SCRIPT_FILENAME']);

    // Block default login/admin
    if (($file === 'wp-login.php' || $file === 'wp-admin')
        && !(defined('DOING_AJAX') && DOING_AJAX)
    ) {

        $UserVerificationStats->add_stats('hide_login');

        wp_safe_redirect($redirect_url);
        exit;
    }

    // Allow only custom slug



    if (
        strpos($_SERVER['REQUEST_URI'], $slug) === false
        && ($file === 'wp-login.php')
    ) {
        $UserVerificationStats->add_stats('hide_login');

        wp_safe_redirect($redirect_url);
        exit;
    }
}
