<?php
/*
* @Author 		PickPlugins
* Copyright: 	pickplugins.com
*/










//add_filter("pmpro_after_checkout", "uv_pmpro_after_checkout");
//
//function uv_pmpro_after_checkout($userid){
//
//    wp_logout();
//
//    $rurl = apply_filters( "pmpro_confirmation_url", $rurl, $user_id, $pmpro_level );
//
//    wp_redirect( $rurl );
//    exit;
//
//}


add_filter('pmpro_confirmation_url', 'uv_pmpro_confirmation_url', 10, 3);


function uv_pmpro_confirmation_url($rurl, $user_id, $pmpro_level){

    $url = $rurl.'&uv_action=logout';

    return $url;

}




add_filter('pmpro_confirmation_message', 'uv_pmpro_confirmation_message', 10, 2);


function uv_pmpro_confirmation_message($confirmation_message, $pmpro_invoice){

    $uv_action = isset($_GET['uv_action']) ? $_GET['uv_action'] : '';
    if($uv_action == 'logout'):

        $confirmation_message .= '<div class="user-verification-message" style="color: #f00">We have sent a confirmation mail please follow to verify account first.</div>';

    endif;

    return $confirmation_message;
}



add_action('init','uv_pm_pro_logout_not_verified');

function uv_pm_pro_logout_not_verified(){

    $active_plugins = get_option('active_plugins');
    if(in_array( 'paid-memberships-pro/paid-memberships-pro.php', (array) $active_plugins )){

        $current_user = wp_get_current_user();
        $user_id = $current_user->ID;
        $status = user_verification_is_verified($user_id);

        if ( !$status){
            wp_logout();
        }

    }

}










add_filter("pmpro_registration_checks", "my_pmpro_registration_protect_username");

function my_pmpro_registration_protect_username(){
    global $pmpro_msg, $pmpro_msgt, $current_user;

    $username = $_REQUEST['username'];
    $is_blocked = user_verification_is_username_blocked($username);

    if($is_blocked) {
        $pmpro_msg = __( "<strong>{$username}</strong> username is not allowed!", 'user-verification' );
        $pmpro_msgt = "pmpro_error";
        return false;
    }
    else{
        //all good
        return true;
    }
}





add_filter("pmpro_registration_checks", "my_pmpro_registration_protect_blocked_domain");

function my_pmpro_registration_protect_blocked_domain(){
    global $pmpro_msg, $pmpro_msgt, $current_user;

    $user_id = $current_user->ID;

    $bemail = $_REQUEST['bemail'];

    $is_blocked = user_verification_is_emaildomain_blocked($bemail);

    if($is_blocked) {
        $pmpro_msg = __( "This email domain is not allowed!", 'user-verification' );
        $pmpro_msgt = "pmpro_error";
        return false;
    }
    else{


        //all good
        return true;



    }
}




add_filter("pmpro_registration_checks", "my_pmpro_registration_success_send_activation_mail");

function my_pmpro_registration_success_send_activation_mail(){
    global $pmpro_msg, $pmpro_msgt, $current_user;

    $user_id = $current_user->ID;
    $user_email = $current_user->user_email;


    if($pmpro_msgt) {


        $permalink_structure = get_option('permalink_structure');

        $user_verification_verification_page = get_option('user_verification_verification_page');
        $verification_page_url = get_permalink($user_verification_verification_page);

        $user_activation_key =  md5(uniqid('', true) );

        update_user_meta( $user_id, 'user_activation_key', $user_activation_key );
        update_user_meta( $user_id, 'user_activation_status', 0 );

        $user_data 	= get_userdata( $user_id );

        if(empty($permalink_structure)){
            $link 		= $verification_page_url.'&activation_key='.$user_activation_key;

        }else{

            $link 		= $verification_page_url.'?activation_key='.$user_activation_key;
        }


        uv_mail(
            $user_email,
            array(
                'action' 	=> 'user_registered',
                'user_id' 	=> $user_id,
                'link'		=> $link
            )
        );

        //all good
        return false;


    }
    else{




        return true;




    }
}















//update the user after checkout
function my_update_first_and_last_name_after_checkout($user_id){

    update_user_meta($user_id, "user_activation_status", 0);
}
add_action('pmpro_after_checkout', 'my_update_first_and_last_name_after_checkout');






