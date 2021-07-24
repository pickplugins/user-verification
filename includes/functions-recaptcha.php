<?php
if ( ! defined('ABSPATH')) exit;  // if direct access



//add_action('login_form', 'user_verification_login_form_otp');
function user_verification_login_form_otp(){

    $user_verification_settings = get_option('user_verification_settings');
    $default_login_page = isset($user_verification_settings['recaptcha']['default_login_page']) ? $user_verification_settings['recaptcha']['default_login_page'] : '';



    //if($default_login_page == 'yes'):
    ?>
    <?php
    wp_enqueue_script('scripts-login');

    ?>

        <div id="send-otp"  class="">Send OTP</div>

    <script>





    </script>
    <style>
        .user-pass-wrap, .forgetmenot, .submit{
            display:none;
        }
        #send-otp{
            text-align: center;
            padding: 10px;
            background: #2271b1;
            margin: 0 0 15px 0;
            color: #fff;
            border-radius: 3px;
            cursor: pointer;
        }
    </style>


    <?php
    //endif;
}



function user_verification_send_otp(){

    $user_login = isset($_POST['user_login']) ? $_POST['user_login'] : '';

    $response = array();

    if(is_email($user_login)){
        $user = get_user_by( 'email', $user_login );

    }else{
        $user = get_user_by( 'login', $user_login );

    }


    $user_id = isset($user->ID) ? $user->ID : '';
    $user_email = isset($user->user_email) ? $user->user_email : '';
    $phone_number = get_user_meta($user_id,'phone_number', true);

    $user_data = array();
    $user_data['user_email'] = $user_email;
    $user_data['phone_number'] = $phone_number;
    $user_data['user_id'] = $user_id;



    $otp_via_mail = user_verification_send_otp_via_mail($user_data);
    $otp_via_sms = user_verification_send_otp_via_sms($user_data);

    //$password = wp_generate_password(6, false, false);
    $password = wp_rand(100000, 999999);

    //wp_set_password( $password, $user_id );
    update_user_meta($user_id, 'uv_otp', $password);
    update_user_meta($user_id, 'uv_otp_limit', 1);

    $uv_otp_count = get_transient('uv_otp_count_'.$user_id);

    if(!empty($uv_otp_count)){
        $uv_otp_count += 1 ;
    }else{
        $uv_otp_count = 1;
    }

    set_transient( 'uv_otp_count_'.$user_id, $uv_otp_count, 60 );

    if($uv_otp_count <= 3){

    }

    $response['otp_via_mail'] = $otp_via_mail;
    $response['otp_via_sms'] = $otp_via_sms;
    $response['password'] = $password;
    $response['uv_otp_count'] = $uv_otp_count;

    echo json_encode($response);
    die();
}


add_action('wp_ajax_user_verification_send_otp', 'user_verification_send_otp');
add_action('wp_ajax_nopriv_user_verification_send_otp', 'user_verification_send_otp');


//add_filter('check_password','user_verification_check_password_otp', 99, 4);
function user_verification_check_password_otp($check, $password, $hash, $user_id) {

    error_log($check);

    error_log($password);
    error_log($hash);
    error_log($user_id);

    //$errors = [];

    return true;

}


//add_filter('wp_authenticate_user','user_verification_auth_otp',10,2);
function user_verification_auth_otp($user, $password) {

    $error = array();


    $user_id = isset($user->ID) ? $user->ID : '';
    $uv_otp = isset($_POST['pwd']) ? sanitize_text_field($_POST['pwd']) : '';

    $saved_otp = get_user_meta($user_id,'uv_otp', true);
    $otp_error = 'OTP is not correct';

    error_log($saved_otp);
    error_log($uv_otp);
    //error_log(serialize($user));


    if($saved_otp == $uv_otp){
        return  $user;

    }else{
        return new WP_Error( 'user_not_verified', $otp_error );
    }




}




function user_verification_send_otp_via_mail($user_data){

    return true;

}


function user_verification_send_otp_via_sms($user_data){

    return true;
}


function your_function( $user_login, $user ) {
    $user_id = isset($user->ID) ? $user->ID : '';

    wp_set_password(  '',  $user_id );

}
//add_action('wp_login', 'your_function', 10, 2);



// Google recaptcha for Default WordPress Login form.


add_action('login_form', 'user_verification_login_form_captcha');
function user_verification_login_form_captcha(){

    $user_verification_settings = get_option('user_verification_settings');
    $default_login_page = isset($user_verification_settings['recaptcha']['default_login_page']) ? $user_verification_settings['recaptcha']['default_login_page'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';
    $recaptcha_version = isset($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';



    if($default_login_page == 'yes'):
	    ?>
        <?php
        wp_enqueue_script('recaptcha_js');

        ?>
        <div class="g-recaptcha" <?php if($recaptcha_version == 'v2_invisible') echo 'data-size="invisible"'; ?> data-sitekey="<?php echo esc_attr($sitekey); ?>"></div>


	    <?php
    endif;
}



add_filter('wp_authenticate_user','user_verification_validate_login_captcha',10,2);
function user_verification_validate_login_captcha($user, $password) {
	$return_value = $user;


    $user_verification_settings = get_option('user_verification_settings');
    $default_login_page = isset($user_verification_settings['recaptcha']['default_login_page']) ? $user_verification_settings['recaptcha']['default_login_page'] : '';
    $captcha_error = isset($user_verification_settings['messages']['captcha_error']) ? $user_verification_settings['messages']['captcha_error'] : '';
    $secretkey = isset($user_verification_settings['recaptcha']['secretkey']) ? $user_verification_settings['recaptcha']['secretkey'] : '';


	if($default_login_page == 'yes' && isset($_POST['g-recaptcha-response'])):
		$captcha = isset($_POST['g-recaptcha-response']) ? sanitize_text_field($_POST['g-recaptcha-response']) : '';


        $response = wp_remote_post(
            'https://www.google.com/recaptcha/api/siteverify',
            [
                'secret' => $secretkey,
                'response' => $_POST['g-recaptcha-response'],
            ]
        );
        $response = json_decode($response["body"], true);

        //error_log(serialize($response));

		if( $response["success"] != true){

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
    $recaptcha_version = isset($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';


	if($default_registration_page == 'yes'):
		?>
        <?php wp_enqueue_script('recaptcha_js'); ?>
        <div class="g-recaptcha" <?php if($recaptcha_version == 'v2_invisible') echo 'data-size="invisible"'; ?> data-sitekey="<?php echo esc_attr($sitekey); ?>"></div>

		<?php
	endif;


}

add_filter( 'registration_errors', 'uv_registration_errors', 10, 3 );

function uv_registration_errors( $errors, $sanitized_user_login, $user_email ) {

    $user_verification_settings = get_option('user_verification_settings');
    $default_registration_page = isset($user_verification_settings['recaptcha']['default_registration_page']) ? $user_verification_settings['recaptcha']['default_registration_page'] : '';
    $captcha_error = isset($user_verification_settings['messages']['captcha_error']) ? $user_verification_settings['messages']['captcha_error'] : __('Captcha Error. Please try again.','user-verification');

    $secretkey = isset($user_verification_settings['recaptcha']['secretkey']) ? $user_verification_settings['recaptcha']['secretkey'] : '';

    $response = wp_remote_post(
        'https://www.google.com/recaptcha/api/siteverify',
        [
            'secret' => $secretkey,
            'response' => $_POST['g-recaptcha-response'],
        ]
    );
    $response = json_decode($response["body"], true);

	if($default_registration_page == 'yes'):
		if ( $response["success"] != true ) {
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
    $recaptcha_version = isset($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';



	if($default_lostpassword_page == 'yes'):
		?>

        <?php wp_enqueue_script('recaptcha_js'); ?>
        <div class="g-recaptcha" <?php if($recaptcha_version == 'v2_invisible') echo 'data-size="invisible"'; ?> data-sitekey="<?php echo esc_attr($sitekey); ?>"></div>
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

        $secretkey = isset($user_verification_settings['recaptcha']['secretkey']) ? $user_verification_settings['recaptcha']['secretkey'] : '';

        $response = wp_remote_post(
            'https://www.google.com/recaptcha/api/siteverify',
            [
                'secret' => $secretkey,
                'response' => $_POST['g-recaptcha-response'],
            ]
        );
        $response = json_decode($response["body"], true);

		if ( $response["success"] != true ) {
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
    $recaptcha_version = isset($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';




	if($wc_login_form == 'yes'):
		?>

        <?php wp_enqueue_script('recaptcha_js'); ?>
        <div class="g-recaptcha" <?php if($recaptcha_version == 'v2_invisible') echo 'data-size="invisible"'; ?> data-sitekey="<?php echo esc_attr($sitekey); ?>"></div>
        <br>
		<?php
	endif;


}




add_action('woocommerce_register_form', 'uv_recaptcha_wc_register_form');
function uv_recaptcha_wc_register_form(){

    $user_verification_settings = get_option('user_verification_settings');
    $wc_register_form = isset($user_verification_settings['recaptcha']['wc_register_form']) ? $user_verification_settings['recaptcha']['wc_register_form'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';
    $recaptcha_version = isset($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';



	if($wc_register_form == 'yes' ):
        ?>

        <?php wp_enqueue_script('recaptcha_js'); ?>
        <div class="g-recaptcha" <?php if($recaptcha_version == 'v2_invisible') echo 'data-size="invisible"'; ?> data-sitekey="<?php echo esc_attr($sitekey); ?>"></div>
        <br>

        <?php
	endif;


}


function wooc_validate_extra_register_fields( $username, $email, $validation_errors ) {

    $user_verification_settings = get_option('user_verification_settings');
    $wc_register_form = isset($user_verification_settings['recaptcha']['wc_register_form']) ? $user_verification_settings['recaptcha']['wc_register_form'] : '';
    $captcha_error = isset($user_verification_settings['messages']['captcha_error']) ? $user_verification_settings['messages']['captcha_error'] : __('Captcha Error. Please try again.','user-verification');
    $secretkey = isset($user_verification_settings['recaptcha']['secretkey']) ? $user_verification_settings['recaptcha']['secretkey'] : '';

    $response = wp_remote_post(
        'https://www.google.com/recaptcha/api/siteverify',
        [
            'secret' => $secretkey,
            'response' => $_POST['g-recaptcha-response'],
        ]
    );
    $response = json_decode($response["body"], true);

	if($wc_register_form == 'yes' && isset($_POST['g-recaptcha-response'])):

		if ( $response["success"] != true  ) {
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
    $recaptcha_version = isset($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';




	if($wc_lostpassword_form == 'yes' ):
		?>

        <?php wp_enqueue_script('recaptcha_js'); ?>
        <div class="g-recaptcha" <?php if($recaptcha_version == 'v2_invisible') echo 'data-size="invisible"'; ?> data-sitekey="<?php echo esc_attr($sitekey); ?>"></div>
        <br>

		<?php
	endif;


}
















add_filter( 'comment_form_defaults', 'uv_recaptcha_comment_form');
function uv_recaptcha_comment_form( $default ) {

    $user_verification_settings = get_option('user_verification_settings');

    $comment_form = isset($user_verification_settings['recaptcha']['comment_form']) ? $user_verification_settings['recaptcha']['comment_form'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';
    $recaptcha_version = isset($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';



	if($comment_form == 'yes'):
        wp_enqueue_script('recaptcha_js');
        $html = '';
        $html .= '<div class="g-recaptcha" ';

        if($recaptcha_version == 'v2_invisible'){
            $html.= ' data-size="invisible" ';
        }

        $html .= 'data-sitekey="<?php echo '.esc_attr($sitekey).'; ?>"></div>';

        $default[ 'fields' ][ 'recaptcha' ] = $html;

    endif;


	return $default;
}


add_filter( 'preprocess_comment', 'uv_verify_recaptcha_comment_form' );
function uv_verify_recaptcha_comment_form( $commentdata ) {

    $user_verification_settings = get_option('user_verification_settings');

    $comment_form = isset($user_verification_settings['recaptcha']['comment_form']) ? $user_verification_settings['recaptcha']['comment_form'] : '';
    $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';

    $secretkey = isset($user_verification_settings['recaptcha']['secretkey']) ? $user_verification_settings['recaptcha']['secretkey'] : '';

    $response = wp_remote_post(
        'https://www.google.com/recaptcha/api/siteverify',
        [
            'secret' => $secretkey,
            'response' => $_POST['g-recaptcha-response'],
        ]
    );
    $response = json_decode($response["body"], true);

	if($comment_form == 'yes'):
		if ( $response["success"] != true ) {
			wp_die( __('Captcha error, please try again.','user-verification') );
		}
    endif;

	return $commentdata;
}








