import { useEffect, useState } from "@wordpress/element";
const { Component } = wp.element;

import { MediaUpload } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { Icon, brush, columns, chevronDown, chevronUp, check, close } from "@wordpress/icons";

import React from "react";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";
import PGinputTextarea from "../input-textarea";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;

	var [options, setoptions] = useState(props.options); // Using the hook.
	var [registration, setregistration] = useState(false);
	var [verification, setverification] = useState(false);
	var [activation, setactivation] = useState(false);
	var [otp, setotp] = useState(false);
	var [magicLogin, setmagicLogin] = useState(false);

	function generate3Digit() {
		return Math.floor(100 + Math.random() * 900);
	}
	console.log(options)
	function escapeHTML(str) {
		const map = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#039;",
		};
		return str.replace(/[&<>"']/g, function (match) {
			return map[match];
		});
	}
	function unescapeHTML(str) {
		const map = {
			"&amp;": "&",
			"&lt;": "<",
			"&gt;": ">",
			"&quot;": '"',
			"&#039;": "'",
		};
		return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (match) {
			return map[match];
		});
	}
	useEffect(() => {
		onChange(options);
	}, [options]);
	const imageUrl = useSelect(
		(select) => {
			if (!options?.logo_id) return null;
			const media = select("core").getMedia(options?.logo_id);
			return media?.source_url || null;
		},
		[options?.logo_id]
	);
	const ALLOWED_MEDIA_TYPES = ["image"];
	return (
		<div className="w-[800px]">
			<div className="text-2xl font-bold mb-2">
				{__("Email settings", "user-verification")}
			</div>
			<p className="text-base mb-7">
				{__("Customize email settings.", "user-verification")}{" "}
			</p>

			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Email logo", "user-verification")}
				</label>
				<MediaUpload
					onSelect={(media) => {
						var optionsX = {
							...options,
							logo_id: media.id,
						};
						setoptions(optionsX);
					}}
					onClose={() => { }}
					allowedTypes={ALLOWED_MEDIA_TYPES}
					value={options?.logo_id}
					render={({ open }) => {
						return (
							<div className="flex flex-col items-center gap-2">
								{imageUrl && (
									<img
										src={imageUrl}
										alt=""
										className="cursor-pointer rounded-md max-w-[160px] max-h-[160px] object-contain border border-solid border-gray-300 p-1"
										onClick={() => {
											open();
										}}
									/>
								)}
								<div className="flex items-center gap-2">
									<button
										onClick={open}
										className="no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white">
										Open Media Library
									</button>
									<button
										onClick={() => {
											var optionsX = {
												...options,
												logo_id: "",
											};
											setoptions(optionsX);
										}}
										className="no-underline size-[38px] flex items-center justify-center text-[30px] rounded-sm !border !bg-transparent !border-solid !border-gray-700 hover:!border-red-700 text-gray-700   hover:text-red-700"
										title="Clear Logo">
										&times;
									</button>
								</div>
							</div>
						);
					}}></MediaUpload>
			</div>
			<div className="flex my-5 justify-between items-center ">
				<label className="w-[400px]" htmlFor="emailVerification">
					{__("Enable WPAutoP for emails", "user-verification")}
				</label>
				<PGinputSelect
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.mail_wpautop}
					options={[
						{ label: "No", value: "no" },
						{ label: "Yes", value: "yes" },
					]}
					onChange={(newVal) => {
						var optionsX = {
							...options,
							mail_wpautop: newVal,
						};
						setoptions(optionsX);
					}}
					multiple={false}
				/>
			</div>
			<div className="my-5">
				<div className="my-1">
					<div
						className="p-4 cursor-pointer bg-gray-400 hover:bg-gray-500 flex items-center  gap-2"
						onClick={() => {
							setregistration(!registration);
						}}>
						{registration ? (
							<Icon icon={chevronUp} />
						) : (
							<Icon icon={chevronDown} />
						)}

						<span>
							{options?.email_templates_data?.user_registered?.enable ==
								"yes" && <Icon icon={check} />}
							{options?.email_templates_data?.user_registered?.enable ==
								"no" && <Icon icon={close} size="20" />}
						</span>
						<span>{__("New User Registration", "user-verification")}</span>
					</div>
					<div className={`${registration ? "block" : "hidden"} p-[10px]`}>
						<div className="flex  my-5  justify-between items-center">
							<label className="w-[400px]" htmlFor="emailVerification">
								{__("Enable?", "user-verification")}
							</label>
							<PGinputSelect
								inputClass="!py-1 px-2  border-2 border-solid"
								val={options?.email_templates_data?.user_registered?.enable}
								options={[
									{ label: "No", value: "no" },
									{ label: "Yes", value: "yes" },
								]}
								onChange={(newVal) => {
									var optionsX = {
										...options,
										email_templates_data: {
											...options.email_templates_data,
											user_registered: {
												...options.email_templates_data.user_registered,
												enable: newVal,
											},
										},
									};
									setoptions(optionsX);
								}}
								multiple={false}
							/>
						</div>

						{options?.email_templates_data?.user_registered?.enable ===
							"yes" && (
								<>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email Bcc", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.user_registered?.email_bcc
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														user_registered: {
															...options.email_templates_data.user_registered,
															email_bcc: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email from name", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.user_registered
													?.email_from_name
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														user_registered: {
															...options.email_templates_data.user_registered,
															email_from_name: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email from", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.user_registered?.email_from
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														user_registered: {
															...options.email_templates_data.user_registered,
															email_from: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Reply to name", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.user_registered
													?.reply_to_name
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														user_registered: {
															...options.email_templates_data.user_registered,
															reply_to_name: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Reply to", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.user_registered?.reply_to
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														user_registered: {
															...options.email_templates_data.user_registered,
															reply_to: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email subject", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.user_registered?.subject
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														user_registered: {
															...options.email_templates_data.user_registered,
															subject: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex flex-col  my-5 gap-4 ">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email body", "user-verification")}
										</label>

										<PGinputTextarea
											id={`user_registered-${generate3Digit()}`}
											value={options?.email_templates_data?.user_registered?.html}
											className="!py-1 h-[300px] px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
											onChange={(newVal) => {
												console.log(newVal);
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														user_registered: {
															...options.email_templates_data.user_registered,
															html: newVal,
														},
													},
												};
												console.log(optionsX);
												setoptions(optionsX);
											}}
										/>

									</div>
								</>
							)}

						<div>
							<label htmlFor="">Parameter</label>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_name}`}</code>
								</pre>{" "}
								{`=>`} Website title
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_description}`}</code>
								</pre>{" "}
								{`=>`} Website tagline
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_url}`}</code>
								</pre>{" "}
								{`=>`} Website URL
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_logo_url}`}</code>
								</pre>{" "}
								{`=>`} Website logo URL
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_name}`}</code>
								</pre>{" "}
								{`=>`} Username
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_display_name}`}</code>
								</pre>{" "}
								{`=>`} User display name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{first_name}`}</code>
								</pre>{" "}
								{`=>`} User first name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{last_name}`}</code>
								</pre>{" "}
								{`=>`} User last name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_avatar}`}</code>
								</pre>{" "}
								{`=>`} User avatar
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_email}`}</code>
								</pre>{" "}
								{`=>`} User email address
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{ac_activaton_url}`}</code>
								</pre>{" "}
								{`=>`} Account activation URL
							</div>
							Available parameter for this email template
						</div>
					</div>
				</div>
				<div className="my-1">
					<div
						className="p-4 cursor-pointer bg-gray-400 hover:bg-gray-500 flex items-center  gap-2"
						onClick={() => {
							setverification(!verification);
						}}>
						{verification ? (
							<Icon icon={chevronUp} />
						) : (
							<Icon icon={chevronDown} />
						)}

						<span>
							{options?.email_templates_data?.email_confirmed?.enable ==
								"yes" && <Icon icon={check} />}
							{options?.email_templates_data?.email_confirmed?.enable ==
								"no" && <Icon icon={close} size="20" />}
						</span>

						<span>
							{__("Email Verification Confirmed", "user-verification")}
						</span>
					</div>
					<div className={`${verification ? "block" : "hidden"} p-[10px]`}>
						<div className="flex  my-5  justify-between items-center">
							<label className="w-[400px]" htmlFor="emailVerification">
								{__("Enable?", "user-verification")}
							</label>
							<PGinputSelect
								inputClass="!py-1 px-2  border-2 border-solid"
								val={options?.email_templates_data?.email_confirmed?.enable}
								options={[
									{ label: "No", value: "no" },
									{ label: "Yes", value: "yes" },
								]}
								onChange={(newVal) => {
									var optionsX = {
										...options,
										email_templates_data: {
											...options.email_templates_data,
											email_confirmed: {
												...options.email_templates_data.email_confirmed,
												enable: newVal,
											},
										},
									};
									setoptions(optionsX);
								}}
								multiple={false}
							/>
						</div>
						{options?.email_templates_data?.email_confirmed?.enable ===
							"yes" && (
								<>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email Bcc", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.email_confirmed?.email_bcc
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														email_confirmed: {
															...options.email_templates_data.email_confirmed,
															email_bcc: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email from name", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.email_confirmed
													?.email_from_name
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														email_confirmed: {
															...options.email_templates_data.email_confirmed,
															email_from_name: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email from", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.email_confirmed?.email_from
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														email_confirmed: {
															...options.email_templates_data.email_confirmed,
															email_from: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Reply to name", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.email_confirmed
													?.reply_to_name
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														email_confirmed: {
															...options.email_templates_data.email_confirmed,
															reply_to_name: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Reply to", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.email_confirmed?.reply_to
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														email_confirmed: {
															...options.email_templates_data.email_confirmed,
															reply_to: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email subject", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.email_confirmed?.subject
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														email_confirmed: {
															...options.email_templates_data.email_confirmed,
															subject: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>

									<div className="flex flex-col  my-5 gap-4 ">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email body", "user-verification")}
										</label>

										<PGinputTextarea
											id={`email_confirmed-${generate3Digit()}`}
											value={options?.email_templates_data?.email_confirmed?.html}
											className="!py-1 h-[300px] px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														email_confirmed: {
															...options.email_templates_data.email_confirmed,
															html: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
								</>
							)}

						<div>
							<label htmlFor="">Parameter</label>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_name}`}</code>
								</pre>{" "}
								{`=>`} Website title
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_description}`}</code>
								</pre>{" "}
								{`=>`} Website tagline
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_url}`}</code>
								</pre>{" "}
								{`=>`} Website URL
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_logo_url}`}</code>
								</pre>{" "}
								{`=>`} Website logo URL
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_name}`}</code>
								</pre>{" "}
								{`=>`} Username
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_display_name}`}</code>
								</pre>{" "}
								{`=>`} User display name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{first_name}`}</code>
								</pre>{" "}
								{`=>`} User first name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{last_name}`}</code>
								</pre>{" "}
								{`=>`} User last name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_avatar}`}</code>
								</pre>{" "}
								{`=>`} User avatar
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_email}`}</code>
								</pre>{" "}
								{`=>`} User email address
							</div>
							Available parameter for this email template
						</div>
					</div>
				</div>
				<div className="my-1">
					<div
						className="p-4 cursor-pointer bg-gray-400 hover:bg-gray-500 flex items-center  gap-2"
						onClick={() => {
							setactivation(!activation);
						}}>
						{activation ? (
							<Icon icon={chevronUp} />
						) : (
							<Icon icon={chevronDown} />
						)}

						<span>
							{options?.email_templates_data?.email_resend_key?.enable ==
								"yes" && <Icon icon={check} />}
							{options?.email_templates_data?.email_resend_key?.enable ==
								"no" && <Icon icon={close} size="20" />}
						</span>
						<span>{__("Resend Activation Key", "user-verification")}</span>
					</div>
					<div className={`${activation ? "block" : "hidden"} p-[10px]`}>
						<div className="flex  my-5  justify-between items-center">
							<label className="w-[400px]" htmlFor="emailVerification">
								{__("Enable?", "user-verification")}
							</label>
							<PGinputSelect
								inputClass="!py-1 px-2  border-2 border-solid"
								val={options?.email_templates_data?.email_resend_key?.enable}
								options={[
									{ label: "No", value: "no" },
									{ label: "Yes", value: "yes" },
								]}
								onChange={(newVal) => {
									var optionsX = {
										...options,
										email_templates_data: {
											...options.email_templates_data,
											email_resend_key: {
												...options.email_templates_data.email_resend_key,
												enable: newVal,
											},
										},
									};
									setoptions(optionsX);
								}}
								multiple={false}
							/>
						</div>
						{options?.email_templates_data?.email_resend_key?.enable ===
							"yes" && (
								<>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email Bcc", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.email_resend_key?.email_bcc
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														email_resend_key: {
															...options.email_templates_data.email_resend_key,
															email_bcc: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email from name", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.email_resend_key
													?.email_from_name
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														email_resend_key: {
															...options.email_templates_data.email_resend_key,
															email_from_name: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email from", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.email_resend_key
													?.email_from
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														email_resend_key: {
															...options.email_templates_data.email_resend_key,
															email_from: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Reply to name", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.email_resend_key
													?.reply_to_name
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														email_resend_key: {
															...options.email_templates_data.email_resend_key,
															reply_to_name: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Reply to", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.email_resend_key?.reply_to
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														email_resend_key: {
															...options.email_templates_data.email_resend_key,
															reply_to: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email subject", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.email_resend_key?.subject
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														email_resend_key: {
															...options.email_templates_data.email_resend_key,
															subject: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex flex-col  my-5 gap-4 ">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email body", "user-verification")}
										</label>

										<PGinputTextarea
											id={`email_resend_key-${generate3Digit()}`}
											value={
												options?.email_templates_data?.email_resend_key?.html
											}
											className="!py-1 h-[300px] px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														email_resend_key: {
															...options.email_templates_data.email_resend_key,
															html: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
								</>
							)}

						<div>
							<label htmlFor="">Parameter</label>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_name}`}</code>
								</pre>{" "}
								{`=>`} Website title
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_description}`}</code>
								</pre>{" "}
								{`=>`} Website tagline
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_url}`}</code>
								</pre>{" "}
								{`=>`} Website URL
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_logo_url}`}</code>
								</pre>{" "}
								{`=>`} Website logo URL
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_name}`}</code>
								</pre>{" "}
								{`=>`} Username
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_display_name}`}</code>
								</pre>{" "}
								{`=>`} User display name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{first_name}`}</code>
								</pre>{" "}
								{`=>`} User first name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{last_name}`}</code>
								</pre>{" "}
								{`=>`} User last name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_avatar}`}</code>
								</pre>{" "}
								{`=>`} User avatar
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_email}`}</code>
								</pre>{" "}
								{`=>`} User email address
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{ac_activaton_url}`}</code>
								</pre>{" "}
								{`=>`} Account activation URL
							</div>
							Available parameter for this email template
						</div>
					</div>
				</div>
				<div className="my-1">
					<div
						className="p-4 cursor-pointer bg-gray-400 hover:bg-gray-500 flex items-center  gap-2"
						onClick={() => {
							setotp(!otp);
						}}>
						{otp ? <Icon icon={chevronUp} /> : <Icon icon={chevronDown} />}

						<span>
							{options?.email_templates_data?.send_mail_otp?.enable ==
								"yes" && <Icon icon={check} />}
							{options?.email_templates_data?.send_mail_otp?.enable == "no" && (
								<Icon icon={close} size="20" />
							)}
						</span>
						<span>{__("Send Mail OTP", "user-verification")}</span>
					</div>
					<div className={`${otp ? "block" : "hidden"} p-[10px]`}>
						<div className="flex  my-5  justify-between items-center">
							<label className="w-[400px]" htmlFor="emailVerification">
								{__("Enable?", "user-verification")}
							</label>
							<PGinputSelect
								inputClass="!py-1 px-2  border-2 border-solid"
								val={options?.email_templates_data?.send_mail_otp?.enable}
								options={[
									{ label: "No", value: "no" },
									{ label: "Yes", value: "yes" },
								]}
								onChange={(newVal) => {
									var optionsX = {
										...options,
										email_templates_data: {
											...options.email_templates_data,
											send_mail_otp: {
												...options.email_templates_data.send_mail_otp,
												enable: newVal,
											},
										},
									};
									setoptions(optionsX);
								}}
								multiple={false}
							/>
						</div>
						{options?.email_templates_data?.send_mail_otp?.enable === "yes" && (
							<>
								<div className="flex  my-5  justify-between items-center">
									<label className="w-[400px]" htmlFor="emailVerification">
										{__("Email Bcc", "user-verification")}
									</label>
									<PGinputText
										value={
											options?.email_templates_data?.send_mail_otp?.email_bcc
										}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...options,
												email_templates_data: {
													...options.email_templates_data,
													send_mail_otp: {
														...options.email_templates_data.send_mail_otp,
														email_bcc: newVal.target.value,
													},
												},
											};
											setoptions(optionsX);
										}}
									/>
								</div>
								<div className="flex  my-5  justify-between items-center">
									<label className="w-[400px]" htmlFor="emailVerification">
										{__("Email from name", "user-verification")}
									</label>
									<PGinputText
										value={
											options?.email_templates_data?.send_mail_otp
												?.email_from_name
										}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...options,
												email_templates_data: {
													...options.email_templates_data,
													send_mail_otp: {
														...options.email_templates_data.send_mail_otp,
														email_from_name: newVal.target.value,
													},
												},
											};
											setoptions(optionsX);
										}}
									/>
								</div>
								<div className="flex  my-5  justify-between items-center">
									<label className="w-[400px]" htmlFor="emailVerification">
										{__("Email from", "user-verification")}
									</label>
									<PGinputText
										value={
											options?.email_templates_data?.send_mail_otp?.email_from
										}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...options,
												email_templates_data: {
													...options.email_templates_data,
													send_mail_otp: {
														...options.email_templates_data.send_mail_otp,
														email_from: newVal.target.value,
													},
												},
											};
											setoptions(optionsX);
										}}
									/>
								</div>
								<div className="flex  my-5  justify-between items-center">
									<label className="w-[400px]" htmlFor="emailVerification">
										{__("Reply to name", "user-verification")}
									</label>
									<PGinputText
										value={
											options?.email_templates_data?.send_mail_otp
												?.reply_to_name
										}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...options,
												email_templates_data: {
													...options.email_templates_data,
													send_mail_otp: {
														...options.email_templates_data.send_mail_otp,
														reply_to_name: newVal.target.value,
													},
												},
											};
											setoptions(optionsX);
										}}
									/>
								</div>
								<div className="flex  my-5  justify-between items-center">
									<label className="w-[400px]" htmlFor="emailVerification">
										{__("Reply to", "user-verification")}
									</label>
									<PGinputText
										value={
											options?.email_templates_data?.send_mail_otp?.reply_to
										}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...options,
												email_templates_data: {
													...options.email_templates_data,
													send_mail_otp: {
														...options.email_templates_data.send_mail_otp,
														reply_to: newVal.target.value,
													},
												},
											};
											setoptions(optionsX);
										}}
									/>
								</div>
								<div className="flex  my-5  justify-between items-center">
									<label className="w-[400px]" htmlFor="emailVerification">
										{__("Email subject", "user-verification")}
									</label>
									<PGinputText
										value={
											options?.email_templates_data?.send_mail_otp?.subject
										}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...options,
												email_templates_data: {
													...options.email_templates_data,
													send_mail_otp: {
														...options.email_templates_data.send_mail_otp,
														subject: newVal.target.value,
													},
												},
											};
											setoptions(optionsX);
										}}
									/>
								</div>
								<div className="flex flex-col  my-5 gap-4 ">
									<label className="w-[400px]" htmlFor="emailVerification">
										{__("Email body", "user-verification")}
									</label>

									<PGinputTextarea
										id={`send_mail_otp-${generate3Digit()}`}
										value={options?.email_templates_data?.send_mail_otp?.html}
										className="!py-1 h-[300px] px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
										onChange={(newVal) => {
											var optionsX = {
												...options,
												email_templates_data: {
													...options.email_templates_data,
													send_mail_otp: {
														...options.email_templates_data.send_mail_otp,
														html: newVal.target.value,
													},
												},
											};
											setoptions(optionsX);
										}}
									/>
								</div>
							</>
						)}

						<div>
							<label htmlFor="">Parameter</label>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_name}`}</code>
								</pre>{" "}
								{`=>`} Website title
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_description}`}</code>
								</pre>{" "}
								{`=>`} Website tagline
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_url}`}</code>
								</pre>{" "}
								{`=>`} Website URL
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_logo_url}`}</code>
								</pre>{" "}
								{`=>`} Website logo URL
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_name}`}</code>
								</pre>{" "}
								{`=>`} Username
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_display_name}`}</code>
								</pre>{" "}
								{`=>`} User display name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{first_name}`}</code>
								</pre>{" "}
								{`=>`} User first name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{last_name}`}</code>
								</pre>{" "}
								{`=>`} User last name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_avatar}`}</code>
								</pre>{" "}
								{`=>`} User avatar
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_email}`}</code>
								</pre>{" "}
								{`=>`} User email address
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{otp_code}`}</code>
								</pre>{" "}
								{`=>`} OTP
							</div>
							Available parameter for this email template
						</div>
					</div>
				</div>
				<div className="my-1">
					<div
						className="p-4 cursor-pointer bg-gray-400 hover:bg-gray-500 flex items-center  gap-2"
						onClick={() => {
							setmagicLogin(!magicLogin);
						}}>
						{magicLogin ? (
							<Icon icon={chevronUp} />
						) : (
							<Icon icon={chevronDown} />
						)}

						<span>
							{options?.email_templates_data?.send_magic_login_url?.enable ==
								"yes" && <Icon icon={check} />}
							{options?.email_templates_data?.send_magic_login_url?.enable ==
								"no" && <Icon icon={close} size="20" />}
						</span>
						<span>{__("Send Magic Login", "user-verification")}</span>
					</div>
					<div className={`${magicLogin ? "block" : "hidden"} p-[10px]`}>
						<div className="flex  my-5  justify-between items-center">
							<label className="w-[400px]" htmlFor="emailVerification">
								{__("Enable?", "user-verification")}
							</label>
							<PGinputSelect
								inputClass="!py-1 px-2  border-2 border-solid"
								val={
									options?.email_templates_data?.send_magic_login_url?.enable
								}
								options={[
									{ label: "No", value: "no" },
									{ label: "Yes", value: "yes" },
								]}
								onChange={(newVal) => {
									var optionsX = {
										...options,
										email_templates_data: {
											...options.email_templates_data,
											send_magic_login_url: {
												...options.email_templates_data.send_magic_login_url,
												enable: newVal,
											},
										},
									};
									setoptions(optionsX);
								}}
								multiple={false}
							/>
						</div>
						{options?.email_templates_data?.send_magic_login_url?.enable ===
							"yes" && (
								<>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email Bcc", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.send_magic_login_url
													?.email_bcc
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														send_magic_login_url: {
															...options.email_templates_data
																.send_magic_login_url,
															email_bcc: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email from name", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.send_magic_login_url
													?.email_from_name
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														send_magic_login_url: {
															...options.email_templates_data
																.send_magic_login_url,
															email_from_name: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email from", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.send_magic_login_url
													?.email_from
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														send_magic_login_url: {
															...options.email_templates_data
																.send_magic_login_url,
															email_from: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Reply to name", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.send_magic_login_url
													?.reply_to_name
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														send_magic_login_url: {
															...options.email_templates_data
																.send_magic_login_url,
															reply_to_name: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Reply to", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.send_magic_login_url
													?.reply_to
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														send_magic_login_url: {
															...options.email_templates_data
																.send_magic_login_url,
															reply_to: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="w-[400px]" htmlFor="emailVerification">
											{__("Email subject", "user-verification")}
										</label>
										<PGinputText
											value={
												options?.email_templates_data?.send_magic_login_url
													?.subject
											}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...options,
													email_templates_data: {
														...options.email_templates_data,
														send_magic_login_url: {
															...options.email_templates_data
																.send_magic_login_url,
															subject: newVal.target.value,
														},
													},
												};
												setoptions(optionsX);
											}}
										/>
									</div>
								</>
							)}

						<div className="flex flex-col  my-5 gap-4 ">
							<label className="w-[400px]" htmlFor="emailVerification">
								{__("Email body", "user-verification")}
							</label>

							<PGinputTextarea
								id={`send_magic_login_url--${generate3Digit()}`}
								value={
									options?.email_templates_data?.send_magic_login_url?.html
								}
								className="!py-1 h-[300px] px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
								onChange={(newVal) => {
									var optionsX = {
										...options,
										email_templates_data: {
											...options.email_templates_data,
											send_magic_login_url: {
												...options.email_templates_data.send_magic_login_url,
												html: newVal.target.value,
											},
										},
									};
									setoptions(optionsX);
								}}
							/>
						</div>
						<div>
							<label htmlFor="">Parameter</label>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_name}`}</code>
								</pre>{" "}
								{`=>`} Website title
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_description}`}</code>
								</pre>{" "}
								{`=>`} Website tagline
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_url}`}</code>
								</pre>{" "}
								{`=>`} Website URL
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{site_logo_url}`}</code>
								</pre>{" "}
								{`=>`} Website logo URL
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_name}`}</code>
								</pre>{" "}
								{`=>`} Username
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_display_name}`}</code>
								</pre>{" "}
								{`=>`} User display name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{first_name}`}</code>
								</pre>{" "}
								{`=>`} User first name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{last_name}`}</code>
								</pre>{" "}
								{`=>`} User last name
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_avatar}`}</code>
								</pre>{" "}
								{`=>`} User avatar
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{user_email}`}</code>
								</pre>{" "}
								{`=>`} User email address
							</div>
							<div className="flex items-center gap-2">
								<pre className="!my-1">
									<code>{`{magic_login_url}`}</code>
								</pre>{" "}
								{`=>`} Magic login url
							</div>
							Available parameter for this email template
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

class EmailTemplates extends Component {
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
export default EmailTemplates;
