<?php
if (!defined('ABSPATH')) exit;  // if direct access





/*
reCaptcha on Login form
callback: user_verification_login_form_recaptcha
*/


add_action('login_form', 'user_verification_login_form_recaptcha');
function user_verification_login_form_recaptcha()
{

    $user_verification_settings = get_option('user_verification_settings');
    $default_login_page = isset($user_verification_settings['recaptcha']['default_login_page']) ? $user_verification_settings['recaptcha']['default_login_page'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';
    $recaptcha_version = !empty($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';



    if ($default_login_page == 'yes') :
?>
        <?php

        if ($recaptcha_version == 'v2_checkbox') :
        ?>
            <div class="g-recaptcha" <?php if ($recaptcha_version == 'v2_invisible') echo 'data-size="invisible"'; ?> data-sitekey="<?php echo esc_attr($sitekey); ?>"></div>
        <?php
        elseif ($recaptcha_version == 'v3') :
        ?>
            <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response">
            <input type="hidden" name="action" value="validate_captcha">
            <script>
                grecaptcha.ready(function() {
                    // do request for recaptcha token
                    // response is promise with passed token
                    grecaptcha.execute('<?php echo esc_attr($sitekey); ?>', {
                            action: 'validate_captcha'
                        })
                        .then(function(token) {
                            // add token value to form
                            document.getElementById('g-recaptcha-response').value = token;
                        });
                });
            </script>
        <?php
        endif;
        ?>



    <?php
    endif;
}



/*
Check reCaptcha for default login form and WooCommerce login form
callback: user_verification_login_recaptcha_validate

*/

add_filter('wp_authenticate_user', 'user_verification_login_recaptcha_validate', 10, 2);
function user_verification_login_recaptcha_validate($user, $password)
{
    $return_value = $user;


    $user_verification_settings = get_option('user_verification_settings');
    $default_login_page = isset($user_verification_settings['recaptcha']['default_login_page']) ? $user_verification_settings['recaptcha']['default_login_page'] : 'no';
    $wc_login_form = isset($user_verification_settings['recaptcha']['wc_login_form']) ? $user_verification_settings['recaptcha']['wc_login_form'] : 'no';

    $captcha_error = isset($user_verification_settings['messages']['captcha_error']) ? $user_verification_settings['messages']['captcha_error'] : '';
    $secretkey = isset($user_verification_settings['recaptcha']['secretkey']) ? $user_verification_settings['recaptcha']['secretkey'] : '';


    if (isset($_POST['g-recaptcha-response'])) :
        $captcha = isset($_POST['g-recaptcha-response']) ? sanitize_text_field($_POST['g-recaptcha-response']) : '';

        $response = wp_remote_get("https://www.google.com/recaptcha/api/siteverify?secret=" . $secretkey . "&response=" . $captcha);
        $response = json_decode($response["body"], true);




        if ($default_login_page == 'yes' && $response["success"] != true) {

            $return_value = new WP_Error('loginCaptchaError', $captcha_error);
        }


        if ($wc_login_form == 'yes' && $response["success"] != true) {

            $return_value = new WP_Error('loginCaptchaError', $captcha_error);
        }


    endif;


    return $return_value;
}




/*
reCaptcha on Register form
callback: user_verification_register_form_recaptcha
*/

add_action('register_form', 'user_verification_register_form_recaptcha');
function user_verification_register_form_recaptcha()
{


    $user_verification_settings = get_option('user_verification_settings');
    $default_registration_page = isset($user_verification_settings['recaptcha']['default_registration_page']) ? $user_verification_settings['recaptcha']['default_registration_page'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';
    $recaptcha_version = isset($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';


    if ($default_registration_page == 'yes') :
    ?>
        <?php wp_enqueue_script('recaptcha_js'); ?>


        <?php

        if ($recaptcha_version == 'v2_checkbox') :
        ?>
            <div class="g-recaptcha" <?php if ($recaptcha_version == 'v2_invisible') echo 'data-size="invisible"'; ?> data-sitekey="<?php echo esc_attr($sitekey); ?>"></div>
        <?php
        elseif ($recaptcha_version == 'v3') :
        ?>
            <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response">
            <input type="hidden" name="action" value="validate_captcha">
            <script>
                grecaptcha.ready(function() {
                    // do request for recaptcha token
                    // response is promise with passed token
                    grecaptcha.execute('<?php echo esc_attr($sitekey); ?>', {
                            action: 'validate_captcha'
                        })
                        .then(function(token) {
                            // add token value to form
                            document.getElementById('g-recaptcha-response').value = token;
                        });
                });
            </script>
        <?php
        endif;
        ?>



        <?php
    endif;
}



/*
Validate reCaptcha on register form
callback: user_verification_woocommerce_register_recaptcha_validate
*/


add_filter('registration_errors', 'user_verification_registration_form_recaptcha_validate', 10, 3);

function user_verification_registration_form_recaptcha_validate($errors, $sanitized_user_login, $user_email)
{

    $user_verification_settings = get_option('user_verification_settings');
    $default_registration_page = isset($user_verification_settings['recaptcha']['default_registration_page']) ? $user_verification_settings['recaptcha']['default_registration_page'] : '';
    $captcha_error = isset($user_verification_settings['messages']['captcha_error']) ? $user_verification_settings['messages']['captcha_error'] : __('Captcha Error. Please try again.', 'user-verification');

    $secretkey = isset($user_verification_settings['recaptcha']['secretkey']) ? $user_verification_settings['recaptcha']['secretkey'] : '';
    if (isset($_POST['g-recaptcha-response'])) {
        $captcha = isset($_POST['g-recaptcha-response']) ? sanitize_text_field($_POST['g-recaptcha-response']) : '';

        $response = wp_remote_get("https://www.google.com/recaptcha/api/siteverify?secret=" . $secretkey . "&response=" . $captcha);
        $response = json_decode($response["body"], true);

        if ($default_registration_page == 'yes') :
            if ($response["success"] != true) {
                $errors->add('loginCaptchaError',  $captcha_error);
            }
        endif;
    }




    return $errors;
}


/*
reCaptcha on Lost password form
callback: user_verification_lostpassword_recaptcha
*/

add_action('lostpassword_form', 'user_verification_lostpassword_recaptcha');
function user_verification_lostpassword_recaptcha()
{
    $user_verification_settings = get_option('user_verification_settings');
    $default_lostpassword_page = isset($user_verification_settings['recaptcha']['default_lostpassword_page']) ? $user_verification_settings['recaptcha']['default_lostpassword_page'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';
    $recaptcha_version = isset($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';



    if ($default_lostpassword_page == 'yes') :

        if ($recaptcha_version == 'v2_checkbox') :
        ?>
            <div class="g-recaptcha" <?php if ($recaptcha_version == 'v2_invisible') echo 'data-size="invisible"'; ?> data-sitekey="<?php echo esc_attr($sitekey); ?>"></div>
        <?php
        elseif ($recaptcha_version == 'v3') :
        ?>
            <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response">
            <input type="hidden" name="action" value="validate_captcha">
            <script>
                grecaptcha.ready(function() {
                    // do request for recaptcha token
                    // response is promise with passed token
                    grecaptcha.execute('<?php echo esc_attr($sitekey); ?>', {
                            action: 'validate_captcha'
                        })
                        .then(function(token) {
                            // add token value to form
                            document.getElementById('g-recaptcha-response').value = token;
                        });
                });
            </script>
        <?php
        endif;
        ?>


    <?php
    endif;
}


/*
reCaptcha on WooCommerce Login form
callback: user_verification_woocommerce_login_form_recaptcha
*/

add_action('woocommerce_login_form', 'user_verification_woocommerce_login_form_recaptcha');
function user_verification_woocommerce_login_form_recaptcha()
{

    $user_verification_settings = get_option('user_verification_settings');
    $wc_login_form = isset($user_verification_settings['recaptcha']['wc_login_form']) ? $user_verification_settings['recaptcha']['wc_login_form'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';
    $recaptcha_version = isset($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';



    if ($wc_login_form == 'yes') :

    ?>

        <?php wp_enqueue_script('recaptcha_js'); ?>

        <?php

        if ($recaptcha_version == 'v2_checkbox') :
        ?>
            <div class="g-recaptcha" <?php if ($recaptcha_version == 'v2_invisible') echo 'data-size="invisible"'; ?> data-sitekey="<?php echo esc_attr($sitekey); ?>"></div>
        <?php
        elseif ($recaptcha_version == 'v3') :

        ?>
            <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response">
            <input type="hidden" name="action" value="validate_captcha">
            <script>
                grecaptcha.ready(function() {
                    // do request for recaptcha token
                    // response is promise with passed token
                    grecaptcha.execute('<?php echo esc_attr($sitekey); ?>', {
                            action: 'validate_captcha'
                        })
                        .then(function(token) {
                            // add token value to form
                            document.getElementById('g-recaptcha-response').value = token;
                        });
                });
            </script>
        <?php
        endif;
        ?>


        <br>
    <?php
    endif;
}


/*
reCaptcha on WooCommerce register form
callback: user_verification_woocommerce_register_form_recaptcha
*/


add_action('woocommerce_register_form', 'user_verification_woocommerce_register_form_recaptcha');
function user_verification_woocommerce_register_form_recaptcha()
{

    $user_verification_settings = get_option('user_verification_settings');
    $wc_register_form = isset($user_verification_settings['recaptcha']['wc_register_form']) ? $user_verification_settings['recaptcha']['wc_register_form'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';
    $recaptcha_version = isset($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';



    if ($wc_register_form == 'yes') :
    ?>

        <?php wp_enqueue_script('recaptcha_js'); ?>

        <?php

        if ($recaptcha_version == 'v2_checkbox') :
        ?>
            <div class="g-recaptcha" <?php if ($recaptcha_version == 'v2_invisible') echo 'data-size="invisible"'; ?> data-sitekey="<?php echo esc_attr($sitekey); ?>"></div>
        <?php
        elseif ($recaptcha_version == 'v3') :
        ?>
            <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response">
            <input type="hidden" name="action" value="validate_captcha">
            <script>
                grecaptcha.ready(function() {
                    // do request for recaptcha token
                    // response is promise with passed token
                    grecaptcha.execute('<?php echo esc_attr($sitekey); ?>', {
                            action: 'validate_captcha'
                        })
                        .then(function(token) {
                            // add token value to form
                            document.getElementById('g-recaptcha-response').value = token;
                        });
                });
            </script>
        <?php
        endif;
        ?>



    <?php
    endif;
}




/*
Validate reCaptcha on WooCommerce register form
callback: user_verification_woocommerce_register_recaptcha_validate
*/

add_action('woocommerce_register_post', 'user_verification_woocommerce_register_recaptcha_validate', 10, 3);

function user_verification_woocommerce_register_recaptcha_validate($username, $email, $validation_errors)
{

    $user_verification_settings = get_option('user_verification_settings');
    $wc_register_form = isset($user_verification_settings['recaptcha']['wc_register_form']) ? $user_verification_settings['recaptcha']['wc_register_form'] : '';

    $captcha_error = isset($user_verification_settings['messages']['captcha_error']) ? $user_verification_settings['messages']['captcha_error'] : __('Captcha Error. Please try again.', 'user-verification');
    $secretkey = isset($user_verification_settings['recaptcha']['secretkey']) ? $user_verification_settings['recaptcha']['secretkey'] : '';
    $res = isset($_POST['g-recaptcha-response']) ? sanitize_text_field($_POST['g-recaptcha-response']) : '';



    if ($wc_register_form == 'yes' && isset($_POST['g-recaptcha-response'])) :

        $response = wp_remote_get("https://www.google.com/recaptcha/api/siteverify?secret=" . $secretkey . "&response=" . $res);
        $response = json_decode($response["body"], true);

        if ($response["success"] != true) {
            $validation_errors->add('registerCaptchaError', $captcha_error);
        }

    endif;


    return $validation_errors;
}



/*
reCaptcha on WooCoommerce lost password form
callback: user_verification_woocommerce_lostpassword_form_recaptcha
*/

add_action('woocommerce_lostpassword_form', 'user_verification_woocommerce_lostpassword_form_recaptcha');
function user_verification_woocommerce_lostpassword_form_recaptcha()
{

    $user_verification_settings = get_option('user_verification_settings');
    $wc_lostpassword_form = isset($user_verification_settings['recaptcha']['wc_lostpassword_form']) ? $user_verification_settings['recaptcha']['wc_lostpassword_form'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';
    $recaptcha_version = isset($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';




    if ($wc_lostpassword_form == 'yes') :
    ?>
        <?php wp_enqueue_script('recaptcha_js'); ?>

        <?php

        if ($recaptcha_version == 'v2_checkbox') :
        ?>
            <div class="g-recaptcha" <?php if ($recaptcha_version == 'v2_invisible') echo 'data-size="invisible"'; ?> data-sitekey="<?php echo esc_attr($sitekey); ?>"></div>
        <?php
        elseif ($recaptcha_version == 'v3') :
        ?>
            <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response">
            <input type="hidden" name="action" value="validate_captcha">
            <script>
                grecaptcha.ready(function() {
                    // do request for recaptcha token
                    // response is promise with passed token
                    grecaptcha.execute('<?php echo esc_attr($sitekey); ?>', {
                            action: 'validate_captcha'
                        })
                        .then(function(token) {
                            // add token value to form
                            document.getElementById('g-recaptcha-response').value = token;
                        });
                });
            </script>
        <?php
        endif;
        ?>


<?php
    endif;
}



/*
Validated reCaptcha on lost password form
callback: user_verification_lostpassword_recaptcha_validate
*/


add_action('lostpassword_post', 'user_verification_lostpassword_recaptcha_validate');


function user_verification_lostpassword_recaptcha_validate($validation_errors)
{

    $user_verification_settings = get_option('user_verification_settings');
    $wc_lostpassword_form = isset($user_verification_settings['recaptcha']['wc_lostpassword_form']) ? $user_verification_settings['recaptcha']['wc_lostpassword_form'] : '';
    $default_lostpassword_page = isset($user_verification_settings['recaptcha']['default_lostpassword_page']) ? $user_verification_settings['recaptcha']['default_lostpassword_page'] : '';

    $captcha_error = isset($user_verification_settings['messages']['captcha_error']) ? $user_verification_settings['messages']['captcha_error'] : __('Captcha Error. Please try again.', 'user-verification');
    $secretkey = isset($user_verification_settings['recaptcha']['secretkey']) ? $user_verification_settings['recaptcha']['secretkey'] : '';
    $res = isset($_POST['g-recaptcha-response']) ? sanitize_text_field($_POST['g-recaptcha-response']) : '';



    if (($wc_lostpassword_form == 'yes' || $default_lostpassword_page == 'yes') && isset($_POST['g-recaptcha-response'])) :

        $response = wp_remote_get("https://www.google.com/recaptcha/api/siteverify?secret=" . $secretkey . "&response=" . $res);
        $response = json_decode($response["body"], true);

        if ($response["success"] != true) {
            $validation_errors->add('registerCaptchaError', $captcha_error);
        }

    endif;


    return $validation_errors;
}








/*
reCaptcha on post single Comment forms
callback: user_verification_comment_form_recaptcha
*/



add_filter('comment_form_defaults', 'user_verification_comment_form_recaptcha');
function user_verification_comment_form_recaptcha($default)
{

    $user_verification_settings = get_option('user_verification_settings');

    $comment_form = isset($user_verification_settings['recaptcha']['comment_form']) ? $user_verification_settings['recaptcha']['comment_form'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';
    $recaptcha_version = isset($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';



    if ($comment_form == 'yes') :
        wp_enqueue_script('recaptcha_js');
        $html = '';
        $html .= '<div class="g-recaptcha" ';

        if ($recaptcha_version == 'v2_invisible') {
            $html .= ' data-size="invisible" ';
        }

        $html .= 'data-sitekey="' . esc_attr($sitekey) . '"></div>';

        $default['fields']['recaptcha'] = $html;

    endif;


    return $default;
}



/*

Validated reCaptcha on comment forms
callback: user_verification_comment_form_recaptcha_validate
*/


add_filter('preprocess_comment', 'user_verification_comment_form_recaptcha_validate');
function user_verification_comment_form_recaptcha_validate($commentdata)
{

    $user_verification_settings = get_option('user_verification_settings');

    $comment_form = isset($user_verification_settings['recaptcha']['comment_form']) ? $user_verification_settings['recaptcha']['comment_form'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';

    $secretkey = isset($user_verification_settings['recaptcha']['secretkey']) ? $user_verification_settings['recaptcha']['secretkey'] : '';

    if (isset($_POST['g-recaptcha-response'])) {
        $res = isset($_POST['g-recaptcha-response']) ? sanitize_text_field($_POST['g-recaptcha-response']) : '';

        $response = wp_remote_get("https://www.google.com/recaptcha/api/siteverify?secret=" . $secretkey . "&response=" . $res);
        $response = json_decode($response["body"], true);

        if ($comment_form == 'yes') :
            if ($response["success"] != true) {
                wp_die(__('Captcha error, please try again.', 'user-verification'));
            }
        endif;
    }



    return $commentdata;
}
