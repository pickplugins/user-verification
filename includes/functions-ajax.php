<?php
if (!defined('ABSPATH')) exit;  // if direct access 

function user_verification_resend_form_submit()
{

    $responses = [];

    $formData = isset($_POST['formData']) ? $_POST['formData'] : '';
    $params = array();
    parse_str($formData, $params);

    $_wpnonce = isset($params['_wpnonce']) ? sanitize_text_field($params['_wpnonce']) : '';
    $email = isset($params['email']) ? sanitize_email($params['email']) : '';



    if (wp_verify_nonce($_wpnonce, 'nonce_resend_verification') && $params['resend_verification_hidden'] == 'Y') {


        $user_verification_settings = get_option('user_verification_settings');
        $verification_page_id = isset($user_verification_settings['email_verification']['verification_page_id']) ? $user_verification_settings['email_verification']['verification_page_id'] : '';
        $activation_sent = !empty($user_verification_settings['messages']['activation_sent']) ? $user_verification_settings['messages']['activation_sent'] : __('Activation mail has sent', 'user-verification');


        $user_data = get_user_by('email', $email);

        if (!empty($user_data)) {

            $user_id = $user_data->ID;


            $user_activation_status = get_user_meta($user_id, 'user_activation_status', true);

            if ($user_activation_status == 1) {
                $response['message'] = __("User already verified.", "user-verification");
                echo json_encode($response);
                die();
            }



            $user_verification_settings = get_option('user_verification_settings');
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


            $response['message'] = $activation_sent;
        } else {
            $response['message'] = __("Sorry user doesn't exist.", "user-verification");
        }
    } else {
        $response['message'] = __("Error something went wrong", "user-verification");
    }

    echo json_encode($response);
    die();
}

add_action('wp_ajax_user_verification_resend_form_submit', 'user_verification_resend_form_submit');
add_action('wp_ajax_nopriv_user_verification_resend_form_submit', 'user_verification_resend_form_submit');
