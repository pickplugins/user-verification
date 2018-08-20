<?php
/*
* @Author 		pickplugins
* Copyright: 	pickplugins.com
*/

function user_verification_woocommerce_checkout_order_processed( $order_id, $posted_data, $order ){

	$uv_wc_disable_auto_login = get_option('uv_wc_disable_auto_login','no');
	if ( is_user_logged_in() && $uv_wc_disable_auto_login=='yes' ) {
		wp_logout();
	}

}

add_action( 'woocommerce_checkout_order_processed', 'user_verification_woocommerce_checkout_order_processed', 10, 3 );







add_filter( 'woocommerce_registration_redirect', 'user_verification_woocommerce_registration_redirect', 10, 1 );

function user_verification_woocommerce_registration_redirect(){

	$uv_wc_disable_auto_login = get_option('uv_wc_disable_auto_login','no');


	if ( is_user_logged_in() && $uv_wc_disable_auto_login=='yes' ) {
		$current_user = wp_get_current_user();
		$user_id = $current_user->ID;
		$approved_status = get_user_meta($user_id, 'user_activation_status', true);
		//if the user hasn't been approved destroy the cookie to kill the session and log them out
		if ( $approved_status == 1 ){

			return get_permalink(wc_get_page_id('myaccount'));
		}
		else{
			wp_logout();
			return get_permalink(wc_get_page_id('myaccount')) . "?approved=false";
		}
	}
}

function user_verification_wc_registration_message(){

	$uv_wc_disable_auto_login = get_option('user_verification_registered_message',__('Registration success, please check mail for details.', 'user-verification'));

	$not_approved_message = '<p class="registration">'.__('Send in your registration application today!<br /> NOTE: Your account will be held for moderation and you will be unable to login until it is approved.','user-verification').'</p>';
	if( isset($_REQUEST['approved']) ){

		$approved = sanitize_text_field($_REQUEST['approved']);
		if ($approved == 'false')  echo '<p class="registration successful">'.$uv_wc_disable_auto_login.'</p>';
		//else echo $not_approved_message;
	}
	//else echo $not_approved_message;

}
add_action('woocommerce_before_customer_login_form', 'user_verification_wc_registration_message', 2);