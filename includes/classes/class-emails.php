<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

class class_uv_emails{
	
	public function __construct(){

		//add_action('add_meta_boxes', array($this, 'meta_boxes_job'));
		//add_action('save_post', array($this, 'meta_boxes_job_save'));

		}

    public function send_email($email_data){



        $email_to = isset($email_data['email_to']) ? $email_data['email_to'] : '';
        $email_bcc = isset($email_data['email_bcc']) ? $email_data['email_bcc'] : '';

        $email_from = isset($email_data['email_from']) ? $email_data['email_from'] : get_option('admin_email');
        $email_from_name = isset($email_data['email_from_name']) ? $email_data['email_from_name'] : get_bloginfo('name');
        $subject = isset($email_data['subject']) ? $email_data['subject'] : '';
        $email_body = isset($email_data['html']) ? $email_data['html'] : '';
        $attachments = isset($email_data['attachments']) ? $email_data['attachments'] : '';


        $headers = array();
        $headers[] = "From: ".$email_from_name." <".$email_from.">";
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-Type: text/html; charset=UTF-8";
        if(!empty($email_bcc)){
            $headers[] = "Bcc: ".$email_bcc;
        }
        $headers = apply_filters('job_bm_mail_headers', $headers);

        $status = wp_mail($email_to, $subject, $email_body, $headers, $attachments);

        return $status;

    }





    public function uv_send_email($email_data){

		$email_to = $email_data['email_to'];	
		$email_from = $email_data['email_from'];			
		$email_from_name = $email_data['email_from_name'];
		$subject = $email_data['subject'];
		$email_body = $email_data['html'];		
		$email_subject = $email_data['subject'];			
		$enable = $email_data['enable'];
		$attachments = $email_data['attachments'];

		$headers = "";
		$headers .= "From: ".$email_from_name." <".$email_from."> \r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

		$status = wp_mail($email_to, $subject, $email_body, $headers, $attachments);
		
		return $status;
	}	
		
		
		
	public function email_templates_data(){
		
		$templates_data_html = array();
		
		include user_verification_plugin_dir . 'templates/emails/user_registered.php';
		include user_verification_plugin_dir . 'templates/emails/email_confirmed.php';
		include user_verification_plugin_dir . 'templates/emails/email_resend_key.php';

		$templates_data = array(
			'user_registered'=>array(
				'name'=>__('New User Registered','user-verification'),
				'description'=>__('Notification email for admin when a new user is registered.','user-verification'),
				'subject'=>__('New User Submitted - {site_url}','user-verification'),
				'html'=>$templates_data_html['user_registered'],
				'email_to'=>get_option('admin_email'),
				'email_from'=>get_option('admin_email'),
				'email_from_name'=> get_bloginfo('name'),																		
				'enable'=> 'yes',										
			),
			'email_confirmed'=>array(
				'name'=>__('New User Confirmed','user-verification'),
				'description'=>__('Notification email for confirming a new User.','user-verification'),
				'subject'=>__('New User Confirmed - {site_url}','user-verification'),
				'html'=>$templates_data_html['email_confirmed'],
				'email_to'=>get_option('admin_email'),
				'email_from'=>get_option('admin_email'),
				'email_from_name'=> get_bloginfo('name'),										
				'enable'=> 'yes',
			),
			'email_resend_key'=>array(
				'name'=>__('Resend Activation key','user-verification'),
                 'description'=>__('Notification email for resend activation key.','user-verification'),
                 'subject'=>__('Please verify account - {site_url}','user-verification'),
                 'html'=>$templates_data_html['email_resend_key'],
                 'email_to'=>get_option('admin_email'),
                 'email_from'=>get_option('admin_email'),
                 'email_from_name'=> get_bloginfo('name'),
                 'enable'=> 'yes',
			),
		);
		
		$templates_data = apply_filters('uv_filters_email_templates_data', $templates_data);
		
		return $templates_data;

		}
		


	public function email_templates_parameters(){

        $parameters['site_parameter'] = array(
            'title'=>__('Site Parameters','user-verification'),
            'parameters'=>array('{site_name}','{site_description}','{site_url}','{site_logo_url}'),
            );
        $parameters['user_parameter'] = array(
            'title'=>__('Users Parameters','user-verification'),
            'parameters'=>array('{user_name}', '{user_display_name}','{user_first_name}','{user_last_name}', '{user_avatar}','{user_email}', '{ac_activaton_url}'),
            );
        $parameters = apply_filters('uv_emails_templates_parameters',$parameters);
        return $parameters;
	}
}
	
//new class_uv_emails();