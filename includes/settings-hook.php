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


    ?>
    <div class="section">
        <div class="section-title"><?php echo __('Email verification', 'user-verification'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for email verification.', 'user-verification'); ?></p>

        <?php


        $args = array(
            'id'		=> 'enable',
            'parent'		=> 'user_verification_settings[email_verification]',
            'title'		=> __('Enable email verification','user-verification'),
            'details'	=> __('Select to enable or disable email verification.','user-verification'),
            'type'		=> 'select',
            'value'		=> $email_verification_enable,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'verification_page_id',
            'parent'		=> 'user_verification_settings[email_verification]',
            'title'		=> __('Choose verification page','user-verification'),
            'details'	=> __('Select page where verification will process. default home page if select none.','user-verification'),
            'type'		=> 'select',
            'value'		=> $verification_page_id,
            'default'		=> '',
            'args'		=> user_verification_get_pages_list(),

        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'redirect_after_verification',
            'parent'		=> 'user_verification_settings[email_verification]',
            'title'		=> __('Redirect after verification','user-verification'),
            'details'	=> __('Redirect to any page after successfully verified account.','user-verification'),
            'type'		=> 'select',
            'value'		=> $redirect_after_verification,
            'default'		=> '',
            'args'		=> user_verification_get_pages_list(),

        );

        $settings_tabs_field->generate_field($args);




        $args = array(
            'id'		=> 'login_after_verification',
            'parent'		=> 'user_verification_settings[email_verification]',
            'title'		=> __('Automatically login after verification','user-verification'),
            'details'	=> __('Set yes to login automatically after verification completed, otherwise set no.','user-verification'),
            'type'		=> 'select',
            'value'		=> $login_after_verification,
            'default'		=> 'yes',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),

        );

        $settings_tabs_field->generate_field($args);



        $args = array(
            'id'		=> 'exclude_user_roles',
            'parent'		=> 'user_verification_settings[email_verification]',
            'title'		=> __('Exclude user role','user-verification'),
            'details'	=> __('You can exclude verification for these user roles to login on your site.','user-verification'),
            'type'		=> 'select',
            'multiple'		=> true,
            'value'		=> $exclude_user_roles,
            'default'		=> array(),
            'args'		=> user_verification_user_roles(),

        );

        $settings_tabs_field->generate_field($args);




        ?>

    </div>


    <div class="section">
        <div class="section-title"><?php echo __('Error messages', 'user-verification'); ?></div>
        <p class="description section-description"><?php echo __('Customize error messages.', 'user-verification'); ?></p>

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
            'title'		=> __('Invalid activation key','user-verification'),
            'details'	=> __('Show custom message when user activation key is invalid or wrong','user-verification'),
            'type'		=> 'textarea',
            'value'		=> $invalid_key,
            'default'		=> '',

        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'activation_sent',
            'parent'		=> 'user_verification_settings[messages]',
            'title'		=> __('Activation key has sent','user-verification'),
            'details'	=> __('Show custom message when activation key is sent to user email','user-verification'),
            'type'		=> 'textarea',
            'value'		=> $activation_sent,
            'default'		=> '',

        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'verify_email',
            'parent'		=> 'user_verification_settings[messages]',
            'title'		=> __('Verify email address','user-verification'),
            'details'	=> __('Show custom message when user try to login without verifying email with proper activation key','user-verification'),
            'type'		=> 'textarea',
            'value'		=> $verify_email,
            'default'		=> '',

        );

        $settings_tabs_field->generate_field($args);



        $args = array(
            'id'		=> 'registration_success',
            'parent'		=> 'user_verification_settings[messages]',
            'title'		=> __('Registration success message','user-verification'),
            'details'	=> __('User will get this message as soon as registered on your website','user-verification'),
            'type'		=> 'textarea',
            'value'		=> $registration_success,
            'default'		=> '',

        );

        $settings_tabs_field->generate_field($args);



        $args = array(
            'id'		=> 'verification_success',
            'parent'		=> 'user_verification_settings[messages]',
            'title'		=> __('Verification successful','user-verification'),
            'details'	=> __('Show custom message when user successfully verified','user-verification'),
            'type'		=> 'textarea',
            'value'		=> $verification_success,
            'default'		=> '',

        );

        $settings_tabs_field->generate_field($args);

        $args = array(
            'id'		=> 'key_expired',
            'parent'		=> 'user_verification_settings[messages]',
            'title'		=> __('Activation key expired','user-verification'),
            'details'	=> __('Show custom message when user activation key is expired','user-verification'),
            'type'		=> 'textarea',
            'value'		=> $key_expired,
            'default'		=> '',

        );

        $settings_tabs_field->generate_field($args);



        $args = array(
            'id'		=> 'captcha_error',
            'parent'		=> 'user_verification_settings[messages]',
            'title'		=> __('Captcha error message','user-verification'),
            'details'	=> __('Show custom message when captcha error occurred.','user-verification'),
            'type'		=> 'textarea',
            'value'		=> $captcha_error,
            'default'		=> '',

        );

        $settings_tabs_field->generate_field($args);

        ?>

    </div>



    <?php
}



add_action('user_verification_settings_content_email_templates', 'user_verification_settings_content_email_templates');

if(!function_exists('user_verification_settings_content_email_templates')) {
    function user_verification_settings_content_email_templates(){

        $settings_tabs_field = new settings_tabs_field();
        $class_license_manager_emails = new class_user_verification_emails();
        $templates_data_default = $class_license_manager_emails->email_templates_data();
        $email_templates_parameters = $class_license_manager_emails->email_templates_parameters();


        $user_verification_settings = get_option('user_verification_settings');


        $logo_id = isset($user_verification_settings['logo_id']) ? $user_verification_settings['logo_id'] : '';
        $templates_data_saved = isset($user_verification_settings['email_templates_data']) ? $user_verification_settings['email_templates_data'] : $templates_data_default;



        ?>
        <div class="section">
            <div class="section-title"><?php echo __('Email settings', 'user-verification'); ?></div>
            <p class="description section-description"><?php echo __('Customize email settings.', 'user-verification'); ?></p>

            <?php

            $args = array(
                'id'		=> 'logo_id',
                'parent'		=> 'user_verification_settings',
                'title'		=> __('Email logo','user-verification'),
                'details'	=> __('Email logo URL to display on mail.','user-verification'),
                'type'		=> 'media',
                'value'		=> $logo_id,
                'default'		=> '',
                'placeholder'		=> '',
            );

            $settings_tabs_field->generate_field($args);




            ob_start();


            ?>
            <div class="templates_editor expandable">
                <?php




                if(!empty($templates_data_default))
                    foreach($templates_data_default as $key=> $templates){

                        $templates_data_display = isset($templates_data_saved[$key]) ? $templates_data_saved[$key] : $templates;


                        $email_bcc = isset($templates_data_display['email_bcc']) ? $templates_data_display['email_bcc'] : '';
                        $email_from = isset($templates_data_display['email_from']) ? $templates_data_display['email_from'] : '';
                        $email_from_name = isset($templates_data_display['email_from_name']) ? $templates_data_display['email_from_name'] : '';
                        $reply_to = isset($templates_data_display['reply_to']) ? $templates_data_display['reply_to'] : '';
                        $reply_to_name = isset($templates_data_display['reply_to_name']) ? $templates_data_display['reply_to_name'] : '';
                        $email_subject = isset($templates_data_display['subject']) ? $templates_data_display['subject'] : '';

                        $email_body = isset($templates_data_display['html']) ? $templates_data_display['html'] : '';


                        $enable = isset($templates_data_display['enable']) ? $templates_data_display['enable'] : 'yes';
                        $description = isset($templates_data_display['description']) ? $templates_data_display['description'] : '';

                        $parameters = isset($email_templates_parameters[$key]) ? $email_templates_parameters[$key] : array();


                        //echo '<pre>'.var_export($enable).'</pre>';

                        ?>
                        <div class="item template <?php echo $key; ?>">
                            <div class="header">
                                <span title="<?php echo __('Click to expand', 'user-verification'); ?>" class="expand ">
                                    <i class="fa fa-expand"></i>
                                    <i class="fa fa-compress"></i>
                                </span>

                                <?php
                                if($enable =='yes'):
                                    ?>
                                    <span title="<?php echo __('Enable', 'user-verification'); ?>" class="is-enable ">
                                        <i class="fa fa-check-square"></i>
                                    </span>
                                <?php
                                else:
                                    ?>
                                    <span title="<?php echo __('Disabled', 'user-verification'); ?>" class="is-enable ">
                                        <i class="fa fa-times-circle"></i>
                                    </span>
                                <?php
                                endif;
                                ?>
                                <span class="expand"><?php echo $templates['name']; ?></span>

                            </div>
                            <input type="hidden" name="user_verification_settings[email_templates_data][<?php echo $key; ?>][name]" value="<?php echo $templates['name']; ?>" />
                            <div class="options">
                                <div class="description"><?php echo $description; ?></div><br/><br/>



                                <?php


                                $args = array(
                                    'id'		=> 'enable',
                                    'parent'		=> 'user_verification_settings[email_templates_data]['.$key.']',
                                    'title'		=> __('Enable?','user-verification'),
                                    'details'	=> __('Enable or disable this email notification.','user-verification'),
                                    'type'		=> 'select',
                                    'value'		=> $enable,
                                    'default'		=> 'yes',
                                    'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),

                                );

                                $settings_tabs_field->generate_field($args);






                                $args = array(
                                    'id'		=> 'email_bcc',
                                    'parent'		=> 'user_verification_settings[email_templates_data]['.$key.']',
                                    'title'		=> __('Email Bcc','user-verification'),
                                    'details'	=> __('Send a copy to these email(Bcc)','user-verification'),
                                    'type'		=> 'text',
                                    'value'		=> $email_bcc,
                                    'default'		=> '',
                                    'placeholder'		=> get_bloginfo('admin_email'),


                                );

                                $settings_tabs_field->generate_field($args);


                                $args = array(
                                    'id'		=> 'email_from_name',
                                    'parent'		=> 'user_verification_settings[email_templates_data]['.$key.']',
                                    'title'		=> __('Email from name','user-verification'),
                                    'details'	=> __('Write email displaying from name','user-verification'),
                                    'type'		=> 'text',
                                    'value'		=> $email_from_name,
                                    'default'		=> '',
                                    'placeholder'		=> get_bloginfo('title'),


                                );

                                $settings_tabs_field->generate_field($args);



                                $args = array(
                                    'id'		=> 'email_from',
                                    'parent'		=> 'user_verification_settings[email_templates_data]['.$key.']',
                                    'title'		=> __('Email from','user-verification'),
                                    'details'	=> __('Email from email address','user-verification'),
                                    'type'		=> 'text',
                                    'value'		=> $email_from,
                                    'default'		=> '',
                                    'placeholder'		=> get_bloginfo('admin_email'),


                                );

                                $settings_tabs_field->generate_field($args);

                                $args = array(
                                    'id'		=> 'reply_to_name',
                                    'parent'		=> 'user_verification_settings[email_templates_data]['.$key.']',
                                    'title'		=> __('Reply to name','user-verification'),
                                    'details'	=> __('Email reply to name','user-verification'),
                                    'type'		=> 'text',
                                    'value'		=> $reply_to_name,
                                    'default'		=> '',
                                    'placeholder'		=> get_bloginfo('title'),


                                );

                                $settings_tabs_field->generate_field($args);


                                $args = array(
                                    'id'		=> 'reply_to',
                                    'parent'		=> 'user_verification_settings[email_templates_data]['.$key.']',
                                    'title'		=> __('Reply to','user-verification'),
                                    'details'	=> __('Reply to email address','user-verification'),
                                    'type'		=> 'text',
                                    'value'		=> $reply_to,
                                    'default'		=> '',
                                    'placeholder'		=> get_bloginfo('admin_email'),


                                );

                                $settings_tabs_field->generate_field($args);



                                $args = array(
                                    'id'		=> 'subject',
                                    'parent'		=> 'user_verification_settings[email_templates_data]['.$key.']',
                                    'title'		=> __('Email subject','user-verification'),
                                    'details'	=> __('Write email subjects','user-verification'),
                                    'type'		=> 'text',
                                    'value'		=> $email_subject,
                                    'default'		=> '',
                                    'placeholder'		=> '',


                                );

                                $settings_tabs_field->generate_field($args);

                                $args = array(
                                    'id'		=> 'html',
                                    'css_id'		=> $key,
                                    'parent'		=> 'user_verification_settings[email_templates_data]['.$key.']',
                                    'title'		=> __('Email body','user-verification'),
                                    'details'	=> __('Write email body','user-verification'),
                                    'type'		=> 'wp_editor',

                                    'value'		=> $email_body,
                                    'default'		=> '',
                                    'placeholder'		=> '',


                                );

                                $settings_tabs_field->generate_field($args);

                                ob_start();
                                ?>
                                <ul>


                                    <?php

                                    if(!empty($parameters)):
                                        foreach ($parameters as $parameterId=>$parameter):
                                            ?>
                                            <li><code><?php echo $parameterId; ?></code> => <?php echo $parameter; ?></li>
                                        <?php
                                        endforeach;
                                    endif;
                                    ?>
                                </ul>
                                <?php


                                $custom_html = ob_get_clean();

                                $args = array(
                                    'id'		=> 'html',
//                                    'parent'		=> 'user_verification_settings[email_templates_data]['.$key.']',
                                    'title'		=> __('Parameter','user-verification'),
                                    'details'	=> __('Available parameter for this email template','user-verification'),
                                    'type'		=> 'custom_html',
                                    'html'		=> $custom_html,
                                    'default'		=> '',


                                );

                                $settings_tabs_field->generate_field($args);

                                ?>


                            </div>

                        </div>
                        <?php

                    }


                ?>


            </div>
            <?php


            $html = ob_get_clean();




            $args = array(
                'id'		=> 'license_manager_email_templates',
                //'parent'		=> '',
                'title'		=> __('Email templates','user-verification'),
                'details'	=> __('Customize email templates.','user-verification'),
                'type'		=> 'custom_html',
                //'multiple'		=> true,
                'html'		=> $html,
            );

            $settings_tabs_field->generate_field($args);




            ?>


        </div>
        <?php


    }
}





add_action('user_verification_settings_content_spam_protection', 'user_verification_settings_content_spam_protection');

function user_verification_settings_content_spam_protection(){


    $settings_tabs_field = new settings_tabs_field();

    $user_verification_settings = get_option('user_verification_settings');

    //delete_option('user_verification_settings');


    $enable_domain_block = isset($user_verification_settings['spam_protection']['enable_domain_block']) ? $user_verification_settings['spam_protection']['enable_domain_block'] : 'no';
    $blocked_domain = isset($user_verification_settings['spam_protection']['blocked_domain']) ? $user_verification_settings['spam_protection']['blocked_domain'] : array();
    $allowed_domain = isset($user_verification_settings['spam_protection']['allowed_domain']) ? $user_verification_settings['spam_protection']['allowed_domain'] : array();

    $enable_username_block = isset($user_verification_settings['spam_protection']['enable_username_block']) ? $user_verification_settings['spam_protection']['enable_username_block'] : 'no';
    $blocked_username = isset($user_verification_settings['spam_protection']['blocked_username']) ? $user_verification_settings['spam_protection']['blocked_username'] : array();

    $enable_browser_block = isset($user_verification_settings['spam_protection']['enable_browser_block']) ?
        $user_verification_settings['spam_protection']['enable_browser_block'] : 'no';
    $allowed_browsers = isset($user_verification_settings['spam_protection']['allowed_browsers']) ? $user_verification_settings['spam_protection']['allowed_browsers'] : array();


    //echo '<pre>'.var_export($_SERVER['HTTP_USER_AGENT'], true).'</pre>';

    ?>
    <div class="section">
        <div class="section-title"><?php echo __('Spam Protection', 'user-verification'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for spam protection.', 'user-verification'); ?></p>

        <?php


        $args = array(
            'id'		=> 'enable_domain_block',
            'parent'		=> 'user_verification_settings[spam_protection]',
            'title'		=> __('Enable domain block','user-verification'),
            'details'	=> __('You can enable email domain name blocking for spammy/temporary email account services.','user-verification'),
            'type'		=> 'select',
            'value'		=> $enable_domain_block,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
        );

        $settings_tabs_field->generate_field($args);

        $args = array(
            'id'		=> 'blocked_domain',
            'parent'		=> 'user_verification_settings[spam_protection]',
            'title'		=> __('Blocked domains','user-verification'),
            'details'	=> __('One domain per line. without http:// or https:// or www.','user-verification'),
            'type'		=> 'text_multi',
            'value'		=> $blocked_domain,
            'default'		=> array(),
            'placeholder' => __('domain.com','user-verification'),

        );

        $settings_tabs_field->generate_field($args);

        $args = array(
            'id'		=> 'allowed_domain',
            'parent'		=> 'user_verification_settings[spam_protection]',
            'title'		=> __('Allowed domains','user-verification'),
            'details'	=> __('One domain per line. without http:// or https:// or www','user-verification'),
            'type'		=> 'text_multi',
            'value'		=> $allowed_domain,
            'default'		=> array(),
            'placeholder' => __('domain.com','user-verification'),

        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'enable_username_block',
            'parent'		=> 'user_verification_settings[spam_protection]',
            'title'		=> __('Enable username block','user-verification'),
            'details'	=> __('User will not able to register blocked username, like admin, info, etc.','user-verification'),
            'type'		=> 'select',
            'value'		=> $enable_username_block,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
        );

        $settings_tabs_field->generate_field($args);



        $args = array(
            'id'		=> 'blocked_username',
            'parent'		=> 'user_verification_settings[spam_protection]',
            'title'		=> __('Blocked username','user-verification'),
            'details'	=> __('You can following string match <ul><li><b>^username</b> : String start with <b><i>username</i></b></li><li><b>username$</b> : String end by <b><i>username</i></b></li><li><b>username</b> : String contain <b><i>username</i></b></b></li></ul>','user-verification'),
            'type'		=> 'text_multi',
            'value'		=> $blocked_username,
            'default'		=> array(),
            'placeholder' => __('username','user-verification'),

        );

        $settings_tabs_field->generate_field($args);



        $args = array(
            'id'		=> 'enable_browser_block',
            'parent'		=> 'user_verification_settings[spam_protection]',
            'title'		=> __('Enable device/browser block','user-verification'),
            'details'	=> __('User will not able to register blocked device or browser, like chrome, safari, etc.','user-verification'),
            'type'		=> 'select',
            'value'		=> $enable_browser_block,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
        );

        //$settings_tabs_field->generate_field($args);



        $args = array(
            'id'		=> 'allowed_browsers',
            'parent'		=> 'user_verification_settings[spam_protection]',
            'title'		=> __('Allowed devices/browsers','user-verification'),
            'details'	=> __('Select the browser list to allow user login.','user-verification'),
            'type'		=> 'checkbox',
            'style'		=> array('inline'=>false ),

            'value'		=> $allowed_browsers,
            'args'		=> array('chrome'=>__('Chrome','user-verification'), 'safari'=>__('Safari','user-verification')
            ),

            'default'		=> array(),

        );

        //$settings_tabs_field->generate_field($args);





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
    $default_login_page = isset($user_verification_settings['recaptcha']['default_login_page']) ? $user_verification_settings['recaptcha']['default_login_page'] : 'no';
    $default_registration_page = isset($user_verification_settings['recaptcha']['default_registration_page']) ? $user_verification_settings['recaptcha']['default_registration_page'] : 'no';
    $default_lostpassword_page = isset($user_verification_settings['recaptcha']['default_lostpassword_page']) ? $user_verification_settings['recaptcha']['default_lostpassword_page'] : 'no';
    $comment_form = isset($user_verification_settings['recaptcha']['comment_form']) ? $user_verification_settings['recaptcha']['comment_form'] : 'no';



    //echo '<pre>'.var_export($user_verification_settings, true).'</pre>';

    ?>
    <div class="section">
        <div class="section-title"><?php echo __('reCAPTCHA', 'user-verification'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for reCAPTCHA.', 'user-verification'); ?></p>

        <?php

        $args = array(
            'id'		=> 'sitekey',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('reCAPTCHA sitekey','user-verification'),
            'details'	=> __('Google reCAPTCHA sitekey, please register here <a href="https://www.google.com/recaptcha/admin/">https://www.google.com/recaptcha/admin/</a>','user-verification'),
            'type'		=> 'text',
            'value'		=> $sitekey,
            'default'		=> '',
        );

        $settings_tabs_field->generate_field($args);

        $args = array(
            'id'		=> 'default_login_page',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('Recaptcha on default login page','user-verification'),
            'details'	=> __('Enable recaptcha on default login page.','user-verification'),
            'type'		=> 'select',
            'value'		=> $default_login_page,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'default_registration_page',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('Recaptcha on default registration page','user-verification'),
            'details'	=> __('Enable recaptcha on default registration page.','user-verification'),
            'type'		=> 'select',
            'value'		=> $default_registration_page,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'default_lostpassword_page',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('Recaptcha on default reset password page','user-verification'),
            'details'	=> __('Enable recaptcha on default reset password page.','user-verification'),
            'type'		=> 'select',
            'value'		=> $default_lostpassword_page,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'comment_form',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('Recaptcha on comment forms','user-verification'),
            'details'	=> __('Enable recaptcha on comment forms.','user-verification'),
            'type'		=> 'select',
            'value'		=> $comment_form,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
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
            <div class="section-title"><?php echo __('Get support', 'user-verification'); ?></div>
            <p class="description section-description"><?php echo __('Use following to get help and support from our expert team.', 'user-verification'); ?></p>

            <?php
            ob_start();
            ?>

            <p><?php echo __('Ask question for free on our forum and get quick reply from our expert team members.', 'user-verification'); ?></p>
            <a class="button" target="_blank" href="https://www.pickplugins.com/create-support-ticket/"><?php echo __('Create support ticket', 'user-verification'); ?></a>

            <p><?php echo __('Read our documentation before asking your question.', 'user-verification'); ?></p>
            <a class="button" target="_blank" href="https://pickplugins.com/documentation/user-verification/"><?php echo __('Documentation', 'user-verification'); ?></a>

            <p><?php echo __('Watch video tutorials.', 'user-verification'); ?></p>
            <a class="button" target="_blank" href="https://www.youtube.com/playlist?list=PL0QP7T2SN94bJmrpEqtjsj9nnR6jiKTDt"><i class="fab fa-youtube"></i> <?php echo __('All tutorials', 'user-verification'); ?></a>





            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'get_support',
                //'parent'		=> '',
                'title'		=> __('Ask question','user-verification'),
                'details'	=> '',
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>

            <p class="">We wish your 2 minutes to write your feedback about the <b>Post Grid</b> plugin. give us <span style="color: #ffae19"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span></p>

            <a target="_blank" href="https://wordpress.org/support/plugin/user-verification/reviews/#new-post" class="button"><i class="fab fa-wordpress"></i> Write a review</a>


            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'reviews',
                //'parent'		=> '',
                'title'		=> __('Submit reviews','user-verification'),
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






add_action('user_verification_settings_save', 'user_verification_settings_save');

function user_verification_settings_save(){

    $user_verification_settings = isset($_POST['user_verification_settings']) ?  stripslashes_deep($_POST['user_verification_settings']) : array();
    update_option('user_verification_settings', $user_verification_settings);
}
