<?php
if ( ! defined('ABSPATH')) exit; // if direct access 

class class_user_verification_notices{

    public function __construct(){

        add_action('admin_notices', array( $this, 'mark_as_verified' ));
        add_action('admin_notices', array( $this, 'mark_as_unverified' ));
        add_action('admin_notices', array( $this, 'resend_verification' ));

    }


    public function mark_as_verified(){

        wp_parse_str($_SERVER['QUERY_STRING'], $output);
        $mark_as_verified = isset($output['mark_as_verified']) ? sanitize_text_field($output['mark_as_verified']) : '';

        if(empty($mark_as_verified)) return;
        if($mark_as_verified != 'yes') return;

        if(!current_user_can( 'manage_options' )) return;

        $user_id = isset($output['user_id']) ? sanitize_text_field($output['user_id']) : '';
        $_wpnonce = isset($output['_wpnonce']) ? sanitize_text_field($output['_wpnonce']) : '';


        if ( wp_verify_nonce( $_wpnonce, 'mark_as_verified' )  ){

            $user_data = get_user_by('id', $user_id);
            update_user_meta( $user_id, 'user_activation_status', 1 );

            $display_name = $user_data->display_name;

            ob_start();

            ?>
            <div class="updated notice is-dismissible">
                <p>
                    <?php
                    echo sprintf(__('%s marked as verified', 'user-verification'), '<strong>'.$display_name.'</strong>')
                    ?>
                </p>

            </div>
            <?php

            echo ob_get_clean();

        }

    }



    public function mark_as_unverified(){

        wp_parse_str($_SERVER['QUERY_STRING'], $output);
        $mark_as_unverified = isset($output['mark_as_unverified']) ? sanitize_text_field($output['mark_as_unverified']) : '';

        if(empty($mark_as_unverified)) return;
        if($mark_as_unverified != 'yes') return;

        if(!current_user_can( 'manage_options' )) return;

        $user_id = isset($output['user_id']) ? sanitize_text_field($output['user_id']) : '';
        $_wpnonce = isset($output['_wpnonce']) ? sanitize_text_field($output['_wpnonce']) : '';


        if ( wp_verify_nonce( $_wpnonce, 'mark_as_unverified' )  ){

            $user_data = get_user_by('id', $user_id);
            update_user_meta( $user_id, 'user_activation_status', 0 );

            $display_name = $user_data->display_name;

            ob_start();

            ?>
            <div class="updated notice is-dismissible">
                <p>
                    <?php
                    echo sprintf(__('%s marked as Unverified', 'user-verification'), '<strong>'.$display_name.'</strong>')
                    ?>
                </p>

            </div>
            <?php

            echo ob_get_clean();

        }

    }



    public function resend_verification(){

        wp_parse_str($_SERVER['QUERY_STRING'], $output);
        $resend_verification = isset($output['resend_verification']) ? sanitize_text_field($output['resend_verification']) : '';

        if(empty($resend_verification)) return;
        if($resend_verification != 'yes') return;

        if(!current_user_can( 'manage_options' )) return;

        $user_id = isset($output['user_id']) ? sanitize_text_field($output['user_id']) : '';
        $_wpnonce = isset($output['_wpnonce']) ? sanitize_text_field($output['_wpnonce']) : '';


        if ( wp_verify_nonce( $_wpnonce, 'resend_verification' )  ){

            $user_data = get_user_by('id', $user_id);
            $user_verification_settings = get_option('user_verification_settings');
            $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';

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

            $display_name = $user_data->display_name;

            ob_start();

            ?>
            <div class="updated notice is-dismissible">
                <p>
                    <?php
                    echo sprintf(__('Verification mail resend to %s', 'user-verification'), '<strong>'.$display_name.'</strong>')
                    ?>
                </p>

            </div>
            <?php

            echo ob_get_clean();

        }

    }



}

new class_user_verification_notices();