import { __ } from "@wordpress/i18n";
import React from "react";
import PGinputText from "../input-text";
import PGinputSelect from "../input-select";
import { Tooltip, TooltipAction, TooltipContent } from "aspect-ui/Tooltip";

const EmailOtp = ({ val, update }) => {
  const handleUpdate = (key, value) => {
		update(key, value);
	};
	return (
		<div>
			<div className="flex items-center gap-4">
				<label htmlFor="">
					{__("Enable on default login", "user-verification")}
				</label>
				<div className="flex items-center gap-2">
					<PGinputSelect
						val={val.enable_default_login}
						options={[
							{ label: "Yes", value: "yes" },
							{ label: "No", value: "no" },
						]}
						onChange={(newVal) => handleUpdate("enable_default_login", newVal)}
						multiple={false}
					/>
					<Tooltip
						direction="top"
						arrowColor="#d1d5db"
						showOnClick={true}
						actionClassName="flex items-center justify-center h-[24px] aspect-square font-medium bg-gray-300 rounded-full text-emerald-700"
						contentClassName="bg-gray-300 px-4 py-2 max-w-[350px] text-justify">
						<TooltipAction>?</TooltipAction>
						<TooltipContent>
							{__(
								"Enable OTP on default login page. every time a user try to login will require a OTP send via mail.",
								"user-verification"
							)}
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<label htmlFor="">
					{__("Required email verified", "user-verification")}
				</label>
				<div className="flex items-center gap-2">
					<PGinputSelect
						val={val.required_email_verified}
						options={[
							{ label: "Yes", value: "yes" },
							{ label: "No", value: "no" },
						]}
						onChange={(newVal) =>
							handleUpdate("required_email_verified", newVal)
						}
						multiple={false}
					/>
					<Tooltip
						direction="top"
						arrowColor="#d1d5db"
						showOnClick={true}
						actionClassName="flex items-center justify-center h-[24px] aspect-square font-medium bg-gray-300 rounded-full text-emerald-700"
						contentClassName="bg-gray-300 px-4 py-2 max-w-[350px] text-justify">
						<TooltipAction>?</TooltipAction>
						<TooltipContent>
							{__(
								"Send OTP to only email verified users.",
								"user-verification"
							)}
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<label htmlFor="">{__("Allow Passowrd", "user-verification")}</label>
				<div className="flex items-center gap-2">
					<PGinputSelect
						val={val.allow_password}
						options={[
							{ label: "Yes", value: "yes" },
							{ label: "No", value: "no" },
						]}
						onChange={(newVal) => handleUpdate("allow_password", newVal)}
						multiple={false}
					/>
					<Tooltip
						direction="top"
						arrowColor="#d1d5db"
						showOnClick={true}
						actionClassName="flex items-center justify-center h-[24px] aspect-square font-medium bg-gray-300 rounded-full text-emerald-700"
						contentClassName="bg-gray-300 px-4 py-2 max-w-[350px] text-justify">
						<TooltipAction>?</TooltipAction>
						<TooltipContent>
							{__("Allow password in OTP field", "user-verification")}
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<label htmlFor="">
					{__("Enable on WooCommerce login", "user-verification")}
				</label>
				<div className="flex items-center gap-2">
					{/* <PGinputSelect
						val={val.email_update_reverify}
						options={[
							{ label: "Yes", value: "yes" },
							{ label: "No", value: "no" },
						]}
						onChange={(newVal) => handleUpdate("email_update_reverify", newVal)}
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
								"Enable OTP on WooCommerce login page. every time a user try to login via WooCommerce login form will require a OTP send via mail.",
								"user-verification"
							)}
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<label htmlFor="">{__("OTP Length", "user-verification")}</label>
				<div className="flex items-center gap-2">
					<PGinputText
						val={val.length}
						onChange={(newVal) => handleUpdate("length", newVal)}
					/>
					<Tooltip
						direction="top"
						arrowColor="#d1d5db"
						showOnClick={true}
						actionClassName="flex items-center justify-center h-[24px] aspect-square font-medium bg-gray-300 rounded-full text-emerald-700"
						contentClassName="bg-gray-300 px-4 py-2 max-w-[350px] text-justify">
						<TooltipAction>?</TooltipAction>
						<TooltipContent>
							{__("Set custom length for OTP.", "user-verification")}
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
		</div>
	);
};

export default EmailOtp;
