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
            'details'	=> __('Verification checker page where you place the shortcode <code>[user_verification_check]</code>, please create a page and use this shortcode uder post content.','user-verification'),
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
            'details'	=> __('Yes means, users click on the Account activation link from email and they login automatically to your website, No means they don\'t','user-verification'),
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
            'title'		=> __('Activation key haa sent','user-verification'),
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


                        $enable = isset($templates_data_display['enable']) ? $templates_data_display['enable'] : '';
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


                                <div class="setting-field">
                                    <div class="field-lable"><?php echo __('Enable?', 'user-verification'); ?></div>
                                    <div class="field-input">
                                        <select name="user_verification_settings[email_templates_data][<?php echo $key; ?>][enable]" >
                                            <option <?php echo selected($enable,'yes'); ?> value="yes" ><?php echo __('Yes', 'user-verification'); ?></option>
                                            <option <?php echo selected($enable,'no'); ?>  value="no" ><?php echo __('No', 'user-verification'); ?></option>
                                        </select>
                                        <p class="description"><?php echo __('Enable or disable this email notification.', 'user-verification'); ?></p>
                                    </div>
                                </div>


                                <div class="setting-field">
                                    <div class="field-lable"><?php echo __('Email Bcc', 'user-verification'); ?></div>
                                    <div class="field-input">
                                        <input placeholder="hello_1@hello.com,hello_2@hello.com" type="text" name="user_verification_settings[email_templates_data][<?php echo $key; ?>][email_bcc]" value="<?php echo $email_bcc; ?>" />
                                        <p class="description"><?php echo __('Send a copy to these email(Bcc)', 'user-verification'); ?></p>
                                    </div>
                                </div>

                                <div class="setting-field">
                                    <div class="field-lable"><?php echo __('Email from name', 'user-verification'); ?></div>
                                    <div class="field-input">
                                        <input placeholder="<?php echo __('Your name', 'user-verification'); ?>" type="text" name="user_verification_settings[email_templates_data][<?php echo $key; ?>][email_from_name]" value="<?php echo $email_from_name; ?>" />
                                        <p class="description"><?php echo __('Email send from name', 'user-verification'); ?></p>
                                    </div>
                                </div>

                                <div class="setting-field">
                                    <div class="field-lable"><?php echo __('Email from', 'user-verification'); ?></div>
                                    <div class="field-input">
                                        <input placeholder="hello_1@hello.com" type="text" name="user_verification_settings[email_templates_data][<?php echo $key; ?>][email_from]" value="<?php echo $email_from; ?>" />
                                        <p class="description"><?php echo __('Email send from', 'user-verification'); ?></p>
                                    </div>
                                </div>


                                <div class="setting-field">
                                    <div class="field-lable"><?php echo __('Reply to name', 'user-verification'); ?></div>
                                    <div class="field-input">
                                        <input placeholder="<?php echo __('Your name', 'user-verification'); ?>" type="text" name="user_verification_settings[email_templates_data][<?php echo $key; ?>][reply_to_name]" value="<?php echo $reply_to_name; ?>" />
                                        <p class="description"><?php echo __('Email reply to name', 'user-verification'); ?></p>
                                    </div>
                                </div>

                                <div class="setting-field">
                                    <div class="field-lable"><?php echo __('Reply to', 'user-verification'); ?></div>
                                    <div class="field-input">
                                        <input placeholder="hello_1@hello.com" type="text" name="user_verification_settings[email_templates_data][<?php echo $key; ?>][reply_to]" value="<?php echo $reply_to; ?>" />
                                        <p class="description"><?php echo __('Reply to email address', 'user-verification'); ?></p>
                                    </div>
                                </div>




                                <div class="setting-field">
                                    <div class="field-lable"><?php echo __('Email Subject', 'user-verification'); ?></div>
                                    <div class="field-input">
                                        <input type="text" name="user_verification_settings[email_templates_data][<?php echo $key; ?>][subject]" value="<?php echo $email_subject; ?>" />
                                        <p class="description"><?php echo __('Write email subject', 'user-verification'); ?></p>
                                    </div>
                                </div>

                                <div class="setting-field">
                                    <div class="field-lable"><?php echo __('Email Body', 'user-verification'); ?></div>
                                    <div class="field-input">
                                        <?php

                                        wp_editor( $email_body, $key, $settings = array('textarea_name'=>'user_verification_settings[email_templates_data]['.$key.'][html]','media_buttons'=>false,'wpautop'=>true,'teeny'=>true,'editor_height'=>'400px', ) );

                                        ?>
                                        <p class="description"><?php echo __('Write email body', 'user-verification'); ?></p>
                                    </div>
                                </div>

                                <div class="setting-field">
                                    <div class="field-lable"><?php echo __('Parameter', 'user-verification'); ?></div>
                                    <div class="field-input">

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

                                        <p class="description"><?php echo __('Available parameter for this email template', 'user-verification'); ?></p>
                                    </div>
                                </div>

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
        <div class="section-title"><?php echo __('WooCommerce', 'user-verification'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for WooCommerce.', 'user-verification'); ?></p>

        <?php


        $args = array(
            'id'		=> 'disable_auto_login',
            'parent'		=> 'user_verification_settings[woocommerce]',
            'title'		=> __('Disable auto login','user-verification'),
            'details'	=> __('You can disable auto login after registration via WooCommerce register form. this also disable login on checkout page.','user-verification'),
            'type'		=> 'select',
            'value'		=> $disable_auto_login,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
        );

        $settings_tabs_field->generate_field($args);

        $args = array(
            'id'		=> 'message_after_registration',
            'parent'		=> 'user_verification_settings[woocommerce]',
            'title'		=> __('Display Message after successfully registration','user-verification'),
            'details'	=> __('You can display custom message on after successfully registration via WooCommerce register form.','user-verification'),
            'type'		=> 'text',
            'value'		=> $message_after_registration,
            'default'		=> '',
        );

        $settings_tabs_field->generate_field($args);





        $args = array(
            'id'		=> 'redirect_after_payment',
            'parent'		=> 'user_verification_settings[email_verification]',
            'title'		=> __('Redirect after payment','user-verification'),
            'details'	=> __('You can set custom page to redirect after successfully payment, and this page should check verification status and take action to stay logged-in or logged-out the user automatically. please use following shortcode <code>[user_verification_message message="Please check email to verify account first"]</code> to check verification status, it will automatically logged-out the unverified user and display the custom message.','user-verification'),
            'type'		=> 'select',
            'value'		=> $redirect_after_payment,
            'default'		=> '',
            'args'		=> user_verification_get_pages_list(),

        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'disable_auto_login',
            'parent'		=> 'user_verification_settings[woocommerce]',
            'title'		=> __('Disable auto login','user-verification'),
            'details'	=> __('You can disable auto login after registration via WooCommerce register form. this also disable login on checkout page.','user-verification'),
            'type'		=> 'select',
            'value'		=> $disable_auto_login,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
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


    $enable_domain_block = isset($user_verification_settings['spam_protection']['enable_domain_block']) ? $user_verification_settings['spam_protection']['enable_domain_block'] : 'no';
    $blocked_domain = isset($user_verification_settings['spam_protection']['blocked_domain']) ? $user_verification_settings['spam_protection']['blocked_domain'] : array();
    $allowed_domain = isset($user_verification_settings['spam_protection']['allowed_domain']) ? $user_verification_settings['spam_protection']['allowed_domain'] : array();

    $enable_username_block = isset($user_verification_settings['spam_protection']['enable_username_block']) ? $user_verification_settings['spam_protection']['enable_username_block'] : 'no';
    $blocked_username = isset($user_verification_settings['spam_protection']['blocked_username']) ? $user_verification_settings['spam_protection']['blocked_username'] : array();

    //echo '<pre>'.var_export($user_verification_settings, true).'</pre>';

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






add_action('user_verification_settings_content_recaptcha', 'user_verification_settings_content_recaptcha_woo');

function user_verification_settings_content_recaptcha_woo(){


    $settings_tabs_field = new settings_tabs_field();

    $user_verification_settings = get_option('user_verification_settings');

    //delete_option('user_verification_settings');


    $wc_login_form = isset($user_verification_settings['recaptcha']['wc_login_form']) ? $user_verification_settings['recaptcha']['wc_login_form'] : 'no';
    $wc_register_form = isset($user_verification_settings['recaptcha']['wc_register_form']) ? $user_verification_settings['recaptcha']['wc_register_form'] : 'no';
    $wc_lostpassword_form = isset($user_verification_settings['recaptcha']['wc_lostpassword_form']) ? $user_verification_settings['recaptcha']['wc_lostpassword_form'] : 'no';



    //echo '<pre>'.var_export($user_verification_settings, true).'</pre>';

    ?>
    <div class="section">
        <div class="section-title"><?php echo __('WooCommerce reCAPTCHA', 'user-verification'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for WooCommerce reCAPTCHA.', 'user-verification'); ?></p>

        <?php


        $args = array(
            'id'		=> 'wc_login_form',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('WooCommerce login from','user-verification'),
            'details'	=> __('Enable reCAPTCHA on WooCommerce login from','user-verification'),
            'type'		=> 'select',
            'value'		=> $wc_login_form,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'wc_register_form',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('WooCommerce register from','user-verification'),
            'details'	=> __('Enable reCAPTCHA on WooCommerce register from','user-verification'),
            'type'		=> 'select',
            'value'		=> $wc_register_form,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
        );

        $settings_tabs_field->generate_field($args);

        $args = array(
            'id'		=> 'wc_lostpassword_form',
            'parent'		=> 'user_verification_settings[recaptcha]',
            'title'		=> __('WooCommerce lost password from','user-verification'),
            'details'	=> __('Enable reCAPTCHA on WooCommerce lost password from','user-verification'),
            'type'		=> 'select',
            'value'		=> $wc_lostpassword_form,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
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


    $disable_auto_login = isset($user_verification_settings['ultimate_member']['disable_auto_login']) ? $user_verification_settings['ultimate_member']['disable_auto_login'] : 'no';
    $message_before_header = isset($user_verification_settings['ultimate_member']['message_before_header']) ? $user_verification_settings['ultimate_member']['message_before_header'] : '';



    //echo '<pre>'.var_export($user_verification_settings, true).'</pre>';

    ?>
    <div class="section">
        <div class="section-title"><?php echo __('WooCommerce', 'user-verification'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for WooCommerce.', 'user-verification'); ?></p>

        <?php


        $args = array(
            'id'		=> 'disable_auto_login',
            'parent'		=> 'user_verification_settings[ultimate_member]',
            'title'		=> __('Disable auto login','user-verification'),
            'details'	=> __('You can disable auto login after registration via ultimate member register form.','user-verification'),
            'type'		=> 'select',
            'value'		=> $disable_auto_login,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'message_before_header',
            'parent'		=> 'user_verification_settings[ultimate_member]',
            'title'		=> __('Display Message after successfully registration','user-verification'),
            'details'	=> __('You can display custom message at profile header after redirect profile page via Ultimate Member.','user-verification'),
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


    $disable_auto_login = isset($user_verification_settings['paid_memberships_pro']['disable_auto_login']) ? $user_verification_settings['paid_memberships_pro']['disable_auto_login'] : 'no';
    $message_checkout_page = isset($user_verification_settings['paid_memberships_pro']['message_checkout_page']) ? $user_verification_settings['paid_memberships_pro']['message_checkout_page'] : '';
    $redirect_timout = isset($user_verification_settings['paid_memberships_pro']['redirect_timout']) ? $user_verification_settings['paid_memberships_pro']['redirect_timout'] : '';
    $redirect_after_checkout = isset($user_verification_settings['paid_memberships_pro']['redirect_after_checkout']) ? $user_verification_settings['paid_memberships_pro']['redirect_after_checkout'] : '';



    //echo '<pre>'.var_export($user_verification_settings, true).'</pre>';

    ?>
    <div class="section">
        <div class="section-title"><?php echo __('WooCommerce', 'user-verification'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for WooCommerce.', 'user-verification'); ?></p>

        <?php


        $args = array(
            'id'		=> 'disable_auto_login',
            'parent'		=> 'user_verification_settings[ultimate_member]',
            'title'		=> __('Disable auto login','user-verification'),
            'details'	=> __('You can disable auto login after registration via Paid Memberships Pro checkout(register) form.','user-verification'),
            'type'		=> 'select',
            'value'		=> $disable_auto_login,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'message_checkout_page',
            'parent'		=> 'user_verification_settings[ultimate_member]',
            'title'		=> __('Display message on checkout confirmation page','user-verification'),
            'details'	=> __('You can display custom message on checkout confirmation page.','user-verification'),
            'type'		=> 'text',
            'value'		=> $message_checkout_page,
            'default'		=> '',
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'redirect_timout',
            'parent'		=> 'user_verification_settings[ultimate_member]',
            'title'		=> __('Automatically logout after second','user-verification'),
            'details'	=> __('After successfully checkout user will wait for few second to display the message and then redirect to another page. <br> 1000 = 1 second','user-verification'),
            'type'		=> 'text',
            'value'		=> $redirect_timout,
            'default'		=> '',
            'placeholder'		=> '3000',

        );

        $settings_tabs_field->generate_field($args);



        $args = array(
            'id'		=> 'redirect_after_checkout',
            'parent'		=> 'user_verification_settings[email_verification]',
            'title'		=> __('Redirect to this page after checkout','user-verification'),
            'details'	=> __('You can set custom page to redirect and logout after few second passed, where user can see instruction what to do next to get verified.','user-verification'),
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
