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
		const updatedSource = options.character_source.includes(value)
			? options.character_source.filter((item) => item !== value) // Remove if already selected
			: [...options.character_source, value]; // Add if not selected

		setoptions({ ...options, character_source: updatedSource });
	};











	return (
		<div className="w-[800px]">



			<div className="text-2xl font-bold mb-2">
				{__("Magic Login", "user-verification")}
			</div>
			<p className="text-base mb-7">
				{__("Enable passwordless login on your site, user will received login url to their mail inbox.", "user-verification")}{" "}

			</p>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Enable Magic Login", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.enable}
					options={[
						{ label: "No", value: "no" },
						{ label: "Yes", value: "yes" },
					]}
					onChange={(newVal) => {
						var optionsX = { ...options, enable: newVal };
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>

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
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Magic Pogin Page", "user-verification")}
				</label>
				<PGinputSelect
					val={options?.magic_login_page}
					inputClass="!py-1 px-2 border-2 border-solid"
					options={pageList}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							magic_login_page: newVal,
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Redirect after login", "user-verification")}
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
			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Redirect after failed", "user-verification")}
				</label>
				<PGinputSelect
					val={options?.redirect_after_failed}
					inputClass="!py-1 px-2 border-2 border-solid"
					options={pageList}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							redirect_after_failed: newVal,
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>




			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="">
					{__("Key Length", "user-verification")}
				</label>
				<PGinputText
					value={options?.length ?? 6}
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					onChange={(newVal) => {
						var optionsX = { ...options, length: newVal.target.value };
						setoptions(optionsX);
					}}
				/>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="">
					{__("Attempt Max Limit", "user-verification")}
				</label>
				<PGinputText
					value={options?.attemptMaxLimit ?? 3}
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					onChange={(newVal) => {
						var optionsX = { ...options, attemptMaxLimit: newVal.target.value };
						setoptions(optionsX);
					}}
				/>
			</div>

			<h3>How to display magic login form?</h3>
			<p>Please use following shortcode to display magic login form </p>
			<code>[user_verification_magic_login_form]</code>

		</div>
	);
}

class MagicLogin extends Component {
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
export default MagicLogin;
