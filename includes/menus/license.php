<?php	

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access


define('UV_SPECIAL_SECRET_KEY', '55c3abbae04ff7.17215234');
define('UV_LICENSE_SERVER_URL', 'http://pickplugins.com');
define('UV_ITEM_REFERENCE', 19174);
define('UV_LICENSE_KEYS_PAGE', 'http://pickplugins.com/license-keys/');








	if(empty($_POST['user_verification_hidden']))
		{
	
	
	
		}
	else
		{	
			$nonce = $_POST['_wpnonce'];
		
			if(wp_verify_nonce( $nonce, 'user_verification_license' ) && $_POST['user_verification_hidden'] == 'Y') {
	
		
	
				?>
				<div class="updated"><p><strong><?php _e('Changes Saved.', 'user-verification' ); ?></strong></p></div>
		
				<?php
				} 
		}
		
		
	
	



	
	
?>





<div class="wrap">

	<div id="icon-tools" class="icon32"><br></div><?php echo "<h2>".user_verification_plugin_name.' '.__('License', 'user-verification')."</h2>";?>
		<form  method="post" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>">
            <input type="hidden" name="user_verification_hidden" value="Y">
            <?php //settings_fields( 'user_verification_plugin_options' );
                    //do_settings_sections( 'user_verification_plugin_options' );
                
            ?>

            <div class="para-settings user_verification-settings user_verification-license">
            
                <ul class="tab-nav"> 
                    <li nav="1" class="nav1 active"><i class="fa fa-key"></i> <?php _e('Activation','user-verification'); ?></li>       
          
                </ul> <!-- tab-nav end --> 
                <ul class="box">
                    <li style="display: block;" class="box1 tab-box active">
                    
                        <div class="option-box">
                            <p class="option-title"><?php _e('Activate license','user-verification'); ?></p>
        
                            <?php
        
							/*** License activate button was clicked ***/
							if (isset($_REQUEST['activate_license']) && current_user_can('manage_options') ) {
								$license_key = $_REQUEST['user_verification_license_key'];
						
								if(is_multisite())
									{
										$domain = site_url();
									}
								else
									{
										$domain = $_SERVER['SERVER_NAME'];
									}
        
        
        
								// API query parameters
								$api_params = array(
									'slm_action' => 'slm_activate',
									'secret_key' => UV_SPECIAL_SECRET_KEY,
									'license_key' => $license_key,
									'registered_domain' => $domain,
									'item_reference' => urlencode(UV_ITEM_REFERENCE),
								);
						
								// Send query to the license manager server
								$response = wp_remote_get(add_query_arg($api_params, UV_LICENSE_SERVER_URL), array('timeout' => 20, 'sslverify' => false));
						
								// Check for error in the response
								if (is_wp_error($response)){
									echo __("Unexpected Error! The query returned with an error.",'user-verification');
								}
        
								//var_dump($response);//uncomment it if you want to look at the full response
								
								// License data.
								$license_data = json_decode(wp_remote_retrieve_body($response));
								
								// TODO - Do something with it.
								//var_dump($license_data);//uncomment it to look at the data
								
								if($license_data->result == 'success'){//Success was returned for the license activation
									
									//Uncomment the followng line to see the message that returned from the license server
									echo '<br />';
									_e('The following message was returned from the server:','user-verification');
									echo ' <strong class="option-info license-message">'.$license_data->message.'</strong>';
									
									//Save the license key in the options table
									//update_option('user_verification_license_key', $license_key);
                    
                    
								$user_verification_license_key = array(
																'date_created'=>$license_data->date_created,
																'date_renewed'=>$license_data->date_renewed,
																'date_expiry'=>$license_data->date_expiry,
																'key'=>$license_key,
																'status'=>$license_data->status,
					
																);
								
								update_option('user_verification_license_key', $user_verification_license_key);
                    
                    
                    
                    
                    
									
								}
								else{
									//Show error to the user. Probably entered incorrect license key.
									
									//Uncomment the followng line to see the message that returned from the license server
									echo '<br /> ';
									_e('The following message was returned from the server:', 'user-verification');
									echo ' <strong class="option-info license-message">'.$license_data->message.'</strong>';
								}
        
							}
							/*** End of license activation ***/
							
							/*** License activate button was clicked ***/
							if (isset($_REQUEST['deactivate_license']) && current_user_can('manage_options')) {
								$license_key = $_REQUEST['user_verification_license_key'];
						
						
								if(is_multisite())
									{
										$domain = site_url();
									}
								else
									{
										$domain = $_SERVER['SERVER_NAME'];
									}
        
        
        
								// API query parameters
								$api_params = array(
									'slm_action' => 'slm_deactivate',
									'secret_key' => UV_SPECIAL_SECRET_KEY,
									'license_key' => $license_key,
									'registered_domain' => $domain,
									'item_reference' => urlencode(UV_ITEM_REFERENCE),
								);
						
								// Send query to the license manager server
								$response = wp_remote_get(add_query_arg($api_params, UV_LICENSE_SERVER_URL), array('timeout' => 20, 'sslverify' => false));
						
								// Check for error in the response
								if (is_wp_error($response)){
									echo __("Unexpected Error! The query returned with an error.", 'user-verification');
								}
        
							//var_dump($response);//uncomment it if you want to look at the full response
							
							// License data.
							$license_data = json_decode(wp_remote_retrieve_body($response));
							
							// TODO - Do something with it.
							//var_dump($license_data);//uncomment it to look at the data
							
							if($license_data->result == 'success'){//Success was returned for the license activation
								
								//Uncomment the followng line to see the message that returned from the license server
							   // echo sprintf(__('<br />The following message was returned from the server: <strong class="option-info license-message">%s</strong>','user-verification'), $license_data->message);
								echo '<br />';
								echo __('The following message was returned from the server:', 'user-verification');
								echo ' <strong class="option-info license-message">'.$license_data->message.'</strong>';
								
								//Remove the licensse key from the options table. It will need to be activated again.
								//update_option('user_verification_license_key', '');
                    
                    
								
								$user_verification_license_key = array(
																'date_created'=>$license_data->date_created,
																'date_renewed'=>$license_data->date_renewed,
																'date_expiry'=>$license_data->date_expiry,
																'key'=>$license_key,
																'status'=>$license_data->status,
					
																);
								
								
								
								update_option('user_verification_license_key', $user_verification_license_key);
								
								
								
								
								
								
							}
							else{
								//Show error to the user. Probably entered incorrect license key.
								
								//Uncomment the followng line to see the message that returned from the license server
								echo '<br />';
								_e('The following message was returned from the server:','user-verification');
								echo ' <strong class="option-info license-message">'.$license_data->message.'</strong>';
							}
							
						}
						/*** End of sample license deactivation ***/
						
						?>
            
            
                                        
                        <?php
                        
                            $user_verification_license_key = get_option('user_verification_license_key');
                            
                            
                        ?>
            
            
                       		 <p class="option-info"><?php _e('Status:','user-verification'); ?> <b class="license-status <?php if(!empty($user_verification_license_key['status'])) echo ucfirst($user_verification_license_key['status']); ?>"><?php if(!empty($user_verification_license_key['status'])) echo ucfirst($user_verification_license_key['status']); ?></b></p>
                        
                        
                        
                        
                            <p>
                            <?php _e(sprintf("Enter the license key for this product to activate it. You were given a license key when you purchased this item. please visit <a href='%s'>%s</a> after logged-in you will see license key for your purchased product.",UV_LICENSE_KEYS_PAGE,UV_LICENSE_KEYS_PAGE),'user-verification');
                            
                            
                            
                            ?>
                            
                            </p>
                        
                        	<p><?php _e('If you have any problem regarding license activatin please contact for support','user-verification'); ?> <a href="<?php echo UV_CONTACT_URL; ?>"><?php echo UV_CONTACT_URL; ?></a></p>
                        
                    
                            <table class="form-table">
                                <tr>
                                    <th style="width:100px;"><label for="user_verification_license_key">License Key</label></th>
                                    <td >
                                    <input class="regular-text" type="text" id="user_verification_license_key" name="user_verification_license_key"  value="<?php if(!empty($user_verification_license_key['key'])) echo $user_verification_license_key['key']; ?>" >
                    
                                    
                                    </td>
                                </tr>
                            </table>
        
        
        
                        </div>
                    
                    </li>
                   
                </ul>
            
            
                
        
                
            </div>






        <p class="submit">
        	<?php wp_nonce_field( 'user_verification_license' ); ?>
            <input type="submit" name="activate_license" value="<?php _e('Activate','user-verification'); ?>" class="button-primary" />
            <input type="submit" name="deactivate_license" value="<?php _e('Deactivate','user-verification'); ?>" class="button" />
        </p>
		</form>


</div>
