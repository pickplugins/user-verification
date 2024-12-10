import { useEffect, useState } from "@wordpress/element";
const { Component } = wp.element;

import { MediaUpload, RichText } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import React from "react";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";
import PGinputTextarea from "../input-textarea";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;

	var [editorType, seteditorType] = useState("rich"); // Using the hook.

	var [options, setoptions] = useState(props.options); // Using the hook.
	var [registration, setregistration] = useState(false);
	var [verification, setverification] = useState(false);
	var [activation, setactivation] = useState(false);
	var [otp, setotp] = useState(false);

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
				{/* <MediaUploadCheck> */}
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
							<>
								{imageUrl && (
									<img
										src={imageUrl}
										alt=""
										className="cursor-pointer rounded-md"
										onClick={() => {
											open();
										}}
									/>
								)}
								<button onClick={open}>Open Media Library</button>
							</>
						);
					}}></MediaUpload>
				{/* </MediaUploadCheck> */}
				{/* <PGinputFile
					inputClass="!py-1 px-2  border-2 border-solid"
					val={options?.logo_id}
					options={[
						{ label: "No", value: "no" },
						{ label: "Yes", value: "yes" },
					]}
					onChange={(newVal) => {
						console.log(newVal);
					}}
					multiple={false}
				/> */}
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
						className="p-4 cursor-pointer bg-gray-400 hover:bg-gray-500"
						onClick={() => {
							setregistration(!registration);
						}}>
						{registration ? (
							<>
								<i className="fas fa-chevron-down mr-4"></i>
							</>
						) : (
							<>
								<i className="fas fa-chevron-up mr-4"></i>
							</>
						)}
						{__("New User Registration", "user-verification")}
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
									options?.email_templates_data?.user_registered?.reply_to_name
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
								value={options?.email_templates_data?.user_registered?.reply_to}
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
								value={options?.email_templates_data?.user_registered?.subject}
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

							<div className="flex ">
								<div className={`${editorType == "text" ? "bg-gray-500" : "bg-gray-400"} p-3 px-5`} onClick={ev => {
									seteditorType("text")

								}}>Text</div>
								<div className={`${editorType == "rich" ? "bg-gray-500" : "bg-gray-400"}  p-3 px-5`} onClick={ev => {
									seteditorType("rich")

								}}>Rich</div>
							</div>


							{editorType == "rich" && (
								<RichText
									tagName={"div"}
									value={options?.email_templates_data?.user_registered?.html}
									allowedFormats={["core/bold", "core/italic", "core/link"]}
									onChange={(newVal) => {
										var optionsX = {
											...options,
											email_templates_data: {
												...options.email_templates_data,
												user_registered: {
													...options.email_templates_data.user_registered,
													html: newVal.target.value,
												},
											},
										};
										setoptions(optionsX);
									}}
									// onChange={(content) => {
									// 	var options = { ...text.options, content: content };
									// 	setAttributes({ text: { ...text, options: options } });
									// }}
									placeholder={__("Start Writing...")}
								/>
							)}
							{editorType == "text" && (
								<PGinputTextarea
									value={options?.email_templates_data?.user_registered?.html}
									className="!py-1 h-[300px] px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
									onChange={(newVal) => {
										var optionsX = {
											...options,
											email_templates_data: {
												...options.email_templates_data,
												user_registered: {
													...options.email_templates_data.user_registered,
													html: newVal.target.value,
												},
											},
										};
										setoptions(optionsX);
									}}
								/>

							)}


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
						className="p-4 cursor-pointer bg-gray-400 hover:bg-gray-500 "
						onClick={() => {
							setverification(!verification);
						}}>
						{verification ? (
							<>
								<i className="fas fa-chevron-down mr-4"></i>
							</>
						) : (
							<>
								<i className="fas fa-chevron-up mr-4"></i>
							</>
						)}
						{__("Email Verification Confirmed", "user-verification")}
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
									options?.email_templates_data?.email_confirmed?.reply_to_name
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
								value={options?.email_templates_data?.email_confirmed?.reply_to}
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
								value={options?.email_templates_data?.email_confirmed?.subject}
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
							<RichText
								tagName={"div"}
								value={options?.email_templates_data?.email_confirmed?.html}
								allowedFormats={["core/bold", "core/italic", "core/link"]}
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
								placeholder={__("Start Writing...")}
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
							Available parameter for this email template
						</div>
					</div>
				</div>
				<div className="my-1">
					<div
						className="p-4 cursor-pointer bg-gray-400 hover:bg-gray-500"
						onClick={() => {
							setactivation(!activation);
						}}>
						{activation ? (
							<>
								<i className="fas fa-chevron-down mr-4"></i>
							</>
						) : (
							<>
								<i className="fas fa-chevron-up mr-4"></i>
							</>
						)}
						{__("Resend Activation Key", "user-verification")}
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
									options?.email_templates_data?.email_resend_key?.email_from
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
									options?.email_templates_data?.email_resend_key?.reply_to_name
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
								value={options?.email_templates_data?.email_resend_key?.subject}
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
							<RichText
								tagName={"div"}
								value={options?.email_templates_data?.email_resend_key?.html}
								allowedFormats={["core/bold", "core/italic", "core/link"]}
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
								placeholder={__("Start Writing...")}
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
						className="p-4 cursor-pointer bg-gray-400 hover:bg-gray-500"
						onClick={() => {
							setotp(!otp);
						}}>
						{otp ? (
							<>
								<i className="fas fa-chevron-down mr-4"></i>
							</>
						) : (
							<>
								<i className="fas fa-chevron-up mr-4"></i>
							</>
						)}
						{__("Send Mail OTP", "user-verification")}
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

						<div className="flex  my-5  justify-between items-center">
							<label className="w-[400px]" htmlFor="emailVerification">
								{__("Email Bcc", "user-verification")}
							</label>
							<PGinputText
								value={options?.email_templates_data?.send_mail_otp?.email_bcc}
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
									options?.email_templates_data?.send_mail_otp?.email_from_name
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
								value={options?.email_templates_data?.send_mail_otp?.email_from}
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
									options?.email_templates_data?.send_mail_otp?.reply_to_name
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
								value={options?.email_templates_data?.send_mail_otp?.reply_to}
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
								value={options?.email_templates_data?.send_mail_otp?.subject}
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
							<RichText
								tagName={"div"}
								value={options?.email_templates_data?.send_mail_otp?.html}
								allowedFormats={["core/bold", "core/italic", "core/link"]}
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
								placeholder={__("Start Writing...")}
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
									<code>{`{otp_code}`}</code>
								</pre>{" "}
								{`=>`} OTP
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
