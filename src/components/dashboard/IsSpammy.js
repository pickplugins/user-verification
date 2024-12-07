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

	const toggleCheckbox = (value) => {
		const updatedSource = options.character_source.includes(value)
			? options.character_source.filter((item) => item !== value) // Remove if already selected
			: [...options.character_source, value]; // Add if not selected

		setoptions({ ...options, character_source: updatedSource });
	};
	return (
		<div className="w-[800px]">
			<div className="text-2xl font-bold mb-2">
				{__("isspammy.com Integration", "user-verification")}
			</div>
			<p className="text-base mb-7">
				{__("Enable integration with", "user-verification")}{" "}
				<a href="http://isspammy.com/"></a>
			</p>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Report spam comments email", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.report_comment_spam}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = { ...options, report_comment_spam: newVal };
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Report trash comments email", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.report_comment_trash}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = { ...options, report_comment_trash: newVal };
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Block spammer comments", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.block_comment}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = { ...options, block_comment: newVal };
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Display notice under comment form", "user-verification")}
				</label>
				<PGinputSelect
					val={options?.comment_form_notice}
					inputClass="!py-1 px-2 border-2 border-solid"
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							comment_form_notice: newVal,
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Custom notice text", "user-verification")}
				</label>
				<PGinputText
					value={options?.comment_form_notice_text}
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
					onChange={(newVal) => {
						var optionsX = {
							...options,
							comment_form_notice_text: newVal.target.value,
						};
						setoptions(optionsX);
					}}
				/>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Block user registration", "user-verification")}
				</label>
				<PGinputSelect
					val={options?.block_register}
					inputClass="!py-1 px-2 border-2 border-solid"
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							block_register: newVal,
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Block user login", "user-verification")}
				</label>
				<PGinputSelect
					val={options?.block_login}
					inputClass="!py-1 px-2 border-2 border-solid"
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							block_login: newVal,
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
		</div>
	);
}

class IsSpammy extends Component {
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
export default IsSpammy;
