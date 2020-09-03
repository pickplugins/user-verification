<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

class class_user_verification_settings{

	public function __construct(){
		
		add_action('admin_menu', array( $this, '_menu_init' ));
		
		}


    public function _menu_init() {

        //add_menu_page(__('User Verification', 'breadcrumb'), __('User Verification', 'breadcrumb'), 'manage_options', 'user_verification', array( $this, 'settings' ), 'dashicons-arrow-right-alt');
        add_submenu_page( 'users.php', __( 'User Verification', 'team' ), __( 'User Verification', 'team' ), 'manage_options', 'user_verification', array( $this, 'settings' ) );


    }

	public function settings(){
		include(UV_PLUGIN_DIR.'includes/menu/settings.php');
	}


	
}
	
new class_user_verification_settings();


