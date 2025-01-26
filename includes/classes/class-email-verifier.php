<?php
if (!defined('ABSPATH')) exit;  // if direct access


class UserVerificationEmailVerifier
{
    /**
     * List of known disposable email domains.
     * You can extend this list or fetch it from an external service.
     *
     * @var array
     */
    private static $disposableDomains = [
        'mailinator.com',
        'tempmail.com',
        '10minutemail.com',
        'guerrillamail.com',
        'trashmail.com',
        'yopmail.com',
        // Add more disposable domains here
    ];

    /**
     * List of common free email domains.
     *
     * @var array
     */
    private static $freeEmailDomains = [
        'gmail.com',
        'yahoo.com',
        'hotmail.com',
        'outlook.com',
        'aol.com',
        // Add more free email domains here
    ];


    /**
     * List of role-based email prefixes.
     */
    private static $roleBasedEmails = [
        'admin',
        'info',
        'support',
        'contact',
        'sales',
        'help',
        'billing',
        'enquiries',
        'webmaster',
        'postmaster',
        // Add more role-based prefixes here
    ];


    /**
     * Check if an email address has a valid syntax.
     *
     * @param string $email The email address to validate.
     * @return bool True if the email syntax is valid, false otherwise.
     */
    public static function isSyntaxValid(string $email): bool
    {
        // Regular expression for validating email syntax
        $pattern = "/^(?!\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/";
        return preg_match($pattern, $email) === 1;
    }

    /**
     * Check if an email address is valid.
     *
     * @param string $email The email address to validate.
     * @return bool True if the email is valid, false otherwise.
     */
    public static function isValidEmail(string $email): bool
    {
        // Validate email format
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }


    /**
     * Check if an email is role-based.
     *
     * @param string $email The email address to check.
     * @return bool True if the email is role-based, false otherwise.
     */
    public static function isRoleBasedEmail(string $email): bool
    {
        $localPart = strtok($email, '@'); // Extract the local part of the email
        return in_array(strtolower($localPart), self::$roleBasedEmails);
    }

    /**
     * Check if the domain of the email address has valid DNS records.
     *
     * @param string $email The email address to check.
     * @return bool True if the domain has valid DNS records, false otherwise.
     */
    public static function hasValidDomain(string $email): bool
    {
        $domain = substr(strrchr($email, "@"), 1);
        return checkdnsrr($domain, "MX") || checkdnsrr($domain, "A");
    }

    /**
     * Check if the email domain is a known disposable domain.
     *
     * @param string $email The email address to check.
     * @return bool True if the domain is disposable, false otherwise.
     */
    public static function isDisposableDomain(string $email): bool
    {
        $domain = substr(strrchr($email, "@"), 1);
        return in_array($domain, self::$disposableDomains);
    }

    /**
     * Check if the email domain is a known free email provider.
     *
     * @param string $email The email address to check.
     * @return bool True if the domain is a free email provider, false otherwise.
     */
    public static function isFreeEmailProvider(string $email): bool
    {
        $domain = substr(strrchr($email, "@"), 1);
        return in_array($domain, self::$freeEmailDomains);
    }

    /**
     * Check if the domain is a catch-all domain.
     * A catch-all domain accepts emails for any address.
     *
     * @param string $email The email address to check.
     * @return bool True if the domain is a catch-all domain, false otherwise.
     */
    public static function isCatchAllDomain(string $email): bool
    {
        $domain = substr(strrchr($email, "@"), 1);

        // Get MX records for the domain
        $mxRecords = [];
        if (!getmxrr($domain, $mxRecords)) {
            return false;
        }

        // Connect to the first MX server
        $mxHost = $mxRecords[0];
        $connection = @fsockopen($mxHost, 25, $errno, $errstr, 10);

        if (!$connection) {
            return false;
        }

        // Perform SMTP conversation
        fputs($connection, "HELO localhost\r\n");
        fgets($connection, 1024);
        fputs($connection, "MAIL FROM: <verify@localhost>\r\n");
        fgets($connection, 1024);
        fputs($connection, "RCPT TO: <randomaddress@$domain>\r\n");
        $response = fgets($connection, 1024);
        fputs($connection, "QUIT\r\n");
        fclose($connection);

        // Check if the server responds with 250 (accepts any email address)
        return strpos($response, '250') === 0;
    }

    /**
     * Detect if the email address is gibberish.
     * Uses a simple heuristic based on character patterns.
     *
     * @param string $email The email address to check.
     * @return bool True if the email is gibberish, false otherwise.
     */
    public static function isGibberishEmail(string $email): bool
    {
        $localPart = strtok($email, "@"); // Extract local part

        // Check if the local part contains mostly random characters
        $gibberishPattern = "/^[bcdfghjklmnpqrstvwxyz]{4,}$/i"; // Example heuristic
        return preg_match($gibberishPattern, $localPart) === 1;
    }

    /**
     * Perform SMTP verification to check if the email exists.
     * WARNING: This can sometimes be flagged as spammy or blocked by some servers.
     *
     * @param string $email The email address to verify.
     * @return bool True if the email exists, false otherwise.
     */
    public static function verifySMTP(string $email): bool
    {
        $domain = substr(strrchr($email, "@"), 1);

        // Get MX records for the domain
        $mxRecords = [];
        if (!getmxrr($domain, $mxRecords)) {
            return false;
        }

        // Connect to the first MX server
        $mxHost = $mxRecords[0];
        $connection = @fsockopen($mxHost, 25, $errno, $errstr, 10);

        if (!$connection) {
            return false;
        }

        // Perform SMTP conversation
        $response = fgets($connection, 1024);
        fputs($connection, "HELO localhost\r\n");
        fgets($connection, 1024);
        fputs($connection, "MAIL FROM: <verify@localhost>\r\n");
        fgets($connection, 1024);
        fputs($connection, "RCPT TO: <$email>\r\n");
        $response = fgets($connection, 1024);
        fputs($connection, "QUIT\r\n");
        fclose($connection);

        // Check the response code
        return strpos($response, '250') === 0;
    }


    /**
     * Check if the SMTP server for the email domain is blacklisted.
     *
     * @param string $email The email address to check.
     * @return bool True if the SMTP server is blacklisted, false otherwise.
     */
    public static function isSMTPBlacklisted(string $email): bool
    {
        $domain = substr(strrchr($email, "@"), 1);

        // Get MX records for the domain
        $mxRecords = [];
        if (!getmxrr($domain, $mxRecords)) {
            return false;
        }

        // Resolve the IP address of the first MX server
        $mxHost = $mxRecords[0];
        $ip = gethostbyname($mxHost);
        if ($ip === $mxHost) {
            // Could not resolve IP
            return false;
        }

        // List of public DNSBLs to query
        $dnsbls = [
            "zen.spamhaus.org",
            "bl.spamcop.net",
            "b.barracudacentral.org",
            "dnsbl.sorbs.net",
            "psbl.surriel.com",
        ];

        // Reverse the IP address for DNSBL query
        $reversedIp = implode(".", array_reverse(explode(".", $ip)));

        // Check each DNSBL
        foreach ($dnsbls as $dnsbl) {
            $query = "$reversedIp.$dnsbl";
            if (checkdnsrr($query, "A")) {
                return true; // Blacklisted
            }
        }

        return false; // Not blacklisted
    }


    /**
     * Check if the domain age is old enough.
     *
     * @param string $email The email address to check.
     * @return bool True if the domain age is acceptable, false otherwise.
     */
    public static function isDomainOldEnough(string $email): bool
    {
        $domain = substr(strrchr($email, "@"), 1);

        // Use `whois` to get domain registration info (requires `php-whois` or similar package)
        $whoisData = shell_exec("whois " . escapeshellarg($domain));
        if (!$whoisData) {
            return false;
        }

        // Extract creation date
        if (preg_match('/Creation Date: (\d{4}-\d{2}-\d{2})/', $whoisData, $matches)) {
            $creationDate = new DateTime($matches[1]);
            $currentDate = new DateTime();

            // Calculate the difference in days
            $diff = $currentDate->diff($creationDate);
            return $diff->y >= 1; // Domain should be at least 1 year old
        }

        return false;
    }



    /**
     * Check the reputation of an email domain.
     * This function can use third-party APIs or basic heuristics for checking domain reputation.
     *
     * @param string $email The email address to check.
     * @return bool True if the domain reputation is good, false otherwise.
     */
    public static function checkDomainReputation(string $email): bool
    {
        $domain = substr(strrchr($email, "@"), 1);

        // Example heuristic: List of known bad domains
        $badDomains = [
            'spammer.com',
            'fakeemails.com',
            'maliciousdomain.com',
            // Add more known bad domains here or fetch dynamically.
        ];

        if (in_array($domain, $badDomains)) {
            return false; // Domain has a bad reputation
        }

        // Optionally integrate with a third-party API
        // Example: Using a hypothetical API to fetch domain reputation
        /*
        $apiUrl = "https://domainreputationapi.com/check?domain=" . urlencode($domain);
        $response = file_get_contents($apiUrl);
        $data = json_decode($response, true);

        if (isset($data['reputation']) && $data['reputation'] === 'bad') {
            return false; // Bad reputation from the API
        }
        */

        return true; // Assume good reputation if not in the bad list
    }

    /**
     * Check if the email inbox is full by analyzing SMTP response.
     *
     * @param string $email The email address to check.
     * @return bool True if the inbox is full, false otherwise.
     */
    public static function isInboxFull(string $email): bool
    {
        $domain = substr(strrchr($email, "@"), 1);

        // Get MX records for the domain
        $mxRecords = [];
        if (!getmxrr($domain, $mxRecords)) {
            return false;
        }

        // Connect to the first MX server
        $mxHost = $mxRecords[0];
        $connection = @fsockopen($mxHost, 25, $errno, $errstr, 10);

        if (!$connection) {
            return false;
        }

        // Perform SMTP conversation
        fputs($connection, "HELO localhost\r\n");
        fgets($connection, 1024);
        fputs($connection, "MAIL FROM: <verify@localhost>\r\n");
        fgets($connection, 1024);
        fputs($connection, "RCPT TO: <$email>\r\n");
        $response = fgets($connection, 1024);
        fputs($connection, "QUIT\r\n");
        fclose($connection);

        // Check if the response contains a specific code indicating inbox full (e.g., 552)
        return strpos($response, '552') !== false;
    }

    /**
     * Full email verification: syntax, format, domain, and optionally SMTP.
     *
     * @param string $email The email address to verify.
     * @param bool $checkSMTP Whether to perform SMTP verification.
     * @return bool True if the email is valid and exists, false otherwise.
     */
    public static function verifyEmail(string $email, bool $checkSMTP = false)
    {

        $response = [];


        if (!self::isSyntaxValid($email)) {
            $response["isSyntaxValid"] = false;
            //return false;
        } else {
            $response["isSyntaxValid"] = true;
        }

        if (!self::isValidEmail($email)) {
            $response["isValidEmail"] = false;

            // return false;
        } else {
            $response["isValidEmail"] = true;
        }

        if (!self::hasValidDomain($email)) {
            $response["hasValidDomain"] = false;

            // return false;
        } else {
            $response["hasValidDomain"] = true;
        }

        if (self::isDisposableDomain($email)) {
            $response["isDisposableDomain"] = true;

            //return false;
        } else {
            $response["isDisposableDomain"] = false;
        }

        if (self::isFreeEmailProvider($email)) {
            $response["isFreeEmailProvider"] = true;

            //return false;
        } else {
            $response["isFreeEmailProvider"] = false;
        }


        if (self::isInboxFull($email)) {
            $response["isInboxFull"] = false;
        } else {
            $response["isInboxFull"] = true;
        }

        if (self::isGibberishEmail($email)) {
            $response["isGibberishEmail"] = true;

            // return false;
        } else {
            $response["isGibberishEmail"] = false;
        }

        if (!self::checkDomainReputation($email)) {
            $response["checkDomainReputation"] = true;

            // return false;
        } else {
            $response["checkDomainReputation"] = false;
        }

        if (self::isSMTPBlacklisted($email)) {
            $response["isSMTPBlacklisted"] = false;

            //return false;
        } else {
            $response["isSMTPBlacklisted"] = true;
        }



        if (self::isRoleBasedEmail($email)) {
            $response["isRoleBasedEmail"] = false;

            //return false;
        } else {
            $response["isRoleBasedEmail"] = true;
        }


        if (self::isCatchAllDomain($email)) {
            $response["isCatchAllDomain"] = false;

            //return false;
        } else {
            $response["isCatchAllDomain"] = true;
        }

        if ($checkSMTP && !self::verifySMTP($email)) {
            $response["verifySMTP"] = true;

            // return false;
        } else {
            $response["verifySMTP"] = false;
        }



        return $response;
    }
}
