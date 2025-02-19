<?php
if (!defined('ABSPATH')) exit;  // if direct access 


add_filter('registration_errors', 'isSpammy_registration_errors_block_spammer', 10, 3);
function isSpammy_registration_errors_block_spammer($errors, $sanitized_user_login, $user_email)
{


    $user_verification_settings = get_option('user_verification_settings');

    $isSpammyApiKey = isset($user_verification_settings['emailValidation']['isSpammyApiKey']) ? $user_verification_settings['emailValidation']['isSpammyApiKey'] : '';
    $validedOnRegister = isset($user_verification_settings['emailValidation']['validedOnRegister']) ? $user_verification_settings['emailValidation']['validedOnRegister'] : 'no';

    //error_log("isSpammyApiKey: $isSpammyApiKey");

    if (empty($isSpammyApiKey)) return $errors;
    if ($validedOnRegister != 'yes') return $errors;

    $UserVerificationStats = new UserVerificationStats();

    // do the code here
    //$domain = get_bloginfo('url');


    $api_url = "https://isspammy.com/wp-json/email-validation/v2/validate_email";

    $post_data = array(
        'email'  => $user_email,
        'apiKey' => $isSpammyApiKey,
    );

    //error_log(wp_json_encode($post_data));
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

        $UserVerificationStats->add_stats('email_validation_failed');

        $error_message = $response->get_error_message();
        $errors->add('email_validation_failed', __("email validation failed. $error_message", 'user-verification'));

        // Handle error
        //error_log("Error validating email: " . $error_message);
    } else {
        $response_code = wp_remote_retrieve_response_code($response);
        if ($response_code >= 200 && $response_code < 400) {
            $body = wp_remote_retrieve_body($response);
            $result = json_decode($body, true);

            $status = isset($result['status']) ? $result['status'] : '';
            $UserVerificationStats->add_stats('email_validation_success');

            if ($status == 'valid') {
            } else {
                $errors->add('invalid_email', __("Sorry your email address is not valid.", 'user-verification'));
                // stats record start
                // stats record end
            }
            //error_log(serialize($result));

            // Process result
            // Example: store or return response
        } else {
            // Handle error response
            $UserVerificationStats->add_stats('email_validation_failed');
            $errors->add('invalid_email', __("Sorry your email address is not valid.", 'user-verification'));

            //error_log("Email validation failed. Response code: " . $response_code);
        }
    }




    // // API query parameters
    // $api_params = array(
    //     'check' => $user_email,
    // );

    // // Send query to the license manager server
    // $response = wp_remote_get(add_query_arg($api_params, 'https://isspammy.com/'), array('timeout' => 20, 'sslverify' => false));

    // // Check for error in the response
    // if (is_wp_error($response)) {
    //     echo __("Unexpected Error! The query returned with an error.", 'user-verification');
    // } else {
    //     //var_dump($response);//uncomment it if you want to look at the full response

    //     // License data.
    //     $spammer_data = json_decode(wp_remote_retrieve_body($response));
    //     $spammer_found = isset($spammer_data->spammer_found) ? sanitize_text_field($spammer_data->spammer_found) : 'no';

    //     if ($spammer_found == 'yes') {
    //         $errors->add('blocked_spammer', __("Spammers are not allowed to register.", 'user-verification'));
    //         // stats record start
    //         $UserVerificationStats = new UserVerificationStats();
    //         $UserVerificationStats->add_stats('spam_registration_blocked');
    //         // stats record end
    //     }
    // }


    return $errors;
}


add_filter('authenticate', 'isSpammy_validedOnLogin', 10, 3);
function isSpammy_validedOnLogin($errors, $username, $passwords)
{
    $error = new WP_Error();

    $user = get_user_by('email', $username);
    if (empty($user)) $user = get_user_by('login', $username);
    if (empty($user)) return $errors;

    $user_email = !empty($user->user_email) ? $user->user_email : array();
    $user_roles = !empty($user->roles) ? $user->roles : array();



    $user_verification_settings = get_option('user_verification_settings');

    $isSpammyApiKey = isset($user_verification_settings['emailValidation']['isSpammyApiKey']) ? $user_verification_settings['emailValidation']['isSpammyApiKey'] : '';
    $validedOnLogin = isset($user_verification_settings['emailValidation']['validedOnLogin']) ? $user_verification_settings['emailValidation']['validedOnLogin'] : 'no';

    error_log("isSpammyApiKey 2: $isSpammyApiKey");

    if (empty($isSpammyApiKey)) return $errors;
    if ($validedOnLogin != 'yes') return $errors;

    $UserVerificationStats = new UserVerificationStats();

    // do the code here
    //$domain = get_bloginfo('url');
    error_log("user_email: " . $user_email);

    $api_url = "https://isspammy.com/wp-json/email-validation/v2/validate_email";

    $post_data = array(
        'email'  => $user_email,
        'apiKey' => $isSpammyApiKey,
    );

    error_log(wp_json_encode($post_data));
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

        $UserVerificationStats->add_stats('email_validation_failed');

        $error_message = $response->get_error_message();
        // Handle error
        error_log("Error validating email: " . $error_message);
    } else {
        $response_code = wp_remote_retrieve_response_code($response);
        if ($response_code >= 200 && $response_code < 400) {
            $body = wp_remote_retrieve_body($response);
            $result = json_decode($body, true);

            error_log(serialize($result));
            $status = isset($result['status']) ? $result['status'] : '';
            $UserVerificationStats->add_stats('email_validation_success');
            // error_log($status);
            if ($status == 'valid') {
                error_log($status);
            } else {
                $errors = __("Sorry your email address is not valid.", 'user-verification');
            }

            // Process result
            // Example: store or return response
        } else {
            $UserVerificationStats->add_stats('email_validation_failed');

            // Handle error response
            error_log("Email validation failed. Response code: " . $response_code);
        }
    }

    return $errors;
}
