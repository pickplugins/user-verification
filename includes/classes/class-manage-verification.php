<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

class class_user_verification_manage_verification{
	
	public function __construct(){
        add_action('init', array( $this, 'check_subscriber' ));

        add_action('init', array($this, 'email_verification_status'));

        add_action('wp_footer', array($this, 'check_email_verification'));


		}



    public function check_subscriber(){

        if (isset($_REQUEST['mail_picker_action']) && trim($_REQUEST['mail_picker_action']) == 'check_subscriber') {

            $response = array();


            echo json_encode($response);
            exit(0);
        }

    }

    public function email_verification_status(){

        if (isset($_REQUEST['user_verification_action']) && trim($_REQUEST['user_verification_action']) == 'verification_status') {

        }

        var_dump('Hello');
        var_dump('Hello');
        var_dump('Hello');
        var_dump('Hello');


    }

	public function check_email_verification(){

        if (isset($_REQUEST['user_verification_action']) && trim($_REQUEST['user_verification_action']) == 'email_verification') {

            $activation_key = isset($_REQUEST['activation_key']) ? sanitize_text_field($_REQUEST['activation_key']) : '';

            //var_dump($verification_key);

            ?>
            <div class="check-email-verification">
                <div class="inner">

                    <h2 class="status-title">Checking Verification</h2>

                    <div class="status">
                        <span class="status-icon"><i class="fas fa-spin fa-spinner"></i></span>
                        <span class="status-text">please wait...</span>

                    </div>

                    <div class="redirect">
                        <p>You will redirect after verification</p>
                        <a href="#">Click if not redirect automatically</a>
                    </div>

                </div>
            </div>

            <script>
                jQuery(document).ready(function($) {

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









