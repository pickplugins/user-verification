<?php
if (! defined('ABSPATH')) exit;  // if direct access

ob_start();
?>
<p>Hi,</p>
<p>{user_name} has successfully joined to {site_name}</p>
<p>{site_name} - {site_description}</p>

<?php


$templates_data_html['email_confirmed'] = ob_get_clean();
