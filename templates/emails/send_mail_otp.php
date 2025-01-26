<?php
if (! defined('ABSPATH')) exit;  // if direct access

ob_start();
?>
<p>Hi {user_name},</p>
<p>Your one-time password (OTP) is: <strong>{otp_code}</strong></p>
<p>This code is valid for the next 10 minutes. Please use it to complete your verification.</p>
<p>If you didn't request this, please ignore this email.</p>
<p>Thank you,</p>
<p>{site_name} - {site_description}</p>


<?php
$templates_data_html['send_mail_otp'] = ob_get_clean();
