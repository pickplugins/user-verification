<?php
if (!defined('ABSPATH')) exit;  // if direct access

ob_start();
?>
<p>Hi {user_name},</p>
<p>Did you forget to verify your account? Please verify your email address by clicking the link below:</p>
<p><a class="btn" href="{ac_activaton_url}"><?php echo __('Verify My Email', 'user-verification'); ?></a>
</p>
<p>This link will expire in 24 hours. If you didn’t create this account, please ignore this email.</p>
<p>Welcome aboard,</p>
<p>{site_name} - {site_description}</p>

<?php

$templates_data_html['email_reminder'] = ob_get_clean();
