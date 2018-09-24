<?php
/*
* @Author 		pickplugins
* Copyright: 	pickplugins.com
*/


/*
 *
 * Submit registration form validation

 * */

add_action( 'um_submit_form_errors_hook__registration', 'my_submit_form_errors_registration', 10, 1 );
function my_submit_form_errors_registration( $args ) {

    var_dump($args);

}



/*
 *
 * After complete UM user registration.

*/

add_action( 'um_user_register', 'my_user_register', 10, 2 );
function my_user_register( $user_id, $args ) {
    var_dump($args);
}



/*
 *
 * After complete UM user registration. Redirects handlers at 100 priority, you can add some info before redirects
 * */

add_action( 'um_registration_complete', 'my_registration_complete', 10, 2 );
function my_registration_complete( $user_id, $args ) {
    // your code here
}


/*
 *
 * After complete UM user registration and autologin.
 *
 * */

add_action( 'um_registration_after_auto_login', 'my_registration_after_auto_login', 10, 1 );
function my_registration_after_auto_login( $user_id ) {
    // your code here
}