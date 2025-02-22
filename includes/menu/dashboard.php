<?php
if (!defined('ABSPATH')) exit;  // if direct access

wp_enqueue_style('post-grid-output', user_verification_plugin_url . '/dist/output.css', [], time(), 'all');
wp_enqueue_style('pg-admin-g-fonts');
wp_enqueue_style('icofont');

wp_register_style('pg-admin-g-fonts', 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
wp_enqueue_style('pg-admin-g-fonts');

wp_enqueue_style('wp-components');
wp_enqueue_editor();



wp_enqueue_script(
    'post-grid-blocks',
    user_verification_plugin_url . 'build/index.js',
    [
        'wp-blocks',
        'wp-editor',
        'wp-i18n',
        'wp-element',
        'wp-components',
        'wp-data',
        'wp-plugins',
        'wp-edit-post',
    ],
    time()

);


wp_localize_script('post-grid-blocks', 'user_verification_editor_js', array('post_grid_ajaxurl' => admin_url('admin-ajax.php'), '_wpnonce' => wp_create_nonce('wp_rest')));


$user_verification_settings = get_option("user_verification_settings");

// var_dump($user_verification_settings['email_templates_data']['user_registered']);


?>
<div class="wrap">
    <div id="cb-dashboard" class=""></div>
</div>