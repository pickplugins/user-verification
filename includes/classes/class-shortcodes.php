<?php



if (!defined('ABSPATH')) exit;  // if direct access


class class_user_verification_shortcodes
{


    public function __construct()
    {


        add_shortcode('user_verification_magic_login_form', array($this, 'user_verification_magic_login_form'));
    }


    public function user_verification_magic_login_form($atts, $content = null)
    {

        $atts = shortcode_atts(
            array(
                'id' => "",
            ),
            $atts
        );



        //$post_id = isset($atts['id']) ?  $atts['id'] : '';



        ob_start();


        do_action("user_verification_magic_login_form");

        wp_enqueue_script('user_verification_magic_login_form');
        wp_enqueue_style('user_verification_magic_login_form');



        return ob_get_clean();
    }
}

new class_user_verification_shortcodes();
