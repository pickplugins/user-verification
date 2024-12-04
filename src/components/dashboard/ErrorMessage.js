import { __ } from "@wordpress/i18n";
import React from "react";
import Textarea from "./Textarea";

const ErrorMessage = ({
	val,
	updateActivationSent,
	updateCaptchaError,
	updateInvalidKey,
	updateMailInstruction,
	updateNotRedirect,
	updateOtpSentError,
	updateOtpSentSuccess,
	updatePleaseWait,
	updateRedirectAfterVerify,
	updateRegistrationSuccess,
	updateTitleCheckingVerification,
	updateTitleSendingVerification,
	updateVerificationFail,
	updateVerificationSuccess,
	updateVerifyEmail,
}) => {
	return (
		<div className="space-y-3 w-full">
			<Textarea
				title={__("Invalid activation key", "user-verification")}
				subtitle={__(
					"Show custom message when user activation key is invalid or wrong",
					"user-verification"
				)}
				val={val.invalid_key}
				update={updateInvalidKey}
			/>

			<Textarea
				title={__("Activation key has sent", "user-verification")}
				subtitle={__(
					"Show custom message when activation key is sent to user email",
					"user-verification"
				)}
				val={val.activation_sent}
				update={updateActivationSent}
			/>

			<Textarea
				title={__("Verify email address", "user-verification")}
				subtitle={__(
					"Show custom message when user try to login without verifying email with proper activation key",
					"user-verification"
				)}
				val={val.verify_email}
				update={updateVerifyEmail}
			/>
			<Textarea
				title={__("Registration success message", "user-verification")}
				subtitle={__(
					"User will get this message as soon as registered on your website",
					"user-verification"
				)}
				val={val.registration_success}
				update={updateRegistrationSuccess}
			/>

			<Textarea
				title={__("Verification successful", "user-verification")}
				subtitle={__(
					"Show custom message when user successfully verified",
					"user-verification"
				)}
				val={val.verification_success}
				update={updateVerificationSuccess}
			/>
			<Textarea
				title={__("Verification fail", "user-verification")}
				subtitle={__(
					"Show custom message when verification failed",
					"user-verification"
				)}
				val={val.verification_fail}
				update={updateVerificationFail}
			/>
			<Textarea
				title={__("Please wait text", "user-verification")}
				subtitle={__('Show custom for "please wait"', "user-verification")}
				val={val.please_wait}
				update={updatePleaseWait}
			/>

			<Textarea
				title={__("Mail instruction text", "user-verification")}
				subtitle={__(
					"Add custom text for mail instructions.",
					"user-verification"
				)}
				val={val.mail_instruction}
				update={updateMailInstruction}
			/>

			<Textarea
				title={__("Redirect after verify text", "user-verification")}
				subtitle={__(
					"Add custom text redirect after verification.",
					"user-verification"
				)}
				val={val.redirect_after_verify}
				update={updateRedirectAfterVerify}
			/>
			<Textarea
				title={__("Not redirect text", "user-verification")}
				subtitle={__(
					"Add custom text not redirect automatically.",
					"user-verification"
				)}
				val={val.not_redirect}
				update={updateNotRedirect}
			/>
			<Textarea
				title={__("Popup title checking verification", "user-verification")}
				subtitle={__(
					'Show custom for "checking verification"',
					"user-verification"
				)}
				val={val.title_checking_verification}
				update={updateTitleCheckingVerification}
			/>
			<Textarea
				title={__("Popup title sending verification", "user-verification")}
				subtitle={__(
					'Show custom for "sending verification"',
					"user-verification"
				)}
				val={val.title_sending_verification}
				update={updateTitleSendingVerification}
			/>
			<Textarea
				title={__("Captcha error message", "user-verification")}
				subtitle={__(
					"Show custom message when captcha error occurred.",
					"user-verification"
				)}
				val={val.captcha_error}
				update={updateCaptchaError}
			/>
			<Textarea
				title={__("OTP sent success message", "user-verification")}
				subtitle={__(
					"Show custom message when OTP sent successfully.",
					"user-verification"
				)}
				val={val.otp_sent_success}
				update={updateOtpSentSuccess}
			/>
			<Textarea
				title={__("OTP error message", "user-verification")}
				subtitle={__(
					"Show custom message when OTP sending error occured.",
					"user-verification"
				)}
				val={val.otp_sent_error}
				update={updateOtpSentError}
			/>
		</div>
	);
};

export default ErrorMessage;
