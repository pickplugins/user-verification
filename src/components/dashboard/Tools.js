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

	var [options, setoptions] = useState(props.options); // Using the hook.

	useEffect(() => {
		onChange(options);
	}, [options]);

	return (
		<div className="w-[800px]">
			<div className="text-2xl font-bold mb-2">
				{__("Delete unverified users", "user-verification")}
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Delete unverified users", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.unverified?.delete_user}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							unverified: {
								...options.unverified,
								delete_user: newVal,
							},
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Max number", "user-verification")}
				</label>
				<PGinputText
					value={options?.unverified?.delete_max_number}
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					onChange={(newVal) => {
						var optionsX = {
							...options,
							unverified: {
								...options.unverified,
								delete_max_number: newVal.target.value,
							},
						};
						setoptions(optionsX);
					}}
				/>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Delay", "user-verification")}
				</label>
				<PGinputText
					value={options?.unverified?.delay}
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					onChange={(newVal) => {
						var optionsX = {
							...options,
							unverified: {
								...options.unverified,
								delay: newVal.target.value,
							},
						};
						setoptions(optionsX);
					}}
				/>
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Delete interval unverified users", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.unverified?.delete_user_interval}
					options={[
						{ label: "10 minutes", value: "10minute" },
						{ label: "30 minutes", value: "30minute" },
						{ label: "6 hours", value: "6hours" },
						{ label: "Hourly", value: "hourly" },
						{ label: "Twicedaily", value: "twicedaily" },
						{ label: "Daily", value: "daily" },
						{ label: "Weekly", value: "weekly" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							unverified: {
								...options.unverified,
								delete_user_interval: newVal,
							},
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="text-2xl font-bold mb-2">
				{__("Existing user", "user-verification")}
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Existing user as verified", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.unverified?.existing_user_verified}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							unverified: {
								...options.unverified,
								existing_user_verified: newVal,
							},
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Existing user as verified interval", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.unverified?.existing_user_verified_interval}
					options={[
						{ label: "10 minutes", value: "10minute" },
						{ label: "30 minutes", value: "30minute" },
						{ label: "6 hours", value: "6hours" },
						{ label: "Hourly", value: "hourly" },
						{ label: "Twicedaily", value: "twicedaily" },
						{ label: "Daily", value: "daily" },
						{ label: "Weekly", value: "weekly" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							unverified: {
								...options.unverified,
								existing_user_verified_interval: newVal,
							},
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="text-2xl font-bold mb-2">
				{__("Default WordPress notification mail", "user-verification")}
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Disable WordPress welcome email", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.disable?.new_user_notification_email}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							disable: {
								...options.disable,
								new_user_notification_email: newVal,
							},
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Default email from address", "user-verification")}
				</label>
				<PGinputText
					value={options?.tools?.mail_from}
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					onChange={(newVal) => {
						var optionsX = {
							...options,
							tools: {
								...options.tools,
								mail_from: newVal.target.value,
							},
						};
						setoptions(optionsX);
					}}
				/>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Default email from name", "user-verification")}
				</label>
				<PGinputText
					value={options?.tools?.mail_from_name}
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					onChange={(newVal) => {
						var optionsX = {
							...options,
							tools: {
								...options.tools,
								mail_from_name: newVal.target.value,
							},
						};
						setoptions(optionsX);
					}}
				/>
			</div>
			
		</div>
	);
}

class Tools extends Component {
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
export default Tools;
