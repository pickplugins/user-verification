<?php



if ( ! defined('ABSPATH')) exit;  // if direct access 


class uv_class_column_users{
	
	public function __construct(){

		add_filter( 'manage_users_custom_column', array( $this, 'manage_users_custom_column_function' ), 10, 3 );
		add_filter( 'manage_users_columns', array( $this, 'manage_users_columns_function' ) );
    }
	
	public function manage_users_columns_function( $columns ) {
		
		$new_columns 	= array();
		$count 			= 0;
		
		foreach( $columns as $column_key => $column_title ){
		    $count++;
			
			if( $count == 3 ) $new_columns[ 'uv' ] = __('Verification Status', 'user-verification');
			else $new_columns[ $column_key ] = $column_title;
		}


		
		return $new_columns;
    }
	
	public function manage_users_custom_column_function( $val, $column_name, $user_id ) {
		

		
		$this_user		= get_user_by( 'id', $user_id );
	
		if( $column_name == 'uv' ) {

            ob_start();
			$user_activation_status = get_user_meta( $user_id, 'user_activation_status', true );
			$user_activation_status = empty( $user_activation_status ) ? 0 : $user_activation_status;
			$uv_status 				= $user_activation_status == 1 ? __('Verified', 'user-verification') : __('Unverified', 'user-verification');
            $activation_key = get_user_meta( $user_id, 'user_activation_key', true );

            ?>
            <div class='uv_status status-<?php echo $user_activation_status; ?>'><?php echo $uv_status; ?></div>
            <?php
			echo "<div class='row-actions'>";






            $actionurl = admin_url().'users.php';

			if( $user_activation_status == 0 ) {

                $mark_as_verified_url = add_query_arg(
                    array(
                        'user_id' => $user_id,
                        'mark_as_verified' => 'yes',
                    ),
                    $actionurl);

                $mark_as_verified_url = wp_nonce_url( $mark_as_verified_url,  'mark_as_verified' );


                $resend_verification_url = add_query_arg(
                    array(
                        'user_id' => $user_id,
                        'resend_verification' => 'yes',
                    ),
                    $actionurl);

                $resend_verification_url = wp_nonce_url( $resend_verification_url,  'resend_verification' );


			    ?>

                <span class="mark_as_verified">
                    <a href="<?php echo $mark_as_verified_url; ?>"><?php echo __('Mark as Verified', 'user-verification'); ?></a>
                </span> |
                <span class="resend_verification">
                    <a  href="<?php echo $resend_verification_url; ?>"><?php echo __('Resend verification', 'user-verification'); ?></a>
                </span> |


                <?php
				
				//echo "<span class='uv_action uv_approve' user_id='$user_id' do='approve'>".__('Mark as Verified', 'user-verification')."</span>";
                //echo " | <span class='uv_action uv_resend_verification' user_id='$user_id' do='resend'>".__('Resend verification', 'user-verification')."</span>";

			}
			
			if( $user_activation_status == 1 ) {

                $mark_as_unverified_url = add_query_arg(
                    array(
                        'user_id' => $user_id,
                        'mark_as_unverified' => 'yes',
                    ),
                    $actionurl);

                $mark_as_unverified_url = wp_nonce_url( $mark_as_unverified_url,  'mark_as_unverified' );


                ?>

                <span class="mark_as_unverified">
                    <a href="<?php echo $mark_as_unverified_url; ?>"><?php echo __('Mark as Unverified', 'user-verification'); ?></a>
                </span>



                <?php

				
				//echo "<span class='uv_action uv_remove_approval' user_id='$user_id' do='remove_approval'>".__('Mark as Unverified', 'user-verification')."</span>";
			}

            echo "<span class='activation_key' > ".$activation_key."</span>";

            echo "</div>";

            return ob_get_clean();
		}else{
		    return $val;
        }
		

    }


} new uv_class_column_users();

