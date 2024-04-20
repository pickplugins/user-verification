<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

add_filter('user_verification_settings_tabs', 'user_verification_settings_tabs_wp_user_manager');

function user_verification_settings_tabs_wp_user_manager($tabs){

    $current_tab = isset($_REQUEST['tab']) ? sanitize_text_field($_REQUEST['tab']) : 'email_verification';



    $tabs[] = array(
        'id' => 'wp_user_manager',
        'title' => sprintf(__('%s WP User Manager','user-verification'),'<i class="fas fa-users"></i>'),
        'priority' => 20,
        'active' => ($current_tab == 'wp_user_manager') ? true : false,
    );

    return $tabs;

}


add_action('user_verification_settings_content_wp_user_manager', 'user_verification_settings_content_wp_user_manager');

function user_verification_settings_content_wp_user_manager(){


    $settings_tabs_field = new settings_tabs_field();

    $user_verification_settings = get_option('user_verification_settings');



    $disable_auto_login = isset($user_verification_settings['wp_user_manager']['disable_auto_login']) ? $user_verification_settings['wp_user_manager']['disable_auto_login'] : 'no';
    $message_before_header = isset($user_verification_settings['wp_user_manager']['message_before_header']) ? $user_verification_settings['wp_user_manager']['message_before_header'] : '';




    ?>
    <div class="section">
        <div class="section-title"><?php echo __('WP User Manager', 'user-verification'); ?></div>
        <p class="description section-description"><?php echo __('Customize options for WP User Manager.', 'user-verification'); ?></p>

        <?php


        $args = array(
            'id'		=> 'disable_auto_login',
            'parent'		=> 'user_verification_settings[wp_user_manager]',
            'title'		=> __('Disable auto login','user-verification'),
            'details'	=> __('You can disable auto login after registration via ultimate member register form.','user-verification'),
            'type'		=> 'select',
            'value'		=> $disable_auto_login,
            'default'		=> '',
            'args'		=> array('yes'=>__('Yes','user-verification'), 'no'=>__('No','user-verification')  ),
        );

        $settings_tabs_field->generate_field($args);


        $args = array(
            'id'		=> 'message_before_header',
            'parent'		=> 'user_verification_settings[wp_user_manager]',
            'title'		=> __('Display Message after successfully registration','user-verification'),
            'details'	=> __('You can display custom message at profile header after redirect profile page via Ultimate Member.','user-verification'),
            'type'		=> 'text',
            'value'		=> $message_before_header,
            'default'		=> '',
        );

        //$settings_tabs_field->generate_field($args);



        ?>

    </div>

    <?php
}


