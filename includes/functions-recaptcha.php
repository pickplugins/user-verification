<?php
if ( ! defined('ABSPATH')) exit;  // if direct access


// Google recaptcha for Default WordPress Login form.


add_action('login_form', 'wdm_login_form_captcha');
function wdm_login_form_captcha(){

    $user_verification_settings = get_option('user_verification_settings');
    $default_login_page = isset($user_verification_settings['recaptcha']['default_login_page']) ? $user_verification_settings['recaptcha']['default_login_page'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';



    if($default_login_page == 'yes'):
	    ?>
        <script src='https://www.google.com/recaptcha/api.js'></script>
        <div class="g-recaptcha" data-sitekey="<?php echo $sitekey; ?>"></div>

	    <?php
    endif;
}



add_filter('wp_authenticate_user','wdm_validate_login_captcha',10,2);
function wdm_validate_login_captcha($user, $password) {
	$return_value = $user;


    $user_verification_settings = get_option('user_verification_settings');
    $default_login_page = isset($user_verification_settings['recaptcha']['default_login_page']) ? $user_verification_settings['recaptcha']['default_login_page'] : '';
    $captcha_error = isset($user_verification_settings['messages']['captcha_error']) ? $user_verification_settings['messages']['captcha_error'] : '';


	if($default_login_page == 'yes' && isset($_POST['g-recaptcha-response'])):
		$captcha = isset($_POST['g-recaptcha-response']) ? sanitize_text_field($_POST['g-recaptcha-response']) : '';

		if(empty($captcha)){

			$return_value = new WP_Error( 'loginCaptchaError', $captcha_error );
		}
    endif;


	return $return_value;
}






add_action('register_form', 'uv_recaptcha_register_form');
function uv_recaptcha_register_form(){


    $user_verification_settings = get_option('user_verification_settings');
    $default_registration_page = isset($user_verification_settings['recaptcha']['default_registration_page']) ? $user_verification_settings['recaptcha']['default_registration_page'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';


	if($default_registration_page == 'yes'):
		?>
        <script src='https://www.google.com/recaptcha/api.js'></script>
        <div class="g-recaptcha" data-sitekey="<?php echo $sitekey; ?>"></div>

		<?php
	endif;


}

add_filter( 'registration_errors', 'uv_registration_errors', 10, 3 );

function uv_registration_errors( $errors, $sanitized_user_login, $user_email ) {

    $user_verification_settings = get_option('user_verification_settings');
    $default_registration_page = isset($user_verification_settings['recaptcha']['default_registration_page']) ? $user_verification_settings['recaptcha']['default_registration_page'] : '';
    $captcha_error = isset($user_verification_settings['messages']['captcha_error']) ? $user_verification_settings['messages']['captcha_error'] : __('Captcha Error. Please try again.','user-verification');


	if($default_registration_page == 'yes'):
		if ( empty( $_POST['g-recaptcha-response'] ) ) {
			$errors->add( 'loginCaptchaError',  $captcha_error  );
		}
    endif;



	return $errors;
}




add_action('lostpassword_form', 'uv_recaptcha_password_reset_form');
function uv_recaptcha_password_reset_form(){
    $user_verification_settings = get_option('user_verification_settings');
    $default_lostpassword_page = isset($user_verification_settings['recaptcha']['default_lostpassword_page']) ? $user_verification_settings['recaptcha']['default_lostpassword_page'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';



	if($default_lostpassword_page == 'yes'):
		?>

        <script src='https://www.google.com/recaptcha/api.js'></script>
        <div class="g-recaptcha" data-sitekey="<?php echo $sitekey; ?>"></div>
        <br>


		<?php
	endif;


}



add_filter( 'lostpassword_post', 'uv_lostpassword_post_errors', 10, 3 );
function uv_lostpassword_post_errors( $errors ) {

    $user_verification_settings = get_option('user_verification_settings');
    $default_lostpassword_page = isset($user_verification_settings['recaptcha']['default_lostpassword_page']) ? $user_verification_settings['recaptcha']['default_lostpassword_page'] : '';
    $captcha_error = isset($user_verification_settings['messages']['captcha_error']) ? $user_verification_settings['messages']['captcha_error'] : __('Captcha Error. Please try again.','user-verification');

	if($default_lostpassword_page == 'yes' && isset($_POST['g-recaptcha-response'])):
		$captcha = isset($_POST['g-recaptcha-response']) ? sanitize_text_field($_POST['g-recaptcha-response']) : '';
		if ( empty( $_POST['g-recaptcha-response'] ) ) {
			$errors->add( 'loginCaptchaError',  $captcha_error  );
		}
	endif;

	return $errors;
}


add_action('woocommerce_login_form', 'uv_recaptcha_wc_login_form');
function uv_recaptcha_wc_login_form(){

    $user_verification_settings = get_option('user_verification_settings');
    $wc_login_form = isset($user_verification_settings['recaptcha']['wc_login_form']) ? $user_verification_settings['recaptcha']['wc_login_form'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';




	if($wc_login_form == 'yes'):
		?>

        <script src='https://www.google.com/recaptcha/api.js'></script>
        <div class="g-recaptcha" data-sitekey="<?php echo $sitekey; ?>"></div>
        <br>
		<?php
	endif;


}




add_action('woocommerce_register_form', 'uv_recaptcha_wc_register_form');
function uv_recaptcha_wc_register_form(){

    $user_verification_settings = get_option('user_verification_settings');
    $wc_register_form = isset($user_verification_settings['recaptcha']['wc_register_form']) ? $user_verification_settings['recaptcha']['wc_register_form'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';



	if($wc_register_form == 'yes' ):
        ?>

        <script src='https://www.google.com/recaptcha/api.js'></script>
        <div class="g-recaptcha" data-sitekey="<?php echo $sitekey; ?>"></div>
        <br>

        <?php
	endif;


}


function wooc_validate_extra_register_fields( $username, $email, $validation_errors ) {

    $user_verification_settings = get_option('user_verification_settings');
    $wc_register_form = isset($user_verification_settings['recaptcha']['wc_register_form']) ? $user_verification_settings['recaptcha']['wc_register_form'] : '';
    $captcha_error = isset($user_verification_settings['messages']['captcha_error']) ? $user_verification_settings['messages']['captcha_error'] : __('Captcha Error. Please try again.','user-verification');


	if($wc_register_form == 'yes' && isset($_POST['g-recaptcha-response'])):

		if ( empty( $_POST['g-recaptcha-response'] ) ) {
			$validation_errors->add( 'loginCaptchaError', $captcha_error );
		}

	endif;


         return $validation_errors;
}

add_action( 'woocommerce_register_post', 'wooc_validate_extra_register_fields', 10, 3 );




add_action('woocommerce_lostpassword_form', 'uv_recaptcha_wc_lostpassword_form');
function uv_recaptcha_wc_lostpassword_form(){

    $user_verification_settings = get_option('user_verification_settings');
    $wc_lostpassword_form = isset($user_verification_settings['recaptcha']['wc_lostpassword_form']) ? $user_verification_settings['recaptcha']['wc_lostpassword_form'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';




	if($wc_lostpassword_form == 'yes' ):
		?>

        <script src='https://www.google.com/recaptcha/api.js'></script>
        <div class="g-recaptcha" data-sitekey="<?php echo $sitekey; ?>"></div>
        <br>

		<?php
	endif;


}
















add_filter( 'comment_form_defaults', 'uv_recaptcha_comment_form');
function uv_recaptcha_comment_form( $default ) {

    $user_verification_settings = get_option('user_verification_settings');

    $comment_form = isset($user_verification_settings['recaptcha']['comment_form']) ? $user_verification_settings['recaptcha']['comment_form'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';



	if($comment_form == 'yes'):
		$default[ 'fields' ][ 'recaptcha' ] = '<script src="https://www.google.com/recaptcha/api.js"></script><div class="g-recaptcha" data-sitekey="<?php echo $sitekey; ?>"></div>';
    endif;


	return $default;
}


add_filter( 'preprocess_comment', 'uv_verify_recaptcha_comment_form' );
function uv_verify_recaptcha_comment_form( $commentdata ) {

    $user_verification_settings = get_option('user_verification_settings');

    $comment_form = isset($user_verification_settings['recaptcha']['comment_form']) ? $user_verification_settings['recaptcha']['comment_form'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';



	if($comment_form == 'yes'):
		if ( empty( $_POST['g-recaptcha-response'] ) ) {
			wp_die( __('Captcha error, please try again.','user-verification') );
		}
    endif;

	return $commentdata;
}








