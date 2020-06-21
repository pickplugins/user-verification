<?php


if ( ! defined('ABSPATH')) exit;  // if direct access 




function lelandf_stop_signup_spam_mepr( $errors ) {
    $email = is_email( $_POST['user_email'] ) ? $_POST['user_email'] : false;

    $errors[] = __( 'Sorry, but something went wrong. Please contact us for further assistance.', 'stop-signup-spam' );

    return $errors;
}
add_filter( 'mepr-validate-signup', 'lelandf_stop_signup_spam_mepr' );
















// add the column data for each row
function bp_members_signup_columns_uv( $arr ) {

    $arr['uv_bp'] = __('Verification Status', 'user-verification');

    return $arr;

}
add_filter( "bp_members_signup_columns", "bp_members_signup_columns_uv", 10 );

function bp_members_signup_custom_column_uv_bp( $val, $column_name, $signup_object ) {

    $user_id = $signup_object->id;

    $this_user		= get_user_by( 'id', $user_id );

    if( $column_name == 'uv_bp' ) {

        ob_start();
        $user_activation_status = get_user_meta( $user_id, 'user_activation_status', true );
        $user_activation_status = empty( $user_activation_status ) ? 0 : $user_activation_status;
        $uv_status 				= $user_activation_status == 1 ? __('Approved', 'user-verification') : __('Pending approval', 'user-verification');

        echo "<div class='uv_status'>$uv_status</div>";
        echo "<div class='row-actions'>";


        if( $user_activation_status == 0 ) {

            echo "<span class='uv_action uv_approve' user_id='$user_id' do='approve'>".__('Approve now', 'user-verification')."</span>";
        }

        if( $user_activation_status == 1 ) {

            echo "<span class='uv_action uv_remove_approval' user_id='$user_id' do='remove_approval'>".__('Remove Approval', 'user-verification')."</span>";
        }


        echo "</div>";

        return ob_get_clean();
    }


}
add_filter( "bp_members_signup_custom_column", "bp_members_signup_custom_column_uv_bp", 10, 3 );

