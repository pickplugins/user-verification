<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

add_action('user_verification_settings_content_email_verification', 'user_verification_settings_content_email_verification');

function user_verification_settings_content_email_verification(){
    $settings_tabs_field = new settings_tabs_field();

    $user_verification_settings = get_option('user_verification_settings');

    //delete_option('user_verification_settings');


    $email_verification_enable = isset($user_verification_settings['email_verification']['enable']) ? $user_verification_settings['email_verification']['enable'] : 'yes';
    $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';
    $redirect_after_verification = isset($user_verification_settings['email_verification']['redirect_after_verification']) ? $user_verification_settings['email_verification']['redirect_after_verification'] : '';
    $login_after_verification = isset($user_verification_settings['email_verification']['login_after_verification']) ? $user_verification_settings['email_verification']['login_after_verification'] : '';
    $exclude_user_roles = isset($user_verification_settings['email_verification']['exclude_user_roles']) ? $user_verification_settings['email_verification']['exclude_user_roles'] : array();



    //echo '<pre>'.var_export($user_verification_settings, true).'</pre>';

    ?>
    <div class="section">
        <div class="section-title"><?php echo __('Email verification', 'post-grid'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for email verification.', 'post-grid'); ?></p>

        <?php


        $args = array(
            'id'		=> 'enable',
            'parent'		=> 'user_verification_settings[email_verification]',
            'title'		=> __('Enable email verification','post-grid'),
            'details'	=> __('Select to enable or disable email verification.','post-grid'),
            'type'		=> 'select',
            'value'		=> $email_verification_enable,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'verification_page_id',
            'parent'		=> 'user_verification_settings[email_verification]',
            'title'		=> __('Choose verification page','post-grid'),
            'details'	=> __('Verification checker page where you place the shortcode <code>[user_verification_check]</code>, please create a page and use this shortcode uder post content.','post-grid'),
            'type'		=> 'select',
            'value'		=> $verification_page_id,
            'default'		=> '',
            'args'		=> user_verification_get_pages_list(),

        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'redirect_after_verification',
            'parent'		=> 'user_verification_settings[email_verification]',
            'title'		=> __('Redirect after verification','post-grid'),
            'details'	=> __('Redirect to any page after successfully verified account.','post-grid'),
            'type'		=> 'select',
            'value'		=> $redirect_after_verification,
            'default'		=> '',
            'args'		=> user_verification_get_pages_list(),

        );

        $settings_tabs_field->generate_field($args);




        $args = array(
            'id'		=> 'login_after_verification',
            'parent'		=> 'user_verification_settings[email_verification]',
            'title'		=> __('Automatically login after verification','post-grid'),
            'details'	=> __('Yes means, users click on the Account activation link from email and they login automatically to your website, No means they don\'t','post-grid'),
            'type'		=> 'select',
            'value'		=> $login_after_verification,
            'default'		=> 'yes',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),

        );

        $settings_tabs_field->generate_field($args);



        $args = array(
            'id'		=> 'exclude_user_roles',
            'parent'		=> 'user_verification_settings[email_verification]',
            'title'		=> __('Exclude user role','post-grid'),
            'details'	=> __('You can exclude verification for these user roles to login on your site.','post-grid'),
            'type'		=> 'select',
            'multiple'		=> true,
            'value'		=> $exclude_user_roles,
            'default'		=> array(),
            'args'		=> uv_all_user_roles(),

        );

        $settings_tabs_field->generate_field($args);




        ?>

    </div>


    <div class="section">
        <div class="section-title"><?php echo __('Error messages', 'post-grid'); ?></div>
        <p class="description section-description"><?php echo __('Customize error messages.', 'post-grid'); ?></p>

        <?php


        $invalid_key = isset($user_verification_settings['messages']['invalid_key']) ? $user_verification_settings['messages']['invalid_key'] : '';
        $activation_sent = isset($user_verification_settings['messages']['activation_sent']) ? $user_verification_settings['messages']['activation_sent'] : '';
        $verify_email = isset($user_verification_settings['messages']['verify_email']) ? $user_verification_settings['messages']['verify_email'] : '';
        $registration_success = isset($user_verification_settings['messages']['registration_success']) ? $user_verification_settings['messages']['registration_success'] : '';
        $verification_success = isset($user_verification_settings['messages']['verification_success']) ? $user_verification_settings['messages']['verification_success'] : '';
        $key_expired = isset($user_verification_settings['messages']['key_expired']) ? $user_verification_settings['messages']['key_expired'] : '';
        $captcha_error = isset($user_verification_settings['messages']['captcha_error']) ? $user_verification_settings['messages']['captcha_error'] : '';





        $args = array(
            'id'		=> 'invalid_key',
            'parent'		=> 'user_verification_settings[messages]',
            'title'		=> __('Invalid activation key','post-grid'),
            'details'	=> __('Show custom message when user activation key is invalid or wrong','post-grid'),
            'type'		=> 'textarea',
            'value'		=> $invalid_key,
            'default'		=> '',

        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'activation_sent',
            'parent'		=> 'user_verification_settings[messages]',
            'title'		=> __('Activation key haa sent','post-grid'),
            'details'	=> __('Show custom message when activation key is sent to user email','post-grid'),
            'type'		=> 'textarea',
            'value'		=> $activation_sent,
            'default'		=> '',

        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'verify_email',
            'parent'		=> 'user_verification_settings[messages]',
            'title'		=> __('Verify email address','post-grid'),
            'details'	=> __('Show custom message when user try to login without verifying email with proper activation key','post-grid'),
            'type'		=> 'textarea',
            'value'		=> $verify_email,
            'default'		=> '',

        );

        $settings_tabs_field->generate_field($args);



        $args = array(
            'id'		=> 'registration_success',
            'parent'		=> 'user_verification_settings[messages]',
            'title'		=> __('Registration success message','post-grid'),
            'details'	=> __('User will get this message as soon as registered on your website','post-grid'),
            'type'		=> 'textarea',
            'value'		=> $registration_success,
            'default'		=> '',

        );

        $settings_tabs_field->generate_field($args);



        $args = array(
            'id'		=> 'verification_success',
            'parent'		=> 'user_verification_settings[messages]',
            'title'		=> __('Verification successful','post-grid'),
            'details'	=> __('Show custom message when user successfully verified','post-grid'),
            'type'		=> 'textarea',
            'value'		=> $verification_success,
            'default'		=> '',

        );

        $settings_tabs_field->generate_field($args);

        $args = array(
            'id'		=> 'key_expired',
            'parent'		=> 'user_verification_settings[messages]',
            'title'		=> __('Activation key expired','post-grid'),
            'details'	=> __('Show custom message when user activation key is expired','post-grid'),
            'type'		=> 'textarea',
            'value'		=> $key_expired,
            'default'		=> '',

        );

        $settings_tabs_field->generate_field($args);



        $args = array(
            'id'		=> 'captcha_error',
            'parent'		=> 'user_verification_settings[messages]',
            'title'		=> __('Captcha error message','post-grid'),
            'details'	=> __('Show custom message when captcha error occurred.','post-grid'),
            'type'		=> 'textarea',
            'value'		=> $captcha_error,
            'default'		=> '',

        );

        $settings_tabs_field->generate_field($args);

        ?>

    </div>



    <?php
}





add_action('user_verification_settings_content_woocommerce', 'user_verification_settings_content_woocommerce');

function user_verification_settings_content_woocommerce(){
    $settings_tabs_field = new settings_tabs_field();

    $user_verification_settings = get_option('user_verification_settings');

    //delete_option('user_verification_settings');


    $disable_auto_login = isset($user_verification_settings['woocommerce']['disable_auto_login']) ? $user_verification_settings['woocommerce']['disable_auto_login'] : 'yes';
    $message_after_registration = isset($user_verification_settings['woocommerce']['message_after_registration']) ? $user_verification_settings['woocommerce']['message_after_registration'] : 'yes';
    $redirect_after_payment = isset($user_verification_settings['woocommerce']['redirect_after_payment']) ? $user_verification_settings['woocommerce']['redirect_after_payment'] : '';



    //echo '<pre>'.var_export($user_verification_settings, true).'</pre>';

    ?>
    <div class="section">
        <div class="section-title"><?php echo __('WooCommerce', 'post-grid'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for WooCommerce.', 'post-grid'); ?></p>

        <?php


        $args = array(
            'id'		=> 'disable_auto_login',
            'parent'		=> 'user_verification_settings[woocommerce]',
            'title'		=> __('Disable auto login','post-grid'),
            'details'	=> __('You can disable auto login after registration via WooCommerce register form. this also disable login on checkout page.','post-grid'),
            'type'		=> 'select',
            'value'		=> $disable_auto_login,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),
        );

        $settings_tabs_field->generate_field($args);

        $args = array(
            'id'		=> 'message_after_registration',
            'parent'		=> 'user_verification_settings[woocommerce]',
            'title'		=> __('Display Message after successfully registration','post-grid'),
            'details'	=> __('You can display custom message on after successfully registration via WooCommerce register form.','post-grid'),
            'type'		=> 'text',
            'value'		=> $message_after_registration,
            'default'		=> '',
        );

        $settings_tabs_field->generate_field($args);





        $args = array(
            'id'		=> 'redirect_after_payment',
            'parent'		=> 'user_verification_settings[email_verification]',
            'title'		=> __('Redirect after payment','post-grid'),
            'details'	=> __('You can set custom page to redirect after successfully payment, and this page should check verification status and take action to stay logged-in or logged-out the user automatically. please use following shortcode <code>[user_verification_message message="Please check email to verify account first"]</code> to check verification status, it will automatically logged-out the unverified user and display the custom message.','post-grid'),
            'type'		=> 'select',
            'value'		=> $redirect_after_payment,
            'default'		=> '',
            'args'		=> user_verification_get_pages_list(),

        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'disable_auto_login',
            'parent'		=> 'user_verification_settings[woocommerce]',
            'title'		=> __('Disable auto login','post-grid'),
            'details'	=> __('You can disable auto login after registration via WooCommerce register form. this also disable login on checkout page.','post-grid'),
            'type'		=> 'select',
            'value'		=> $disable_auto_login,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),
        );

        $settings_tabs_field->generate_field($args);


        ?>

    </div>

    <?php
}



add_action('user_verification_settings_content_spam_protection', 'user_verification_settings_content_spam_protection');

function user_verification_settings_content_spam_protection(){


    $settings_tabs_field = new settings_tabs_field();

    $user_verification_settings = get_option('user_verification_settings');

    //delete_option('user_verification_settings');


    $enable_domain_block = isset($user_verification_settings['spam_protection']['enable_domain_block']) ? $user_verification_settings['spam_protection']['enable_domain_block'] : 'yes';
    $blocked_domain = isset($user_verification_settings['spam_protection']['blocked_domain']) ? $user_verification_settings['spam_protection']['blocked_domain'] : array();
    $allowed_domain = isset($user_verification_settings['spam_protection']['allowed_domain']) ? $user_verification_settings['spam_protection']['allowed_domain'] : array();

    $enable_username_block = isset($user_verification_settings['spam_protection']['enable_username_block']) ? $user_verification_settings['spam_protection']['enable_username_block'] : 'yes';
    $blocked_username = isset($user_verification_settings['spam_protection']['blocked_username']) ? $user_verification_settings['spam_protection']['blocked_username'] : array();

    //echo '<pre>'.var_export($user_verification_settings, true).'</pre>';

    ?>
    <div class="section">
        <div class="section-title"><?php echo __('Spam Protection', 'post-grid'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for spam protection.', 'post-grid'); ?></p>

        <?php


        $args = array(
            'id'		=> 'enable_domain_block',
            'parent'		=> 'user_verification_settings[spam_protection]',
            'title'		=> __('Enable domain block','post-grid'),
            'details'	=> __('You can enable email domain name blocking for spammy/temporary email account services.','post-grid'),
            'type'		=> 'select',
            'value'		=> $enable_domain_block,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),
        );

        $settings_tabs_field->generate_field($args);

        $args = array(
            'id'		=> 'blocked_domain',
            'parent'		=> 'user_verification_settings[spam_protection]',
            'title'		=> __('Blocked domains','post-grid'),
            'details'	=> __('One domain per line. without http:// or https:// or www.','post-grid'),
            'type'		=> 'text_multi',
            'value'		=> $blocked_domain,
            'default'		=> array(),
            'placeholder' => __('domain.com','user-verification'),

        );

        $settings_tabs_field->generate_field($args);

        $args = array(
            'id'		=> 'allowed_domain',
            'parent'		=> 'user_verification_settings[spam_protection]',
            'title'		=> __('Allowed domains','post-grid'),
            'details'	=> __('One domain per line. without http:// or https:// or www','post-grid'),
            'type'		=> 'text_multi',
            'value'		=> $allowed_domain,
            'default'		=> array(),
            'placeholder' => __('domain.com','user-verification'),

        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'enable_username_block',
            'parent'		=> 'user_verification_settings[spam_protection]',
            'title'		=> __('Enable username block','post-grid'),
            'details'	=> __('User will not able to register blocked username, like admin, info, etc.','post-grid'),
            'type'		=> 'select',
            'value'		=> $enable_username_block,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),
        );

        $settings_tabs_field->generate_field($args);



        $args = array(
            'id'		=> 'blocked_username',
            'parent'		=> 'user_verification_settings[spam_protection]',
            'title'		=> __('Blocked username','post-grid'),
            'details'	=> __('You can following string match <ul><li><b>^username</b> : String start with <b><i>username</i></b></li><li><b>username$</b> : String end by <b><i>username</i></b></li><li><b>username</b> : String contain <b><i>username</i></b></b></li></ul>','post-grid'),
            'type'		=> 'text_multi',
            'value'		=> $blocked_username,
            'default'		=> array(),
            'placeholder' => __('username','user-verification'),

        );

        $settings_tabs_field->generate_field($args);









        ?>

    </div>

    <?php
}


add_action('user_verification_settings_content_recaptcha', 'user_verification_settings_content_recaptcha');

function user_verification_settings_content_recaptcha(){


    $settings_tabs_field = new settings_tabs_field();

    $user_verification_settings = get_option('user_verification_settings');

    //delete_option('user_verification_settings');


    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';
    $default_login_page = isset($user_verification_settings['recaptcha']['default_login_page']) ? $user_verification_settings['recaptcha']['default_login_page'] : '';
    $default_registration_page = isset($user_verification_settings['recaptcha']['default_registration_page']) ? $user_verification_settings['recaptcha']['default_registration_page'] : '';
    $default_lostpassword_page = isset($user_verification_settings['recaptcha']['default_lostpassword_page']) ? $user_verification_settings['recaptcha']['default_lostpassword_page'] : '';
    $comment_form = isset($user_verification_settings['recaptcha']['comment_form']) ? $user_verification_settings['recaptcha']['comment_form'] : '';



    //echo '<pre>'.var_export($user_verification_settings, true).'</pre>';

    ?>
    <div class="section">
        <div class="section-title"><?php echo __('reCAPTCHA', 'post-grid'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for reCAPTCHA.', 'post-grid'); ?></p>

        <?php

        $args = array(
            'id'		=> 'sitekey',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('reCAPTCHA sitekey','post-grid'),
            'details'	=> __('Google reCAPTCHA sitekey, please register here <a href="https://www.google.com/recaptcha/">https://www.google.com/recaptcha/</a>','post-grid'),
            'type'		=> 'text',
            'value'		=> $sitekey,
            'default'		=> '',
        );

        $settings_tabs_field->generate_field($args);

        $args = array(
            'id'		=> 'default_login_page',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('Recaptcha on default login page','post-grid'),
            'details'	=> __('Enable recaptcha on default login page.','post-grid'),
            'type'		=> 'select',
            'value'		=> $default_login_page,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'default_registration_page',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('Recaptcha on default registration page','post-grid'),
            'details'	=> __('Enable recaptcha on default registration page.','post-grid'),
            'type'		=> 'select',
            'value'		=> $default_registration_page,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'default_lostpassword_page',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('Recaptcha on default reset password page','post-grid'),
            'details'	=> __('Enable recaptcha on default reset password page.','post-grid'),
            'type'		=> 'select',
            'value'		=> $default_lostpassword_page,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'comment_form',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('Recaptcha on comment forms','post-grid'),
            'details'	=> __('Enable recaptcha on comment forms.','post-grid'),
            'type'		=> 'select',
            'value'		=> $comment_form,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),
        );

        $settings_tabs_field->generate_field($args);



        ?>

    </div>

    <?php
}






add_action('user_verification_settings_content_recaptcha', 'user_verification_settings_content_recaptcha_woo');

function user_verification_settings_content_recaptcha_woo(){


    $settings_tabs_field = new settings_tabs_field();

    $user_verification_settings = get_option('user_verification_settings');

    //delete_option('user_verification_settings');


    $wc_login_form = isset($user_verification_settings['recaptcha']['wc_login_form']) ? $user_verification_settings['recaptcha']['wc_login_form'] : '';
    $wc_register_form = isset($user_verification_settings['recaptcha']['wc_register_form']) ? $user_verification_settings['recaptcha']['wc_register_form'] : '';
    $wc_lostpassword_form = isset($user_verification_settings['recaptcha']['wc_lostpassword_form']) ? $user_verification_settings['recaptcha']['wc_lostpassword_form'] : '';



    //echo '<pre>'.var_export($user_verification_settings, true).'</pre>';

    ?>
    <div class="section">
        <div class="section-title"><?php echo __('WooCommerce reCAPTCHA', 'post-grid'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for WooCommerce reCAPTCHA.', 'post-grid'); ?></p>

        <?php


        $args = array(
            'id'		=> 'wc_login_form',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('WooCommerce login from','post-grid'),
            'details'	=> __('Enable reCAPTCHA on WooCommerce login from','post-grid'),
            'type'		=> 'select',
            'value'		=> $wc_login_form,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'wc_register_form',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('WooCommerce register from','post-grid'),
            'details'	=> __('Enable reCAPTCHA on WooCommerce register from','post-grid'),
            'type'		=> 'select',
            'value'		=> $wc_register_form,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),
        );

        $settings_tabs_field->generate_field($args);

        $args = array(
            'id'		=> 'wc_lostpassword_form',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('WooCommerce lost password from','post-grid'),
            'details'	=> __('Enable reCAPTCHA on WooCommerce lost password from','post-grid'),
            'type'		=> 'select',
            'value'		=> $wc_lostpassword_form,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),
        );

        $settings_tabs_field->generate_field($args);




        ?>

    </div>

    <?php
}










add_action('user_verification_settings_content_ultimate_member', 'user_verification_settings_content_ultimate_member');

function user_verification_settings_content_ultimate_member(){


    $settings_tabs_field = new settings_tabs_field();

    $user_verification_settings = get_option('user_verification_settings');

    //delete_option('user_verification_settings');


    $disable_auto_login = isset($user_verification_settings['ultimate_member']['disable_auto_login']) ? $user_verification_settings['ultimate_member']['disable_auto_login'] : 'yes';
    $message_before_header = isset($user_verification_settings['ultimate_member']['message_before_header']) ? $user_verification_settings['ultimate_member']['message_before_header'] : '';



    //echo '<pre>'.var_export($user_verification_settings, true).'</pre>';

    ?>
    <div class="section">
        <div class="section-title"><?php echo __('WooCommerce', 'post-grid'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for WooCommerce.', 'post-grid'); ?></p>

        <?php


        $args = array(
            'id'		=> 'disable_auto_login',
            'parent'		=> 'user_verification_settings[ultimate_member]',
            'title'		=> __('Disable auto login','post-grid'),
            'details'	=> __('You can disable auto login after registration via ultimate member register form.','post-grid'),
            'type'		=> 'select',
            'value'		=> $disable_auto_login,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'message_before_header',
            'parent'		=> 'user_verification_settings[ultimate_member]',
            'title'		=> __('Display Message after successfully registration','post-grid'),
            'details'	=> __('You can display custom message at profile header after redirect profile page via Ultimate Member.','post-grid'),
            'type'		=> 'text',
            'value'		=> $message_before_header,
            'default'		=> '',
        );

        $settings_tabs_field->generate_field($args);



        ?>

    </div>

    <?php
}






add_action('user_verification_settings_content_paid_memberships_pro', 'user_verification_settings_content_paid_memberships_pro');

function user_verification_settings_content_paid_memberships_pro(){


    $settings_tabs_field = new settings_tabs_field();

    $user_verification_settings = get_option('user_verification_settings');

    //delete_option('user_verification_settings');


    $disable_auto_login = isset($user_verification_settings['paid_memberships_pro']['disable_auto_login']) ? $user_verification_settings['paid_memberships_pro']['disable_auto_login'] : 'yes';
    $message_checkout_page = isset($user_verification_settings['paid_memberships_pro']['message_checkout_page']) ? $user_verification_settings['paid_memberships_pro']['message_checkout_page'] : '';
    $redirect_timout = isset($user_verification_settings['paid_memberships_pro']['redirect_timout']) ? $user_verification_settings['paid_memberships_pro']['redirect_timout'] : '';
    $redirect_after_checkout = isset($user_verification_settings['paid_memberships_pro']['redirect_after_checkout']) ? $user_verification_settings['paid_memberships_pro']['redirect_after_checkout'] : '';



    //echo '<pre>'.var_export($user_verification_settings, true).'</pre>';

    ?>
    <div class="section">
        <div class="section-title"><?php echo __('WooCommerce', 'post-grid'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for WooCommerce.', 'post-grid'); ?></p>

        <?php


        $args = array(
            'id'		=> 'disable_auto_login',
            'parent'		=> 'user_verification_settings[ultimate_member]',
            'title'		=> __('Disable auto login','post-grid'),
            'details'	=> __('You can disable auto login after registration via Paid Memberships Pro checkout(register) form.','post-grid'),
            'type'		=> 'select',
            'value'		=> $disable_auto_login,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','post-grid'), 'no'=>__('No','post-grid')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'message_checkout_page',
            'parent'		=> 'user_verification_settings[ultimate_member]',
            'title'		=> __('Display message on checkout confirmation page','post-grid'),
            'details'	=> __('You can display custom message on checkout confirmation page.','post-grid'),
            'type'		=> 'text',
            'value'		=> $message_checkout_page,
            'default'		=> '',
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'redirect_timout',
            'parent'		=> 'user_verification_settings[ultimate_member]',
            'title'		=> __('Automatically logout after second','post-grid'),
            'details'	=> __('After successfully checkout user will wait for few second to display the message and then redirect to another page. <br> 1000 = 1 second','post-grid'),
            'type'		=> 'text',
            'value'		=> $redirect_timout,
            'default'		=> '',
            'placeholder'		=> '3000',

        );

        $settings_tabs_field->generate_field($args);



        $args = array(
            'id'		=> 'redirect_after_checkout',
            'parent'		=> 'user_verification_settings[email_verification]',
            'title'		=> __('Redirect to this page after checkout','post-grid'),
            'details'	=> __('You can set custom page to redirect and logout after few second passed, where user can see instruction what to do next to get verified.','post-grid'),
            'type'		=> 'select',
            'value'		=> $redirect_after_checkout,
            'default'		=> '',
            'args'		=> user_verification_get_pages_list(),

        );

        $settings_tabs_field->generate_field($args);











        ?>

    </div>

    <?php
}




















































add_action('user_verification_settings_content_help_support', 'user_verification_settings_content_help_support');

if(!function_exists('user_verification_settings_content_help_support')) {
    function user_verification_settings_content_help_support($tab){

        $settings_tabs_field = new settings_tabs_field();


        ?>
        <div class="section">
            <div class="section-title"><?php echo __('Get support', 'post-grid'); ?></div>
            <p class="description section-description"><?php echo __('Use following to get help and support from our expert team.', 'post-grid'); ?></p>

            <?php


            ob_start();
            ?>

            <p><?php echo __('Shortcode for php file', 'related-post'); ?></p>
            <textarea onclick="this.select()">&#60;?php echo do_shortcode( '&#91;wishlist_button show_count="yes" show_menu="yes" icon_active="" icon_inactive="" icon_loading="" &#93;' ); ?&#62;</textarea>
            <p class="description" ><?php echo __('Shortcode inside loop by dynamic post id you can use anywhere inside loop on .php files.', 'related-post'); ?></p>

            <p><?php echo __('Short-code for content', 'related-post'); ?></p>
            <textarea onclick="this.select()">[wishlist_button id="123" show_count="yes" show_menu="yes" icon_active="" icon_inactive="" icon_loading=""]</textarea>

            <p class="description"><?php echo __('Short-code inside content for fixed post id you can use anywhere inside content.', 'related-post'); ?></p>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'shortcodes',
                'parent'		=> 'related_post_settings',
                'title'		=> __('Shortcodes','related-post'),
                'details'	=> '',
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ob_start();
            ?>

            <p><?php echo __('Ask question for free on our forum and get quick reply from our expert team members.', 'post-grid'); ?></p>
            <a class="button" target="_blank" href="https://www.pickplugins.com/create-support-ticket/"><?php echo __('Create support ticket', 'post-grid'); ?></a>

            <p><?php echo __('Read our documentation before asking your question.', 'post-grid'); ?></p>
            <a class="button" target="_blank" href="https://www.pickplugins.com/documentation/wishlist/"><?php echo __('Documentation', 'post-grid'); ?></a>

            <p><?php echo __('Watch video tutorials.', 'post-grid'); ?></p>
            <a class="button" target="_blank" href="https://www.youtube.com/playlist?list=PL0QP7T2SN94ZGK1xL5QtEDHlR6Flk9iDH"><i class="fab fa-youtube"></i> <?php echo __('All tutorials', 'post-grid'); ?></a>





            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'get_support',
                //'parent'		=> '',
                'title'		=> __('Ask question','post-grid'),
                'details'	=> '',
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>

            <p class="">We wish your 2 minutes to write your feedback about the <b>Post Grid</b> plugin. give us <span style="color: #ffae19"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span></p>

            <a target="_blank" href="https://wordpress.org/support/plugin/wishlist/reviews/#new-post" class="button"><i class="fab fa-wordpress"></i> Write a review</a>


            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'reviews',
                //'parent'		=> '',
                'title'		=> __('Submit reviews','post-grid'),
                'details'	=> '',
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);



            ?>


        </div>
        <?php


    }
}






add_action('user_verification_settings_content_buy_pro', 'user_verification_settings_content_buy_pro');

if(!function_exists('user_verification_settings_content_buy_pro')) {
    function user_verification_settings_content_buy_pro($tab){

        $settings_tabs_field = new settings_tabs_field();


        ?>
        <div class="section">
            <div class="section-title"><?php echo __('Get Premium', 'post-grid'); ?></div>
            <p class="description section-description"><?php echo __('Thanks for using our plugin, if you looking for some advance feature please buy premium version.', 'post-grid'); ?></p>

            <?php


            ob_start();
            ?>

            <p><?php echo __('If you love our plugin and want more feature please consider to buy pro version.', 'post-grid'); ?></p>
            <a class="button" href="https://www.pickplugins.com/item/woocommerce-wishlist/?ref=dashobard"><?php echo __('Buy premium', 'post-grid'); ?></a>
            <a class="button" href="https://www.pickplugins.com/demo/wishlist/?ref=dashobard"><?php echo __('See all demo', 'post-grid'); ?></a>

            <h2><?php echo __('See the differences','post-grid'); ?></h2>

            <table class="pro-features">
                <thead>
                <tr>
                    <th class="col-features"><?php echo __('Features','post-grid'); ?></th>
                    <th class="col-free"><?php echo __('Free','post-grid'); ?></th>
                    <th class="col-pro"><?php echo __('Premium','post-grid'); ?></th>
                </tr>
                </thead>


                <tr>
                    <td class="col-features"><?php echo __('Any post type support','post-grid'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Ready WooCommerce','post-grid'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Unlimited wishlist by any user','post-grid'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Public or private wishlist','post-grid'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('User can edit wishlist','post-grid'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('User can delete wishlist','post-grid'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Default wishlist id','post-grid'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>


                <tr>
                    <td class="col-features"><?php echo __('Wishlist archive page','post-grid'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Breadcrumb on wishlist page','post-grid'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>




                <tr>
                    <td class="col-features"><?php echo __('Wishlist view count','post-grid'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Wishlist thumb up & down vote','post-grid'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Social share on wishlist','post-grid'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Copy to duplicate others user wishlist','post-grid'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Total wishlisted count by post id','post-grid'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Search wishlist','post-grid'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>


                <tr>
                    <td class="col-features"><?php echo __('Wishlist button font size','post-grid'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Wishlist button custom color','post-grid'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <th class="col-features"><?php echo __('Features','post-grid'); ?></th>
                    <th class="col-free"><?php echo __('Free','post-grid'); ?></th>
                    <th class="col-pro"><?php echo __('Premium','post-grid'); ?></th>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Buy now','post-grid'); ?></td>
                    <td> </td>
                    <td><a class="button" href="https://www.pickplugins.com/item/woocommerce-wishlist/?ref=dashobard"><?php echo __('Buy premium', 'post-grid'); ?></a></td>
                </tr>

            </table>



            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'get_pro',
                'title'		=> __('Get pro version','post-grid'),
                'details'	=> '',
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);


            ?>


        </div>

        <style type="text/css">
            .pro-features{
                margin: 30px 0;
                border-collapse: collapse;
                border: 1px solid #ddd;
            }
            .pro-features th{
                width: 120px;
                background: #ddd;
                padding: 10px;
            }
            .pro-features tr{
            }
            .pro-features td{
                border-bottom: 1px solid #ddd;
                padding: 10px 10px;
                text-align: center;
            }
            .pro-features .col-features{
                width: 230px;
                text-align: left;
            }

            .pro-features .col-free{
            }
            .pro-features .col-pro{
            }

            .pro-features i.fas.fa-check {
                color: #139e3e;
                font-size: 16px;
            }
            .pro-features i.fas.fa-times {
                color: #f00;
                font-size: 17px;
            }
        </style>
        <?php


    }
}









add_action('user_verification_settings_save', 'user_verification_settings_save');

function user_verification_settings_save(){

    $user_verification_settings = isset($_POST['user_verification_settings']) ?  stripslashes_deep($_POST['user_verification_settings']) : array();
    update_option('user_verification_settings', $user_verification_settings);
}
