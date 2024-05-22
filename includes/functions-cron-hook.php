<?php
if (!defined('ABSPATH')) exit;  // if direct access 

add_shortcode('user_verification_clean_user_meta', 'user_verification_clean_user_meta');

add_action('user_verification_clean_user_meta', 'user_verification_clean_user_meta');

function user_verification_clean_user_meta()
{


    $meta_query = array();

    $meta_query[] = array(
        'relation' => 'AND',
        array(
            'key' => 'user_activation_status',
            'value' => '1',
            'compare' => '=',
        ),
        array(
            'key' => 'user_activation_key',
            'compare' => 'EXISTS',
        )
    );



    $users = get_users(
        array(
            //'role'    => 'administrator',
            'orderby' => 'ID',
            'order'   => 'ASC',
            'number'  => 20,
            'paged'   => 1,
            'meta_query' => $meta_query,

        )
    );



    foreach ($users as $user) {
        $user_id = $user->ID;
        $user_email = $user->user_email;

        delete_user_meta($user_id,  'user_activation_key',  $meta_value = '');
    }
}




add_action('user_verification_delete_unverified_user', 'user_verification_delete_unverified_user');

function user_verification_delete_unverified_user()
{

    error_log('###user_verification_delete_unverified_user: ' . date("Y-m-d H:i:s"));

    $user_verification_settings = get_option('user_verification_settings');
    $delete_user_delay = isset($user_verification_settings['unverified']['delay']) ? $user_verification_settings['unverified']['delay'] : '720';

    $delete_user_delay_seconds = $delete_user_delay * 60;

    $meta_query = array();

    $meta_query[] = array(
        array(
            'key' => 'user_activation_status',
            'value' => '0',
            'compare' => '=',
        ),
    );



    $users = get_users(
        array(
            //'role'    => 'administrator',
            'orderby' => 'ID',
            'order'   => 'ASC',
            'number'  => 20,
            'paged'   => 1,
            'meta_query' => $meta_query,

        )
    );


    //error_log(serialize($users));

    if (!empty($users)) {
        foreach ($users as $user) {
            $user_id = $user->ID;
            $user_email = $user->user_email;
            $user_roles = $user->roles;

            $user_registered = $user->user_registered;



            $gmt_offset = get_option('gmt_offset');
            $user_registered_gmt = date("Y-m-d H:i:s", strtotime('+' . $gmt_offset . ' hour', strtotime($user_registered)));
            $datetime_now = date('Y-m-d H:i:s', strtotime('+' . $gmt_offset . ' hour'));
            $seconds  = strtotime($datetime_now) - strtotime($user_registered_gmt);



            if ($seconds > $delete_user_delay_seconds) {

                if (!in_array('administrator', $user_roles)) {
                    require_once(ABSPATH . 'wp-admin/includes/user.php');
                    wp_delete_user($user_id, 1);
                }
            }
        }
    }
}




add_action('user_verification_existing_user_verified', 'user_verification_existing_user_verified');

function user_verification_existing_user_verified()
{


    $meta_query = array();

    $meta_query[] = array(
        array(
            'key' => 'user_activation_status',
            'compare' => 'NOT EXISTS',
        ),
    );



    $users = get_users(
        array(
            //'role'    => 'administrator',
            'orderby' => 'ID',
            'order'   => 'ASC',
            'number'  => 100,
            'paged'   => 1,
            'meta_query' => $meta_query,

        )
    );



    foreach ($users as $user) {
        $user_id = $user->ID;
        $user_email = $user->user_email;
        $user_roles = $user->roles;


        if (!in_array('administrator', $user_roles)) {
            update_user_meta($user_id, 'user_activation_status', 1);
        }
    }
}











//add_action('user_verification_activation', 'user_verification_upgrade_settings');

function user_verification_upgrade_settings()
{

    $user_verification_settings = get_option('user_verification_settings');
    $settings_upgrade_1_0_43 = isset($user_verification_settings['settings_upgrade_1_0_43']) ? $user_verification_settings['settings_upgrade_1_0_43'] : '';

    if ($settings_upgrade_1_0_43 == 'done') return;

    $user_verification_settings = array();

    $user_verification_settings['email_verification']['enable'] = 'yes';

    $user_verification_verification_page =  get_option('user_verification_verification_page');
    $user_verification_settings['email_verification']['verification_page_id'] = $user_verification_verification_page;

    $user_verification_redirect_verified =  get_option('user_verification_redirect_verified');
    $user_verification_settings['email_verification']['redirect_after_verification'] = $user_verification_redirect_verified;

    $user_verification_login_automatically =  get_option('user_verification_login_automatically');
    $user_verification_settings['email_verification']['login_after_verification'] = $user_verification_login_automatically;

    $uv_exclude_user_roles =  get_option('uv_exclude_user_roles');
    $user_verification_settings['email_verification']['exclude_user_roles'] = $uv_exclude_user_roles;

    $uv_wc_disable_auto_login =  get_option('uv_wc_disable_auto_login');
    $user_verification_settings['woocommerce']['disable_auto_login'] = $uv_wc_disable_auto_login;

    $uv_wc_message_after_registration =  get_option('uv_wc_message_after_registration');
    $user_verification_settings['woocommerce']['message_after_registration'] = $uv_wc_message_after_registration;

    $uv_wc_redirect_after_payment =  get_option('uv_wc_redirect_after_payment');
    $user_verification_settings['woocommerce']['redirect_after_payment'] = $uv_wc_redirect_after_payment;

    $uv_um_disable_auto_login =  get_option('uv_um_disable_auto_login');
    $user_verification_settings['ultimate_member']['disable_auto_login'] = $uv_um_disable_auto_login;

    $uv_um_message_before_header =  get_option('uv_um_message_before_header');
    $user_verification_settings['ultimate_member']['message_before_header'] = $uv_um_message_before_header;

    $uv_pmpro_disable_auto_login =  get_option('uv_pmpro_disable_auto_login');
    $user_verification_settings['paid_memberships_pro']['disable_auto_login'] = $uv_pmpro_disable_auto_login;

    $uv_pmpro_message_checkout_page =  get_option('uv_pmpro_message_checkout_page');
    $user_verification_settings['paid_memberships_pro']['message_checkout_page'] = $uv_pmpro_message_checkout_page;

    $uv_pmpro_redirect_timout =  get_option('uv_pmpro_redirect_timout');
    $user_verification_settings['paid_memberships_pro']['redirect_timout'] = $uv_pmpro_redirect_timout;

    $uv_pmpro_redirect_after_checkout_page_id =  get_option('uv_pmpro_redirect_after_checkout_page_id');
    $user_verification_settings['paid_memberships_pro']['redirect_after_checkout'] = $uv_pmpro_redirect_after_checkout_page_id;

    $user_verification_enable_block_domain =  get_option('user_verification_enable_block_domain');
    $user_verification_settings['spam_protection']['enable_domain_block'] = $user_verification_enable_block_domain;

    $uv_settings_blocked_domain =  get_option('uv_settings_blocked_domain');
    $user_verification_settings['spam_protection']['blocked_domain'] = $uv_settings_blocked_domain;

    $uv_settings_allowed_domain =  get_option('uv_settings_allowed_domain');
    $user_verification_settings['spam_protection']['allowed_domain'] = $uv_settings_allowed_domain;

    $user_verification_enable_block_username =  get_option('user_verification_enable_block_username');
    $user_verification_settings['spam_protection']['enable_username_block'] = $user_verification_enable_block_username;

    $uv_settings_blocked_username =  get_option('uv_settings_blocked_username');
    $user_verification_settings['spam_protection']['blocked_username'] = $uv_settings_blocked_username;

    $uv_message_invalid_key =  get_option('uv_message_invalid_key');
    $user_verification_settings['messages']['invalid_key'] = $uv_message_invalid_key;

    $uv_message_activation_sent =  get_option('uv_message_activation_sent');
    $user_verification_settings['messages']['activation_sent'] = $uv_message_activation_sent;

    $uv_message_verify_email =  get_option('uv_message_verify_email');
    $user_verification_settings['messages']['verify_email'] = $uv_message_verify_email;

    $user_verification_registered_message =  get_option('user_verification_registered_message');
    $user_verification_settings['messages']['registration_success'] = $user_verification_registered_message;

    $uv_message_verification_success =  get_option('uv_message_verification_success');
    $user_verification_settings['messages']['verification_success'] = $uv_message_verification_success;



    $uv_message_captcha_error =  get_option('uv_message_captcha_error');
    $user_verification_settings['messages']['captcha_error'] = $uv_message_captcha_error;

    $uv_recaptcha_sitekey =  get_option('uv_recaptcha_sitekey');
    $user_verification_settings['recaptcha']['sitekey'] = $uv_recaptcha_sitekey;

    $uv_recaptcha_login_page =  get_option('uv_recaptcha_login_page');
    $user_verification_settings['recaptcha']['default_login_page'] = $uv_recaptcha_login_page;

    $uv_recaptcha_register_page =  get_option('uv_recaptcha_register_page');
    $user_verification_settings['recaptcha']['default_registration_page'] = $uv_recaptcha_register_page;

    $uv_recaptcha_lostpassword_page =  get_option('uv_recaptcha_lostpassword_page');
    $user_verification_settings['recaptcha']['default_lostpassword_page'] = $uv_recaptcha_lostpassword_page;

    $uv_recaptcha_comment_form =  get_option('uv_recaptcha_comment_form');
    $user_verification_settings['recaptcha']['comment_form'] = $uv_recaptcha_comment_form;

    $uv_recaptcha_wc_login_form =  get_option('uv_recaptcha_wc_login_form');
    $user_verification_settings['recaptcha']['wc_login_form'] = $uv_recaptcha_wc_login_form;

    $uv_recaptcha_wc_register_form =  get_option('uv_recaptcha_wc_register_form');
    $user_verification_settings['recaptcha']['wc_register_form'] = $uv_recaptcha_wc_register_form;

    $uv_recaptcha_wc_lostpassword_form =  get_option('uv_recaptcha_wc_lostpassword_form');
    $user_verification_settings['recaptcha']['wc_lostpassword_form'] = $uv_recaptcha_wc_lostpassword_form;



    $uv_email_templates_data =  get_option('uv_email_templates_data');
    $user_verification_settings['email_templates_data'] = $uv_email_templates_data;

    $user_verification_settings['settings_upgrade_1_0_43'] = 'done';

    update_option('user_verification_settings', $user_verification_settings);
}
