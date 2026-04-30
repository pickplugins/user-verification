<?php
if (! defined('ABSPATH')) exit;  // if direct access 



// Hook to run after user registration
add_action('nsl_register_new_user', 'uv_nsl_auto_verify_user', 10, 1);

function uv_nsl_auto_verify_user($user_id)
{
    // Mark the user as verified
    update_user_meta($user_id, 'user_activation_status', 1);
}

// Disable the email verification
add_filter('user_verification_email_templates_data', 'uv_nsl_disable_email_verification', 10, 1);

function uv_nsl_disable_email_verification($email_templates_data)
{
    // Disable the email_resend_key template
    if (isset($email_templates_data['email_resend_key'])) {
        $email_templates_data['email_resend_key']['enable'] = 'no';
    }

    return $email_templates_data;
}
