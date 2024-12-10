import { useEffect, useState } from "@wordpress/element";
const { Component } = wp.element;

import { __ } from "@wordpress/i18n";
import React from "react";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;

	var [options, setoptions] = useState(props.options); // Using the hook.

	console.log(options)

	useEffect(() => {
		onChange(options);
	}, [options]);

	return (
		<div className="w-[800px]">

			<div className="text-2xl font-bold mb-2">
				{__("Error messages", "user-verification")}
			</div>
			<p className="text-base mb-7">
				{__("Customize error messages.", "user-verification")}
			</p>

			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("Invalid activation key", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.invalid_key}
					onChange={(newVal) => {
						var optionsX = { ...options, invalid_key: newVal.target.value };
						setoptions(optionsX);
					}}
				/>
			</div>

			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("Activation key has sent", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.activation_sent}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							activation_sent: newVal.target.value,
						};
						setoptions(optionsX);
					}}
				/>
			</div>

			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("Verify email address", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.verify_email}
					onChange={(newVal) => {
						var optionsX = { ...options, verify_email: newVal.target.value };
						setoptions(optionsX);
					}}
				/>
			</div>

			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("Registration success message", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.registration_success}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							registration_success: newVal.target.value,
						};
						setoptions(optionsX);
					}}
				/>
			</div>

			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("Verification successful", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.verification_success}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							verification_success: newVal.target.value,
						};
						setoptions(optionsX);
					}}
				/>
			</div>

			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("Verification fail", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.verification_fail}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							verification_fail: newVal.target.value,
						};
						setoptions(optionsX);
					}}
				/>
			</div>

			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("Please wait text", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.please_wait}
					onChange={(newVal) => {
						var optionsX = { ...options, please_wait: newVal.target.value };
						setoptions(optionsX);
					}}
				/>
			</div>

			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("Mail instruction text", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.mail_instruction}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							mail_instruction: newVal.target.value,
						};
						setoptions(optionsX);
					}}
				/>
			</div>

			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("Redirect after verify text", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.redirect_after_verify}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							redirect_after_verify: newVal.target.value,
						};
						setoptions(optionsX);
					}}
				/>
			</div>

			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("Not redirect text", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.not_redirect}
					onChange={(newVal) => {
						var optionsX = { ...options, not_redirect: newVal.target.value };
						setoptions(optionsX);
					}}
				/>
			</div>

			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("Popup title checking verification", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.title_checking_verification}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							title_checking_verification: newVal.target.value,
						};
						setoptions(optionsX);
					}}
				/>
			</div>

			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("Popup title sending verification", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.title_sending_verification}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							title_sending_verification: newVal.target.value,
						};
						setoptions(optionsX);
					}}
				/>
			</div>

			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("Captcha error message", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.captcha_error}
					onChange={(newVal) => {
						var optionsX = { ...options, captcha_error: newVal.target.value };
						setoptions(optionsX);
					}}
				/>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("OTP sent success message", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.otp_sent_success}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							otp_sent_success: newVal.target.value,
						};
						setoptions(optionsX);
					}}
				/>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label htmlFor="" className="font-medium  mb-2">
					{__("OTP error message", "user-verification")}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					value={options?.otp_sent_error}
					onChange={(newVal) => {
						var optionsX = { ...options, otp_sent_error: newVal.target.value };
						setoptions(optionsX);
					}}
				/>
			</div>
		</div>
	);
}

class EmailVerification extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}
	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}
	render() {
		var { onChange, options } = this.props;
		return (
			<Html
				onChange={onChange}
				options={options}
				warn={this.state.showWarning}
			/>
		);
	}
}
export default EmailVerification;
