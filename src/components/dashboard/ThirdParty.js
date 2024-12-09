import { useEffect, useState } from "@wordpress/element";
const { Component } = wp.element;

import { __ } from "@wordpress/i18n";
import React from "react";
import Select from "react-select/base";
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

	const userRoleOptions = [
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
		{ value: "administrator", label: "Administrator" },
	];
	return (
		<div className="w-[800px]">
			<div className="text-2xl font-bold mb-2">
				{__("Paid Memberships Pro", "user-verification")}
			</div>
			<p className="text-base mb-7">
				{__("Customize options for Paid Memberships Pro.", "user-verification")}
			</p>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Disable auto login", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.paid_memberships_pro?.disable_auto_login}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							paid_memberships_pro: {
								...options.paid_memberships_pro,
								disable_auto_login: newVal,
							},
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__(
						"Display message on checkout confirmation page",
						"user-verification"
					)}
				</label>
				<PGinputText
					value={options?.paid_memberships_pro?.message_checkout_page}
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					onChange={(newVal) => {
						var optionsX = {
							...options,
							paid_memberships_pro: {
								...options.paid_memberships_pro,
								message_checkout_page: newVal.target.value,
							},
						};
						setoptions(optionsX);
					}}
				/>
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Automatically logout after second", "user-verification")}
				</label>
				<PGinputText
					value={options?.paid_memberships_pro?.redirect_timout}
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					onChange={(newVal) => {
						var optionsX = {
							...options,
							paid_memberships_pro: {
								...options.paid_memberships_pro,
								redirect_timout: newVal.target.value,
							},
						};
						setoptions(optionsX);
					}}
				/>
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Redirect to this page after checkout", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.paid_memberships_pro?.redirect_after_checkout}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							paid_memberships_pro: {
								...options.paid_memberships_pro,
								redirect_after_checkout: newVal,
							},
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			///////////////////
			<div className="text-2xl font-bold mb-2">
				{__("Ultimate Member", "user-verification")}
			</div>
			<p className="text-base mb-7">
				{__("Customize options for Ultimate Member.", "user-verification")}
			</p>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Disable auto login", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.ultimate_member?.disable_auto_login}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							ultimate_member: {
								...options.ultimate_member,
								disable_auto_login: newVal,
							},
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__(
						"Display Message after successfully registration",
						"user-verification"
					)}
				</label>
				<PGinputText
					value={options?.ultimate_member?.message_before_header}
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					onChange={(newVal) => {
						var optionsX = {
							...options,
							ultimate_member: {
								...options.ultimate_member,
								message_before_header: newVal.target.value,
							},
						};
						setoptions(optionsX);
					}}
				/>
			</div>
			/////////////////////
			<div className="text-2xl font-bold mb-2">
				{__("WooCommerce", "user-verification")}
			</div>
			<p className="text-base mb-7">
				{__("Customize options for WooCommerce.", "user-verification")}
			</p>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Redirect after registration", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.woocommerce?.redirect_after_registration}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							woocommerce: {
								...options.woocommerce,
								redirect_after_registration: newVal,
							},
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Disable auto login on registration", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.woocommerce?.disable_auto_login}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							woocommerce: {
								...options.woocommerce,
								disable_auto_login: newVal,
							},
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Disable auto login on checkout", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.woocommerce?.disable_auto_login_checkout}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							woocommerce: {
								...options.woocommerce,
								disable_auto_login_checkout: newVal,
							},
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Redirect after payment", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.woocommerce?.redirect_after_payment}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							woocommerce: {
								...options.woocommerce,
								redirect_after_payment: newVal,
							},
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__(
						"Display Message after successfully registration'",
						"user-verification"
					)}
				</label>
				<textarea
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.woocommerce?.message_after_registration}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							woocommerce: {
								...options.woocommerce,
								message_after_registration: newVal,
							},
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			///////////////////
			<div className="text-2xl font-bold mb-2">
				{__("WP User Manager", "user-verification")}
			</div>
			<p className="text-base mb-7">
				{__("Customize options for WP User Manager.", "user-verification")}
			</p>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Disable auto login", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.wp_user_manager?.disable_auto_login}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							wp_user_manager: {
								...options.wp_user_manager,
								disable_auto_login: newVal,
							},
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__(
						"Display Message after successfully registration",
						"user-verification"
					)}
				</label>
				<PGinputText
					value={options?.wp_user_manager?.message_before_header}
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					onChange={(newVal) => {
						var optionsX = {
							...options,
							wp_user_manager: {
								...options.wp_user_manager,
								message_before_header: newVal.target.value,
							},
						};
						setoptions(optionsX);
					}}
				/>
			</div>
		</div>
	);
}

class ThirdParty extends Component {
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
export default ThirdParty;
