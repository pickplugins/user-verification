<?php



if (!defined('ABSPATH')) exit;  // if direct access


class UserVerificationStats
{


    public function __construct() {}

    function add_stats($type)
    {

        $datetime = $this->get_datetime();


        // //error_log($datetime);
        // //error_log($type);

        global $wpdb;
        $table = $wpdb->prefix . "user_verification_stats";

        $wpdb->query($wpdb->prepare(
            "INSERT INTO $table 
								( id, type, datetime )
			VALUES	( %d, %s, %s)",
            array('', $type, $datetime)
        ));
    }

    function get_datetime()
    {
        $gmt_offset = get_option('gmt_offset');
        $datetime = date('Y-m-d H:i:s', strtotime('+' . $gmt_offset . ' hour'));

        return $datetime;
    }





    function get_date()
    {
        $gmt_offset = get_option('gmt_offset');
        $date = date('Y-m-d', strtotime('+' . $gmt_offset . ' hour'));

        return $date;
    }


    function get_time()
    {
        $gmt_offset = get_option('gmt_offset');
        $time = date('H:i:s', strtotime('+' . $gmt_offset . ' hour'));

        return $time;
    }
}

new UserVerificationStats();
