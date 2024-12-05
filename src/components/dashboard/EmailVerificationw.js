import { __ } from "@wordpress/i18n";
import { Tooltip, TooltipAction, TooltipContent } from "aspect-ui/Tooltip";
import React from "react";
import Select from "react-select";
import PGinputSelect from "../input-select";

const EmailVerification = ({
	val,
	update,
}) => {
	const handleUpdate = (key, value) => {
		update(key, value);
	};
	const userRoleOptions = [
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
		{ value: "administrator", label: "Administrator" },
	];
	return (
		<div className="w-full space-y-3">
			<div className="flex items-center gap-4">
				<label htmlFor="emailVerification">
					{__("Enable email verification", "user-verification")}
				</label>
				<div className="flex items-center gap-2">
					<PGinputSelect
						val={val.enable}
						options={[
							{ label: "Yes", value: "yes" },
							{ label: "No", value: "no" },
						]}
						onChange={(newVal) => handleUpdate("enable", newVal)}
						multiple={false}
					/>
					<Tooltip
						direction="top"
						arrowColor="#d1d5db"
						showOnClick={true}
						actionClassName="flex items-center justify-center h-[24px] aspect-square font-medium bg-gray-300 rounded-full text-emerald-700"
						contentClassName="bg-gray-300 px-4 py-2">
						<TooltipAction>?</TooltipAction>
						<TooltipContent>
							{__(
								"Select to enable or disable email verification.",
								"user-verification"
							)}
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<label htmlFor="emailVerification">
					{__("Choose verification page", "user-verification")}
				</label>
				<div className="flex items-center gap-2">
					<PGinputSelect
						val={val.verification_page_id}
						options={[
							{ label: "None", value: "none" },
							{ label: "Sample Page", value: "sample" },
						]}
						onChange={(newVal) => handleUpdate("verification_page_id", newVal)}
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
								"Select page where verification will process. default home page if select none.",
								"user-verification"
							)}
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<label htmlFor="emailVerification">
					{__("Redirect after verification", "user-verification")}
				</label>
				<div className="flex items-center gap-2">
					<PGinputSelect
						val={val.redirect_after_verification}
						options={[
							{ label: "None", value: "none" },
							{ label: "Sample Page", value: "sample" },
						]}
						onChange={(newVal) =>
							handleUpdate("redirect_after_verification", newVal)
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
					<PGinputSelect
						val={val.login_after_verification}
						options={[
							{ label: "Yes", value: "yes" },
							{ label: "No", value: "no" },
						]}
						onChange={(newVal) =>
							handleUpdate("login_after_verification", newVal)
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
					<PGinputSelect
						val={val.email_update_reverify}
						options={[
							{ label: "Yes", value: "yes" },
							{ label: "No", value: "no" },
						]}
						onChange={(newVal) => handleUpdate("email_update_reverify", newVal)}
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
					<Select
						// val={val.exclude_user_roles}
						className="flex-1"
						value={val.exclude_user_roles.map(
							(role) => userRoleOptions.find((option) => option.value === role) // Match role with options
						)}
						options={userRoleOptions}
						isMulti
						closeMenuOnSelect={false}
						onChange={(newVal) => {
							const values = newVal.map((option) => option.value);
							handleUpdate("exclude_user_roles", values);
						}}
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
								"You can exclude verification for these user roles to login on your site.",
								"user-verification"
							)}
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
		</div>
	);
};

export default EmailVerification;
