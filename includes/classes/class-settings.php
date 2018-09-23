<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 





$settings_general = array(
    'page_nav' 	=> __( 'General', 'text-domain' ),
    'page_settings' => array(
        'section_1' => array(
            'title' 	=> 	__('Basic Settings','text-domain'),
            'description' 	=> __('Some basic settings to get started','text-domain'),
            'options' 	=> array(
                array(
                    'id'		=> 'user_verification_verification_page',
                    'title'		=> __('Choose verification page','text-domain'),
                    'details'	=> __('Verification checker page where you place the shortcode <code>[user_verification_check]</code>, please create a page and use this shortcode uder post content.','text-domain'),
                    'type'		=> 'select2',
                    'args'		=> user_verification_get_pages_list(),
                ),
                array(
                    'id'		=> 'user_verification_redirect_verified',
                    'title'		=> __('Redirect after verification','text-domain'),
                    'details'	=> __('Redirect to any page after successfully verified account.','text-domain'),
                    'type'		=> 'select2',
                    'args'		=> user_verification_get_pages_list(),
                ),

                array(
                    'id'		=> 'user_verification_login_automatically',
                    'title'		=> __('Automatically login after verification','text-domain'),
                    'details'	=> __('Yes means, users click on the Account activation link from email and they login automatically to your website, No means they don\'t','text-domain'),
                    'type'		=> 'select',
                    'args'		=> array(
                        'no'	=> __('No','text-domain'),
                        'yes'	=> __('Yes','text-domain'),
                    ),
                ),

                array(
                    'id'		=> 'uv_exclude_user_roles',
                    'title'		=> __('Exclude these user role to verification?','text-domain'),
                    'details'	=> __('You can exclude verification for these user roles','text-domain'),
                    'type'		=> 'select_multi',
                    'args'		=> uv_all_user_roles(),
                ),


            )
        ),

        'woocommerce' => array(
            'title' 	=> 	__('WooCommerce','text-domain'),
            'description' 	=> __('Integration for WooCommerce','text-domain'),
            'options' 	=> array(
                array(
                    'id'		=> 'uv_wc_disable_auto_login',
                    'title'		=> __('Disable auto login after registration on WooCommerce?','text-domain'),
                    'details'	=> __('You can disable auto login after registration via WooCommerce register form. this also disable login on checkout page','text-domain'),
                    'type'		=> 'select',
                    'args'		=> array(
                        'no'	=> __('No','text-domain'),
                        'yes'	=> __('Yes','text-domain'),
                    ),
                ),
            )
        ),
    ),
);




$settings_security = array(
    'page_nav' 	=> __( 'Protect Spam', 'text-domain' ),
    'page_settings' => array(
        'section_1' => array(
            'title' 	=> 	__('Protect Spam Settings','text-domain'),
            'description' 	=> __('Protect your site from Spam','text-domain'),
            'options' 	=> array(
                array(
                    'id'		=> 'user_verification_enable_block_domain',
                    'title'		=> __('Enable blocking email domain on registration','text-domain'),
                    'details'	=> __('You can enable email domain name blocking for spammy/temporary email account services','text-domain'),
                    'type'		=> 'select',
                    'args'		=> array(
                        'no'	=> __('No','text-domain'),
                        'yes'	=> __('Yes','text-domain'),
                    ),
                ),

                array(
                    'id'		=> 'uv_settings_blocked_domain',
                    'title'		=> __('Blocked Domains','text-domain'),
                    'details'	=> __('One domain per line. wihtout http:// or https:// or www','text-domain'),
                    'type'		=> 'text_multi',
                    'placeholder' => __('domain.com','text-domain'),
                ),



                array(
                    'id'		=> 'user_verification_enable_block_username',
                    'title'		=> __('Enable blocking username on registration.','text-domain'),
                    'details'	=> __('User will not able to register blocked username, like admin, info, etc.','text-domain'),
                    'type'		=> 'select',
                    'args'		=> array(
                        'no'	=> __('No','text-domain'),
                        'yes'	=> __('Yes','text-domain'),
                    ),
                ),

                array(
                    'id'		=> 'uv_settings_blocked_username',
                    'title'		=> __('Blocked Usernames','text-domain'),
                    'details'	=> __('You can following string match <ul><li><b>^username</b> : String start with <b><i>username</i></b></li><li><b>username$</b> : String end by <b><i>username</i></b></li><li><b>username</b> : String contain <b><i>username</i></b></b></li></ul>','text-domain'),
                    'type'		=> 'text_multi',
                    'placeholder' => __('username','text-domain'),
                ),





            )
        ),


    ),
);




$settings_messages = array(
    'page_nav' 	=> __( 'Messages', 'text-domain' ),
    'page_settings' => array(
        'section_1' => array(
            'title' 	=> 	__('Custom Messages','text-domain'),
            'description' 	=> __('Customize error messages','text-domain'),
            'options' 	=> array(

                array(
                    'id'		=> 'uv_message_invalid_key',
                    'title'		=> __('Invalid activation key','text-domain'),
                    'details'	=> __('Show custom message when user activation key is invalid or wrong','text-domain'),
                    'type'		=> 'textarea',
                    'placeholder' => __('Sorry! Invalid activation key','text-domain'),
                ),
                array(
                    'id'		=> 'uv_message_activation_sent',
                    'title'		=> __('Activation key sent','text-domain'),
                    'details'	=> __('Show custom message when activation key is sent to user email','text-domain'),
                    'type'		=> 'textarea',
                    'placeholder' => __('Hey! You activation key has been sent to your mail','text-domain'),
                ),

                array(
                    'id'		=> 'uv_message_verify_email',
                    'title'		=> __('Verify email address','text-domain'),
                    'details'	=> __('Show custom message when user try to login without verifying his/her email with proper activation key','text-domain'),
                    'type'		=> 'textarea',
                    'placeholder' => __('Please verify account first.','text-domain'),
                ),
                array(
                    'id'		=> 'user_verification_registered_message',
                    'title'		=> __('Registration success message','text-domain'),
                    'details'	=> __('User will get this message as soon as registered on your website','text-domain'),
                    'type'		=> 'textarea',
                    'placeholder' => __('Hey! Thanks for registration','text-domain'),
                ),


                array(
                    'id'		=> 'uv_message_verification_success',
                    'title'		=> __('Verification successful','text-domain'),
                    'details'	=> __('Show custom message when user successfully verified','text-domain'),
                    'type'		=> 'textarea',
                    'placeholder' => __('Hey! Thanks for verification','text-domain'),
                ),

                array(
                    'id'		=> 'uv_message_key_expired',
                    'title'		=> __('Activation key Expired','text-domain'),
                    'details'	=> __('Show custom message when user activation key is expired','text-domain'),
                    'type'		=> 'textarea',
                    'placeholder' => __('Hey! Your activation key has expired.','text-domain'),
                ),

                array(
                    'id'		=> 'uv_message_captcha_error',
                    'title'		=> __('Captcha error message','text-domain'),
                    'details'	=> __('Show custom message when captcha error occurred','text-domain'),
                    'type'		=> 'textarea',
                    'placeholder' => __('Sorry! You missed the Captcha or Wrong input.','text-domain'),
                ),


            )
        ),


    ),
);




$settings_recaptcha = array(
    'page_nav' 	=> __( 'reCAPTCHA', 'text-domain' ),
    'page_settings' => array(
        'section_1' => array(
            'title' 	=> 	__('reCAPTCHA Settings','text-domain'),
            'description' 	=> __('Protect your site by reCAPTCHA','text-domain'),
            'options' 	=> array(

                array(
                    'id'		=> 'uv_recaptcha_sitekey',
                    'title'		=> __('reCAPTCHA sitekey','text-domain'),
                    'details'	=> __('Google reCAPTCHA sitekey, please register here <a href="https://www.google.com/recaptcha/">https://www.google.com/recaptcha/</a>','text-domain'),
                    'type'		=> 'text',
                    'placeholder' => __('','text-domain'),
                ),


                array(
                    'id'		=> 'uv_recaptcha_login_page',
                    'title'		=> __('reCAPTCHA on default login page','text-domain'),
                    'details'	=> __('Enable recaptcha on default login page','text-domain'),
                    'type'		=> 'select',
                    'args'		=> array(
                        'no'	=> __('No','text-domain'),
                        'yes'	=> __('Yes','text-domain'),
                    ),
                ),

                array(
                    'id'		=> 'uv_recaptcha_register_page',
                    'title'		=> __('reCAPTCHA on default registration page','text-domain'),
                    'details'	=> __('Enable recaptcha on default registration page','text-domain'),
                    'type'		=> 'select',
                    'args'		=> array(
                        'no'	=> __('No','text-domain'),
                        'yes'	=> __('Yes','text-domain'),
                    ),
                ),

                array(
                    'id'		=> 'uv_recaptcha_lostpassword_page',
                    'title'		=> __('reCAPTCHA on default reset password page','text-domain'),
                    'details'	=> __('Enable recaptcha on default reset password page','text-domain'),
                    'type'		=> 'select',
                    'args'		=> array(
                        'no'	=> __('No','text-domain'),
                        'yes'	=> __('Yes','text-domain'),
                    ),
                ),

                array(
                    'id'		=> 'uv_recaptcha_comment_form',
                    'title'		=> __('reCAPTCHA on comment form','text-domain'),
                    'details'	=> __('Enable recaptcha on comment form','text-domain'),
                    'type'		=> 'select',
                    'args'		=> array(
                        'no'	=> __('No','text-domain'),
                        'yes'	=> __('Yes','text-domain'),
                    ),
                ),

            )
        ),

        'woocommerce' => array(
            'title' 	=> 	__('WooCommerce','text-domain'),
            'description' 	=> __('Integration for WooCommerce','text-domain'),
            'options' 	=> array(


                array(
                    'id'		=> 'uv_recaptcha_wc_login_form',
                    'title'		=> __('reCAPTCHA on WooCommerce login from','text-domain'),
                    'details'	=> __('Enable reCAPTCHA on WooCommerce login from','text-domain'),
                    'type'		=> 'select',
                    'args'		=> array(
                        'no'	=> __('No','text-domain'),
                        'yes'	=> __('Yes','text-domain'),
                    ),
                ),

                array(
                    'id'		=> 'uv_recaptcha_wc_register_form',
                    'title'		=> __('reCAPTCHA on WooCommerce register from','text-domain'),
                    'details'	=> __('Enable reCAPTCHA on WooCommerce register from','text-domain'),
                    'type'		=> 'select',
                    'args'		=> array(
                        'no'	=> __('No','text-domain'),
                        'yes'	=> __('Yes','text-domain'),

                    ),
                ),


                array(
                    'id'		=> 'uv_recaptcha_wc_lostpassword_form',
                    'title'		=> __('reCAPTCHA on WooCommerce lost password from','text-domain'),
                    'details'	=> __('Enable reCAPTCHA on WooCommerce lost password from','text-domain'),
                    'type'		=> 'select',
                    'args'		=> array(
                        'no'	=> __('No','text-domain'),
                        'yes'	=> __('Yes','text-domain'),
                    ),
                ),

            )
        ),

    ),
);







$args = array(
    'add_in_menu'     => true,
    'menu_type'       => 'main',
    'menu_title'      => __( 'User Verification', 'user-verification' ),
    'menu_name'      => __( 'User Verification - Settings', 'user-verification' ),
    'page_title'      => __( 'User Verification - Settings', 'user-verification' ),
    'menu_page_title' => __( 'User Verification - Settings', 'user-verification' ),
    'capability'      => "manage_options",
    'menu_slug'       => "user-verification",
    'menu_icon'       => "dashicons-shield-alt",
    'pages' 	  => array(
        'general' => $settings_general,
        'security' => $settings_security,
        'messages' => $settings_messages,
        'recaptcha' => $settings_recaptcha,
    ),
);

$WPAdminMenu = new WPAdminMenu( $args );




$class_uv_emails = new class_uv_emails();
$templates_data = $class_uv_emails->uv_email_templates_data();



$settings_email_templates = array(
    'page_nav' 	=> __( 'Email Templates', 'text-domain' ),
    'page_settings' => array(
        'section_1' => array(
            'title' 	=> 	__('Email Templates','text-domain'),
            'description' 	=> __('You can customize email templates here.','text-domain'),
            'options' 	=> array(

                array(
                    'id'		=> 'uv_email_templates_data',
                    'title'		=> __('Emails Templates Settings','text-domain'),
                    'details'	=> __('Emails Templates Options','text-domain'),
                    'type'		=> 'email_templates',
                    'args'		=> $templates_data,
                ),



            )
        ),



    ),
);




$email_templates_args = array(
    'add_in_menu' => true,
    'menu_type' => 'submenu',
    'menu_title' => __( 'Email Templates', 'text-domain' ),
    'page_title' => __( 'User Verification - Email Templates', 'text-domain' ),
    'menu_page_title' => __( 'User Verification - Email Templates', 'text-domain' ),
    'capability' => "manage_options",
    'menu_slug' => "user-verification-email-template",
    'parent_slug' => "user-verification",
    'pages' 	  => array(
        'templates' => $settings_email_templates,


    ),
);

$WPAdminMenu_sub = new WPAdminMenu( $email_templates_args );




$help = array(
    'page_nav' 	=> __( 'Help', 'text-domain' ),
    'page_settings' => array(
        'section_1' => array(
            'title' 	=> 	__('Help & Support','text-domain'),
            'description' 	=> __('Here is some question and answer for your quick help.','text-domain'),
            'options' 	=> array(

                array(
                    'id'		=> 'uv_faq',
                    'title'		=> __('Frequently Asked Question','text-domain'),
                    'details'	=> __('If you have more question please asked on our forum <a href="https://www.pickplugins.com/questions/">https://www.pickplugins.com/questions/</a>','text-domain'),
                    'type'		=> 'faq',
                    'args'		=> array(
                        array('title'=>'How to setup plugin?','link'=>'https://www.pickplugins.com/documentation/user-verification/faq/how-to-setup-plugin/', 'content'=>'Please see the documentation here <a href="https://www.pickplugins.com/documentation/user-verification/faq/how-to-setup-plugin/">https://www.pickplugins.com/documentation/user-verification/faq/how-to-setup-plugin/</a>'),
                        array('title'=>'How to check user verification status?
','link'=>'#', 'content'=>'Please see the documentation here <a href="https://www.pickplugins.com/documentation/user-verification/faq/how-to-check-user-verification-status/">https://www.pickplugins.com/documentation/user-verification/faq/how-to-check-user-verification-status/</a>'),
                        array('title'=>'How to stop auto login on WooCommerce registration?
','link'=>'#', 'content'=>'Please see the documentation here <a href="https://www.pickplugins.com/documentation/user-verification/faq/how-to-stop-auto-login-on-woocommerce-registration/">https://www.pickplugins.com/documentation/user-verification/faq/how-to-stop-auto-login-on-woocommerce-registration/</a>'),
                        array('title'=>'How to Automatically login after verification?
','link'=>'#', 'content'=>'Please see the documentation here <a href="https://www.pickplugins.com/documentation/user-verification/faq/automatically-login-after-verification/">https://www.pickplugins.com/documentation/user-verification/faq/automatically-login-after-verification/</a>'),


                    ),
                ),



            )
        ),



    ),
);





$our_plugins = array(
    'page_nav' 	=> __( 'Our Plugins', 'text-domain' ),
    'page_settings' => array(
        'section_2' => array(
            'title' 	=> 	__('Our plugins you may looking for','text-domain'),
            'description' 	=> __('Please take a look on our plugin list may help on your projects..','text-domain'),
            'options' 	=> array(

                array(
                    'id'		=> 'uv_faq',
                    'title'		=> __('Popular Plugins','text-domain'),
                    'details'	=> __('See our all plugins here <a href="https://www.pickplugins.com/plugins/">https://www.pickplugins.com/plugins/</a>','text-domain'),
                    'type'		=> 'grid',
                    'args'		=> array(
                        array('title'=>'Post Grid','link'=>'https://www.pickplugins.com/item/post-grid-create-awesome-grid-from-any-post-type-for-wordpress/', 'content'=>'', 'thumb'=>'https://www.pickplugins.com/wp-content/uploads/2015/12/3814-post-grid-thumb-500x262.jpg'),
                        array('title'=>'Accordion','link'=>'https://www.pickplugins.com/item/accordions-html-css3-responsive-accordion-grid-for-wordpress/', 'content'=>'','thumb'=>'https://www.pickplugins.com/wp-content/uploads/2016/01/3932-product-thumb-500x250.png' ),
                        array('title'=>'Woocommerce Product Slider','link'=>'https://www.pickplugins.com/item/woocommerce-products-slider-for-wordpress/', 'content'=>'','thumb'=>'https://www.pickplugins.com/wp-content/uploads/2016/03/4357-woocommerce-products-slider-thumb-500x250.jpg'),
                        array('title'=>'Team Showcase','link'=>'https://www.pickplugins.com/item/team-responsive-meet-the-team-grid-for-wordpress/', 'content'=>'','thumb'=>'https://www.pickplugins.com/wp-content/uploads/2016/06/5145-team-thumb-500x250.jpg'),

                        array('title'=>'Breadcrumb','link'=>'https://www.pickplugins.com/item/breadcrumb-awesome-breadcrumbs-style-navigation-for-wordpress/', 'content'=>'','thumb'=>'https://www.pickplugins.com/wp-content/uploads/2016/03/4242-breadcrumb-500x252.png'),

                        array('title'=>'Wishlist for WooCommerce','link'=>'https://www.pickplugins.com/item/woocommerce-wishlist/', 'content'=>'','thumb'=>'https://www.pickplugins.com/wp-content/uploads/2017/10/12047-woocommerce-wishlist-500x250.png'),

                        array('title'=>'Job Board Manager','link'=>'https://www.pickplugins.com/item/job-board-manager-create-job-site-for-wordpress/', 'content'=>'','thumb'=>'https://www.pickplugins.com/wp-content/uploads/2015/08/3466-job-board-manager-thumb-500x250.png'),

                    ),
                ),



            )
        ),







    ),
);













$help_menu_args = array(
    'add_in_menu' => true,
    'menu_type' => 'submenu',
    'menu_title' => __( 'Help', 'text-domain' ),
    'page_title' => __( 'User Verification - Help', 'text-domain' ),
    'menu_page_title' => __( 'User Verification - Help', 'text-domain' ),
    'capability' => "manage_options",
    'menu_slug' => "user-verification-help",
    'parent_slug' => "user-verification",
    'pages' 	  => array(
        'help' => $help,
        'our-plugins' => $our_plugins,
    ),
);

$WPAdminMenu_sub = new WPAdminMenu( $help_menu_args );

