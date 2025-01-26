import { useEffect, useState } from "@wordpress/element";
import { Icon, close } from "@wordpress/icons";
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



	const handleAddItem = (property) => {
		setoptions((prev) => ({
			...prev,
			[property]: [...(prev[property] || []), ""],
		}));
	};




	return (
		<div className="w-[800px]">



			<div className="text-2xl font-bold mb-2">
				{__("Spam Protection", "user-verification")}
			</div>
			<p className="text-base mb-7">
				{__("Customize options for spam protection.", "user-verification")}
			</p>
			<div className="flex my-7 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Enable domain block", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.enable_domain_block}
					options={[
						{ label: "No", value: "no" },
						{ label: "Yes", value: "yes" },
					]}
					onChange={(newVal) => {
						var optionsX = { ...options, enable_domain_block: newVal };
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			{options?.enable_domain_block === "yes" && (
				<>
					<div className="flex my-7 items-start ">
						<label className="w-[400px]" htmlFor="">
							{__("Blocked domains", "user-verification")}
						</label>




						<div className="min-w-[400px] space-y-4">
							<textarea
								className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px] min-h-32"
								value={typeof options?.blocked_domain == 'object' ? options?.blocked_domain.join("\n") : options?.blocked_domain}
								onChange={(newVal) => {
									var optionsX = { ...options, blocked_domain: newVal.target.value };
									setoptions(optionsX);
								}}
							/>

							<div className="text-sm !mt-0">Each domain per line</div>

							{/* <button
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
										onChange={(e) => {


											var optionsX = { ...options };

											var blockedDomainX = optionsX.blocked_domain;
											blockedDomainX[i] = e.target.value;
											var optionsX = { ...options, blocked_domain: blockedDomainX };
											setoptions(optionsX);


										}

										}
									/>
									<div
										className="bg-red-500 text-white px-2 py-1 rounded-sm cursor-pointer"
										onClick={() => {

											var optionsX = { ...options };

											var blockedDomainX = optionsX.blocked_domain;
											blockedDomainX.splice(i, 1)
											var optionsX = { ...options, blocked_domain: blockedDomainX };
											setoptions(optionsX);

										}}>
										<Icon fill="#fff" icon={close} />
									</div>
								</div>
							))} */}
						</div>
					</div>
					<div className="flex my-7 items-start ">
						<label className="w-[400px]" htmlFor="">
							{__("Allowed domains", "user-verification")}
						</label>
						<div className="min-w-[400px] space-y-4">
							<textarea
								className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px] min-h-32"
								value={typeof options?.allowed_domain == 'object' ? options?.allowed_domain.join("\n") : options?.allowed_domain}
								onChange={(newVal) => {
									var optionsX = { ...options, allowed_domain: newVal.target.value };
									setoptions(optionsX);
								}}
							/>
							<div className="text-sm !mt-0">Each domain per line</div>


							{/* <button
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
										onChange={(e) => {


											var optionsX = { ...options };

											var allowedDomainX = optionsX.allowed_domain;
											allowedDomainX[i] = e.target.value;
											var optionsX = { ...options, allowed_domain: allowedDomainX };
											setoptions(optionsX);

										}

										}
									/>
									<div
										className="bg-red-500 text-white px-2 py-1 rounded-sm cursor-pointer"
										onClick={() => {
											var optionsX = { ...options };

											var allowedDomainX = optionsX.allowed_domain;
											allowedDomainX.splice(i, 1)
											var optionsX = { ...options, allowed_domain: allowedDomainX };
											setoptions(optionsX);

										}}>
										<Icon fill="#fff" icon={close} />
									</div>
								</div>
							))} */}
						</div>
					</div>
				</>
			)}


			<div className="flex  my-5  justify-between items-center">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Enable username block", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.enable_username_block}
					options={[

						{ label: "No", value: "no" },
						{ label: "Yes", value: "yes" },
					]}
					onChange={(newVal) => {
						var optionsX = { ...options, enable_username_block: newVal };
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			{options?.enable_username_block == "yes" && (
				<div className="flex my-7 items-start ">
					<label className="w-[400px]" htmlFor="">
						{__("Blocked username", "user-verification")}
					</label>
					<div className="min-w-[400px] space-y-4">

						<textarea
							className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px] min-h-32"
							value={typeof options?.blocked_username == 'object' ? options?.blocked_username.join("\n") : options?.blocked_username}
							onChange={(newVal) => {
								var optionsX = { ...options, blocked_username: newVal.target.value };
								setoptions(optionsX);
							}}
						/>
						<div className="text-sm !mt-0">Each username per line</div>


						{/* <button
							className=" no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white "
							onClick={() => {
								handleAddItem("blocked_username");
							}}>
							ADD
						</button>

						{options?.blocked_username.map((domain, i) => {
							// console.log(domain);
							return (
								<div key={i} className="flex items-center gap-4">
									<PGinputText
										value={domain}
										placeholder="username"
										className="!py-1 px-2 flex-1 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(e) => {
											//handleUpdateItem("blocked_username", i, e.target.value)
											var optionsX = { ...options };

											var blockedUsernameX = optionsX.blocked_username;
											blockedUsernameX[i] = e.target.value;
											var optionsX = { ...options, blocked_username: blockedUsernameX };
											setoptions(optionsX);

										}
										}
									/>
									<div
										className="bg-red-500 text-white px-2 py-1 rounded-sm cursor-pointer"
										onClick={() => {
											var optionsX = { ...options };

											var blockedUsernameX = optionsX.blocked_username;
											blockedUsernameX.splice(i, 1)
											var optionsX = { ...options, blocked_username: blockedUsernameX };
											setoptions(optionsX);
										}}>
										<Icon fill="#fff" icon={close} />
									</div>
								</div>
							);
						})} */}
					</div>
				</div>
			)}
			<div className="flex items-center gap-4">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Enable generic mail block", "user-verification")}
				</label>
				<PGinputSelect
					val={options?.generic_mail_block}
					inputClass="!py-1 px-2 border-2 border-solid"
					options={[
						{ label: "No", value: "no" },
						{ label: "Yes", value: "yes" },
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
			{options?.generic_mail_block === "yes" && (
				<div className="flex my-7 items-start ">
					<label className="w-[400px]" htmlFor="">
						{__("Blocked generic mail", "user-verification")}
					</label>
					<div className="min-w-[400px] space-y-4">

						<textarea
							className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px] min-h-32"
							value={typeof options?.blocked_generic_mail == 'object' ? options?.blocked_generic_mail.join("\n") : options?.blocked_generic_mail}
							onChange={(newVal) => {
								var optionsX = { ...options, blocked_generic_mail: newVal.target.value };
								setoptions(optionsX);
							}}
						/>
						<div className="text-sm !mt-0">Each item per line</div>

						{/* <button
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
										onChange={(e) => {
											var optionsX = { ...options };

											var blockedGenericMailX = optionsX.blocked_generic_mail;
											blockedGenericMailX[i] = e.target.value;
											var optionsX = { ...options, blocked_generic_mail: blockedGenericMailX };
											setoptions(optionsX);
										}








										}
									/>
									<div
										className="bg-red-500 text-white px-2 py-1 rounded-sm cursor-pointer"
										onClick={() => {

											var optionsX = { ...options };

											var blockedGenericMailX = optionsX.blocked_generic_mail;
											blockedGenericMailX.splice(i, 1)
											var optionsX = { ...options, blocked_generic_mail: blockedGenericMailX };
											setoptions(optionsX);
										}}>
										<Icon fill="#fff" icon={close} />
									</div>
								</div>
							);
						})} */}
					</div>
				</div>
			)}
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
