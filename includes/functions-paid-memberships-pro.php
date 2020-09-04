<?php


add_filter('pmpro_confirmation_url', 'uv_pmpro_confirmation_url', 10, 3);


function uv_pmpro_confirmation_url($rurl, $user_id, $pmpro_level){

    $url = $rurl.'&uv_action=logout';

    return $url;

}




add_filter('pmpro_confirmation_message', 'uv_pmpro_confirmation_message', 10, 2);


function uv_pmpro_confirmation_message($confirmation_message, $pmpro_invoice){

    $uv_action = isset($_GET['uv_action']) ? sanitize_text_field($_GET['uv_action']) : '';
    if($uv_action == 'logout'):

        $user_verification_settings = get_option('user_verification_settings');
        $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';
        $message_checkout_page = isset($user_verification_settings['paid_memberships_pro']['message_checkout_page']) ? $user_verification_settings['paid_memberships_pro']['message_checkout_page'] : '';



        global $current_user;
        //$current_user = wp_get_current_user();
        $user_id = $current_user->ID;
        $verification_page_url = get_permalink($verification_page_id);

        $resend_link = $verification_page_url.'?uv_action=resend&id='. $user_id;


        $confirmation_message .= '<div class="user-verification-message" style="color: #f00">'.$message_checkout_page.'</div>';



    endif;

    return $confirmation_message;
}



add_action('wp_footer','uv_pm_pro_logout_not_verified');

function uv_pm_pro_logout_not_verified(){

    $active_plugins = get_option('active_plugins');
    if(in_array( 'paid-memberships-pro/paid-memberships-pro.php', (array) $active_plugins )){

        global $current_user;
        //$current_user = wp_get_current_user();
        $user_id = $current_user->ID;
        $status = user_verification_is_verified($user_id);

        $uv_action = isset($_GET['uv_action']) ? sanitize_text_field($_GET['uv_action']) : '';

        if ( !$status && $uv_action == 'logout'){
            wp_logout();

            $user_verification_settings = get_option('user_verification_settings');
            $redirect_timout = isset($user_verification_settings['paid_memberships_pro']['redirect_timout']) ? $user_verification_settings['paid_memberships_pro']['redirect_timout'] : '';
            $redirect_after_checkout = isset($user_verification_settings['paid_memberships_pro']['redirect_after_checkout']) ? $user_verification_settings['paid_memberships_pro']['redirect_after_checkout'] : '';



            $page_url = get_permalink($redirect_after_checkout);

            if(empty($page_url)):
                $page_url = wp_logout_url();
            endif;


            $resend_link = $page_url.'?user_id='. $user_id;

            ?>
            <script>
                jQuery(document).ready(function($){window.setTimeout(function() {window.location.href = "<?php echo $resend_link; ?>";}, <?php echo $redirect_timout; ?>);})
            </script>
            <?php
        }

    }

}










add_filter("pmpro_registration_checks", "my_pmpro_registration_protect_username");

function my_pmpro_registration_protect_username(){
    global $pmpro_msg, $pmpro_msgt, $current_user;

    $username = isset($_REQUEST['username']) ? sanitize_user($_REQUEST['username']) : '';
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

    $bemail = isset($_REQUEST['bemail']) ? sanitize_email($_REQUEST['bemail']) : '';

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

        $user_verification_settings = get_option('user_verification_settings');
        $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';

        $permalink_structure = get_option('permalink_structure');

        $verification_page_url = get_permalink($verification_page_id);

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






