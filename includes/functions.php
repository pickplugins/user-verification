<?php
if ( ! defined('ABSPATH')) exit;  // if direct access 

function user_verification_is_verified($userid){

    $status = get_user_meta($userid, 'user_activation_status', true);

    if ( $status == 1 ){
        return true;
    }else{
        return false;
    }
}






add_filter('bulk_actions-users','user_verification_bulk_approve');
function user_verification_bulk_approve($actions){
	//unset( $actions['delete'] );

	$actions['uv_bulk_approve'] = __('Mark as verified', 'user-verification');
	$actions['uv_bulk_disapprove'] = __('Mark as unverified', 'user-verification');

	return $actions;
}





add_filter( 'handle_bulk_actions-users', 'user_verification_bulk_approve_handler', 10, 3 );
function user_verification_bulk_approve_handler( $redirect_to, $doaction, $items ) {

	if ( $doaction == 'uv_bulk_approve' ){

		foreach ( $items as $user_id ) {
			// Perform action for each post.
			update_user_meta( $user_id, 'user_activation_status', 1 );

		}

		$redirect_to = add_query_arg( 'uv_bulk_approve', count( $items ), $redirect_to );
	}
	elseif ($doaction =='uv_bulk_disapprove'){

		foreach ( $items as $user_id ) {
			// Perform action for each post.
			update_user_meta( $user_id, 'user_activation_status', 0 );

		}

		$redirect_to = add_query_arg( 'uv_bulk_disapprove', count( $items ), $redirect_to );

	}


	return $redirect_to;

}



add_action( 'admin_notices', 'user_verification_bulk_action_admin_notice' );
function user_verification_bulk_action_admin_notice() {
	if ( isset($_REQUEST['uv_bulk_approve']) ) {


        $user_count =  isset($_REQUEST['uv_bulk_approve']) ? sanitize_user_field($_REQUEST['uv_bulk_approve']) : '';

        $user_count =  intval( $user_count );

		echo '<div id="message" class="notice notice-success is-dismissible">';
		echo sprintf(__('%s user account marked as verified.'), $user_count);
		echo '</div>';

	}
	elseif (isset($_REQUEST['uv_bulk_disapprove'])){

        $user_count = sanitize_text_field( $_REQUEST['uv_bulk_disapprove'] );
		$user_count = intval( $user_count );

		echo '<div id="message" class="notice notice-success is-dismissible">';
		echo sprintf(__('%s user account marked as unverified.'), $user_count);
		echo '</div>';


	}
}



function uv_ajax_approve_user_manually(){
	
	$user_id 	= isset( $_POST['user_id'] ) ? sanitize_text_field($_POST['user_id']) : '';
	$do 		= isset( $_POST['do'] ) ? sanitize_text_field($_POST['do']) : '';
	
	if( empty( $user_id ) || empty( $do ) ) die();
	
	if( $do == 'approve' ) update_user_meta( $user_id, 'user_activation_status', 1 );
	if( $do == 'remove_approval' ) update_user_meta( $user_id, 'user_activation_status', 0 );
	
	$user_activation_status = get_user_meta( $user_id, 'user_activation_status', true );
	$user_activation_status = empty( $user_activation_status ) ? 0 : $user_activation_status;
	$uv_status 				= $user_activation_status == 1 ? __('Verified', 'user-verification') : __('Unverified', 'user-verification');
	
	if( $user_activation_status == 1 ){
		
		$user_data 	= get_userdata( $user_id );
		uv_mail( $user_data->user_email, array(
			'action' => 'email_confirmed',
			'user_id' => $user_id,
		) );
	}
	
	echo $uv_status;
	die();
}
add_action('wp_ajax_uv_ajax_approve_user_manually', 'uv_ajax_approve_user_manually');
add_action('wp_ajax_nopriv_uv_ajax_approve_user_manually', 'uv_ajax_approve_user_manually');




function user_verification_is_username_blocked($username){

    $response = false;
    $user_verification_settings = get_option('user_verification_settings');
    $enable_username_block = isset($user_verification_settings['spam_protection']['enable_username_block']) ? $user_verification_settings['spam_protection']['enable_username_block'] : 'yes';
    $blocked_username = isset($user_verification_settings['spam_protection']['blocked_username']) ? $user_verification_settings['spam_protection']['blocked_username'] : array();




    if( $enable_username_block == "yes" && !empty($blocked_username) ):

        foreach( $blocked_username as $blocked ){
            $status = preg_match("/$blocked/", $username);
            if($status == 1):
                $response = true;
                break;
            endif;
        }
    endif;

    return $response;
}


add_filter( 'registration_errors', 'uv_registration_protect_username', 10, 3 );
function uv_registration_protect_username( $errors, $sanitized_user_login, $user_email ){

    $username_blocked = user_verification_is_username_blocked($sanitized_user_login);


    if($username_blocked){
        $errors->add( 'blocked_username', __( "<strong>{$sanitized_user_login}</strong> username is not allowed!", 'user-verification' ));
    }

    return $errors;

}



add_shortcode('user_verification_is_emaildomain_blocked','user_verification_is_emaildomain_blocked');

function user_verification_is_emaildomain_blocked($user_email){

    $user_verification_settings = get_option('user_verification_settings');
    $enable_domain_block = isset($user_verification_settings['spam_protection']['enable_domain_block']) ? $user_verification_settings['spam_protection']['enable_domain_block'] : 'yes';
    $blocked_domain = isset($user_verification_settings['spam_protection']['blocked_domain']) ? $user_verification_settings['spam_protection']['blocked_domain'] : array();


    $response = false;

    $blocked_domain                 = array_filter($blocked_domain);


    if($enable_domain_block == "yes"){

        $email_parts = explode('@', $user_email);
        $email_domain = isset($email_parts[1]) ? $email_parts[1] : '';

        if (!empty($blocked_domain)  ){

            if(in_array( $email_domain, $blocked_domain )){
                $response = true;
            }else{
                $response = false;
            }
        }else{
            $response = false;
        }

    }


    return $response;
}



add_shortcode('user_verification_is_emaildomain_allowed','user_verification_is_emaildomain_allowed');

function user_verification_is_emaildomain_allowed($user_email){


    $response = true;
    $user_verification_settings = get_option('user_verification_settings');
    $enable_domain_block = isset($user_verification_settings['spam_protection']['enable_domain_block']) ? $user_verification_settings['spam_protection']['enable_domain_block'] : 'yes';
    $allowed_domain = isset($user_verification_settings['spam_protection']['allowed_domain']) ? $user_verification_settings['spam_protection']['allowed_domain'] : array();




    $allowed_domain                 = array_filter($allowed_domain);


    if($enable_domain_block == "yes"){

        $email_parts = explode('@', $user_email);
        $email_domain = isset($email_parts[1]) ? $email_parts[1] : '';


        if(!empty($allowed_domain)){

            if(in_array( $email_domain, $allowed_domain )){
                $response = true;
            }else{
                $response = false;
            }
        }else{
            $response = true;
        }

    }


    return $response;
}











add_filter( 'registration_errors', 'uv_registration_protect_blocked_domain', 10, 3 );
function uv_registration_protect_blocked_domain( $errors, $sanitized_user_login, $user_email ){

    $is_blocked = user_verification_is_emaildomain_blocked($user_email);


    $email_parts = explode('@', $user_email);
    $email_domain = isset($email_parts[1]) ? $email_parts[1] : '';

//    error_log('$is_blocked:'. $is_blocked);
//    error_log('$is_blocked:'. $email_domain);


    if($is_blocked){
        $errors->add( 'blocked_domain', sprintf(__( "This %s domain is not blocked!", 'user-verification' ), '<strong>'.$email_domain.'</strong>') );
    }

    return $errors;

}


add_filter( 'registration_errors', 'uv_registration_protect_allowed_domain', 10, 3 );
function uv_registration_protect_allowed_domain( $errors, $sanitized_user_login, $user_email ){

    $is_allowed = user_verification_is_emaildomain_allowed($user_email);



    $email_parts = explode('@', $user_email);
    $email_domain = isset($email_parts[1]) ? $email_parts[1] : '';

//    error_log('$is_allowed:'. $is_allowed);
//    error_log('$is_allowed:'. $email_domain);

    if(!$is_allowed){
        $errors->add( 'allowed_domain', sprintf(__( "This %s domain is not allowed!", 'user-verification' ), '<strong>'.$email_domain.'</strong>') );
    }

    return $errors;

}




add_filter( 'wp_login_errors', 'user_verification_registered_message', 10, 2 );

function user_verification_registered_message( $errors, $redirect_to ) {


    $user_verification_settings = get_option('user_verification_settings');
    $email_verification_enable = isset($user_verification_settings['email_verification']['enable']) ? $user_verification_settings['email_verification']['enable'] : 'yes';

    if($email_verification_enable != 'yes') return $errors;

    $registration_success = isset($user_verification_settings['messages']['registration_success']) ? $user_verification_settings['messages']['registration_success'] : '';


	if( isset( $errors->errors['registered'] ) ) {
		
		$tmp = $errors->errors;

		$old = 'Registration complete. Please check your email.';
		$new = $registration_success;

		foreach( $tmp['registered'] as $index => $msg ){
			if( $msg === $old )
			$tmp['registered'][$index] = $new;
		}
		$errors->errors = $tmp;

		unset( $tmp );
	}
	
	return $errors;
}





function user_verification_get_pages_list(){
	$array_pages['none'] = __('None', 'user-verification');

	$args = array(
		'sort_order' => 'asc',
		'sort_column' => 'post_title',
		'hierarchical' => 1,
		'exclude' => '',
		'include' => '',
		'meta_key' => '',
		'meta_value' => '',
		'authors' => '',
		'child_of' => 0,
		'parent' => -1,
		'exclude_tree' => '',
		'number' => '',
		'offset' => 0,
		'post_type' => 'page',
		'post_status' => 'publish,private'
	);
	$pages = get_pages($args);

    //$array_pages[0] = 'None';

    foreach( $pages as $page ){
        if ( $page->post_title ) $array_pages[$page->ID] = $page->post_title;
    }


    return $array_pages;
}


function user_verification_reset_email_templates( ) {
		
	if(current_user_can('manage_options')){
		delete_option('uv_email_templates_data');
	}
}	
add_action('wp_ajax_user_verification_reset_email_templates', 'user_verification_reset_email_templates');
add_action('wp_ajax_nopriv_user_verification_reset_email_templates', 'user_verification_reset_email_templates');
	
function uv_filter_check_activation() {


    $user_verification_settings = get_option('user_verification_settings');
    $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';
    $login_after_verification = isset($user_verification_settings['email_verification']['login_after_verification']) ? $user_verification_settings['email_verification']['login_after_verification'] : '';
    $redirect_after_verification = isset($user_verification_settings['email_verification']['redirect_after_verification']) ? $user_verification_settings['email_verification']['redirect_after_verification'] : '';

    $invalid_key = isset($user_verification_settings['messages']['invalid_key']) ? $user_verification_settings['messages']['invalid_key'] : __( 'Invalid activation key', 'user-verification' );
    $key_expired = isset($user_verification_settings['messages']['key_expired']) ? $user_verification_settings['messages']['key_expired'] : __( 'Your key is expired', 'user-verification' );
    $verification_success = isset($user_verification_settings['messages']['verification_success']) ? $user_verification_settings['messages']['verification_success'] : '';
    $activation_sent = isset($user_verification_settings['messages']['activation_sent']) ? $user_verification_settings['messages']['activation_sent'] : '';


    $html = '<div class="user-verification check">';

	if( isset( $_GET['activation_key'] ) ){
		$activation_key = sanitize_text_field($_GET['activation_key']);
		global $wpdb;
		$table = $wpdb->prefix . "usermeta";
		$meta_data	= $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table WHERE meta_value = %s", $activation_key ) );
		if( empty( $meta_data ) ) {
			$html.= "<div class='wrong-key'><i class='fas fa-times'></i> $invalid_key</div>";
		}
		else{
			$user_activation_status = get_user_meta( $meta_data->user_id, 'user_activation_status', true );
			if( $user_activation_status != 0 ) {
				$html.= "<div class='expired'><i class='far fa-calendar-times'></i> $key_expired</div>";
			}
            else {
                if($redirect_after_verification=='none'){
	                $redirect_page_url = '';
                }else{
	                $redirect_page_url = get_permalink($redirect_after_verification);
                }


				$html.= "<div class='verified'><i class='fas fa-check-square'></i> $verification_success</div>";
                update_user_meta( $meta_data->user_id, 'user_activation_status', 1 );

                $user_data = get_userdata( $meta_data->user_id );
                uv_mail( $user_data->user_email, array( 'action' => 'email_confirmed', 'user_id' => $meta_data->user_id, ) );

                if( $login_after_verification ==  "yes"  ){


					$user = get_user_by( 'id', $meta_data->user_id );


					//var_dump($user);


					wp_set_current_user( $meta_data->user_id, $user->user_login );
					//wp_set_auth_cookie( $meta_data->user_id );
					//do_action( 'wp_login', $user->user_login );
					$redirect_page_url = $redirect_page_url.'?uv_autologin=yes&key='.$activation_key;

				}
				
				if(($redirect_after_verification != 'none')):
					$html.= "<script>jQuery(document).ready(function($){window.location.href = '$redirect_page_url';})</script>";
				endif;
			}
		}
	}

	elseif (isset( $_GET['uv_action']) && isset($_GET['id'])){

            $uv_action = sanitize_text_field($_GET['uv_action']);
            $user_id = (int) sanitize_text_field($_GET['id']);

            if($uv_action=='resend'):

                $user_activation_key = md5(uniqid('', true) );

                update_user_meta( $user_id, 'user_activation_key', $user_activation_key );

                $verification_page_url = get_permalink($verification_page_id);

                $user_data 	= get_userdata( $user_id );
                $link 		= $verification_page_url.'?activation_key='.$user_activation_key;
				
                uv_mail(
                    $user_data->user_email,
                    array(
                        'action' 	=> 'email_resend_key',
                        'user_id' 	=> $user_id,
                        'link'		=> $link
                    )
                );

                $html.= "<div class='resend'><i class='fas fa-paper-plane'></i> $activation_sent</div>";
				
				
            endif;
        }


		$html.= '</div>';
		return $html;
	}	

add_shortcode('user_verification_check', 'uv_filter_check_activation');



add_shortcode('user_verification_message', 'user_verification_check_status');

function user_verification_check_status($attr) {

    $uv_check = isset($_GET['uv_check']) ? sanitize_text_field($_GET['uv_check']) : '';

    $msg = isset($attr['message']) ? $attr['message'] : 'Please check email to get verify frist.';
    if(is_user_logged_in() && $uv_check == 'true'){
        $userid = get_current_user_id();
        $status = user_verification_is_verified($userid);

        if(!$status){
            $html = $msg;
            wp_logout();
            return $html;
        }


    }


}



add_shortcode('uv_resend_verification_form', 'uv_resend_verification_form');


function uv_resend_verification_form($attr){

	ob_start();


	if(!empty($_POST['resend_verification_hidden'])){

		$nonce = sanitize_text_field($_POST['_wpnonce']);

        $user_verification_settings = get_option('user_verification_settings');
        $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';
        $activation_sent = isset($user_verification_settings['messages']['activation_sent']) ? $user_verification_settings['messages']['activation_sent'] : __( 'Activation mail has sent', 'user-verification' );



		if(wp_verify_nonce( $nonce, 'nonce_resend_verification' ) && $_POST['resend_verification_hidden'] == 'Y') {

			$html = '';

			$email = sanitize_email($_POST['email']);

			$user_data = get_user_by('email', $email);

			if(!empty($user_data)):

				$user_id = $user_data->ID;

				$user_activation_key = md5(uniqid('', true) );

				update_user_meta( $user_id, 'user_activation_key', $user_activation_key );


				$verification_page_url = get_permalink($verification_page_id);

				$user_data 	= get_userdata( $user_id );
				$link 		= $verification_page_url.'?activation_key='.$user_activation_key;

				uv_mail(
					$user_data->user_email,
					array(
						'action' 	=> 'email_resend_key',
						'user_id' 	=> $user_id,
						'link'		=> $link
					)
				);

				$html.= "<div class='resend'><i class='fas fa-paper-plane'></i> $activation_sent</div>";


            else:
	            $html.= "<div class='resend'><i class='fas fa-times'></i> ".__("Sorry user doesn't exist.","user-verification")."</div>";
            endif;



			echo $html;


		}

	}




	?>




	<form action="" method="post">

		<?php
		wp_nonce_field( 'nonce_resend_verification' );
		?>
		<input type="hidden" name="resend_verification_hidden" value="Y">


		<input type="email" name="email" placeholder="<?php echo __('Email address','user-verification'); ?>" value="">
		<input type="submit" value="<?php echo __('Resend','user-verification'); ?>" name="submit">


	</form>
	<?php

	return ob_get_clean();


}






add_action('init','user_verification_auto_login');
function user_verification_auto_login(){


	if( isset( $_GET['uv_autologin'] ) && $_GET['uv_autologin']=='yes' && isset( $_GET['key'] ) ){

		global $wpdb;
		$table = $wpdb->prefix . "usermeta";
		$activation_key = sanitize_text_field($_GET['key']);
		$meta_data	= $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table WHERE meta_value = %s AND meta_key = 'user_activation_key'", $activation_key ) );

        if(empty($meta_data)) return;

		//echo '<pre>'.var_export($meta_data, true).'</pre>';


		$user = get_user_by( 'id', $meta_data->user_id );

		$user_activation_status = get_user_meta( $meta_data->user_id, 'user_activation_status', true );

        if($user_activation_status == 1){
            wp_set_current_user( $meta_data->user_id, $user->user_login );
            wp_set_auth_cookie( $meta_data->user_id );
            do_action( 'wp_login', $user->user_login, $user );
        }

	}

}




// Login Check
add_action( 'authenticate', 'uv_user_authentication', 9999, 3 );
function uv_user_authentication( $errors, $username, $passwords ) { 

		if( isset( $errors->errors['incorrect_password'] ) ) return $errors;
		
		if( ! $username ) return $errors;
		$user = get_user_by( 'email', $username );
		if( empty( $user ) ) $user = get_user_by( 'login', $username );
		if( empty( $user ) ) return $errors;

		$user_activation_status = get_user_meta( $user->ID, 'user_activation_status', true ); 
		
		if( $user_activation_status == 0 && $user->ID != 1 ) {

            $user_verification_settings = get_option('user_verification_settings');

            $email_verification_enable = isset($user_verification_settings['email_verification']['enable']) ? $user_verification_settings['email_verification']['enable'] : 'yes';

            if($email_verification_enable != 'yes') return $errors;

            $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';
            $verify_email = isset($user_verification_settings['messages']['verify_email']) ? $user_verification_settings['messages']['verify_email'] : __( 'Verify your email first!', 'user-verification' );


            $verification_page_url = get_permalink($verification_page_id);


			$resend_link = $verification_page_url.'?uv_action=resend&id='. $user->ID;
			

			$message = apply_Filters(
				'account_lock_message', 
				sprintf(
					'<strong>%s</strong> %s <a href="%s">%s</a>', 
					__('Error:', 'user-verification'),
                    $verify_email,
					$resend_link,
					__('Resend verification email','user-verification' )
				), 
				$username
			);
			
            return new \WP_Error('authentication_failed', $message);
		}		
        return $errors;
    }

	function uv_mail( $email_to_add = '', $args = array() ) {
		
		if( empty( $email_to_add ) ) return false;

        require_once( user_verification_plugin_dir . 'includes/classes/class-emails.php');

		$action 	= isset( $args['action'] ) ? $args['action'] : '';
		$user_id 	= isset( $args['user_id'] ) ? $args['user_id'] : 1;
		$link 		= isset( $args['link'] ) ? $args['link'] : '';
		$user_info 	= get_userdata( $user_id );
		
		//update_option( 'uv_check_data', $action );

		if( empty( $action ) ) return false; 
		
		$parametar_vars = array(
			'{site_name}'			=> get_bloginfo('name'),
			'{site_description}' 	=> get_bloginfo('description'),
			'{site_url}' 			=>  get_bloginfo('url'),						
			'{user_name}' 			=> $user_info->user_login,
            '{user_display_name}' 	=> $user_info->display_name,
            '{user_first_name}' 	=> $user_info->first_name,
            '{user_last_name}' 	    => $user_info->last_name,
			'{user_avatar}' 		=> get_avatar( $user_id, 60 ),
			'{ac_activaton_url}'	=> $link
		);
		
		
		$uv_email_templates_data = get_option( 'uv_email_templates_data' );
		if(empty($uv_email_templates_data)){
				
			$class_uv_emails = new class_uv_emails();
			$templates_data = $class_uv_emails->email_templates_data();
		
		} else {

			$class_uv_emails = new class_uv_emails();
			$templates_data = $class_uv_emails->email_templates_data();
				
			$templates_data = array_merge($templates_data, $uv_email_templates_data);
		}
		
		
		$message_data = isset( $templates_data[$action] ) ? $templates_data[$action] : '';
		if( empty( $message_data ) ) return false;
		
		
		$email_to 			= strtr( $message_data['email_to'], $parametar_vars );	
		$email_subject 		= strtr( $message_data['subject'], $parametar_vars );
		$email_body 		= strtr( $message_data['html'], $parametar_vars );
		$email_from 		= strtr( $message_data['email_from'], $parametar_vars );	
		$email_from_name 	= strtr( $message_data['email_from_name'], $parametar_vars );				
		$enable 			=  isset($message_data['enable']) ? $message_data['enable'] : '';

        if( $enable == 'no' ) return false;

        $headers = "";
		$headers .= "From: ".$email_from_name." <".$email_from."> \r\n";
		$headers .= "Bcc: ".$email_to." \r\n";		
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

		$attachments = '';	
		
		$status = wp_mail( $email_to_add, $email_subject, $email_body, $headers, $attachments );
		
		return $status;
	}
		






function user_verification_user_roles() {

	$wp_roles = new WP_Roles();

	//var_dump($wp_roles);
	$roles = $wp_roles->get_names();

	return  $roles;
	// Below code will print the all list of roles.
	//echo '<pre>'.var_export($wp_roles, true).'</pre>';

}



