=== User Verification - Email Verification, Email OTP, Block Spam Email, Passwordless login   ===
	Contributors: PickPlugins
	Donate link: http://pickplugins.com
	Tags:  User Verification, Email OTP, Block Spam Email, Passwordless login, Email Verification
	Requires at least: 4.1
	Tested up to: 6.5
	Stable tag: 2.0.25
	License: GPLv2 or later
	License URI: http://www.gnu.org/licenses/gpl-2.0.html

	Email verification for user registration to protect spam.

== Description ==

Protect your website from spam user and stop instant access by using spam email address, by this plugin user will need to verify their email before login to your website.

### User Verification by [http://www.pickplugins.com](http://www.pickplugins.com)

* [Donate](https://www.pickplugins.com/item/user-verification/?ref=wordpress.org)
* [Support](https://www.pickplugins.com/support/?ref=wordpress.org)
* [Documentation](https://pickplugins.com/documentation/user-verification/?ref=wordpress.org)

### 3rd Party Plugins

* WooCommerce
* Ultimate Member
* Paid Memberships Pro
* MemberPress
* WP User Manager
* Buddypress
* ARMember
* Youzify
* AJAX Login and Registration modal popup DEV + inline form
* Forminator
* Login/Signup Popup
* N-Media WP Member Registration
* Paid Member Subscriptions
* Pie Register - Basic
* Profile Builder
* ProfileGrid
* ProfilePress
* RegistrationMagic
* User Meta Lite
* User Registration







### Plugin Features

**OTP for WordPress default Login**
Every time user try to login on your WordPress site will require a OTP send via mail, where user can still using their account password from 3rd party login form,

**Block user name**
Default WordPress registration will create user name from email, in most case some user name will look like admin1 or admin2 or some critical username may confused other users. sometime bad people may take advantages from this case, you can protect user name to register. you can use pattern to block user name that start by specific string or contain or end with.

**Block email domain**
You can block any email domain for registration, so kicked out spammy or temporary email provider domains and enjoy the spam free user. you can also set allowed domain so user will not able to register account without using allowed domain.

**Customizable email template**
You can customize email templates as you want, there is some tags provide for making dynamic email templates.

**Automatically login**
You can set to user login their account automatically after completed email verification.

**Google reCAPTCHA**
Protect various form by using Google recaptcha default login form, default register form, default password reset form, default comment form and WooCommerce login form, register form, lost password form.

**WooCommerce Support**
User verification has full support to work with WooCommerce, you can disable autologin after registration via WooCommerce register form and checkout form. user will not able to login via WooCommerce login form until get verified their account.

**Paid Membership Pro Support**
user verification provide support for Paid Membership Pro plugin

**MemberPress Support**
User verification plugin also work with MemberPress plugin and added required support for MemberPress plugin, there is no settings is required.

**Buddypress Support**
We provide support for buddypress plugin, and it works like a charm.

**Ultimate Member**
Ultimate Member is one of the best plugin for making profile and membership site, and we added support for this plugin.

* Custom message for various action.
* Resend verification key form via shortcode `[uv_resend_verification_form]`.
* Translation Ready

## Spam Protection by [https://isspammy.com](http://isspammy.com)

isspammy.com is owned by PickPlugins and it's used to protect spam users from login in, registering, commenting, posting reviews and etc. Once you mark a comment as spam it will send a request to isspammy.com and it will create a record for this mail and marked as spam, so later when the same email is used to post a comment it will block them as a spammer. isspammy.com is commited to keep user email private and only accessible when requested.

* [isspammy.com/privacy-policy/](http://isspammy.com/privacy-policy/)
* [isspammy.com/About Us/](http://isspammy.com/privacy-policy/)



<strong>Protect spam email</strong>
Some user are try temporary email service for registration, by this plugin you can list of spammy domain so user will not able to use these domain email for registration.



<strong>Automatically login after verification</strong>
Your site user will automatically logged to account just after verified account and you can also set custom page link where to redirect.


<strong>Translation</strong>

Plugin is translation ready , please find the 'en.po' for default translation file under 'languages' folder and add your own translation. you can also contribute in translation, please contact us http://www.pickplugins.com/contact/




== Installation ==

1. Install as regular WordPress plugin.<br />
2. Go your plugin setting via WordPress Dashboard and find "<strong>User Verification</strong>" activate it.<br />


== Screenshots ==

1. Screenshot 1
2. Screenshot 2
3. Screenshot 3
4. Screenshot 4
5. Screenshot 5
6. Screenshot 6
7. Screenshot 7
8. Screenshot 8
9. Screenshot 9
10. Screenshot 10



== Changelog ==



= 2.0.25 =
* 2024-05-22 fix -Select2 conflict issue fixed.

= 2.0.24 =
* 2024-05-22 fix - Resolved Fadeout issue resend verification confirmation message.
* 2024-05-22 fix - Exclude user role select2 issue fixed.

= 2.0.23 =
* 2024-04-20 fix - Remove activation key from user list.

= 2.0.22 =
* 2023-10-12 fix - WooCommerce OTP is added.


= 2.0.21 =
* 2023-10-11 fix - OTP remove after login successful.
* 2023-10-11 fix - OTP enable saving for polylang issue fixed

= 2.0.20 =
* 2023-10-11 fix - Remove support for WooCommerce OTP 

= 2.0.19 =
* 2023-10-08 fix - Double verification mail for WP User Manager plugin issue fixed.


= 2.0.18 =
* 2023-10-03 fix - Optimize filter hook user_verification_email_templates_data

= 2.0.17 =
* 2023-08-02 fix - typo issue fixed

= 2.0.16 =
* 2023-07-10 fix - Email Subject special character issue fixed.

= 2.0.15 =
* 2023-06-07 fix - WooCommerce OTP Field not showing issue fixed.

= 2.0.15 =
* 2023-06-07 fix - WooCommerce OTP Field not showing issue fixed.

= 2.0.14 =
* 2023-06-03 fix - mark existing user as verified conflict issue fixed.
* 2023-06-03 fix - OTP login issue fixed.


= 2.0.13 =
* 2023-06-02 fix - translation readme.txt issue fixed.


= 2.0.12 =
* 2023-05-14 add - delay time added for deleting unverified users.
* 2023-05-14 fix - Old user required verify account when option "Existing user as verified" set to "No".
* 2023-05-14 fix - WooCommerce OTP login eye icon issue fixed.


= 2.0.11 =
* 2023-04-26 add - Custom OTP length.
* 2023-04-26 add - OTP character source Numbers(0-9), Uppercase characters, Lowercase characters, Special characters, Extra Special characters added



= 2.0.10 =
* 2023-04-01 fix - mark older user on user list page.
* 2023-04-01 fix - Option name issue fixed.


= 2.0.9 =
* 2023-03-26 fix - WooCommerce password login issue when default login OTP enabled.

= 2.0.8 =
* 2023-03-25 update - Default login OTP UI updated.

= 2.0.7 =
* 2023-03-24 fix - WooCommerce login OTP issue fixed.
* 2023-03-24 fix - Lost password reCAPTCHA issue fixed.
* 2023-03-24 fix - reCAPTCHA functions renamed.
* 2023-03-25 fix - WooCommerce login OTP requried to enable default login OTP.
* 2023-03-25 fix - WooCommerce login OTP UI updated.

= 2.0.6 =
* 2023-03-18 fix - Block spammer comments option issue fixed.


= 2.0.5 =
* 2023-03-14 fix - reCAPTCHA on lost password form issue fixed.
* 2023-03-14 fix - email verification checking error log issue fixed.
* 2023-03-14 fix - typo issue fixed


= 2.0.4 =
* 2023-03-07 fix - Settings page conflict issue fixed.

= 2.0.3 =
* 2023-02-25 add - Redirect after registration on WooCommerce added.
* 2023-02-25 fix - Choose verification page & Redirect after verification conflict issue fixed.



= 2.0.2 =
* 2023-02-19 fix - recaptcha on registration issue fixed.

= 2.0.1 =
* 2023-02-16 fix - recaptcha on reset password for issue fixed.

= 2.0.0 =
* 2022-01-22 fix - Email template broken html issue fixed.
* 2022-01-22 fix - Email custom from name issue fixed.
* 2022-01-22 fix - Email Bcc issue fixed.
* 2022-01-22 add - default email from address
* 2022-01-22 add - default email from name address

= 1.0.99 =
* 2022-01-22 fix - recaptcha v3 displaying on login page issue fixed.

= 1.0.98 =
* 2022-01-20 fix - recaptcha v3 issue fixed.
* 2022-01-20 fix - Resend verification method form submit to ajax.

= 1.0.97 =
* 2022-01-07 fix - Exclude user role input field updated to select2
* 2022-01-07 fix - OTP request nonce issue fixed.

= 1.0.96 =
* 2022-12-25 fix - Settings page broken issur fixed.

= 1.0.95 =
* 2022-12-25 fix - escape issue fixed.
* 2022-12-25 fix - string translation issue fixed.
* 2022-12-25 add - isspammy.com service description added.



= 1.0.94 =
* 2022-12-25 fix - Security issue fixed for OTP login.


= 1.0.93 =
* 2022-12-19 add - Required verification on email change?


= 1.0.92 =
* 2022-12-03 fix - Delete unverified users


= 1.0.91 =
* 2022-11-15 add - Mark all existing user as verified added.
* 2022-11-15 add - Mark all existing user as verified interval added.
* 2022-11-15 add - Delete interval unverified users added
* 2022-11-15 fix - Escap HTML issue fixed.


= 1.0.90 =
* 2022-11-08 add - Generic mail block added.


= 1.0.89 =
* 2022-11-08 fix - WooCommerce Password Field Disappear issue fixed


= 1.0.88 =
* 2022-10-06 fix - Email template autop issue fixed


= 1.0.87 =
* 2022-10-03 fix - recaptcha on comment form issue fixed.

= 1.0.86 =
* 2022-09-26 fix - jQuery UI tabs missing issue fixed.

= 1.0.85 =
* 2022-09-26 fix - slash issue fixed on save settings.


= 1.0.84 =
* 2022-09-11 fix - Email templates raw html issue fixed.


= 1.0.83 =
* 2022-08-20 fix - WooCommerce Login recaptcha with default login recaptcha conflict issue resolved.


= 1.0.82 =
* 2022-08-17 fix - WooCommerce Login form reCAPTCHA issue resolved
* 2022-08-17 fix - WooCommerce Register form reCAPTCHA issue resolved



= 1.0.81 =
* 2022-08-03 fix - Disable auto login on WooCommerce checkout page.
* 2022-08-03 fix - WooCommerce registration message text to textarea.




= 1.0.79 =
* 2022-07-23 fix - jquery-ui style coflict issue fixed.


= 1.0.78 =
* 2022-07-06 update - Add $user_id to user_verification_enable filter hook.

= 1.0.77 =
* 2022-07-06 fix - Empty password error message issue fixed.
* 2022-07-06 fix - Hide "Send OTP" button on first click.


= 1.0.76 =
* 2022-05-29 fix - Login and registration error message plain html issue fixed.
 
= 1.0.75 =
* 2022-05-29 fix - Exclude user role issue fixed.
 


= 1.0.74 =
* 2022-05-09 fix - unnecessary scripts loading issue fixed.


= 1.0.73 =
* 2022-04-28 add - WP User Manager integration added.

= 1.0.72 =
* 2022-04-26 fix - Mail HTMl issue fixed.

= 1.0.71 =
* 2022-04-23 fix - Mail templates broken issue fixed.

= 1.0.70 =
* 2022-04-23 fix - esc html issue fixed on saving options

= 1.0.69 =
* 2022-04-23 fix - slash issue fixed on saving options

= 1.0.68 =
* 2021-10-09 update - WPML string support updated

= 1.0.67 =
* 2021-10-09 fix - Popup - Redirect after verification text added.
* 2021-10-09 fix - Popup - If not redirect automatically text added.
* 2021-10-09 fix - Popup - Double Please wait text issue fixed.
* 2021-01-18 fix - Hide verification status column on user list if email verification disabled.


= 1.0.66 =
* 2021-09-17 fix - Spammers are not allowed to login issue fixed


= 1.0.65 =
* 2021-09-16 fix - isspammy.com integration "Block spammer comments" goes to trash instead of showing error message.


= 1.0.64 =
* 2021-09-14 add - Comment posting issue fixed.
* 2021-09-14 add - user Registration issue fixed


= 1.0.63 =
* 2021-09-12 add - isspammy.com Integration secure connection issue fixed


= 1.0.62 =
* 2021-09-12 add - automatically delete unverified users
* 2021-09-12 add - isspammy.com Integration secure connection issue fixed

= 1.0.61 =
* 2021-09-08 add - isspammy.com Integration
* 2021-09-08 add - Report on mark as spam comments to isspammy.com so that they can't spam on any other WordPress site
* 2021-09-08 add - Report on mark as trash comments to isspammy.com so that they can't spam on any other WordPress site
* 2021-09-08 add - Block spammer comments if spammer found on isspammy.com server.
* 2021-09-08 add - Block user registeration if spammer found on isspammy.com server.


= 1.0.60 =
* 2021-07-24 add - OTP on WooCommerce login page.

= 1.0.59 =
* 2021-07-23 fix - OTP is not correct issue fixed.

= 1.0.58 =
* 2021-07-23 add - OTP for default WordPress login


= 1.0.57 =
* 2021-07-18 fix - recaptcha issue fixed.


= 1.0.56 =
* 2021-04-18 fix - Paid Memberships Pro settings saving issue fixed.

= 1.0.55 =
* 2021-04-18 fix - HTML format issue fixed.

= 1.0.54 =
* 2021-04-18 fix - security issue update

= 1.0.53 =
* 2020-02-14 fix - settings reset issue fixed.


= 1.0.52 =
* 2020-12-15 add - new translation fields added.

= 1.0.51 =
* 2020-10-14 add - new filter hook user_verification_enable added to bypass user verification
* 2020-10-14 remove - duplicate option remove Disable auto login for WooCommerce


= 1.0.50 =
* 2020-09-12 add - multi site compatibility added
* 2020-09-12 add - action hook added user_verification_email_verified


= 1.0.49 =
* 2020-09-15 fix - verification page fallback url to home page.

= 1.0.48 =
* 2020-09-15 fix - verification popup box z-index issue fixed.


= 1.0.47 =
* 2020-09-12 fix - email enable/disable issue fixed.


= 1.0.46 =
* 2020-09-11 add - hide 3rd party plugins options menu if plugin is not installed
* 2020-09-11 fix - login automatically after verification issue fixed.


= 1.0.45 =
* 2020-09-10 fix - email not sending issue fixed.


= 1.0.44 =
* 2020-09-09 fix - email templates save issue fixed.


= 1.0.43 =
* 2020-09-08 fix - email templates import issue fixed.


= 1.0.42 =
* 2020-09-07 fix - text-domain issue fixed

= 1.0.41 =
* 2020-09-07 update - re-designed settings page.
* 2020-09-07 update - all options saved under single array
* 2020-09-07 update - User Verification menu moved under default Users menu
* 2020-09-07 add - daily clean activation key from user meta table
* 2020-09-07 add - Resend verification mail option added to users list page.


= 1.0.40 =
* 2020-07-02 fix - email enable issue fixed.

= 1.0.39 =
* 2020-06-22 add - MemberPress plugin integration added
* 2020-06-22 add - BuddyPress plugin integration added
* 2020-06-23 fix - hide Invalid activation Key if url parameter not exist.



= 1.0.38 =
* 2020-06-21 add - Verification at pending page (BuddyPress)


= 1.0.37 =
* 2020-06-08 add - added email parameter first_name, last_name


= 1.0.36 =
* 2020-05-18 fix - allowed email domain issue fixed.


= 1.0.35 =
* 2020-04-21 fix - sanitize settings url issue fixed.

= 1.0.34 =
* 2020-03-27 remove - remove our plugins menu.

= 1.0.33 =
* 2020-03-27 fix - sanitize variables.

= 1.0.32 =
* 2020-02-18 fix - sanitize variables.
* 2020-02-18 fix - fixed security issue


= 1.0.31 =
* 2020-02-15 add - added allowed domain

= 1.0.30 =
* 09/01/2020 add - added new email parameter {user_display_name}

= 1.0.29 =
* 17/10/2019 add - remove placeholder email address for uv_resend_verification_form

= 1.0.28 =
* 04/09/2019 fix - translation support for email templates.

= 1.0.27 =
* 20/08/2019 fix - user admin column issue fixed.

= 1.0.26 =
* 07/05/2019 fix - 'class_user_verification_emails' error issue fixed.

= 1.0.24 =
* 16/04/2019 fix - WooCommerce Redirect after payment.

= 1.0.24 =
* 29/03/2019 fix - user verification confirmed mail issue fixed.

= 1.0.23 =
* 23/03/2019 add - implement with Ultimate Member plugin.

= 1.0.22 =
* 21/03/2019 fix - WooCommerce checkout issue fixed.

= 1.0.21 =
* 05/03/2019 fix - Exclude user by role to verification.

= 1.0.20 =
* 27/09/2018 add - Email Templates reset button is back.

= 1.0.19 =
* 24/09/2018 fix - Minor PHP issue fixed
* 24/09/2018 remove - Removed some CSS files.

= 1.0.18 =
* 23/09/2018 add - Support for WooCommerce.
* 23/09/2018 add - Support for Paid Memberships Pro.


= 1.0.17 =
* 03/08/2018 add - Google reCAPTCHA(v-2) for default login form.
* 03/08/2018 add - Google reCAPTCHA(v-2) for default register form.
* 03/08/2018 add - Google reCAPTCHA(v-2) for default password reset form.
* 03/08/2018 add - Google reCAPTCHA(v-2) for default comment form.
* 03/08/2018 add - Google reCAPTCHA(v-2) for WooCommerce login form.
* 03/08/2018 add - Google reCAPTCHA(v-2) for WooCommerce register form.
* 03/08/2018 add - Google reCAPTCHA(v-2) for WooCommerce lost password form.

= 1.0.16 =
* 12/05/2018 add - Private pages included on "verification page?" settings".

= 1.0.15 =
* 05/05/2018 fix - issue fixed Automatically login after verification.

= 1.0.14 =
* 29/03/2018 fix - option "Redirect after verification?" none selection issue fixed.

= 1.0.13 =
* 15/02/2018 fix - Cannot modify header information fixed

= 1.0.12 =
* 17/01/2018 add - translation ready.

= 1.0.11 =
* 30/12/2017 add - bulk action for user approve and Disapprove.

= 1.0.10 =
* 20/12/2017 fix - translation issue fix.

= 1.0.9 =
* 18/12/2017 fix - admin can manually approve user account.

= 1.0.7 =
* 11/10/2017 fix - WooCommerce checkout issue.

= 1.0.6 =
* 24/09/2017 add - compatibility with WooCommerce.
* 24/09/2017 add - custom message option panel.
* 24/09/2017 add - Block spam registration by domain.
* 24/09/2017 add - Block registration by username.

= 1.0.5 =
16/09/2017 add – Message after registration completed.

= 1.0.4 =
* 12/09/2017 add - ready for translation.

= 1.0.3 =
* 20/04/2017 add - redirection is not mandatory, when  Redirect after verification > None.

= 1.0.2 =
* 20/04/2017 add - add settings page.
* 20/04/2017 add - add shortcode for checking verification.

= 1.0.1 =
* 16/04/2017 Email form name and email address fixed.

= 1.0.11 =
* 20/12/2017 Email notification added
* 20/12/2017 Bug Fixed
