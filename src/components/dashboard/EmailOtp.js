import { useEffect, useState } from "@wordpress/element";
const { Component } = wp.element;

import { __ } from "@wordpress/i18n";
import React from "react";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;
	var pageList = props.pageList;

	var [options, setoptions] = useState(props.options); // Using the hook.

	useEffect(() => {
		onChange(options);
	}, [options]);

	const toggleCheckbox = (value) => {
		const updatedSource = options?.character_source?.includes(value)
			? options?.character_source?.filter((item) => item !== value) // Remove if already selected
			: [...options?.character_source, value]; // Add if not selected

		setoptions({ ...options, character_source: updatedSource });
	};
	return (
		<div className="w-[800px]">
			<div className="text-2xl font-bold mb-2">
				{__("OTP Login", "user-verification")}
			</div>
			<p className="text-base mb-7">
				{__("Customize options for OTP Login.", "user-verification")}
			</p>

			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Required email verified", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.required_email_verified}
					options={[
						{ label: "No", value: "no" },
						{ label: "Yes", value: "yes" },
					]}
					onChange={(newVal) => {
						var optionsX = { ...options, required_email_verified: newVal };
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>


			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="">
					{__("OTP Length", "user-verification")}
				</label>
				<PGinputText
					value={options?.length}
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					onChange={(newVal) => {
						var optionsX = { ...options, length: newVal.target.value };
						setoptions(optionsX);
					}}
				/>
			</div>
			<div className="flex  my-5  justify-between items-start">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("OTP character source", "user-verification")}
				</label>
				<div className="flex flex-1 flex-wrap items-center gap-4">
					<label className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={options?.character_source?.includes("number")}
							onChange={() => toggleCheckbox("number")}
						/>
						<span>{__("Numbers (0-9)", "user-verification")}</span>
					</label>
					<label className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={options?.character_source?.includes("uppercase")}
							onChange={() => toggleCheckbox("uppercase")}
						/>
						<span>{__("Uppercase characters", "user-verification")}</span>
					</label>
					<label className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={options?.character_source?.includes("lowercase")}
							onChange={() => toggleCheckbox("lowercase")}
						/>
						<span>{__("Lowercase characters", "user-verification")}</span>
					</label>
					<label className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={options?.character_source?.includes("special")}
							onChange={() => toggleCheckbox("special")}
						/>
						<span>{__("Special characters", "user-verification")}</span>
					</label>
					<label className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={options?.character_source?.includes("extraspecial")}
							onChange={() => toggleCheckbox("extraspecial")}
						/>
						<span>{__("Extra Special characters", "user-verification")}</span>
					</label>
				</div>
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
					{__("OTP sent error message", "user-verification")}
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

			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Redirect after loggedin", "user-verification")}
				</label>
				<PGinputSelect
					val={options?.redirect_after_login}
					inputClass="!py-1 px-2 border-2 border-solid"
					options={pageList}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							redirect_after_login: newVal,
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>

			{/* <h3>How to display OTP login form?</h3>
			<p>Please use following shortcode to display OTP login form </p>
			<code>[user_verification_otp_login_form]</code> */}


			<h3>How to display OTP login form?</h3>
			<p>Please use following shortcode to display OTP login form </p>
			<code>[user_verification_otp_login_form]</code>


		</div>
	);
}

class EmailOtp extends Component {
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
		var { onChange, options, pageList } = this.props;
		return (
			<Html
				onChange={onChange}
				options={options}
				pageList={pageList}
				warn={this.state.showWarning}
			/>
		);
	}
}
export default EmailOtp;
