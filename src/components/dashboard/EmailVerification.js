import { useEffect, useState } from "@wordpress/element";
const { Component } = wp.element;

import { __ } from "@wordpress/i18n";
import { Tooltip, TooltipAction, TooltipContent } from "aspect-ui/Tooltip";
import React from "react";
import PGinputSelect from "../input-select";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;

	console.log(props.options);

	var [options, setoptions] = useState(props.options); // Using the hook.

	// useEffect(() => {
	// 	console.log(options);
	// }, [options]);

	const userRoleOptions = [
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
		{ value: "administrator", label: "Administrator" },
	];
	return (
		<div className="w-[800px] space-y-3">
			{JSON.stringify(options)}

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
					inputClass="!py-1 px-2  border border-2 border-solid"
					val={options?.enable}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
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
					{__("Choose verification page", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border border-2 border-solid"
					val={options?.verification_page_id}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = { ...options, verification_page_id: newVal };
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>

			<div className="flex items-center gap-4">
				<label htmlFor="emailVerification">
					{__("Redirect after verification", "user-verification")}
				</label>
				<div className="flex items-center gap-2">
					{/* <PGinputSelect
						val={val?.redirect_after_verification}
						options={[
							{ label: "None", value: "none" },
							{ label: "Sample Page", value: "sample" },
						]}
						onChange={updateRedirectAfterVerification}
						multiple={false}
					/> */}
					<Tooltip
						direction="top"
						arrowColor="#d1d5db"
						showOnClick={true}
						actionClassName="flex items-center justify-center h-[24px] aspect-square font-medium bg-gray-300 rounded-full text-emerald-700"
						contentClassName="bg-gray-300 px-4 py-2 max-w-[350px] text-justify">
						<TooltipAction>?</TooltipAction>
						<TooltipContent>
							{__(
								"Redirect to any page after successfully verified account.",
								"user-verification"
							)}
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<label htmlFor="emailVerification">
					{__("Automatically login after verification", "user-verification")}
				</label>
				<div className="flex items-center gap-2">
					{/* <PGinputSelect
						val={val?.login_after_verification}
						options={[
							{ label: "Yes", value: "yes" },
							{ label: "No", value: "no" },
						]}
						onChange={updateLoginAfterVerification}
						multiple={false}
					/> */}
					<Tooltip
						direction="top"
						arrowColor="#d1d5db"
						showOnClick={true}
						actionClassName="flex items-center justify-center h-[24px] aspect-square font-medium bg-gray-300 rounded-full text-emerald-700"
						contentClassName="bg-gray-300 px-4 py-2 max-w-[350px] text-justify">
						<TooltipAction>?</TooltipAction>
						<TooltipContent>
							{__(
								"Set yes to login automatically after verification completed, otherwise set no.",
								"user-verification"
							)}
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<label htmlFor="emailVerification">
					{__("Required verification on email change?", "user-verification")}
				</label>
				<div className="flex items-center gap-2">
					{/* <PGinputSelect
						val={val?.email_update_reverify}
						options={[
							{ label: "Yes", value: "yes" },
							{ label: "No", value: "no" },
						]}
						onChange={updateEmailReverify}
						multiple={false}
					/> */}
					<Tooltip
						direction="top"
						arrowColor="#d1d5db"
						showOnClick={true}
						actionClassName="flex items-center justify-center h-[24px] aspect-square font-medium bg-gray-300 rounded-full text-emerald-700"
						contentClassName="bg-gray-300 px-4 py-2 max-w-[350px] text-justify">
						<TooltipAction>?</TooltipAction>
						<TooltipContent>
							{__(
								"Resend email verification when user update their email.",
								"user-verification"
							)}
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<label htmlFor="emailVerification">
					{__("Exclude user role", "user-verification")}
				</label>
				<div className="flex flex-1 items-center gap-2">
					{/* <Select
						// val={val.exclude_user_roles}
						className="flex-1"
						value={val?.exclude_user_roles.map(
							(role) => userRoleOptions.find((option) => option.value === role) // Match role with options
						)}
						options={userRoleOptions}
						isMulti
						closeMenuOnSelect={false}
						onChange={updateExcludeUserRoles}
						multiple={false}
					/> */}
					<Tooltip
						direction="top"
						arrowColor="#d1d5db"
						showOnClick={true}
						actionClassName="flex items-center justify-center h-[24px] aspect-square font-medium bg-gray-300 rounded-full text-emerald-700"
						contentClassName="bg-gray-300 px-4 py-2 max-w-[350px] text-justify">
						<TooltipAction>?</TooltipAction>
						<TooltipContent>
							{__(
								"You can exclude verification for these user roles to login on your site.",
								"user-verification"
							)}
						</TooltipContent>
					</Tooltip>
				</div>
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
