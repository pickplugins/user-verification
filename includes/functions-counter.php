<?php
if (!defined('ABSPATH')) exit;  // if direct access 

function user_verification_get_datetime()
{
    $gmt_offset = get_option('gmt_offset');
    $wpls_datetime = date('Y-m-d H:i:s', strtotime('+' . $gmt_offset . ' hour'));

    return $wpls_datetime;
}



function user_verification_stats_count($type)
{

    $user_verification_stats_count = get_option("user_verification_stats_count", []);

    $magic_login_sent = 0;
    $magic_login_used = 0;

    $email_otp_sent = 0;
    $email_verification_sent = 0;
    $email_verification_confirmed = 0;
    $spam_login_blocked = 0;
    $spam_registration_blocked = 0;
    $spam_comment_blocked = 0;
    $spam_comment_report = 0;
    $email_validation_request = 0;
    $email_validation_success = 0;
    $email_validation_failed = 0;
}
