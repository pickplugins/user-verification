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

	const handleAddItem = (property) => {
		setoptions((prev) => ({
			...prev,
			[property]: [...(prev[property] || []), ""],
		}));
	};

	const handleUpdateItem = (property, index, newVal) => {
		const updatedItems = [...(options[property] || [])];
		updatedItems[index] = newVal;
		setoptions((prev) => ({
			...prev,
			[property]: updatedItems,
		}));
	};

	const handleRemoveItem = (property, index) => {
		const updatedItems = (options[property] || []).filter(
			(_, i) => i !== index
		);
		setoptions((prev) => ({
			...prev,
			[property]: updatedItems,
		}));
	};
	return (
		<div className="w-[800px]">
			<div className="text-2xl font-bold mb-2">
				{__("Email verification", "user-verification")}
			</div>
			<p className="text-base mb-7">
				{__("Customize options for email verification.", "user-verification")}
			</p>
			<div className="flex my-7 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Enable domain block", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.enable_domain_block}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = { ...options, enable_domain_block: newVal };
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex my-7 items-start ">
				<label className="w-[400px]" htmlFor="">
					{__("Blocked domains", "user-verification")}
				</label>
				<div className="min-w-[400px] space-y-4">
					<button
						className=" no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white "
						onClick={() => {
							handleAddItem("blocked_domain");
						}}>
						ADD
					</button>
					{options?.blocked_domain.map((domain, i) => (
						<div key={i} className="flex items-center gap-4">
							<PGinputText
								value={domain}
								placeholder="domain.com"
								className="!py-1 px-2 flex-1 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
								onChange={(e) =>
									handleUpdateItem("blocked_domain", i, e.target.value)
								}
							/>
							<button
								className="bg-red-500 text-white px-2 py-1 rounded"
								onClick={() => handleRemoveItem("blocked_domain", i)}>
								x
							</button>
						</div>
					))}
				</div>
			</div>
			<div className="flex my-7 items-start ">
				<label className="w-[400px]" htmlFor="">
					{__("Allowed domains", "user-verification")}
				</label>
				<div className="min-w-[400px] space-y-4">
					<button
						className=" no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white "
						onClick={() => {
							handleAddItem("allowed_domain");
						}}>
						ADD
					</button>
					{options?.allowed_domain.map((domain, i) => (
						<div key={i} className="flex items-center gap-4">
							<PGinputText
								value={domain}
								placeholder="domain.com"
								className="!py-1 px-2 flex-1 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
								onChange={(e) =>
									handleUpdateItem("allowed_domain", i, e.target.value)
								}
							/>
							<button
								className="bg-red-500 text-white px-2 py-1 rounded"
								onClick={() => handleRemoveItem("allowed_domain", i)}>
								x
							</button>
						</div>
					))}
				</div>
			</div>
			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Enable username block", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.enable_username_block}
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = { ...options, enable_username_block: newVal };
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex my-7 items-start ">
				<label className="w-[400px]" htmlFor="">
					{__("Blocked username", "user-verification")}
				</label>
				<div className="min-w-[400px] space-y-4">
					<button
						className=" no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white "
						onClick={() => {
							handleAddItem("blocked_username");
						}}>
						ADD
					</button>

					{options?.blocked_username.map((domain, i) => {
						console.log(domain);
						return (
							<div key={i} className="flex items-center gap-4">
								<PGinputText
									value={domain}
									placeholder="username"
									className="!py-1 px-2 flex-1 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
									onChange={(e) =>
										handleUpdateItem("blocked_username", i, e.target.value)
									}
								/>
								<button
									className="bg-red-500 text-white px-2 py-1 rounded"
									onClick={() => handleRemoveItem("blocked_username", i)}>
									x
								</button>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex items-center gap-4">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Enable generic mail block", "user-verification")}
				</label>
				<PGinputSelect
					val={options?.generic_mail_block}
					inputClass="!py-1 px-2 border-2 border-solid"
					options={[
						{ label: "Yes", value: "yes" },
						{ label: "No", value: "no" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							generic_mail_block: newVal,
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="flex my-7 items-start ">
				<label className="w-[400px]" htmlFor="">
					{__("Blocked generic mail", "user-verification")}
				</label>
				<div className="min-w-[400px] space-y-4">
					<button
						className=" no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white "
						onClick={() => {
							handleAddItem("blocked_generic_mail");
						}}>
						ADD
					</button>

					{options?.blocked_generic_mail.map((domain, i) => {
						return (
							<div key={i} className="flex items-center gap-4">
								<PGinputText
									value={domain}
									placeholder="admin@"
									className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
									onChange={(e) =>
										handleUpdateItem("blocked_generic_mail", i, e.target.value)
									}
								/>
								<button
									className="bg-red-500 text-white px-2 py-1 rounded"
									onClick={() => handleRemoveItem("blocked_generic_mail", i)}>
									x
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

class SpamProtection extends Component {
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
export default SpamProtection;
