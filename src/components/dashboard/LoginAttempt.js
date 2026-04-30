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
				{__("Login Attempt", "user-verification")}
			</div>
			<p className="text-base mb-7">
				{__("Customize options for Login Attempt.", "user-verification")}
			</p>

			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Enable?", "user-verification")}
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

			{options?.enable == 'yes' && (

				<>
					<div className="flex  my-5  justify-between items-center">
						<label className="w-[400px]" htmlFor="">
							{__("Max attempts", "user-verification")}
						</label>
						<PGinputText
							value={options?.max_attempts ?? 3}
							className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
							onChange={(newVal) => {
								var optionsX = { ...options, max_attempts: newVal.target.value };
								setoptions(optionsX);
							}}
						/>
					</div>
					<div className="flex  my-5  justify-between items-center">
						<label className="w-[400px]" htmlFor="">
							{__("Locked for x minutes", "user-verification")}
						</label>
						<PGinputText
							value={options?.locked_minutes ?? 3}
							className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
							onChange={(newVal) => {
								var optionsX = { ...options, locked_minutes: newVal.target.value };
								setoptions(optionsX);
							}}
						/>
					</div>
					<div className="flex  my-5  justify-between items-center">
						<label htmlFor="" className="  mb-2">
							{__("Locked message", "user-verification")}
						</label>
						<textarea
							className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
							value={options?.locked_message ?? "Max login failed, you are blocked for %s minute(s)."}
							onChange={(newVal) => {
								var optionsX = {
									...options,
									locked_message: newVal.target.value,
								};
								setoptions(optionsX);
							}}
						/>
					</div>
					<div className="flex  my-5  justify-between items-center">
						<label htmlFor="" className="  mb-2">
							{__("Remaining message", "user-verification")}
						</label>
						<textarea
							className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
							value={options?.remaining_message ?? "Login failed. You have %s tries remaining."}
							onChange={(newVal) => {
								var optionsX = {
									...options,
									remaining_message: newVal.target.value,
								};
								setoptions(optionsX);
							}}
						/>
					</div>
					<div className="flex  my-5  justify-between items-center">
						<label className="w-[400px]" htmlFor="emailVerification">
							{__("Redirect on max attempt", "user-verification")}
						</label>
						<PGinputSelect
							val={options?.redirect_max_attempt}
							inputClass="!py-1 px-2 border-2 border-solid"
							options={pageList}
							onChange={(newVal) => {
								var optionsX = {
									...options,
									redirect_max_attempt: newVal,
								};
								setoptions(optionsX);
							}}
							multiple={false}
						/>
					</div>

				</>

			)}




		</div>
	);
}

class LoginAttempt extends Component {
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
export default LoginAttempt;
