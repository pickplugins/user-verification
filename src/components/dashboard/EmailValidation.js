import { useEffect, useState } from "@wordpress/element";
import { Icon, settings, check, cancelCircleFilled, published, close } from "@wordpress/icons";
const { Component } = wp.element;
import { Spinner } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";

import { __ } from "@wordpress/i18n";
import React from "react";
import Select from "react-select";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;
	var roles = props.roles;

	// console.log(roles);


	var [options, setoptions] = useState(props.options); // Using the hook.
	var [checkEmail, setcheckEmail] = useState({ email: "public@0wnd.net", prams: {}, result: null, loading: false }); // Using the hook.

	useEffect(() => {
		onChange(options);
	}, [options]);

	const toggleCheckbox = (value) => {
		const updatedSource = options.validedPrams.includes(value)
			? options.validedPrams.filter((item) => item !== value) // Remove if already selected
			: [...options.validedPrams, value]; // Add if not selected

		setoptions({ ...options, validedPrams: updatedSource });
	};



	var validationPrams = {


		status: {
			"label": "Status",
			"value": "status"
		},

		safeToSend: {
			"label": "Safe To Send",
			"value": "safeToSend"
		},
		isFreeEmailProvider: {
			"label": "Free Email Provider",
			"value": "isFreeEmailProvider"
		},
		isInboxFull: {
			"label": "Inbox Full",
			"value": "isInboxFull"
		},
		isGibberishEmail: {
			"label": "Gibberish Email",
			"value": "isGibberishEmail"
		},
		isSMTPBlacklisted: {
			"label": "SMTP Blacklisted",
			"value": "isSMTPBlacklisted"
		},
		isDisposableDomain: {
			"label": "Disposable Domain",
			"value": "isDisposableDomain"
		},


		isCatchAllDomain: {
			"label": "Catch All Domain",
			"value": "isCatchAllDomain"
		},
		isSyntaxValid: {
			"label": "Syntax Valid",
			"value": "isSyntaxValid"
		},
		isValidEmail: {
			"label": "Valid Email",
			"value": "isValidEmail"
		},
		hasValidDomain: {
			"label": "Has Valid Domain",
			"value": "hasValidDomain"
		},
		isRoleBasedEmail: {
			"label": "Role Based Email",
			"value": "isRoleBasedEmail"
		},
		verifySMTP: {
			"label": "Verify SMTP",
			"value": "verifySMTP"
		},
		checkDomainReputation: {
			"label": "Domain Reputation",
			"value": "checkDomainReputation"
		},
	}


	function checkMail() {


		if (options.isSpammyApiKey.length == 0) {

			setcheckEmail({ ...checkEmail, error: true, errorMgs: "API key missing." })
			return;
		}



		setcheckEmail({ ...checkEmail, loading: true, error: false, errorMgs: "" })

		var postData = {
			email: checkEmail.email,
			apikey: options.isSpammyApiKey,
		};
		postData = JSON.stringify(postData);

		console.log(postData);

		fetch(
			"https://isspammy.com/wp-json/email-validation/v2/validate_email",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: postData,
			}
		)
			.then((response) => {
				if (response.ok && response.status < 400) {
					response.json().then((data) => {
						setcheckEmail({ ...checkEmail, result: data, loading: false })
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

		console.log(options.isSpammyApiKey);



	}



	function validateEmail() {
		const token = options.isSpammyApiKey;

		// if (!token) {
		// 	throw new Error("No token found");
		// }

		if (options.isSpammyApiKey.length == 0) {

			setcheckEmail({ ...checkEmail, error: true, errorMgs: "API key missing." })
			return;
		}

		setcheckEmail({ ...checkEmail, loading: true, error: false, errorMgs: "" })


		var postData = {
			email: checkEmail.email,
			apiKey: options.isSpammyApiKey,
		};
		postData = JSON.stringify(postData);

		fetch("https://isspammy.com/wp-json/email-validation/v2/validate_email", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {

						//var result = JSON.parse(res);
						//setvalidateMailPrams({ ...validateMailPrams, result: res })


						setcheckEmail({ ...checkEmail, result: res, loading: false })


						setTimeout(() => {
						}, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}




	return (
		<div className="w-[800px]">


			<div className="text-2xl font-bold mb-2">
				{__("Email Validation By IsSpammy", "user-verification")}
			</div>
			<PGtabs
				activeTab="settings"
				orientation="horizontal"
				contentClass=" p-5 bg-white w-full"
				navItemsWrapClass="flex "
				navItemClass="bg-gray-200 flex px-5 py-3 gap-2 border-0 border-b border-solid border-gray-500 "
				navItemSelectedClass="bg-gray-400 "
				activeClass="active-tab"
				onSelect={(tabName) => { }}
				tabs={[

					{
						name: "singleValidation",
						title: "Single Validation",
						icon: settings,
						className: "tab-singleValidation",
						hidden: false,
						isPro: false,
					},
					{
						name: "settings",
						title: "Settings",
						icon: settings,
						className: "tab-settings",
						hidden: false,
						isPro: false,
					},
					// {
					// 	name: "getApiKey",
					// 	title: "Get Api Key",
					// 	icon: settings,
					// 	className: "tab-getApiKey",
					// 	hidden: false,
					// 	isPro: false,
					// },
				]}>
				<PGtab name="settings">

					<div className="flex  my-5  justify-between items-center">
						<label className="w-[400px]" htmlFor="emailVerification">
							{__("IsSpammy API Key", "user-verification")}
						</label>
						<PGinputText
							value={options?.isSpammyApiKey}
							className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
							onChange={(newVal) => {
								var optionsX = {
									...options,
									isSpammyApiKey: newVal.target.value,
								};
								setoptions(optionsX);

								//setcheckEmail({ ...checkEmail, email: newVal.target.value })
							}}
						/>
					</div>



					<div className="flex  my-5 items-center ">
						<label className="w-[400px]" htmlFor="emailVerification">

						</label>

						<a href="https://app.isspammy.com/?utm_source=wpplugin&utm_medium=TabEmailValidation&utm_campaign=EmailValidation&utm_id=getAPIkey" target="_blank" className=" no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white ">Get API Key</a>

						<span className="ml-4 text-base">Its Free! Daily upto 50 validation.</span>

					</div>





					<div className="flex my-5 justify-between items-center ">
						<label className="w-[400px]" htmlFor="emailVerification">
							{__("Valided Emails On Register", "user-verification")}
						</label>
						<PGinputSelect
							inputClass="!py-1 px-2  border-2 border-solid"
							val={options?.validedOnRegister}
							options={[
								{ label: "No", value: "no" },
								{ label: "Yes", value: "yes" },
							]}
							onChange={(newVal) => {
								var optionsX = { ...options, validedOnRegister: newVal };
								setoptions(optionsX);
							}}
							multiple={false}
						/>
					</div>
					{/* <div className="flex my-5 justify-between items-center ">
						<label className="w-[400px]" htmlFor="emailVerification">
							{__("Valided Emails On Login", "user-verification")}
						</label>
						<PGinputSelect
							inputClass="!py-1 px-2  border-2 border-solid"
							val={options?.validedOnLogin}
							options={[
								{ label: "No", value: "no" },
								{ label: "Yes", value: "yes" },
							]}
							onChange={(newVal) => {
								var optionsX = { ...options, validedOnLogin: newVal };
								setoptions(optionsX);
							}}
							multiple={false}
						/>
					</div>
					<div className="flex my-5 justify-between items-center ">
						<label className="w-[400px]" htmlFor="emailVerification">
							{__("Valided Emails On Post Comment", "user-verification")}
						</label>
						<PGinputSelect
							inputClass="!py-1 px-2  border-2 border-solid"
							val={options?.validedOnComment}
							options={[
								{ label: "No", value: "no" },
								{ label: "Yes", value: "yes" },
							]}
							onChange={(newVal) => {
								var optionsX = { ...options, validedOnComment: newVal };
								setoptions(optionsX);
							}}
							multiple={false}
						/>
					</div>



					<div className="flex my-5 justify-between items-center ">
						<label className="w-[400px]" htmlFor="emailVerification">
							{__("Valided Existing User Emails", "user-verification")}
						</label>
						<PGinputSelect
							inputClass="!py-1 px-2  border-2 border-solid"
							val={options?.validedExistingUser}
							options={[
								{ label: "No", value: "no" },
								{ label: "Yes", value: "yes" },
							]}
							onChange={(newVal) => {
								var optionsX = { ...options, validedExistingUser: newVal };
								setoptions(optionsX);
							}}
							multiple={false}
						/>
					</div> */}

					{options?.validedExistingUser == 'yes' && (
						<>


							<div className="flex items-center mb-5">
								<label className="w-[400px]" htmlFor="emailVerification">
									{__("User Roles", "user-verification")}
								</label>
								<div className="flex flex-1 items-center gap-2">
									<Select
										className="flex-1"
										value={options?.queryPrams?.roles?.map(
											(role) =>
												roles.find((option) => option.value === role) // Match role with options
										)}
										options={roles}
										isMulti
										closeMenuOnSelect={false}
										onChange={(newVal) => {
											const selectedValues = newVal.map((option) => option.value);

											var optionsX = { ...options };

											var queryPrams = optionsX.queryPrams
											queryPrams = { ...queryPrams, roles: selectedValues };


											var optionsX = { ...options, queryPrams: queryPrams };



											setoptions(optionsX);

										}}
										multiple={false}
									/>
								</div>
							</div>


						</>
					)}




				</PGtab>

				<PGtab name="singleValidation">


					<div className="flex  my-5 gap-2  items-center">

						<PGinputText
							placeholder="yourmail@domain.com"
							type="email"
							value={checkEmail?.email}
							className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
							onChange={(newVal) => {


								setcheckEmail({ ...checkEmail, email: newVal.target.value })

							}}
						/>

						<div className=" no-underline px-4 py-3 cursor-pointer rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white " onClick={ev => {
							// console.log("Helo")
							validateEmail();
						}}>Validate Email</div>
					</div>


					{checkEmail.error && (
						<div className="text-red-500">{checkEmail.errorMgs}</div>
					)}


					<div className="my-5">

						{checkEmail.loading && (
							<div className="flex items-center"><Spinner /> Loading...</div>
						)}
						{checkEmail?.result?.errors && (
							<div className="text-red-500">{checkEmail.result.errors}</div>
						)}


						{checkEmail.result != null && (

							<>
								<table className="table-fixed border-collapse">

									{Object.entries(checkEmail.result).map(args => {
										var id = args[0]
										var value = args[1]

										// console.log(args);

										return (
											<>
												{validationPrams[id] != undefined && (
													<>
														<tr className=" ">
															<td className="w-[250px] py-4 border-0 border-b border-solid border-gray-400">{validationPrams[id]?.label}</td>
															<td className="w-[250px] py-4  border-0 border-b border-solid border-gray-400">

																<div className="flex items-center">



																	{id == "status" && (
																		<>
																			{JSON.stringify(value)}

																		</>
																	)}
																	{id == "safeToSend" && (
																		<>
																			{value != 'yes' && (
																				<><Icon fill="#f00" icon={close} /> No</>
																			)}
																			{value == 'yes' && (
																				<><Icon fill="#19561f" icon={check} /> Yes</>
																			)}
																		</>
																	)}



																	{id == "isGibberishEmail" && (
																		<>
																			{!value && (
																				<><Icon fill="#f00" icon={close} /> No</>
																			)}
																			{value && (
																				<><Icon fill="#19561f" icon={check} /> Yes</>
																			)}
																		</>
																	)}
																	{id == "isSMTPBlacklisted" && (
																		<>
																			{!value && (
																				<><Icon fill="#f00" icon={close} /> No</>
																			)}
																			{value && (
																				<><Icon fill="#19561f" icon={check} /> Yes</>
																			)}
																		</>
																	)}



																	{(
																		id == "isSyntaxValid" ||
																		id == "hasValidDomain" ||
																		id == "isDisposableDomain" ||
																		id == "isFreeEmailProvider" ||
																		id == "checkDomainReputation" ||
																		id == "isRoleBasedEmail" ||
																		id == "isCatchAllDomain" ||
																		id == "verifySMTP" ||
																		id == "isInboxFull" ||
																		id == "isValidEmail"
																	)
																		&& (
																			<>
																				{value && (
																					<><Icon fill="#19561f" icon={check} /> Yes</>
																				)}
																				{!value && (
																					<><Icon fill="#f00" icon={close} /> No</>
																				)}
																			</>
																		)}

																</div>




															</td>
														</tr>
													</>
												)}

											</>
										)

									})}


								</table>
							</>

						)}

					</div>

				</PGtab>
				<PGtab name="getApiKey">






				</PGtab>


			</PGtabs>


















		</div>
	);
}

class EmailValidation extends Component {
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
		var { onChange, options, roles } = this.props;
		return (
			<Html
				onChange={onChange}
				options={options}
				roles={roles}
				warn={this.state.showWarning}
			/>
		);
	}
}
export default EmailValidation;
