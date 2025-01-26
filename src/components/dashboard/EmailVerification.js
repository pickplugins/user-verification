import { useEffect, useState } from "@wordpress/element";
const { Component } = wp.element;

import { __ } from "@wordpress/i18n";
import React from "react";
import Select from "react-select";
import PGinputSelect from "../input-select";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;
	var roles = props.roles;
	var pageList = props.pageList;

	var [options, setoptions] = useState(props.options); // Using the hook.

	useEffect(() => {
		onChange(options);
	}, [options]);









	return (
		<div className="w-[800px]">

			<div className="text-2xl font-bold mb-2">
				{__("Email verification", "user-verification")}
			</div>
			<p className="text-base mb-7">
				{__("Customize options for email verification.", "user-verification")}
			</p>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Enable email verification", "user-verification")}
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
			{options?.enable == "yes" && (
				<>
					<div className="flex  my-5  justify-between items-center">
						<label className="w-[400px]" htmlFor="emailVerification">
							{__("Choose verification page", "user-verification")}
						</label>
						<PGinputSelect
							inputClass="!py-1 px-2  border-2 border-solid"
							val={options?.verification_page_id}
							options={pageList}
							onChange={(newVal) => {
								var optionsX = { ...options, verification_page_id: newVal };
								setoptions(optionsX);
							}}
							multiple={false}
						/>
					</div>
					<div className="flex  my-5  justify-between items-center">
						<label className="w-[400px]" htmlFor="emailVerification">
							{__("Redirect after verification", "user-verification")}
						</label>
						<PGinputSelect
							val={options?.redirect_after_verification}
							inputClass="!py-1 px-2 border-2 border-solid"
							options={pageList}
							onChange={(newVal) => {
								var optionsX = {
									...options,
									redirect_after_verification: newVal,
								};
								setoptions(optionsX);
							}}
							multiple={false}
						/>
					</div>
					<div className="flex  my-5  justify-between items-center">
						<label className="w-[400px]" htmlFor="emailVerification">
							{__(
								"Automatically login after verification",
								"user-verification"
							)}
						</label>
						<PGinputSelect
							val={options?.login_after_verification}
							inputClass="!py-1 px-2  border-2 border-solid"
							options={[

								{ label: "No", value: "no" },
								{ label: "Yes", value: "yes" },
							]}
							onChange={(newVal) => {
								var optionsX = { ...options, login_after_verification: newVal };
								setoptions(optionsX);
							}}
							multiple={false}
						/>
					</div>
					<div className="flex  my-5  justify-between items-center">
						<label className="w-[400px]" htmlFor="emailVerification">
							{__(
								"Required verification on email change?",
								"user-verification"
							)}
						</label>
						<PGinputSelect
							val={options?.email_update_reverify}
							inputClass="!py-1 px-2  border-2 border-solid"
							options={[
								{ label: "No", value: "no" },
								{ label: "Yes", value: "yes" },
							]}
							onChange={(newVal) => {
								var optionsX = { ...options, email_update_reverify: newVal };
								setoptions(optionsX);
							}}
							multiple={false}
						/>
					</div>
					<div className="flex items-center">
						<label className="w-[400px]" htmlFor="emailVerification">
							{__("Exclude user role", "user-verification")}
						</label>
						<div className="flex flex-1 items-center gap-2">
							<Select
								className="flex-1"
								value={options?.exclude_user_roles?.map(
									(role) =>
										roles.find((option) => option.value === role) // Match role with options
								)}
								options={roles}
								isMulti
								closeMenuOnSelect={false}
								onChange={(newVal) => {
									const selectedValues = newVal.map((option) => option.value);
									setoptions({
										...options,
										exclude_user_roles: selectedValues,
									});
								}}
								multiple={false}
							/>
						</div>
					</div>
				</>
			)}
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
		var { onChange, options, roles, pageList } = this.props;
		return (
			<Html
				onChange={onChange}
				options={options}
				roles={roles}
				pageList={pageList}
				warn={this.state.showWarning}
			/>
		);
	}
}
export default EmailVerification;
