<?php
if (!defined('ABSPATH')) exit;  // if direct access




// Limit Login
add_action('wp_login_failed', 'user_verification_login_failed');

function user_verification_login_failed($username)
{

    $user_verification_settings = get_option('user_verification_settings');
    $loginAttempt = isset($user_verification_settings['loginAttempt']) ? $user_verification_settings['loginAttempt'] : [];
    $email_verification_enable = isset($user_verification_settings['email_verification']['enable']) ? $user_verification_settings['email_verification']['enable'] : 'yes';


    $enable = isset($loginAttempt['enable']) ? $loginAttempt['enable'] : 'no';
    $max_attempts = isset($loginAttempt['max_attempts']) ? (int)$loginAttempt['max_attempts'] : 3;
    $locked_minutes = isset($loginAttempt['locked_minutes']) ? (int)$loginAttempt['locked_minutes'] : 5;
    $locked_message = isset($loginAttempt['locked_message']) ? $loginAttempt['locked_message'] : "Max login failed, you are blocked for %s minute(s).";
    $remaining_message = isset($loginAttempt['remaining_message']) ? $loginAttempt['remaining_message'] : "Login failed. You have %s tries remaining.";
    $redirect_max_attempt = isset($loginAttempt['redirect_max_attempt']) ? $loginAttempt['redirect_max_attempt'] : "";

    if ($enable != 'yes') return;



    if ($email_verification_enable == 'yes') {
        $user = get_user_by('email', $username);
        if (empty($user)) {
            $user = get_user_by('login', $username);
        }
        if (!$user) {
            wp_die("User Not found.");
        }

        $user_id = isset($user->ID) ? $user->ID : '';
        $is_verified = user_verification_is_verified($user_id);
        $verify_email = isset($user_verification_settings['messages']['verify_email']) ? $user_verification_settings['messages']['verify_email'] : __('Verify your email first!', 'user-verification');
        $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';


        $verification_page_url = get_permalink($verification_page_id);
        $verification_page_url = !empty($verification_page_url) ? $verification_page_url : get_bloginfo('url');


        $resend_verification_url = add_query_arg(
            array(
                'user_id' => $user->ID,
                'user_verification_action' => 'resend_verification',
            ),
            $verification_page_url
        );

        $resend_verification_url = wp_nonce_url($resend_verification_url,  'resend_verification');
        $message = sprintf(
            '<strong>%s</strong> %s <a href="%s">%s</a>',
            __('Error:', 'user-verification'),
            wp_specialchars_decode($verify_email, ENT_QUOTES),
            $resend_verification_url,
            __('Resend verification email', 'user-verification')
        );

        if (!$is_verified) {
            if (!empty($redirect_max_attempt)) {
                $redirect_url = get_permalink($redirect_max_attempt);
                wp_safe_redirect($redirect_url);
            } else {
                wp_die(esc_html($message));
            }
        }
    };


    $UserVerificationStats = new UserVerificationStats();





    $key = 'login_attempts_' . $username;
    $attempts = (int)get_transient($key);
    $max_attempts = 3;
    $remaining = $max_attempts - ($attempts + 1);




    if ($attempts >= $max_attempts) {

        $UserVerificationStats->add_stats('login_attempt_max');

        if (!empty($redirect_max_attempt) && $redirect_max_attempt != 'none') {
            $redirect_url = get_permalink($redirect_max_attempt);

            wp_safe_redirect($redirect_url);
            exit;
        }

        wp_die(esc_html(sprintf($locked_message, $locked_minutes)));
    }

    set_transient($key, $attempts + 1, $locked_minutes * 60);
    $UserVerificationStats->add_stats('login_attempt_failed');

    wp_die(esc_html(sprintf($remaining_message, $remaining)));
}

// Reset if login success
add_action('wp_login', function ($user_login) {
    delete_transient('login_attempts_' . $user_login);
}, 10, 1);
