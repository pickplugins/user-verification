<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

class class_user_verification_manage_verification{
	
	public function __construct(){
        //add_action('init', array( $this, 'check_subscriber' ));


        add_action('wp_footer', array($this, 'check_email_verification'));
        add_action('wp_footer', array($this, 'resend_verification'));


		}

    public function resend_verification(){

        if (isset($_REQUEST['user_verification_action']) && trim($_REQUEST['user_verification_action']) == 'resend_verification') {

            wp_enqueue_style('font-awesome-5');

            $user_id = isset($_REQUEST['user_id']) ? sanitize_text_field($_REQUEST['user_id']) : '';
            $_wpnonce = isset($_REQUEST['_wpnonce']) ? sanitize_text_field($_REQUEST['_wpnonce']) : '';


            if ( wp_verify_nonce( $_wpnonce, 'resend_verification' )  ){

            }


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

                $user_id = $meta_data->user_id;

                $user_activation_status = get_user_meta( $meta_data->user_id, 'user_activation_status', true );


                if($user_activation_status != 0){
                    $jsData['activation_status'] = 0;
                    $jsData['status_icon'] = '<i class="fas fa-user-times"></i>';
                    $jsData['status_text'] = __('Sorry! Verification failed.','user-verification');

                }else{
                    update_user_meta( $meta_data->user_id, 'user_activation_status', 1 );
                    $jsData['activation_status'] = 1;
                    $jsData['status_icon'] = '<i class="far fa-check-circle"></i>';
                    $jsData['status_text'] = __('Thanks for verified','user-verification');


                    $class_user_verification_emails = new class_user_verification_emails();
                    $email_templates_data = $class_user_verification_emails->email_templates_data();

                    $logo_id = isset($user_verification_settings['logo_id']) ? $user_verification_settings['logo_id'] : '';

                    $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';
                    $exclude_user_roles = isset($user_verification_settings['email_verification']['exclude_user_roles']) ? $user_verification_settings['email_verification']['exclude_user_roles'] : array();
                    $email_templates_data = isset($user_verification_settings['email_templates_data']['email_resend_key']) ? $user_verification_settings['email_templates_data']['email_resend_key'] : $email_templates_data['email_resend_key'];


                    $email_bcc = isset($email_templates_data['email_bcc']) ? $email_templates_data['email_bcc'] : '';
                    $email_from = isset($email_templates_data['email_from']) ? $email_templates_data['email_from'] : '';
                    $email_from_name = isset($email_templates_data['email_from_name']) ? $email_templates_data['email_from_name'] : '';
                    $reply_to = isset($email_templates_data['reply_to']) ? $email_templates_data['reply_to'] : '';
                    $reply_to_name = isset($email_templates_data['reply_to_name']) ? $email_templates_data['reply_to_name'] : '';
                    $email_subject = isset($email_templates_data['subject']) ? $email_templates_data['subject'] : '';
                    $email_body = isset($email_templates_data['html']) ? $email_templates_data['html'] : '';

                    $email_body = do_shortcode($email_body);
                    $email_body = wpautop($email_body);

                    $verification_page_url = get_permalink($verification_page_id);
                    $permalink_structure = get_option('permalink_structure');

                    $user_activation_key =  md5(uniqid('', true) );

                    update_user_meta( $user_id, 'user_activation_key', $user_activation_key );
                    update_user_meta( $user_id, 'user_activation_status', 1 );

                    $user_data 	= get_userdata( $user_id );




                    $user_roles = !empty($user_data->roles) ? $user_data->roles : array();


                    if(!empty($exclude_user_roles))
                        foreach ($exclude_user_roles as $role):

                            if(in_array($role, $user_roles)){
                                //update_option('uv_custom_option', $role);
                                update_user_meta( $user_id, 'user_activation_status', 1 );
                                return;
                            }

                        endforeach;


                    if(empty($permalink_structure)){
                        $link 		= $verification_page_url.'&activation_key='.$user_activation_key;

                    }else{

                        $link 		= $verification_page_url.'?activation_key='.$user_activation_key;
                    }



                    $site_name = get_bloginfo('name');
                    $site_description = get_bloginfo('description');
                    $site_url = get_bloginfo('url');
                    $site_logo_url = wp_get_attachment_url($logo_id);

                    $vars = array(
                        '{site_name}'=> esc_html($site_name),
                        '{site_description}' => esc_html($site_description),
                        '{site_url}' => esc_url_raw($site_url),
                        '{site_logo_url}' => esc_url_raw($site_logo_url),

                        '{first_name}' => esc_html($user_data->last_name),
                        '{last_name}' => esc_html($user_data->last_name),
                        '{user_display_name}' => esc_html($user_data->display_name),
                        '{user_email}' => esc_html($user_data->user_email),
                        '{user_name}' => esc_html($user_data->user_nicename),
                        '{user_avatar}' => get_avatar( $user_data->user_email, 60 ),

                        '{ac_activaton_url}' => esc_url_raw($link),

                    );



                    $vars = apply_filters('user_verification_mail_vars', $vars);



                    $email_data['email_to'] =  $user_data->user_email;
                    $email_data['email_bcc'] =  $email_bcc;
                    $email_data['email_from'] = $email_from ;
                    $email_data['email_from_name'] = $email_from_name;
                    $email_data['reply_to'] = $reply_to;
                    $email_data['reply_to_name'] = $reply_to_name;

                    $email_data['subject'] = strtr($email_subject, $vars);
                    $email_data['html'] = strtr($email_body, $vars);
                    $email_data['attachments'] = array();


                    $mail_status = $class_user_verification_emails->send_email($email_data);



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

                    <h2 class="status-title"><?php echo __('Checking Verification','user-verification'); ?></h2>

                    <div class="status">
                        <span class="status-icon"><i class="fas fa-spin fa-spinner"></i></span>
                        <span class="status-text"><?php echo __('Please wait...','user-verification'); ?></span>

                    </div>

                    <div class="resend">
                        <a href="<?php echo $redirect_page_url; ?>"><?php echo __('Resend verification mail','user-verification'); ?></a>
                    </div>


                    <?php if(!empty($redirect_after_verification) && $redirect_after_verification != 'none'): ?>
                        <div class="redirect">
                            <p><?php echo __('You will redirect after verification','user-verification'); ?></p>
                            <a href="<?php echo $redirect_page_url; ?>"><?php echo __('Click if not redirect automatically','user-verification'); ?></a>
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

                            $('.resend').fadeIn();
                            $('.redirect').fadeOut();

                        }





                    }, 2000);


                    setTimeout(function(){
                        //$('.check-email-verification').fadeOut('slow');

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
                    padding: 20px 0;
                }
                .status{
                    margin: 20px 0;
                }

                .resend{
                    display: none;
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


	public function check_email_verification(){

        if (isset($_REQUEST['user_verification_action']) && trim($_REQUEST['user_verification_action']) == 'email_verification') {

            wp_enqueue_style('font-awesome-5');


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
            $user_id = $meta_data->user_id;

            if(!empty($meta_data)){
                $jsData['is_valid_key'] = 'yes';


                $user_activation_status = get_user_meta( $meta_data->user_id, 'user_activation_status', true );


                if($user_activation_status != 0){
                    $jsData['activation_status'] = 0;
                    $jsData['status_icon'] = '<i class="fas fa-user-times"></i>';
                    $jsData['status_text'] = __('Sorry! Verification failed.','user-verification');

                }else{
                    update_user_meta( $meta_data->user_id, 'user_activation_status', 1 );
                    $jsData['activation_status'] = 1;
                    $jsData['status_icon'] = '<i class="far fa-check-circle"></i>';
                    $jsData['status_text'] = __('Thanks for verified','user-verification');


                    $class_user_verification_emails = new class_user_verification_emails();
                    $email_templates_data = $class_user_verification_emails->email_templates_data();

                    $logo_id = isset($user_verification_settings['logo_id']) ? $user_verification_settings['logo_id'] : '';

                    $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';
                    $exclude_user_roles = isset($user_verification_settings['email_verification']['exclude_user_roles']) ? $user_verification_settings['email_verification']['exclude_user_roles'] : array();
                    $email_templates_data = isset($user_verification_settings['email_templates_data']['email_confirmed']) ? $user_verification_settings['email_templates_data']['email_confirmed'] : $email_templates_data['email_confirmed'];


                    $email_bcc = isset($email_templates_data['email_bcc']) ? $email_templates_data['email_bcc'] : '';
                    $email_from = isset($email_templates_data['email_from']) ? $email_templates_data['email_from'] : '';
                    $email_from_name = isset($email_templates_data['email_from_name']) ? $email_templates_data['email_from_name'] : '';
                    $reply_to = isset($email_templates_data['reply_to']) ? $email_templates_data['reply_to'] : '';
                    $reply_to_name = isset($email_templates_data['reply_to_name']) ? $email_templates_data['reply_to_name'] : '';
                    $email_subject = isset($email_templates_data['subject']) ? $email_templates_data['subject'] : '';
                    $email_body = isset($email_templates_data['html']) ? $email_templates_data['html'] : '';

                    $email_body = do_shortcode($email_body);
                    $email_body = wpautop($email_body);

                    $verification_page_url = get_permalink($verification_page_id);
                    $permalink_structure = get_option('permalink_structure');

                    $user_activation_key =  md5(uniqid('', true) );

                    update_user_meta( $user_id, 'user_activation_key', $user_activation_key );
                    update_user_meta( $user_id, 'user_activation_status', 1 );

                    $user_data 	= get_userdata( $user_id );




                    $user_roles = !empty($user_data->roles) ? $user_data->roles : array();


                    if(!empty($exclude_user_roles))
                        foreach ($exclude_user_roles as $role):

                            if(in_array($role, $user_roles)){
                                //update_option('uv_custom_option', $role);
                                update_user_meta( $user_id, 'user_activation_status', 1 );
                                return;
                            }

                        endforeach;


                    if(empty($permalink_structure)){
                        $link 		= $verification_page_url.'&activation_key='.$user_activation_key;

                    }else{

                        $link 		= $verification_page_url.'?activation_key='.$user_activation_key;
                    }



                    $site_name = get_bloginfo('name');
                    $site_description = get_bloginfo('description');
                    $site_url = get_bloginfo('url');
                    $site_logo_url = wp_get_attachment_url($logo_id);

                    $vars = array(
                        '{site_name}'=> esc_html($site_name),
                        '{site_description}' => esc_html($site_description),
                        '{site_url}' => esc_url_raw($site_url),
                        '{site_logo_url}' => esc_url_raw($site_logo_url),

                        '{first_name}' => esc_html($user_data->last_name),
                        '{last_name}' => esc_html($user_data->last_name),
                        '{user_display_name}' => esc_html($user_data->display_name),
                        '{user_email}' => esc_html($user_data->user_email),
                        '{user_name}' => esc_html($user_data->user_nicename),
                        '{user_avatar}' => get_avatar( $user_data->user_email, 60 ),

                        '{ac_activaton_url}' => esc_url_raw($link),

                    );



                    $vars = apply_filters('user_verification_mail_vars', $vars);



                    $email_data['email_to'] =  $user_data->user_email;
                    $email_data['email_bcc'] =  $email_bcc;
                    $email_data['email_from'] = $email_from ;
                    $email_data['email_from_name'] = $email_from_name;
                    $email_data['reply_to'] = $reply_to;
                    $email_data['reply_to_name'] = $reply_to_name;

                    $email_data['subject'] = strtr($email_subject, $vars);
                    $email_data['html'] = strtr($email_body, $vars);
                    $email_data['attachments'] = array();


                    $mail_status = $class_user_verification_emails->send_email($email_data);



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

            var_dump($user_id);

            $resend_verification_url = add_query_arg(
                array(
                    'user_id' => $user_id,
                    'user_verification_action' => 'resend_verification',
                ),
                $verification_page_url
            );

            $resend_verification_url = wp_nonce_url( $resend_verification_url,  'resend_verification' );

            ?>
            <div class="check-email-verification">
                <div class="inner">


                    <h2 class="status-title"><?php echo __('Checking Verification','user-verification'); ?></h2>

                    <div class="status">
                        <span class="status-icon"><i class="fas fa-spin fa-spinner"></i></span>
                        <span class="status-text"><?php echo __('Please wait...','user-verification'); ?></span>

                    </div>

                    <div class="resend">
                        <a href="<?php echo $resend_verification_url; ?>"><?php echo __('Resend verification mail','user-verification'); ?></a>
                    </div>


                    <?php if(!empty($redirect_after_verification) && $redirect_after_verification != 'none'): ?>
                        <div class="redirect">
                            <p><?php echo __('You will redirect after verification','user-verification'); ?></p>
                            <a href="<?php echo $redirect_page_url; ?>"><?php echo __('Click if not redirect automatically','user-verification'); ?></a>
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

                            $('.resend').fadeIn();
                            $('.redirect').fadeOut();

                        }





                }, 2000);


                    setTimeout(function(){
                        //$('.check-email-verification').fadeOut('slow');

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
                    padding: 20px 0;
                }
                .status{
                    margin: 20px 0;
                }

                .resend{
                    display: none;
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













