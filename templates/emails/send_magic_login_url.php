<?php
if (! defined('ABSPATH')) exit;  // if direct access

ob_start();
?>
<p>Hi <strong>{user_name}</strong>,</p>
<p>Click the link below to securely log in to your account—no password needed!</p>
<p><strong><a href="{magic_login_url}">Magic Login</a></strong></p>
<p>This link is valid for the next 15 minutes. If you didn't request this, please ignore this email.</p>
<p>Thanks,</p>
<p>{site_name} - {site_description}</p>
<?php


$templates_data_html['send_magic_login_url'] = ob_get_clean();
