<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

class class_user_verification_manage_verification{
	
	public function __construct(){
        //add_action('init', array( $this, 'check_subscriber' ));


        add_action('wp_footer', array($this, 'check_email_verification'));


		}



	public function check_email_verification(){

        if (isset($_REQUEST['user_verification_action']) && trim($_REQUEST['user_verification_action']) == 'email_verification') {

            $activation_key = isset($_REQUEST['activation_key']) ? sanitize_text_field($_REQUEST['activation_key']) : '';
            $user_verification_settings = get_option('user_verification_settings');

            $login_after_verification = isset($user_verification_settings['email_verification']['login_after_verification']) ? $user_verification_settings['email_verification']['login_after_verification'] : '';
            $redirect_after_verification = isset($user_verification_settings['email_verification']['redirect_after_verification']) ? $user_verification_settings['email_verification']['redirect_after_verification'] : '';
            $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';

            $redirect_page_url = get_permalink($redirect_after_verification);


            //var_dump($verification_key);

            $jsData = array();

            global $wpdb;
            $table = $wpdb->prefix . "usermeta";
            $meta_data	= $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table WHERE meta_value = %s", $activation_key ) );

            if(!empty($meta_data)){
                $jsData['is_valid_key'] = 'yes';

                $user_activation_status = get_user_meta( $meta_data->user_id, 'user_activation_status', true );


                if($user_activation_status != 0){
                    $jsData['activation_status'] = 0;
                    $jsData['status_icon'] = '<i class="fas fa-user-times"></i>';
                    $jsData['status_text'] = __('Sorry! Verification failed.','');

                }else{
                    update_user_meta( $meta_data->user_id, 'user_activation_status', 1 );
                    $jsData['activation_status'] = 1;
                    $jsData['status_icon'] = '<i class="far fa-check-circle"></i>';
                    $jsData['status_text'] = __('Thanks for verified','');


                    $user_data = get_userdata( $meta_data->user_id );
                    uv_mail( $user_data->user_email, array( 'action' => 'email_confirmed', 'user_id' => $meta_data->user_id, ) );

                    if( $login_after_verification ==  "yes"  ){

                        $jsData['login_after_verify'] = 'yes';


                        $user = get_user_by( 'id', $meta_data->user_id );

                        wp_set_current_user( $meta_data->user_id, $user->user_login );
                        $redirect_page_url = $redirect_page_url.'?uv_autologin=yes&key='.$activation_key;

                    }

                    if(($redirect_after_verification != 'none')):

                        $jsData['is_redirect'] = 'yes';
                        $jsData['redirect_url'] = $redirect_page_url;


                    endif;


                }

            }else{
                $jsData['is_valid_key'] = 'no';
                $jsData['is_valid_text'] = __('Sorry, activation key is not valid.','user-verification');
                $jsData['is_valid_icon'] = '<i class="far fa-times-circle"></i>';

            }


            ?>
            <div class="check-email-verification">
                <div class="inner">

                    <h2 class="status-title">Checking Verification</h2>

                    <div class="status">
                        <span class="status-icon"><i class="fas fa-spin fa-spinner"></i></span>
                        <span class="status-text">Please wait...</span>

                    </div>

                    <?php if(!empty($redirect_after_verification) && $redirect_after_verification != 'none'): ?>
                        <div class="redirect">
                            <p>You will redirect after verification</p>
                            <a href="<?php echo $redirect_page_url; ?>">Click if not redirect automatically</a>
                        </div>
                    <?php endif; ?>

                </div>
            </div>

            <script>
                jQuery(document).ready(function($) {

                    jsData = <?php echo json_encode($jsData); ?>

                    console.log(jsData);
                    activation_status = jsData['activation_status'];
                    status_icon = jsData['status_icon'];
                    status_text = jsData['status_text'];
                    redirect_url = jsData['redirect_url'];
                    is_redirect = jsData['is_redirect'];
                    is_valid_key = jsData['is_valid_key'];

                    setTimeout(function(){

                        if(is_valid_key == 'yes'){
                            $('.status-icon').html(status_icon);
                            $('.status-text').html(status_text);

                            if(is_redirect == 'yes'){
                                //window.location.href = redirect_url;
                            }

                        }else{
                            is_valid_icon = jsData['is_valid_icon'];
                            is_valid_text = jsData['is_valid_text'];

                            $('.status-icon').html(is_valid_icon);
                            $('.status-text').html(is_valid_text);

                            $('.redirect').fadeOut();

                        }





                }, 2000);


                    setTimeout(function(){
                        $('.check-email-verification').fadeOut('slow');

                    }, 4000);



                })
            </script>

            <style type="text/css">
                .check-email-verification{
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #50505094;
                }

                .inner{
                    width: 350px;
                    background: #fff;
                    top: 50%;
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    padding: 15px;
                    text-align: center;
                    border-radius: 4px;
                    box-shadow: -1px 11px 11px 0 rgb(152 152 152 / 50%);
                }

                .status-title{
                    font-size: 20px;
                    margin-bottom: 50px;
                }
                .status{
                    margin: 20px 0;
                }


                .status .status-icon{
                    font-size: 30px;
                    vertical-align: middle;
                }

                .redirect {
                    margin: 50px 0 30px 0;
                }

            </style>
            <?php


        }


	}

		

}

new class_user_verification_manage_verification();



add_action('init', 'user_logged_in');
function user_logged_in(){
    wp_redirect(home_url());
}









