<?php
if (!defined('ABSPATH')) exit;  // if direct access

add_action('user_verification_otp_login_form', 'user_verification_otp_login_form', 5);

function user_verification_otp_login_form()
{

    $formType = 'otpLogin';
    $onSubmit = [];
    $formArgs = [];
    $blockId = "123";
    //$formArgs['isLogged'] = !empty($user_id) ? true : false;
    //$formArgs['userId'] = $user_id;
    // $formArgs['userRoles'] = $roles;
    //$formArgs['userHasCapabilities'] = false;
    $formArgs['type'] = $formType;

    $formArgs['fieldInfo'] = isset($PGFormProps[$blockId]) ? $PGFormProps[$blockId] : '';
    $formArgs['refererr'] = isset($_SERVER['HTTP_REFERER']) ? parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) : '';
?>
    <div class="otp-login-form">
        <form action="" data-formId="pg-123" data-onsubmitprams='<?php echo esc_attr(json_encode($onSubmit)); ?>' data-formargs='<?php echo esc_attr(json_encode($formArgs)); ?>'>

            <div class="form-fields">
                <div class="input-wrap">
                    <label for="">Username or Email</label>
                    <input type="email" value="" name="email" placeholder="" />
                </div>
                <div class="input-wrap" style="display: none;">
                    <label for="">OTP</label>
                    <input type="text" value="" name="otp" placeholder="" />
                </div>


                <div class="input-wrap send-otp-wrap">
                    <input class="button" type="" value="Send OTP" data-nonce="<?php echo wp_create_nonce("user_verification_otp_nonce") ?>" />
                </div>
                <div class="input-wrap login-wrap" style="display: none;">
                    <input type="submit" value="Login" />
                </div>

                <div class="input-wrap resend-otp-wrap" style="display: none;">
                    Please wait, you will resend OTP after 2:30 <span class="resend-otp">Resend OTP</span>
                </div>


            </div>
            <?php wp_nonce_field('wp_rest', '_wpnonce'); ?>

        </form>
        <div class="pg-123-loading pg-form-loading" style="display: none;">Loading...</div>
        <div class="pg-123-responses pg-form-responses" style="display: none;"></div>

    </div>


<?php
}
