<?php
if (!defined('ABSPATH')) exit;  // if direct access 

add_action('comment_form_after',  'user_verification_comment_form_privacy_notice');

function user_verification_comment_form_privacy_notice()
{

    $user_verification_settings = get_option('user_verification_settings');
    $isspammy = isset($user_verification_settings['isspammy']) ? $user_verification_settings['isspammy'] : array();

    $comment_form_notice = isset($isspammy['comment_form_notice']) ? $isspammy['comment_form_notice'] : 'no';
    $comment_form_notice_text = !empty($isspammy['comment_form_notice_text']) ? sprintf($isspammy['comment_form_notice_text'], 'https://isspammy.com/privacy-policy/') :
        sprintf(__('This site uses User Verification plugin to reduce spam. <a href="%s" target="_blank" rel="nofollow noopener">See how your comment data is processed</a>.', 'user-verification'), 'https://isspammy.com/privacy-policy/');

    if ($comment_form_notice != 'yes') return;

    echo apply_filters('user_verification_comment_form_notice_text', wp_kses_post($comment_form_notice_text));
}

add_filter('registration_errors', 'registration_errors_block_spammer', 10, 3);
function registration_errors_block_spammer($errors, $sanitized_user_login, $user_email)
{


    $user_verification_settings = get_option('user_verification_settings');

    $block_register = isset($user_verification_settings['isspammy']['block_register']) ? $user_verification_settings['isspammy']['block_register'] : 'no';

    if ($block_register != 'yes') return $errors;

    // do the code here
    //$domain = get_bloginfo('url');


    // API query parameters
    $api_params = array(
        'check' => $user_email,
    );

    // Send query to the license manager server
    $response = wp_remote_get(add_query_arg($api_params, 'https://isspammy.com/'), array('timeout' => 20, 'sslverify' => false));

    // Check for error in the response
    if (is_wp_error($response)) {
        echo __("Unexpected Error! The query returned with an error.", 'user-verification');
    } else {
        //var_dump($response);//uncomment it if you want to look at the full response

        // License data.
        $spammer_data = json_decode(wp_remote_retrieve_body($response));
        $spammer_found = isset($spammer_data->spammer_found) ? sanitize_text_field($spammer_data->spammer_found) : 'no';

        if ($spammer_found == 'yes') {
            $errors->add('blocked_spammer', __("Spammers are not allowed to register.", 'user-verification'));
        }
    }


    return $errors;
}


//add_filter( 'wp_login_errors', 'user_verification_wp_login_errors_block_spammers', 10, 2 );

function user_verification_wp_login_errors_block_spammers($errors, $redirect_to)
{


    $user_verification_settings = get_option('user_verification_settings');
    $email_verification_enable = isset($user_verification_settings['email_verification']['enable']) ? $user_verification_settings['email_verification']['enable'] : 'yes';
    $block_login = isset($user_verification_settings['isspammy']['block_login']) ? $user_verification_settings['isspammy']['block_login'] : 'yes';

    $errors->add('blocked_spammer', __("Spammers are not allowed to login.", 'user-verification'));




    return $errors;
}











function user_verification_trash_comment($comment_id, $comment)
{

    $user_verification_settings = get_option('user_verification_settings');

    $report_comment_trash = isset($user_verification_settings['isspammy']['report_comment_trash']) ? $user_verification_settings['isspammy']['report_comment_trash'] : 'no';

    if ($report_comment_trash != 'yes') return;

    // do the code here
    //error_log($comment_id);
    $domain = get_bloginfo('url');


    // API query parameters
    $api_params = array(
        'report_spam' => $comment->comment_author_email,
        'ref_domain' => $domain,
    );

    // Send query to the license manager server
    $response = wp_remote_get(add_query_arg($api_params, 'https://isspammy.com/'), array('timeout' => 20, 'sslverify' => false));

    // Check for error in the response
    if (is_wp_error($response)) {
        echo __("Unexpected Error! The query returned with an error.", 'user-verification');
    } else {
        //var_dump($response);//uncomment it if you want to look at the full response

        // License data.
        $spammer_data = json_decode(wp_remote_retrieve_body($response));

        //$license_key = isset($license_data->license_key) ? sanitize_text_field($license_data->license_key) : '';

    }
}

add_action('trash_comment', 'user_verification_trash_comment', 10, 2);



function user_verification_spam_comment($comment_id, $comment)
{

    $user_verification_settings = get_option('user_verification_settings');

    $report_comment_spam = isset($user_verification_settings['isspammy']['report_comment_spam']) ? $user_verification_settings['isspammy']['report_comment_spam'] : 'no';

    if ($report_comment_spam != 'yes') return;

    // do the code here
    //error_log($comment_id);
    $domain = get_bloginfo('url');


    // API query parameters
    $api_params = array(
        'report_spam' => $comment->comment_author_email,
        'ref_domain' => $domain,
    );

    // Send query to the license manager server
    $response = wp_remote_get(add_query_arg($api_params, 'https://isspammy.com/'), array('timeout' => 20, 'sslverify' => false));

    // Check for error in the response
    if (is_wp_error($response)) {
        echo __("Unexpected Error! The query returned with an error.", 'user-verification');
    } else {
        //var_dump($response);//uncomment it if you want to look at the full response

        // License data.
        $spammer_data = json_decode(wp_remote_retrieve_body($response));

        //$license_key = isset($license_data->license_key) ? sanitize_text_field($license_data->license_key) : '';

    }
}

add_action('spam_comment', 'user_verification_spam_comment', 10, 2);








add_filter('pre_comment_approved', 'user_verification_pre_comment_approved', 10, 2);
function user_verification_pre_comment_approved($approved, $commentdata)
{


    $user_verification_settings = get_option('user_verification_settings');
    $block_comment = isset($user_verification_settings['isspammy']['block_comment']) ? $user_verification_settings['isspammy']['block_comment'] : 'no';

    if ($block_comment != 'yes') return $approved;
    // do the code here
    //$domain = get_bloginfo('url');


    // API query parameters
    $api_params = array(
        'check' => $commentdata['comment_author_email'],
    );

    // Send query to the license manager server
    $response = wp_remote_get(add_query_arg($api_params, 'https://isspammy.com/'), array('timeout' => 20, 'sslverify' => false));

    // Check for error in the response
    if (is_wp_error($response)) {
        echo __("Unexpected Error! The query returned with an error.", 'user-verification');
    } else {
        //var_dump($response);//uncomment it if you want to look at the full response

        // License data.
        $spammer_data = json_decode(wp_remote_retrieve_body($response));
        //var_dump($license_data);
        //echo $license_data->message;

        $spammer_found = isset($spammer_data->spammer_found) ? sanitize_text_field($spammer_data->spammer_found) : 'no';

        if ($spammer_found == 'yes') {

            $approved = 'trash';
        }
    }



    return $approved;
}














function user_verification_preprocess_comment($commentdata)
{

    $user_verification_settings = get_option('user_verification_settings');

    $block_comment = isset($user_verification_settings['isspammy']['block_comment']) ? $user_verification_settings['isspammy']['block_comment'] : 'no';

    if ($block_comment != 'yes') return $commentdata;

    // do the code here
    //error_log($commentdata['comment_author_email']);
    $domain = get_bloginfo('url');


    // API query parameters
    $api_params = array(
        'check' => $commentdata['comment_author_email'],
    );

    // Send query to the license manager server
    $response = wp_remote_get(add_query_arg($api_params, 'https://isspammy.com/'), array('timeout' => 20, 'sslverify' => false));

    // Check for error in the response
    if (is_wp_error($response)) {
        echo __("Unexpected Error! The query returned with an error.", 'user-verification');
    } else {
        //var_dump($response);//uncomment it if you want to look at the full response

        // License data.
        $spammer_data = json_decode(wp_remote_retrieve_body($response));

        $spammer_found = isset($spammer_data->spammer_found) ? sanitize_text_field($spammer_data->spammer_found) : 'no';

        if ($spammer_found == 'yes') {
            $commentdata = array();
        }
    }

    return $commentdata;
}

//add_action( 'preprocess_comment', 'user_verification_preprocess_comment', 90 );



function user_verification_duplicate_comment_id($dupe_id, $commentdata)
{

    $user_verification_settings = get_option('user_verification_settings');

    $block_comment = isset($user_verification_settings['isspammy']['block_comment']) ? $user_verification_settings['isspammy']['block_comment'] : 'no';

    if ($block_comment != 'yes') return $dupe_id;

    // do the code here
    //error_log(serialize($commentdata));


    // API query parameters
    $api_params = array(
        'check' => $commentdata['comment_author_email'],
    );

    // Send query to the license manager server
    $response = wp_remote_get(add_query_arg($api_params, 'https://isspammy.com/'), array('timeout' => 20, 'sslverify' => false));

    // Check for error in the response
    if (is_wp_error($response)) {
        echo __("Unexpected Error! The query returned with an error.", 'user-verification');
    } else {
        //var_dump($response);//uncomment it if you want to look at the full response

        // License data.
        $spammer_data = json_decode(wp_remote_retrieve_body($response));

        $spammer_found = isset($spammer_data->spammer_found) ? sanitize_text_field($spammer_data->spammer_found) : 'no';


        if ($spammer_found == 'yes') {
            //$commentdata = array();

            $dupe_id = true;
        }
    }

    return $dupe_id;
}

//add_action( 'duplicate_comment_id', 'user_verification_duplicate_comment_id', 90, 2 );















function user_verification_is_verified($userid)
{

    $status = get_user_meta($userid, 'user_activation_status', true);

    if ($status == 1) {
        return true;
    } else {
        return false;
    }
}






add_filter('bulk_actions-users', 'user_verification_bulk_approve');
function user_verification_bulk_approve($actions)
{
    //unset( $actions['delete'] );

    $actions['uv_bulk_approve'] = __('Mark as verified', 'user-verification');
    $actions['uv_bulk_disapprove'] = __('Mark as unverified', 'user-verification');

    return $actions;
}





add_filter('handle_bulk_actions-users', 'user_verification_bulk_approve_handler', 10, 3);
function user_verification_bulk_approve_handler($redirect_to, $doaction, $items)
{

    if ($doaction == 'uv_bulk_approve') {

        foreach ($items as $user_id) {
            // Perform action for each post.
            update_user_meta($user_id, 'user_activation_status', 1);
        }

        $redirect_to = add_query_arg('uv_bulk_approve', count($items), $redirect_to);
    } elseif ($doaction == 'uv_bulk_disapprove') {

        foreach ($items as $user_id) {
            // Perform action for each post.
            update_user_meta($user_id, 'user_activation_status', 0);
        }

        $redirect_to = add_query_arg('uv_bulk_disapprove', count($items), $redirect_to);
    }


    return $redirect_to;
}



add_action('admin_notices', 'user_verification_bulk_action_admin_notice');
function user_verification_bulk_action_admin_notice()
{
    if (isset($_REQUEST['uv_bulk_approve'])) {


        $user_count =  isset($_REQUEST['uv_bulk_approve']) ? sanitize_text_field($_REQUEST['uv_bulk_approve']) : '';
        $user_count =  intval($user_count);

?>
        <div id="message" class="updated notice is-dismissible">
            <p>
                <?php

                echo sprintf(__('%s user account marked as verified.', 'user-verification'), esc_html($user_count));

                ?>
            </p>

        </div>
    <?php



    } elseif (isset($_REQUEST['uv_bulk_disapprove'])) {

        $user_count = sanitize_text_field($_REQUEST['uv_bulk_disapprove']);
        $user_count = intval($user_count);



    ?>
        <div id="message" class="updated notice is-dismissible">
            <p>
                <?php

                echo sprintf(__('%s user account marked as unverified.', 'user-verification'), esc_html($user_count));

                ?>
            </p>

        </div>
    <?php



    }
}







function user_verification_is_username_blocked($username)
{

    $response = false;
    $user_verification_settings = get_option('user_verification_settings');
    $enable_username_block = isset($user_verification_settings['spam_protection']['enable_username_block']) ? $user_verification_settings['spam_protection']['enable_username_block'] : 'yes';
    $blocked_username = isset($user_verification_settings['spam_protection']['blocked_username']) ? $user_verification_settings['spam_protection']['blocked_username'] : array();


    if ($enable_username_block == "yes" && !empty($blocked_username)) :

        foreach ($blocked_username as $blocked) {
            $status = preg_match("/$blocked/", $username);
            if ($status == 1) :
                $response = true;
                break;
            endif;
        }
    endif;

    return $response;
}


add_filter('registration_errors', 'uv_registration_protect_username', 10, 3);
function uv_registration_protect_username($errors, $sanitized_user_login, $user_email)
{

    $username_blocked = user_verification_is_username_blocked($sanitized_user_login);


    if ($username_blocked) {
        $errors->add('blocked_username', __("<strong>{" . esc_html($sanitized_user_login) . "}</strong> username is not allowed!", 'user-verification'));
    }

    return $errors;
}



add_filter('registration_errors', 'uv_registration_protect_generic_mail', 10, 3);
function uv_registration_protect_generic_mail($errors, $sanitized_user_login, $user_email)
{

    $username_blocked = user_verification_is_generic_email($user_email);


    if ($username_blocked) {
        $errors->add('blocked_generic_mail', __("<strong>{" . esc_html($user_email) . "}</strong> generic mail addresses is not allowed!", 'user-verification'));
    }

    return $errors;
}



add_shortcode('user_verification_is_emaildomain_blocked', 'user_verification_is_emaildomain_blocked');

function user_verification_is_emaildomain_blocked($user_email)
{

    $user_verification_settings = get_option('user_verification_settings');
    $enable_domain_block = isset($user_verification_settings['spam_protection']['enable_domain_block']) ? $user_verification_settings['spam_protection']['enable_domain_block'] : 'yes';
    $blocked_domain = isset($user_verification_settings['spam_protection']['blocked_domain']) ? $user_verification_settings['spam_protection']['blocked_domain'] : array();


    $response = false;

    $blocked_domain                 = array_filter($blocked_domain);


    if ($enable_domain_block == "yes") {

        $email_parts = explode('@', $user_email);
        $email_domain = isset($email_parts[1]) ? $email_parts[1] : '';

        if (!empty($blocked_domain)) {

            if (in_array($email_domain, $blocked_domain)) {
                $response = true;
            } else {
                $response = false;
            }
        } else {
            $response = false;
        }
    }


    return $response;
}



add_shortcode('user_verification_is_emaildomain_allowed', 'user_verification_is_emaildomain_allowed');

function user_verification_is_emaildomain_allowed($user_email)
{


    $response = true;
    $user_verification_settings = get_option('user_verification_settings');
    $enable_domain_block = isset($user_verification_settings['spam_protection']['enable_domain_block']) ? $user_verification_settings['spam_protection']['enable_domain_block'] : 'yes';
    $allowed_domain = isset($user_verification_settings['spam_protection']['allowed_domain']) ? $user_verification_settings['spam_protection']['allowed_domain'] : array();




    $allowed_domain                 = array_filter($allowed_domain);


    if ($enable_domain_block == "yes") {

        $email_parts = explode('@', $user_email);
        $email_domain = isset($email_parts[1]) ? $email_parts[1] : '';


        if (!empty($allowed_domain)) {

            if (in_array($email_domain, $allowed_domain)) {
                $response = true;
            } else {
                $response = false;
            }
        } else {
            $response = true;
        }
    }


    return $response;
}








function user_verification_is_generic_email($user_email)
{

    $user_verification_settings = get_option('user_verification_settings');
    $generic_mail_block = isset($user_verification_settings['spam_protection']['generic_mail_block']) ? $user_verification_settings['spam_protection']['generic_mail_block'] : 'yes';
    $blocked_generic_mail = isset($user_verification_settings['spam_protection']['blocked_generic_mail']) ? $user_verification_settings['spam_protection']['blocked_generic_mail'] : array();


    $response = false;

    $blocked_generic_mail                 = array_filter($blocked_generic_mail);




    if ($generic_mail_block == "yes" && !empty($blocked_generic_mail)) :

        foreach ($blocked_generic_mail as $blocked) {
            $status = preg_match("/$blocked/", $user_email);
            if ($status == 1) :
                $response = true;
                break;
            endif;
        }
    endif;










    return $response;
}






add_filter('registration_errors', 'uv_registration_protect_blocked_domain', 10, 3);
function uv_registration_protect_blocked_domain($errors, $sanitized_user_login, $user_email)
{

    $is_blocked = user_verification_is_emaildomain_blocked($user_email);


    $email_parts = explode('@', $user_email);
    $email_domain = isset($email_parts[1]) ? $email_parts[1] : '';

    //    error_log('$is_blocked:'. $is_blocked);
    //    error_log('$is_blocked:'. $email_domain);


    if ($is_blocked) {
        $errors->add('blocked_domain', sprintf(__("This <strong>%s</strong> domain is blocked!", 'user-verification'), esc_url_raw($email_domain)));
    }

    return $errors;
}


add_filter('registration_errors', 'uv_registration_protect_allowed_domain', 10, 3);
function uv_registration_protect_allowed_domain($errors, $sanitized_user_login, $user_email)
{

    $is_allowed = user_verification_is_emaildomain_allowed($user_email);



    $email_parts = explode('@', $user_email);
    $email_domain = isset($email_parts[1]) ? $email_parts[1] : '';

    //    error_log('$is_allowed:'. $is_allowed);
    //    error_log('$is_allowed:'. $email_domain);

    if (!$is_allowed) {
        $errors->add('allowed_domain', sprintf(__("This <strong>%s</strong> domain is not allowed!", 'user-verification'), esc_url_raw($email_domain)));
    }

    return $errors;
}




add_filter('wp_login_errors', 'user_verification_registered_message', 10, 2);

function user_verification_registered_message($errors, $redirect_to)
{


    $user_verification_settings = get_option('user_verification_settings');
    $email_verification_enable = isset($user_verification_settings['email_verification']['enable']) ? $user_verification_settings['email_verification']['enable'] : 'yes';

    if ($email_verification_enable != 'yes') return $errors;

    $login_url = wp_login_url();

    $registration_success = isset($user_verification_settings['messages']['registration_success']) ? sprintf($user_verification_settings['messages']['registration_success'], $login_url) : sprintf(__('Registration complete. Please verify the mail first, then visit the <a href="%s">login page</a>.', 'user-verification'), $login_url);


    if (isset($errors->errors['registered'])) {

        $tmp = $errors->errors;

        foreach ($tmp['registered'] as $index => $msg) {
            $tmp['registered'][$index] = wp_specialchars_decode($registration_success, ENT_QUOTES);
        }

        $errors->errors = $tmp;

        unset($tmp);
    }

    return $errors;
}





function user_verification_get_pages_list()
{
    $array_pages['none'] = __('None', 'user-verification');

    $args = array(
        'sort_order' => 'asc',
        'sort_column' => 'post_title',
        'hierarchical' => 1,
        'exclude' => '',
        'include' => '',
        'meta_key' => '',
        'meta_value' => '',
        'authors' => '',
        'child_of' => 0,
        'parent' => -1,
        'exclude_tree' => '',
        'number' => '',
        'offset' => 0,
        'post_type' => 'page',
        'post_status' => 'publish,private'
    );
    $pages = get_pages($args);

    //$array_pages[0] = 'None';

    foreach ($pages as $page) {
        if ($page->post_title) $array_pages[$page->ID] = $page->post_title;
    }


    return $array_pages;
}


function user_verification_reset_email_templates()
{

    if (current_user_can('manage_options')) {
        delete_option('uv_email_templates_data');
    }
}

add_action('wp_ajax_user_verification_reset_email_templates', 'user_verification_reset_email_templates');
add_action('wp_ajax_nopriv_user_verification_reset_email_templates', 'user_verification_reset_email_templates');

function uv_filter_check_activation()
{



    $html = '';

    if (current_user_can('manage_options')) {
        _deprecated_function(__FUNCTION__, '1.0.46', '');


        $html .= __('This shortcode is no longer need, only admin can see this message');
    }


    return $html;
}

add_shortcode('user_verification_check', 'uv_filter_check_activation');



add_shortcode('user_verification_message', 'user_verification_check_status');

function user_verification_check_status($attr)
{

    $uv_check = isset($_GET['uv_check']) ? sanitize_text_field($_GET['uv_check']) : '';

    $msg = isset($attr['message']) ? $attr['message'] : __('Please check email to get verify first.', 'user-verification');

    if (is_user_logged_in() && $uv_check == 'true') {
        $userid = get_current_user_id();
        $status = user_verification_is_verified($userid);

        if (!$status) {
            $html = $msg;
            wp_logout();
            return $html;
        }
    }
}



add_shortcode('uv_resend_verification_form', 'uv_resend_verification_form');


function uv_resend_verification_form($attr)
{

    ob_start();
    wp_enqueue_style('user_verification');
    wp_enqueue_script('uv_front_js');
    wp_localize_script('uv_front_js', 'user_verification_ajax', array('user_verification_ajaxurl' => admin_url('admin-ajax.php')));

    ?>
    <form id="user-verification-resend" action="" method="post">
        <?php wp_nonce_field('nonce_resend_verification'); ?>
        <input type="hidden" name="resend_verification_hidden" value="Y">

        <div class="form-area">
            <input type="email" name="email" placeholder="<?php echo __('Email address', 'user-verification'); ?>" value="">
        </div>
        <div class="form-area">
            <input type="submit" value="<?php echo __('Resend', 'user-verification'); ?>" name="submit">
        </div>

        <div class="form-area message">

        </div>


    </form>
<?php

    return ob_get_clean();
}






add_action('init', 'user_verification_auto_login');
function user_verification_auto_login()
{


    if (
        isset($_REQUEST['user_verification_action']) && trim($_REQUEST['user_verification_action']) == 'autologin' &&
        isset($_REQUEST['activation_key'])
    ) {

        $activation_key = isset($_REQUEST['activation_key']) ? sanitize_text_field($_REQUEST['activation_key']) : '';


        global $wpdb;
        $table = $wpdb->prefix . "usermeta";

        //var_dump($activation_key);



        $meta_data    = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table WHERE meta_value = %s AND meta_key = 'user_activation_key'", $activation_key));


        if (empty($meta_data)) return;

        $user = get_user_by('id', $meta_data->user_id);

        $user_activation_status = get_user_meta($meta_data->user_id, 'user_activation_status', true);



        if ($user_activation_status == 1) {
            wp_set_current_user($meta_data->user_id, $user->user_login);
            wp_set_auth_cookie($meta_data->user_id);
            do_action('wp_login', $user->user_login, $user);
        }
    }
}




// Login Check
add_filter('authenticate', 'uv_user_authentication', 9999, 3);
function uv_user_authentication($errors, $username, $passwords)
{

    $error = new WP_Error();


    if (isset($errors->errors['incorrect_password'])) return $errors;

    if (!$passwords) return $errors;
    if (!$username) return $errors;



    $user = get_user_by('email', $username);
    if (empty($user)) $user = get_user_by('login', $username);
    if (empty($user)) return $errors;

    $user_activation_status = get_user_meta($user->ID, 'user_activation_status', true);

    $user_verification_settings = get_option('user_verification_settings');

    $exclude_user_roles = isset($user_verification_settings['email_verification']['exclude_user_roles']) ? $user_verification_settings['email_verification']['exclude_user_roles'] : array();
    $existing_user_verified = isset($user_verification_settings['unverified']['existing_user_verified']) ? $user_verification_settings['unverified']['existing_user_verified'] : 'no';


    $email_verification_enable = isset($user_verification_settings['email_verification']['enable']) ? $user_verification_settings['email_verification']['enable'] : 'yes';

    if ($email_verification_enable != 'yes') return $errors;

    $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';
    $verify_email = isset($user_verification_settings['messages']['verify_email']) ? $user_verification_settings['messages']['verify_email'] : __('Verify your email first!', 'user-verification');


    $verification_page_url = get_permalink($verification_page_id);
    $verification_page_url = !empty($verification_page_url) ? $verification_page_url : get_bloginfo('url');


    $resend_verification_url = add_query_arg(
        array(
            'user_id' => $user->ID,
            'user_verification_action' => 'resend_verification',
        ),
        $verification_page_url
    );

    $resend_verification_url = wp_nonce_url($resend_verification_url,  'resend_verification');





    $user_roles = !empty($user->roles) ? $user->roles : array();


    if (!empty($exclude_user_roles)) {


        foreach ($exclude_user_roles as $role) :

            if (in_array($role, $user_roles)) {
                //update_option('uv_custom_option', $role);
                update_user_meta($user->ID, 'user_activation_status', 1);
                return $errors;
            }

        endforeach;
    }

    if ($user_activation_status == '') {
        //error_log('step 1: ');
        //error_log('$user_activation_status: ' . $user_activation_status);

        if ($existing_user_verified == 'yes') {
            //update_user_meta($user->ID, 'user_activation_status', 1);
            return $errors;
        } else {
            $message = sprintf(
                '<strong>%s</strong> %s <a href="%s">%s</a>',
                __('Error:', 'user-verification'),
                wp_specialchars_decode($verify_email, ENT_QUOTES),
                $resend_verification_url,
                __('Resend verification email', 'user-verification')
            );

            return new WP_Error('uv_authentication_failed', __($message, "user-verification"));
        }
    }
    if ($user_activation_status === '1') {
        //error_log('step 2: ');
        //error_log('$user_activation_status: ' . $user_activation_status);
        return $errors;
    }

    if ($user_activation_status === '0') {
        //error_log('step 3: ');
        //error_log('$user_activation_status: ' . $user_activation_status);

        $message = sprintf(
            '<strong>%s</strong> %s <a href="%s">%s</a>',
            __('Error:', 'user-verification'),
            wp_specialchars_decode($verify_email, ENT_QUOTES),
            $resend_verification_url,
            __('Resend verification email', 'user-verification')
        );

        return new WP_Error('uv_authentication_failed', __($message, "user-verification"));
        // return new \WP_Error('authentication_failed', $message);
    }


    return $errors;
}







function user_verification_user_roles()
{

    $wp_roles = new WP_Roles();

    $roles = $wp_roles->get_names();

    return  $roles;
    // Below code will print the all list of roles.

}





add_action('user_register', 'user_verification_user_registered', 30);

if (!function_exists('user_verification_user_registered')) {
    function user_verification_user_registered($user_id)
    {


        $user_verification_settings = get_option('user_verification_settings');
        $email_verification_enable = isset($user_verification_settings['email_verification']['enable']) ? $user_verification_settings['email_verification']['enable'] : 'yes';

        $email_verification_enable = apply_filters('user_verification_enable', $email_verification_enable, $user_id);


        if ($email_verification_enable != 'yes') return;

        $class_user_verification_emails = new class_user_verification_emails();
        $email_templates_data = $class_user_verification_emails->email_templates_data();

        $logo_id = isset($user_verification_settings['logo_id']) ? $user_verification_settings['logo_id'] : '';
        $mail_wpautop = isset($user_verification_settings['mail_wpautop']) ? $user_verification_settings['mail_wpautop'] : 'yes';

        $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';
        $exclude_user_roles = isset($user_verification_settings['email_verification']['exclude_user_roles']) ? $user_verification_settings['email_verification']['exclude_user_roles'] : array();
        $email_templates_data =  $email_templates_data['user_registered'];
        // $email_templates_data = isset($user_verification_settings['email_templates_data']['user_registered']) ? $user_verification_settings['email_templates_data']['user_registered'] : $email_templates_data['user_registered'];


        //error_log(serialize($email_templates_data));
        $enable = isset($email_templates_data['enable']) ? $email_templates_data['enable'] : 'yes';

        $email_bcc = isset($email_templates_data['email_bcc']) ? $email_templates_data['email_bcc'] : '';
        $email_from = isset($email_templates_data['email_from']) ? $email_templates_data['email_from'] : '';
        $email_from_name = isset($email_templates_data['email_from_name']) ? $email_templates_data['email_from_name'] : '';
        $reply_to = isset($email_templates_data['reply_to']) ? $email_templates_data['reply_to'] : '';
        $reply_to_name = isset($email_templates_data['reply_to_name']) ? $email_templates_data['reply_to_name'] : '';
        $email_subject = isset($email_templates_data['subject']) ? $email_templates_data['subject'] : '';
        $email_body = isset($email_templates_data['html']) ? $email_templates_data['html'] : '';

        $email_body = do_shortcode($email_body);

        if ($mail_wpautop == 'yes') {
            $email_body = wpautop($email_body);
        }

        $verification_page_url = get_permalink($verification_page_id);
        $verification_page_url = !empty($verification_page_url) ? $verification_page_url : get_bloginfo('url');


        $permalink_structure = get_option('permalink_structure');

        $user_activation_key =  md5(uniqid('', true));

        update_user_meta($user_id, 'user_activation_key', $user_activation_key);
        update_user_meta($user_id, 'user_activation_status', 0);

        $user_data     = get_userdata($user_id);




        $user_roles = !empty($user_data->roles) ? $user_data->roles : array();


        if (!empty($exclude_user_roles))
            foreach ($exclude_user_roles as $role) :

                if (in_array($role, $user_roles)) {
                    update_user_meta($user_id, 'user_activation_status', 1);
                    return;
                }

            endforeach;


        $verification_url = add_query_arg(
            array(
                'activation_key' => $user_activation_key,
                'user_verification_action' => 'email_verification',
            ),
            $verification_page_url
        );

        $verification_url = wp_nonce_url($verification_url,  'email_verification');




        $site_name = get_bloginfo('name');
        $site_description = get_bloginfo('description');
        $site_url = get_bloginfo('url');
        $site_logo_url = wp_get_attachment_url($logo_id);

        $vars = array(
            '{site_name}' => esc_html($site_name),
            '{site_description}' => esc_html($site_description),
            '{site_url}' => esc_url_raw($site_url),
            '{site_logo_url}' => esc_url_raw($site_logo_url),

            '{first_name}' => esc_html($user_data->first_name),
            '{last_name}' => esc_html($user_data->last_name),
            '{user_display_name}' => esc_html($user_data->display_name),
            '{user_email}' => esc_html($user_data->user_email),
            '{user_name}' => esc_html($user_data->user_nicename),
            '{user_avatar}' => get_avatar($user_data->user_email, 60),

            '{ac_activaton_url}' => esc_url_raw($verification_url),

        );



        $vars = apply_filters('user_verification_mail_vars', $vars, $user_data);



        $email_data['email_to'] =  $user_data->user_email;
        $email_data['email_bcc'] =  $email_bcc;
        $email_data['email_from'] = $email_from;
        $email_data['email_from_name'] = $email_from_name;
        $email_data['reply_to'] = $reply_to;
        $email_data['reply_to_name'] = $reply_to_name;

        $email_data['subject'] = strtr($email_subject, $vars);
        $email_data['html'] = strtr($email_body, $vars);
        $email_data['attachments'] = array();

        // error_log(serialize($email_data));

        //error_log($enable);

        if ($enable == 'yes') {
            $mail_status = $class_user_verification_emails->send_email($email_data);
        }
    }
}





function user_verification_recursive_sanitize_arr($array)
{

    foreach ($array as $key => &$value) {
        if (is_array($value)) {
            $value = user_verification_recursive_sanitize_arr($value);
        } else {
            $value = wp_unslash(_wp_specialchars($value, ENT_QUOTES));
        }
    }

    return $array;
}



add_action('profile_update', 'user_verification_profile_update', 10, 2);

function user_verification_profile_update($user_id, $old_user_data)
{
    $userData = get_user_by('ID', $user_id);

    $old_email = isset($old_user_data->user_email) ? $old_user_data->user_email : '';
    $new_email = isset($userData->user_email) ? $userData->user_email : '';
    $user_verification_settings = get_option('user_verification_settings');

    $email_update_reverify = isset($user_verification_settings['email_verification']['email_update_reverify']) ? $user_verification_settings['email_verification']['email_update_reverify'] : 'no';

    if ($email_update_reverify == 'yes') {

        if (!empty($old_email) && ($old_email != $new_email)) {

            $email_verification_enable = isset($user_verification_settings['email_verification']['enable']) ? $user_verification_settings['email_verification']['enable'] : 'yes';

            if ($email_verification_enable != 'yes') return;

            $class_user_verification_emails = new class_user_verification_emails();
            $email_templates_data = $class_user_verification_emails->email_templates_data();

            $logo_id = isset($user_verification_settings['logo_id']) ? $user_verification_settings['logo_id'] : '';
            $mail_wpautop = isset($user_verification_settings['mail_wpautop']) ? $user_verification_settings['mail_wpautop'] : 'yes';

            $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';
            $exclude_user_roles = isset($user_verification_settings['email_verification']['exclude_user_roles']) ? $user_verification_settings['email_verification']['exclude_user_roles'] : array();
            $email_templates_data =  $email_templates_data['email_resend_key'];
            // $email_templates_data = isset($user_verification_settings['email_templates_data']['email_resend_key']) ? $user_verification_settings['email_templates_data']['email_resend_key'] : $email_templates_data['email_resend_key'];

            $enable = isset($email_templates_data['enable']) ? $email_templates_data['enable'] : 'yes';

            $email_bcc = isset($email_templates_data['email_bcc']) ? $email_templates_data['email_bcc'] : '';
            $email_from = isset($email_templates_data['email_from']) ? $email_templates_data['email_from'] : '';
            $email_from_name = isset($email_templates_data['email_from_name']) ? $email_templates_data['email_from_name'] : '';
            $reply_to = isset($email_templates_data['reply_to']) ? $email_templates_data['reply_to'] : '';
            $reply_to_name = isset($email_templates_data['reply_to_name']) ? $email_templates_data['reply_to_name'] : '';
            $email_subject = isset($email_templates_data['subject']) ? $email_templates_data['subject'] : '';
            $email_body = isset($email_templates_data['html']) ? $email_templates_data['html'] : '';

            $email_body = do_shortcode($email_body);
            if ($mail_wpautop == 'yes') {
                $email_body = wpautop($email_body);
            }

            $verification_page_url = get_permalink($verification_page_id);
            $verification_page_url = !empty($verification_page_url) ? $verification_page_url : get_bloginfo('url');

            $permalink_structure = get_option('permalink_structure');

            $user_activation_key =  md5(uniqid('', true));

            update_user_meta($user_id, 'user_activation_key', $user_activation_key);
            update_user_meta($user_id, 'user_activation_status', 0);

            $user_data     = get_userdata($user_id);




            $user_roles = !empty($user_data->roles) ? $user_data->roles : array();


            if (!empty($exclude_user_roles)) {
                foreach ($exclude_user_roles as $role) :

                    if (in_array($role, $user_roles)) {
                        //update_option('uv_custom_option', $role);
                        update_user_meta($user_id, 'user_activation_status', 1);
                        return;
                    }

                endforeach;
            }



            $verification_url = add_query_arg(
                array(
                    'activation_key' => $user_activation_key,
                    'user_verification_action' => 'email_verification',
                ),
                $verification_page_url
            );

            $verification_url = wp_nonce_url($verification_url,  'email_verification');



            $site_name = get_bloginfo('name');
            $site_description = get_bloginfo('description');
            $site_url = get_bloginfo('url');
            $site_logo_url = wp_get_attachment_url($logo_id);

            $vars = array(
                '{site_name}' => esc_html($site_name),
                '{site_description}' => esc_html($site_description),
                '{site_url}' => esc_url_raw($site_url),
                '{site_logo_url}' => esc_url_raw($site_logo_url),

                '{first_name}' => esc_html($user_data->first_name),
                '{last_name}' => esc_html($user_data->last_name),
                '{user_display_name}' => esc_html($user_data->display_name),
                '{user_email}' => esc_html($user_data->user_email),
                '{user_name}' => esc_html($user_data->user_nicename),
                '{user_avatar}' => get_avatar($user_data->user_email, 60),

                '{ac_activaton_url}' => esc_url_raw($verification_url),

            );



            $vars = apply_filters('user_verification_mail_vars', $vars, $user_data);



            $email_data['email_to'] =  $user_data->user_email;
            $email_data['email_bcc'] =  $email_bcc;
            $email_data['email_from'] = $email_from;
            $email_data['email_from_name'] = $email_from_name;
            $email_data['reply_to'] = $reply_to;
            $email_data['reply_to_name'] = $reply_to_name;

            $email_data['subject'] = strtr($email_subject, $vars);
            $email_data['html'] = strtr($email_body, $vars);
            $email_data['attachments'] = array();


            if ($enable == 'yes') {
                $mail_status = $class_user_verification_emails->send_email($email_data);
            }
        }
    }
}




function user_verification_disable_new_user_notifications()
{


    $user_verification_settings = get_option('user_verification_settings');
    $disable_new_user_notification_email = isset($user_verification_settings['disable']['new_user_notification_email']) ? $user_verification_settings['disable']['new_user_notification_email'] : 'no';

    if ($disable_new_user_notification_email == 'yes') {
        //Remove original use created emails
        remove_action('register_new_user', 'wp_send_new_user_notifications');
        remove_action('edit_user_created_user', 'wp_send_new_user_notifications', 10, 2);
    }
}

add_action('init', 'user_verification_disable_new_user_notifications');


add_filter('wp_mail_from', 'user_verification_change_mail_from');

function user_verification_change_mail_from($from_email)
{


    $user_verification_settings = get_option('user_verification_settings');
    $mail_from = isset($user_verification_settings['tools']['mail_from']) ? $user_verification_settings['tools']['mail_from'] : '';

    if (!empty($mail_from)) {
        $from_email = $mail_from;
    }

    return $from_email;
}

add_filter('wp_mail_from_name', 'user_verification_change_mail_from_name');


function user_verification_change_mail_from_name($from_name)
{


    $user_verification_settings = get_option('user_verification_settings');
    $mail_from_name = isset($user_verification_settings['tools']['mail_from_name']) ? $user_verification_settings['tools']['mail_from_name'] : '';

    if (!empty($mail_from_name)) {
        $from_name = $mail_from_name;
    }

    return $from_name;
}
