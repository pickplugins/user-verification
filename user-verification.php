<?php
/*
Plugin Name: User Verification by PickPlugins
Plugin URI: http://pickplugins.com
Description: Verify user before access on your website.
Version: 2.0.36
Text Domain: user-verification
Domain Path: /languages
Author: PickPlugins
Author URI: http://pickplugins.com
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

if (!defined('ABSPATH')) exit;  // if direct access 


class UserVerification
{

    public function __construct()
    {

        $this->_define_constants();

        $this->_load_functions();
        $this->_load_classes();
        $this->_load_script();

        global $postGridBlocksVars;

        $postGridBlocksVars['siteUrl'] = get_bloginfo('url');


        add_action('init', array($this, '_textdomain'));
        register_activation_hook(__FILE__, array($this, '_activation'));
        register_deactivation_hook(__FILE__, array($this, '_deactivation'));
        add_filter('cron_schedules', array($this, '_cron_schedules'));
        add_action('wp_enqueue_scripts', array($this, '_front_scripts'));
        add_action('login_enqueue_scripts', array($this, '_login_scripts'));
    }


    public function _textdomain()
    {

        $locale = apply_filters('plugin_locale', get_locale(), 'user-verification');
        load_textdomain('user-verification', WP_LANG_DIR . '/user-verification/user-verification-' . $locale . '.mo');

        load_plugin_textdomain('user-verification', false, plugin_basename(dirname(__FILE__)) . '/languages/');
    }

    function _cron_schedules($schedules)
    {



        $schedules['10minute'] = array(
            'interval'  => 600,
            'display'   => __('10 Minute', 'user-verification')
        );

        $schedules['30minute'] = array(
            'interval'  => 1800,
            'display'   => __('30 Minute', 'user-verification')
        );

        $schedules['6hours'] = array(
            'interval'  => 21600,
            'display'   => __('6 hours', 'user-verification')
        );





        return $schedules;
    }


    public function _activation()
    {


        if (!wp_next_scheduled('user_verification_clean_user_meta')) {
            wp_schedule_event(time(), 'daily', 'user_verification_clean_user_meta');
        }

        if (!wp_next_scheduled('user_verification_verify_reminder')) {
            wp_schedule_event(time(), 'daily', 'user_verification_verify_reminder');
        }

        if (!wp_next_scheduled('user_verification_validated_users_email')) {
            wp_schedule_event(time(), 'daily', 'user_verification_validated_users_email');
        }

        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        $prefix = $wpdb->prefix;
        $table = $prefix . 'user_verification_stats';

        $sql = "CREATE TABLE IF NOT EXISTS $table (

                    id int(100) NOT NULL AUTO_INCREMENT,
        			type	VARCHAR( 50 )	NOT NULL,
        			datetime  DATETIME NOT NULL,

                    UNIQUE KEY id (id)
                ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);


        // $user_verification_info = array();
        // $user_verification_info['db_version'] = 0;



        do_action('user_verification_activation');
    }


    public function _deactivation()
    {

        wp_clear_scheduled_hook('user_verification_clean_user_meta');
        wp_clear_scheduled_hook('user_verification_verify_reminder');


        /*
         * Custom action hook for plugin deactivation.
         * Action hook: user_verification_deactivation
         * */
        do_action('user_verification_deactivation');
    }


    public function _load_functions()
    {


        require_once(user_verification_plugin_dir . 'includes/functions-email-validation.php');
        require_once(user_verification_plugin_dir . 'includes/functions.php');
        require_once(user_verification_plugin_dir . 'includes/functions-ajax.php');

        require_once(user_verification_plugin_dir . 'includes/functions-recaptcha.php');
        require_once(user_verification_plugin_dir . 'includes/functions-mail-otp.php');
        require_once(user_verification_plugin_dir . 'includes/functions-isspammy.php');
        //require_once( user_verification_plugin_dir . 'includes/functions-temp-login.php');

        require_once(user_verification_plugin_dir . 'includes/functions-cron-hook.php');

        require_once(user_verification_plugin_dir . 'includes/3rd-party/3rd-party.php');

        require_once(user_verification_plugin_dir . 'includes/functions-user-profile.php');
        require_once(user_verification_plugin_dir . 'includes/functions-rest.php');
        require_once(user_verification_plugin_dir . 'includes/functions-counter.php');

        require_once(user_verification_plugin_dir . 'templates/magic-login-form/index.php');
        require_once(user_verification_plugin_dir . 'templates/magic-login-form/hook.php');

        require_once(user_verification_plugin_dir . 'templates/email-otp-login-form/index.php');
        require_once(user_verification_plugin_dir . 'templates/email-otp-login-form/hook.php');
    }


    public function _load_script()
    {

        add_action('admin_enqueue_scripts', 'wp_enqueue_media');
        add_action('admin_enqueue_scripts', array($this, '_admin_scripts'));
    }


    public function _load_classes()
    {
        require_once(user_verification_plugin_dir . 'includes/classes/class-manage-verification.php');


        require_once(user_verification_plugin_dir . 'includes/classes/class-emails.php');
        require_once(user_verification_plugin_dir . 'includes/classes/class-settings.php');
        require_once(user_verification_plugin_dir . 'includes/classes/class-column-users.php');
        require_once(user_verification_plugin_dir . 'includes/classes/class-settings-tabs.php');
        require_once(user_verification_plugin_dir . 'includes/settings-hook.php');
        require_once(user_verification_plugin_dir . 'includes/classes/class-admin-notices.php');
        require_once(user_verification_plugin_dir . 'includes/classes/class-email-verifier.php');
        require_once(user_verification_plugin_dir . 'includes/classes/class-shortcodes.php');
        require_once(user_verification_plugin_dir . 'includes/classes/class-stats.php');
    }

    public function _define_constants()
    {

        $this->_define('user_verification_plugin_name', __('User Verification', 'user-verification'));
        $this->_define('user_verification_plugin_url', plugins_url('/', __FILE__));
        $this->_define('user_verification_plugin_dir', plugin_dir_path(__FILE__));
    }

    private function _define($name, $value)
    {
        if ($name && $value)
            if (!defined($name)) {
                define($name, $value);
            }
    }


    public function _login_scripts()
    {

        $user_verification_settings = get_option('user_verification_settings');
        $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';
        $recaptcha_version = !empty($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';
        $default_login_page = isset($user_verification_settings['recaptcha']['default_login_page']) ? $user_verification_settings['recaptcha']['default_login_page'] : 'yes';
        $default_lostpassword_page = isset($user_verification_settings['recaptcha']['default_lostpassword_page']) ? $user_verification_settings['recaptcha']['default_lostpassword_page'] : 'yes';
        $default_registration_page = isset($user_verification_settings['recaptcha']['default_registration_page']) ? $user_verification_settings['recaptcha']['default_registration_page'] : 'yes';




        wp_enqueue_script('jquery');

        if ($default_login_page == 'yes') {
            if ($recaptcha_version == 'v2_checkbox') {
                wp_enqueue_script('recaptcha_js',  'https://www.google.com/recaptcha/api.js', [], null);
            } elseif ($recaptcha_version == 'v3') {
                wp_enqueue_script('recaptcha_js',  'https://www.google.com/recaptcha/api.js?render=' . $sitekey . '&ver=3.0', [], null);
            }
        }


        if ($default_registration_page == 'yes') {
            if ($recaptcha_version == 'v2_checkbox') {
                wp_enqueue_script('recaptcha_js',  'https://www.google.com/recaptcha/api.js', [], null);
            } elseif ($recaptcha_version == 'v3') {
                wp_enqueue_script('recaptcha_js',  'https://www.google.com/recaptcha/api.js?render=' . $sitekey . '&ver=3.0', [], null);
            }
        }


        if ($default_lostpassword_page == 'yes') {
            if ($recaptcha_version == 'v2_checkbox') {
                wp_enqueue_script('recaptcha_js',  'https://www.google.com/recaptcha/api.js', [], null);
            } elseif ($recaptcha_version == 'v3') {
                wp_enqueue_script('recaptcha_js',  'https://www.google.com/recaptcha/api.js?render=' . $sitekey . '&ver=3.0', [], null);
            }
        }




        wp_register_script('scripts-login', plugins_url('/assets/front/js/scripts-login.js', __FILE__), array('jquery'), '', true);
        wp_register_style('font-awesome-5', user_verification_plugin_url . 'assets/global/css/font-awesome-5.css');
    }

    public function _front_scripts()
    {

        $user_verification_settings = get_option('user_verification_settings');
        $sitekey = isset($user_verification_settings['recaptcha']['sitekey']) ? $user_verification_settings['recaptcha']['sitekey'] : '';
        $recaptcha_version = !empty($user_verification_settings['recaptcha']['version']) ? $user_verification_settings['recaptcha']['version'] : 'v2_checkbox';
        $default_login_page = isset($user_verification_settings['recaptcha']['default_login_page']) ? $user_verification_settings['recaptcha']['default_login_page'] : '';




        wp_enqueue_script('jquery');



        wp_register_script('uv_front_js', plugins_url('/assets/front/js/scripts.js', __FILE__), array('jquery'));
        wp_register_script('user_verification_magic_login_form', plugins_url('/templates/magic-login-form/index.js', __FILE__), array());
        wp_register_style('user_verification_magic_login_form', user_verification_plugin_url . 'templates/magic-login-form/index.css');
        wp_register_script('user_verification_otp_login_form', plugins_url('/templates/email-otp-login-form/index.js', __FILE__), array());
        wp_register_style('user_verification_otp_login_form', user_verification_plugin_url . 'templates/email-otp-login-form/index.css');

        //wp_localize_script( 'uv_front_js', 'uv_ajax', array( 'uv_ajaxurl' => admin_url( 'admin-ajax.php')));


        wp_register_style('user_verification', user_verification_plugin_url . 'assets/front/css/style.css');


        if ($default_login_page == 'yes') {
            if ($recaptcha_version == 'v2_checkbox') {
                wp_enqueue_script('recaptcha_js',  'https://www.google.com/recaptcha/api.js', [], null);
            } elseif ($recaptcha_version == 'v3') {
                wp_enqueue_script('recaptcha_js',  'https://www.google.com/recaptcha/api.js?render=' . $sitekey, [], null);
            }
        }




        wp_register_script('scripts-otp', plugins_url('/assets/front/js/scripts-otp.js', __FILE__), array('jquery'), '', true);
        //wp_localize_script('scripts-otp', 'user_verification_ajax', array('user_verification_ajaxurl' => admin_url('admin-ajax.php')));

        //global
        wp_register_style('font-awesome-4', user_verification_plugin_url . 'assets/global/css/font-awesome-4.css');
        wp_register_style('font-awesome-5', user_verification_plugin_url . 'assets/global/css/font-awesome-5.css');
    }

    public function _admin_scripts()
    {

        $screen = get_current_screen();

        wp_enqueue_script('jquery');
        wp_enqueue_script('jquery-ui-core');
        wp_enqueue_script('jquery-ui-accordion');



        wp_register_script('jquery.lazy', user_verification_plugin_url . 'assets/admin/js/jquery.lazy.js', array('jquery'));

        wp_register_script('select2', user_verification_plugin_url . 'assets/admin/js/select2.full.js', array('jquery'));
        wp_register_style('select2', user_verification_plugin_url . 'assets/admin/css/select2.min.css');

        wp_register_style('font-awesome-4', user_verification_plugin_url . 'assets/global/css/font-awesome-4.css');
        wp_register_style('font-awesome-5', user_verification_plugin_url . 'assets/global/css/font-awesome-5.css');
        wp_register_style('icofont', user_verification_plugin_url . 'assets/css/icofont/icofont.min.css');



        wp_register_style('settings-tabs', user_verification_plugin_url . 'assets/settings-tabs/settings-tabs.css');
        wp_register_script('settings-tabs', user_verification_plugin_url . 'assets/settings-tabs/settings-tabs.js', array('jquery'));

        //wp_register_script('form-field-dependency', user_verification_plugin_url . 'assets/admin/js/form-field-dependency.min.js', array('jquery'));




        // Global

        //var_dump($screen);

        if ($screen->id == 'users_page_user_verification') {

            wp_enqueue_script('uv_admin_js', plugins_url('/assets/admin/js/scripts.js', __FILE__), array('jquery'));
            wp_localize_script('uv_admin_js', 'uv_ajax', array('uv_ajaxurl' => admin_url('admin-ajax.php')));
            wp_localize_script('uv_admin_js', 'L10n_user_verification', array(
                'confirm_text' => __('Are you sure?', 'user-verification'),
                'reset_confirm_text' => __('Do you really want to reset?', 'user-verification'),
                'mark_as_verified' => __('Mark as verified', 'user-verification'),
                'mark_as_unverified' => __('Mark as unverified', 'user-verification'),
                'updating' => __('Updating user', 'user-verification'),
            ));


            wp_enqueue_style('uv_admin_style', user_verification_plugin_url . 'assets/admin/css/style.css');
            wp_enqueue_style('jquery-ui', user_verification_plugin_url . 'assets/global/css/jquery-ui.css');

            wp_enqueue_style('select2');
            wp_enqueue_script('select2');

            wp_enqueue_style('font-awesome-5');


            $settings_tabs_field = new settings_tabs_field();
            $settings_tabs_field->admin_scripts();
        }
    }
}

new UserVerification();
