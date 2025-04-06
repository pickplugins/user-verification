<?php
if (!defined('ABSPATH')) exit;  // if direct access



function isspammy_trash_comment($comment_id, $comment)
{

  $user_verification_settings = get_option('user_verification_settings');


  $isSpammyApiKey = isset($user_verification_settings['emailValidation']['isSpammyApiKey']) ? $user_verification_settings['emailValidation']['isSpammyApiKey'] : '';


  $report_comment_trash = isset($user_verification_settings['isspammy']['report_comment_trash']) ? $user_verification_settings['isspammy']['report_comment_trash'] : 'no';

  ////error_log($isSpammyApiKey);

  ////error_log(serialize($comment));

  if ($report_comment_trash != 'yes') return;


  $UserVerificationStats = new UserVerificationStats();

  // do the code here
  $domain = get_bloginfo('url');



  $api_url = "https://isspammy.com/wp-json/email-validation/v2/create_spammer";
  //$api_url = "http://localhost/wordpress/wp-json/email-validation/v2/create_spammer";

  $post_data = array(
    'email'  => $comment->comment_author_email,
    'name'  => $comment->comment_author,
    'website'  => $comment->comment_author_url,
    //'content'  => $comment->comment_content,
    'apiKey' => $isSpammyApiKey,
  );

  ////error_log(wp_json_encode($post_data));
  $UserVerificationStats->add_stats('email_validation_request');

  $response = wp_remote_post($api_url, array(
    'method'    => 'POST',
    'headers'   => array(
      'Content-Type' => 'application/json',
    ),
    'timeout'     => 45,
    'body'      => wp_json_encode($post_data),
    'data_format' => 'body',
  ));

  ////error_log(wp_remote_retrieve_body($response));

  if (is_wp_error($response)) {

    $UserVerificationStats->add_stats('spam_comment_report_failed');

    $error_message = $response->get_error_message();

    // Handle error
  } else {
    $response_code = wp_remote_retrieve_response_code($response);
    if ($response_code >= 200 && $response_code < 400) {
      $body = wp_remote_retrieve_body($response);
      $result = json_decode($body, true);

      $success = isset($result['success']) ? $result['success'] : false;

      if ($success) {
        $UserVerificationStats->add_stats('spam_comment_report');
      } else {
        $UserVerificationStats->add_stats('spam_comment_report_failed');
      }
    } else {
      // Handle error response
      $UserVerificationStats->add_stats('spam_comment_report_failed');
    }
  }


















  // // API query parameters
  // $api_params = array(
  //   'report_spam' => $comment->comment_author_email,
  //   'ref_domain' => $domain,
  // );

  // // Send query to the license manager server
  // $response = wp_remote_get(add_query_arg($api_params, 'https://isspammy.com/'), array('timeout' => 20, 'sslverify' => false));

  // // Check for error in the response
  // if (is_wp_error($response)) {
  //   echo __("Unexpected Error! The query returned with an error.", 'user-verification');
  // } else {
  //   //var_dump($response);//uncomment it if you want to look at the full response

  //   // License data.
  //   $spammer_data = json_decode(wp_remote_retrieve_body($response));

  //   // stats record start
  //   $UserVerificationStats = new UserVerificationStats();
  //   $UserVerificationStats->add_stats('spam_comment_report');
  //   // stats record end

  //   //$license_key = isset($license_data->license_key) ? sanitize_text_field($license_data->license_key) : '';

  // }
}

add_action('trash_comment', 'isspammy_trash_comment', 10, 2);



function isspammy_spam_comment($comment_id, $comment)
{


  $user_verification_settings = get_option('user_verification_settings');


  $isSpammyApiKey = isset($user_verification_settings['emailValidation']['isSpammyApiKey']) ? $user_verification_settings['emailValidation']['isSpammyApiKey'] : '';


  $report_comment_spam = isset($user_verification_settings['isspammy']['report_comment_spam']) ? $user_verification_settings['isspammy']['report_comment_spam'] : 'no';

  ////error_log($isSpammyApiKey);

  ////error_log(serialize($comment));

  if ($report_comment_spam != 'yes') return;


  $UserVerificationStats = new UserVerificationStats();

  // do the code here
  $domain = get_bloginfo('url');



  $api_url = "https://isspammy.com/wp-json/email-validation/v2/create_spammer";
  //$api_url = "http://localhost/wordpress/wp-json/email-validation/v2/create_spammer";

  $post_data = array(
    'email'  => $comment->comment_author_email,
    'name'  => $comment->comment_author,
    'website'  => $comment->comment_author_url,
    //'content'  => $comment->comment_content,
    'apiKey' => $isSpammyApiKey,
  );

  ////error_log(wp_json_encode($post_data));
  $UserVerificationStats->add_stats('email_validation_request');

  $response = wp_remote_post($api_url, array(
    'method'    => 'POST',
    'headers'   => array(
      'Content-Type' => 'application/json',
    ),
    'timeout'     => 45,
    'body'      => wp_json_encode($post_data),
    'data_format' => 'body',
  ));

  ////error_log(wp_remote_retrieve_body($response));

  if (is_wp_error($response)) {

    $UserVerificationStats->add_stats('spam_comment_report_failed');

    $error_message = $response->get_error_message();

    // Handle error
  } else {
    $response_code = wp_remote_retrieve_response_code($response);
    if ($response_code >= 200 && $response_code < 400) {
      $body = wp_remote_retrieve_body($response);
      $result = json_decode($body, true);

      $success = isset($result['success']) ? $result['success'] : false;

      if ($success) {
        $UserVerificationStats->add_stats('spam_comment_report');
      } else {
        $UserVerificationStats->add_stats('spam_comment_report_failed');
      }
    } else {
      // Handle error response
      $UserVerificationStats->add_stats('spam_comment_report_failed');
    }
  }
}

add_action('spam_comment', 'isspammy_spam_comment', 10, 2);




//add_filter('wp_login_errors', 'user_verification_wp_login_errors_block_spammers', 10, 2);

function user_verification_wp_login_errors_block_spammers($errors, $redirect_to)
{


















  $user_verification_settings = get_option('user_verification_settings');
  $email_verification_enable = isset($user_verification_settings['email_verification']['enable']) ? $user_verification_settings['email_verification']['enable'] : 'yes';
  $block_login = isset($user_verification_settings['isspammy']['block_login']) ? $user_verification_settings['isspammy']['block_login'] : 'yes';

  $errors->add('blocked_spammer', __("Spammers are not allowed to login.", 'user-verification'));




  return $errors;
}




add_filter('registration_errors', 'registration_errors_block_spammer', 10, 3);
function registration_errors_block_spammer($errors, $sanitized_user_login, $user_email)
{


  $user_verification_settings = get_option('user_verification_settings');


  $isSpammyApiKey = isset($user_verification_settings['emailValidation']['isSpammyApiKey']) ? $user_verification_settings['emailValidation']['isSpammyApiKey'] : '';


  $block_register = isset($user_verification_settings['isspammy']['block_register']) ? $user_verification_settings['isspammy']['block_register'] : 'no';


  ////error_log($isSpammyApiKey);

  ////error_log(serialize($comment));
  if (empty($isSpammyApiKey)) return $errors;
  if ($block_register != 'yes') return $errors;



  $UserVerificationStats = new UserVerificationStats();

  // do the code here
  $domain = get_bloginfo('url');

  $api_url = "https://isspammy.com/wp-json/email-validation/v2/check_spammer";

  $post_data = array(
    'email'  => $user_email,
    'domain'  => $domain,
    'apiKey' => $isSpammyApiKey,
  );

  $UserVerificationStats->add_stats('email_validation_request');

  $response = wp_remote_post($api_url, array(
    'method'    => 'POST',
    'headers'   => array(
      'Content-Type' => 'application/json',
    ),
    'timeout'     => 45,
    'body'      => wp_json_encode($post_data),
    'data_format' => 'body',
  ));


  if (is_wp_error($response)) {

    $UserVerificationStats->add_stats('spam_comment_report_failed');

    $error_message = $response->get_error_message();
    $errors->add('email_validation_failed', __("email validation failed. $error_message", 'user-verification'));

    // Handle error
  } else {
    $response_code = wp_remote_retrieve_response_code($response);
    if ($response_code >= 200 && $response_code < 400) {
      $body = wp_remote_retrieve_body($response);
      $result = json_decode($body, true);

      //error_log($result);

      $found = isset($result['found']) ? $result['found'] : false;

      if ($found) {
        $UserVerificationStats->add_stats('spam_registration_blocked');
        $errors->add('blocked_spammer', __("<strong>Error:</strong> Spammers are not allowed to register.", 'user-verification'));
      } else {
        $UserVerificationStats->add_stats('spam_registration_checked');
      }
    } else {
      // Handle error response
      $UserVerificationStats->add_stats('spam_registration_checked');
    }
  }


  return $errors;
}



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
      // stats record start
      $UserVerificationStats = new UserVerificationStats();
      $UserVerificationStats->add_stats('spam_comment_blocked');
      // stats record end
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




// function user_verification_trash_comment($comment_id, $comment)
// {

//     $user_verification_settings = get_option('user_verification_settings');

//     $report_comment_trash = isset($user_verification_settings['isspammy']['report_comment_trash']) ? $user_verification_settings['isspammy']['report_comment_trash'] : 'no';

//     if ($report_comment_trash != 'yes') return;

//     // do the code here
//     $domain = get_bloginfo('url');


//     // API query parameters
//     $api_params = array(
//         'report_spam' => $comment->comment_author_email,
//         'ref_domain' => $domain,
//     );

//     // Send query to the license manager server
//     $response = wp_remote_get(add_query_arg($api_params, 'https://isspammy.com/'), array('timeout' => 20, 'sslverify' => false));

//     // Check for error in the response
//     if (is_wp_error($response)) {
//         echo __("Unexpected Error! The query returned with an error.", 'user-verification');
//     } else {
//         //var_dump($response);//uncomment it if you want to look at the full response

//         // License data.
//         $spammer_data = json_decode(wp_remote_retrieve_body($response));

//         // stats record start
//         $UserVerificationStats = new UserVerificationStats();
//         $UserVerificationStats->add_stats('spam_comment_report');
//         // stats record end

//         //$license_key = isset($license_data->license_key) ? sanitize_text_field($license_data->license_key) : '';

//     }
// }

// add_action('trash_comment', 'user_verification_trash_comment', 10, 2);



// function user_verification_spam_comment($comment_id, $comment)
// {

//     $user_verification_settings = get_option('user_verification_settings');

//     $report_comment_spam = isset($user_verification_settings['isspammy']['report_comment_spam']) ? $user_verification_settings['isspammy']['report_comment_spam'] : 'no';

//     if ($report_comment_spam != 'yes') return;

//     // do the code here
//     $domain = get_bloginfo('url');


//     // API query parameters
//     $api_params = array(
//         'report_spam' => $comment->comment_author_email,
//         'ref_domain' => $domain,
//     );

//     // Send query to the license manager server
//     $response = wp_remote_get(add_query_arg($api_params, 'https://isspammy.com/'), array('timeout' => 20, 'sslverify' => false));

//     // Check for error in the response
//     if (is_wp_error($response)) {
//         echo __("Unexpected Error! The query returned with an error.", 'user-verification');
//     } else {
//         //var_dump($response);//uncomment it if you want to look at the full response

//         // License data.
//         $spammer_data = json_decode(wp_remote_retrieve_body($response));

//         // stats record start
//         $UserVerificationStats = new UserVerificationStats();
//         $UserVerificationStats->add_stats('spam_comment_report');
//         // stats record end

//         //$license_key = isset($license_data->license_key) ? sanitize_text_field($license_data->license_key) : '';

//     }
// }

// add_action('spam_comment', 'user_verification_spam_comment', 10, 2);
