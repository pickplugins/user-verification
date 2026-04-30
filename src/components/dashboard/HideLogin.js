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
				{__("Hide Login", "user-verification")}
			</div>
			<p className="text-base mb-7">
				{__("Customize options for Hide Login.", "user-verification")}
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



			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="">
					{__("Custom Login Slug", "user-verification")}
				</label>
				<PGinputText
					value={options?.slug ?? "xyz-login"}
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					onChange={(newVal) => {
						var optionsX = { ...options, slug: newVal.target.value };
						setoptions(optionsX);
					}}
				/>
			</div>



			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Redirect if access to wp-login.php", "user-verification")}
				</label>
				<PGinputSelect
					val={options?.redirect}
					inputClass="!py-1 px-2 border-2 border-solid"
					options={pageList}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							redirect: newVal,
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
		</div>
	);
}

class HideLogin extends Component {
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
export default HideLogin;
