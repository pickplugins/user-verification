<?php
if (!defined('ABSPATH')) exit;  // if direct access

add_filter('user_verification_form_wrap_process_otpLogin', 'user_verification_form_wrap_process_otpLogin', 99,);
function user_verification_form_wrap_process_otpLogin($request)
{
    $response = [];

    $email = $request->get_param('email');


    $email_data = [];
    $user = get_user_by('email', $email);
    if (empty($user)) {
        $user = get_user_by('login', $email);
    }
    if (!$user) {
        // $response['loginUsernotExist'] = 'User not exist';
        $response['errors']['UsernotExist'] = __('User not exist', 'user-verification');
        return $response;
    }
    $email = isset($user->user_email) ? $user->user_email : '';

    $status = '';





    $user_verification_settings = get_option('user_verification_settings');
    $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';



    if (!empty($user)) {

        $user_id = $user->ID;


        $user_verification_settings = get_option('user_verification_settings');
        $email_verification_enable = isset($user_verification_settings['email_verification']['enable']) ? $user_verification_settings['email_verification']['enable'] : 'yes';

        if ($email_verification_enable != 'yes') return;

        $class_user_verification_emails = new class_user_verification_emails();
        $email_templates_data = $class_user_verification_emails->email_templates_data();

        $logo_id = isset($user_verification_settings['logo_id']) ? $user_verification_settings['logo_id'] : '';
        $mail_wpautop = isset($user_verification_settings['mail_wpautop']) ? $user_verification_settings['mail_wpautop'] : 'yes';

        $magic_login_page = isset($user_verification_settings['otpLogin']['magic_login_page']) ? $user_verification_settings['otpLogin']['magic_login_page'] : '';


        $email_templates_data =  $email_templates_data['send_magic_login_url'];

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

        $magic_login_page_url = get_permalink($magic_login_page);
        $magic_login_page_url = !empty($magic_login_page_url) ? $magic_login_page_url : get_bloginfo('url');


        $magic_login_key =  md5(uniqid('', true));

        update_user_meta($user_id, 'magic_login_key', $magic_login_key);






        $magic_login_page_url = add_query_arg(
            array(
                'user_verification_magic_login' => $magic_login_key,
            ),
            $magic_login_page_url
        );

        $magic_login_page_url = wp_nonce_url($magic_login_page_url,  'nonce_magic_login');


        $site_name = get_bloginfo('name');
        $site_description = get_bloginfo('description');
        $site_url = get_bloginfo('url');
        $site_logo_url = wp_get_attachment_url($logo_id);

        $vars = array(
            '{site_name}' => esc_html($site_name),
            '{site_description}' => esc_html($site_description),
            '{site_url}' => esc_url_raw($site_url),
            '{site_logo_url}' => esc_url_raw($site_logo_url),

            '{first_name}' => esc_html($user->first_name),
            '{last_name}' => esc_html($user->last_name),
            '{user_display_name}' => esc_html($user->display_name),
            '{user_email}' => esc_html($user->user_email),
            '{user_name}' => esc_html($user->user_nicename),
            '{user_avatar}' => get_avatar($user->user_email, 60),

            '{magic_login_url}' => esc_url_raw($magic_login_page_url),

        );



        $vars = apply_filters('user_verification_mail_vars', $vars, $user);



        $email_data['email_to'] =  $user->user_email;
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
            $response['success']['loggedInUser'] = __('User Login success', 'user-verification');


            // stats record start
            $UserVerificationStats = new UserVerificationStats();
            $UserVerificationStats->add_stats('magic_login_sent');
            // stats record end

        }
    } else {
        $response['errors']['loggedInUser'] = __('User Login failed', 'user-verification');
    }




    return $response;
}



add_action('wp_print_footer_scripts', function () {

    global $postGridBlocksVars;
?>
    <script>
        <?php

        $user_verification_scripts_vars =  wp_json_encode($postGridBlocksVars);
        echo "var user_verification_scripts_vars=" . $user_verification_scripts_vars;
        ?>
    </script>
<?php
});
