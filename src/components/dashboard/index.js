const { Component } = wp.element;
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

import apiFetch from "@wordpress/api-fetch";
import { Spinner } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { settings } from "@wordpress/icons";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import { defaultData } from "./defaultData";
import EmailOtp from "./EmailOtp";
import EmailTemplates from "./EmailTemplates";
import EmailValidation from "./EmailValidation";
import EmailVerification from "./EmailVerification";
import ErrorMessage from "./ErrorMessage";
import IsSpammy from "./IsSpammy";
import MagicLogin from "./MagicLogin";
import ReCaptcha from "./reCaptcha";
import SpamProtection from "./SpamProtection";
import ThirdParty from "./ThirdParty";
import Tools from "./Tools";

import { IconDashboard, IconMailQuestion, IconWand, IconMailCode, IconShieldCheck, IconMessageShare, IconRobot, IconSettingsPlus, IconMailStar, IconLifebuoy, IconMailBolt } from '@tabler/icons-react';


function Html(props) {
	if (!props.warn) {
		return null;
	}
	var [isLoading, setisLoading] = useState(false); // Using the hook.
	var [needSave, setneedSave] = useState(false); // Using the hook.
	var [pageList, setpageList] = useState([]); // Using the hook.
	var [statsCounter, setstatsCounter] = useState([]); // Using the hook.
	var [roles, setroles] = useState([]); // Using the hook.

	var isProFeature = applyFilters("isProFeature", true);
	var optionDataDefault = {
		apiKeys: {},
	};
	var [optionData, setoptionData] = useState({}); // Using the hook.
	var [optionDataSaved, setoptionDataSaved] = useState({}); // Using the hook.

	var [dashboardTabs, setdashboardTabs] = useState([
		{
			name: "overview",
			title: "Overview",
			icon: <IconDashboard />,
			className: "tab-overview",
			hidden: false,
			isPro: false,
		},
		{
			name: "tabEmailVerification",
			title: "Email Verification",
			icon: <IconMailQuestion />,
			className: "tab-tabEmailVerification",
			hidden: false,
			isPro: false,
		},
		// {
		// 	name: "magicLogin",
		// 	title: "Magic Login",
		// 	icon: <IconWand/>,
		// 	className: "tab-magicLogin",
		// 	hidden: false,
		// 	isPro: false,
		// 	isNew: true,
		// },
		{
			name: "tabEmailOTP",
			title: "Email OTP",
			icon: <IconMailCode />,
			className: "tab-tabEmailOTP",
			hidden: false,
			isPro: false,
		},
		{
			name: "tabIsSpammy",
			title: "IsSpammy",
			icon: <IconMailBolt />,
			className: "tab-tabIsSpammy",
			hidden: false,
			isPro: false,
		},
		{
			name: "tabSpam",
			title: "Spam Protection",
			icon: <IconShieldCheck />,
			className: "tab-tabSpam",
			hidden: false,
			isPro: false,
		},
		{
			name: "tabEmailTemplates",
			title: "Email Templates",
			icon: <IconMessageShare />,
			className: "tab-tabEmailTemplates",
			hidden: false,
			isPro: false,
		},
		{
			name: "tabreCAPTCHA",
			title: "reCAPTCHA",
			icon: <IconRobot />,
			className: "tab-tabreCAPTCHA",
			hidden: false,
			isPro: false,
		},
		{
			name: "tabTools",
			title: "Tools",
			icon: <IconSettingsPlus />,
			className: "tab-tabTools",
			hidden: false,
			isPro: false,
		},

		{
			name: "emailValidation",
			title: "Email Validation",
			icon: <IconMailStar />,
			className: "tab-emailValidation",
			hidden: false,
			isPro: false,
			isNew: true,
		},
		// {
		// 	name: "customLogin",
		// 	title: "Custom Login",
		// 	icon: settings,
		// 	className: "tab-customLogin",
		// 	hidden: false,
		// 	isPro: false,
		// 	isNew: true,
		// },

		{
			name: "tabHelp",
			title: "Help & support",
			icon: <IconLifebuoy />,
			className: "tab-tabHelp",
			hidden: false,
			isPro: false,
		},
	]);

	// var [isProFeature, setisProFeature] = useState(
	// 	optionData?.license?.activated ? false : true
	// );
	function handleAlertConfirmation() {
		if (confirm("Are you sure you want to reset the option data?")) {
			resetOptionData();
		}
	}
	function resetOptionData() {
		setoptionData(optionDataDefault);
	}
	// 	useEffect(() => {
	// 		setisLoading(true);
	// 		apiFetch({
	// 			path: "/user-verification/v2/get_options",
	// 			method: "POST",
	// 			data: { option: "user_verification_settings" },
	// 		}).then((res) => {

	// 			if (res.length != 0) {
	// 				var resX = { ...res };

	// 				setoptionDataSaved(resX);
	// 				setoptionData(resX);
	// 			}
	// 			setisLoading(false);
	// 		});
	// 	}, []);

	useEffect(() => {
		const fetchData = async () => {
			setisLoading(true);
			try {
				const res = await apiFetch({
					path: "/user-verification/v2/get_options",
					method: "POST",
					data: { option: "user_verification_settings" },
				});

				if (res.length !== 0) {
					const resX = { ...res };
					console.log(resX);
					if (Object.keys(resX).length === 0) {
						setoptionDataSaved(defaultData);
						setoptionData(defaultData);
					} else {
						setoptionDataSaved(resX);
						setoptionData(resX);
					}
				}
			} catch (error) {
			} finally {
				setisLoading(false);
			}
		};

		fetchData();
	}, []);


	useEffect(() => {
		apiFetch({
			path: "/user-verification/v2/user_roles_list",
			method: "POST",
			data: {},
		}).then((res) => {
			var rolesX = [];
			Object.entries(res).map((role) => {
				var index = role[0];
				var val = role[1];
				rolesX.push({ label: val, value: index });
			});
			setroles(rolesX);
		});
		apiFetch({
			path: "/user-verification/v2/page_list",
			method: "POST",
			data: {},
		}).then((res) => {

			var pageListX = [];
			Object.entries(res).map((page) => {
				var index = page[0];
				var val = page[1];
				pageListX.push({ label: val, value: index });
			});
			setpageList(pageListX);
		});
		apiFetch({
			path: "/user-verification/v2/stats_counter",
			method: "POST",
			data: {},
		}).then((res) => {

			setstatsCounter(res);

		});








	}, []);

	useEffect(() => {


		if (JSON.stringify(optionData) === JSON.stringify(optionDataSaved)) {
			setneedSave(false);
		} else {
			setneedSave(true);
		}
		//setisProFeature(optionData?.license?.activated ? false : true);
	}, [optionData]);
	function updateOption() {



		setisLoading(true);
		apiFetch({
			path: "/user-verification/v2/update_options",
			method: "POST",
			data: { name: "user_verification_settings", value: optionData },
		}).then((res) => {
			setisLoading(false);
			if (res.status) {
				setoptionDataSaved(optionData);
				setneedSave(false);
			}
		});
	}

	//////////////////////////import setting
	const [fileContent, setFileContent] = useState(null);
	const [importStatus, setimportStatus] = useState("wait");
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (!file) return; // No file selected
		if (!file.name.endsWith(".json")) {
			alert("Please select a JSON file.");
			return;
		}
		const reader = new FileReader();
		reader.onload = (event) => {
			const content = event.target.result;
			try {
				const jsonObject = JSON.parse(content);
				setFileContent(jsonObject);
			} catch (error) {
				alert("Error parsing JSON file.");
			}
		};
		reader.readAsText(file);
	};
	function handleImport() {
		if (!fileContent) {
			alert("Please select a file to import.");
			return;
		}
		delete fileContent.exportReady;
		setoptionData(fileContent);
		setimportStatus("run");
		setTimeout(() => {
			setimportStatus("stop");
		}, 2000);
		setTimeout(() => {
			setimportStatus("wait");
		}, 4000);
	}
	///////////////////////export setting
	function download(filename, text) {
		const element = document.createElement("a");
		element.setAttribute(
			"href",
			"data:text/json;charset=utf-8," + encodeURIComponent(text)
		);
		element.setAttribute("download", filename);
		element.style.display = "none";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
	function ExportButton() {
		var optionDataX = { ...optionData };
		optionDataX.exportReady = true;
		const handleExport = () => {
			const currentDate = new Date();
			const formattedDate = `${currentDate.getFullYear()}-${(
				currentDate.getMonth() + 1
			)
				.toString()
				.padStart(2, "0")}-${currentDate
					.getDate()
					.toString()
					.padStart(2, "0")}`;
			const formattedTime = `${currentDate
				.getHours()
				.toString()
				.padStart(2, "0")}${currentDate
					.getMinutes()
					.toString()
					.padStart(2, "0")}${currentDate
						.getSeconds()
						.toString()
						.padStart(2, "0")}`;
			const filename = `combo-blocks-setting-${formattedDate}-${formattedTime}.json`;
			download(filename, JSON.stringify(optionDataX, null, 2));
		};
		return (
			<button
				className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
				onClick={handleExport}>
				{__("Export", "user-verification")}
			</button>
		);
	}

	function onChangeEmailVerification(options) {
		var optionDataX = { ...optionData, email_verification: options };
		setoptionData(optionDataX);
	}
	function onChangeIsSpammy(options) {
		var optionDataX = { ...optionData, isspammy: options };
		setoptionData(optionDataX);
	}

	function onChangeMagicLogin(options) {
		var optionDataX = { ...optionData, magicLogin: options };
		setoptionData(optionDataX);
	}
	function onChangeEmailValidation(options) {
		var optionDataX = { ...optionData, emailValidation: options };
		setoptionData(optionDataX);
	}

	function onChangeEmailOTP(options) {
		var optionDataX = { ...optionData, email_otp: options };
		setoptionData(optionDataX);
	}
	function onChangeReCaptcha(options) {
		var optionDataX = { ...optionData, recaptcha: options };
		setoptionData(optionDataX);
	}
	function onChangeTools(options) {
		var optionDataX = { ...optionData, ...options };
		setoptionData(optionDataX);
	}
	function onChangeEmailTemplates(options) {
		// var optionDataX = { options };


		setoptionData(options);
	}
	function onChangeSpamProtection(options) {
		var optionDataX = { ...optionData, spam_protection: options };
		setoptionData(optionDataX);
	}
	function onChangeErrorMessages(options) {
		var optionDataX = { ...optionData, messages: options };
		setoptionData(optionDataX);
	}
	function onChangeUserVerificationSettings(options) {

		console.log(options);


		var optionDataX = { ...optionData, ...options };
		setoptionData(optionDataX);
	}

	const imageUrl = useSelect(
		(select) => {
			if (!optionData?.logo_id) return null;
			const media = select("core").getMedia(optionData?.logo_id);
			return media?.source_url || null;
		},
		[optionData?.logo_id]
	);
	const ALLOWED_MEDIA_TYPES = ["image"];

	return (
		<div className="pg-setting-input-text pg-dashboard">
			<div className="bg-gray-300 text-white py-5 p-3">
				<div className="flex gap-3 justify-center items-center flex-wrap lg:justify-between">
					<div className="flex justify-center flex-wrap  md:justify-between  ">
						<div className=" flex  items-center flex-wrap gap-4 md:flex-nowrap md:justify-between md:gap-6 ">
							<div className=" flex gap-4 w-full items-center md:w-auto ">
								<span className="flex flex-col w-max">
									<span className="text-[32px] md:text-[36px] lg:text-[40px] leading-[32px] md:leading-[36px] lg:leading-[40px] font-extrabold text-white whitespace-nowrap ">
										{__("User Verification", "user-verification")}
									</span>
								</span>
							</div>
							<div className="flex items-center flex-wrap gap-5 md:gap-4 ">
								{isLoading && (
									<span className="bg-amber-500 px-1 py-1 rounded block">
										<Spinner fill="#fff" />
									</span>
								)}
							</div>
						</div>
					</div>
					<div className=" flex w-full lg:w-auto">
						<div className="flex gap-2 items-center flex-wrap ">
							<a
								href="https://pickplugins.com/create-support-ticket/"
								target="_blank"
								className=" no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white ">
								{__("Create Support", "user-verification")}
							</a>
							<a
								href="https://pickplugins.com/doc-category/user-verification/"
								target="_blank"
								className=" no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white   hover:text-white ">
								{__("Documentation", "user-verification")}
							</a>
							<button
								className="bg-amber-500 rounded-sm text-md p-2 px-4 cursor-pointer pg-font text-white "
								onClick={(ev) => {
									// resetOptionData();
									handleAlertConfirmation();
								}}>
								{__("Reset", "user-verification")}
							</button>
							<div
								className="bg-green-700 rounded-sm text-md p-2 px-4 cursor-pointer pg-font text-white flex items-center"
								onClick={(ev) => {
									updateOption();
								}}>
								<span>{__("Save", "user-verification")}</span>
								{needSave && (
									<span className="w-5 inline-block h-5 ml-3 rounded-xl text-center bg-red-500">
										!
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				id=""
				className={`pg-setting-input-text ${isLoading ? "opacity-25" : ""}`}
				disabled={isLoading ? "disabled" : ""}>
				<PGtabs
					activeTab="overview"
					orientation="vertical"
					contentClass=" p-5 bg-white w-full"
					navItemsWrapClass="block w-[300px]"
					navItemClass="bg-gray-500 px-5 py-3 gap-2 border-0 border-b border-solid border-gray-500 "
					navItemSelectedClass="bg-white "
					activeClass="active-tab"
					onSelect={(tabName) => { }}
					tabs={dashboardTabs}>
					<PGtab name="overview">
						<div className="">


							<div className="text-2xl mb-3">Email Verification</div>

							<div className="grid grid-cols-3 gap-5 text-white  my-5">
								<div className="bg-blue-800	 p-3  space-y-3 flex items-center gap-3 rounded-sm">
									<div>
										<i class="icofont-send-mail icofont-3x"></i>
									</div>
									<div>
										<div className="">Email Verification Sent</div>
										<div className="text-2xl">{statsCounter?.email_verification_sent ?? 0}</div>
									</div>
								</div>
								<div className="bg-blue-800	 p-3  space-y-3 flex items-center gap-3 rounded-sm">
									<div>
										<i class="icofont-verification-check icofont-3x"></i>

									</div>
									<div>
										<div className="">Verification Confirmed</div>
										<div className="text-2xl">{statsCounter?.email_verification_confirmed ?? 0}</div>
									</div>
								</div>

							</div>
							<div className="text-2xl mb-3">Magic Login</div>

							<div className="grid grid-cols-3 gap-5 text-white  my-5">
								<div className="bg-blue-800	 p-3  space-y-3 flex items-center gap-3 rounded-sm">
									<div>
										<i class="icofont-send-mail icofont-3x"></i>
									</div>
									<div>
										<div className="">Magic Login Sent</div>
										<div className="text-2xl">{statsCounter?.magic_login_sent ?? 0}</div>
									</div>
								</div>
								<div className="bg-blue-800	 p-3  space-y-3 flex items-center gap-3 rounded-sm">
									<div>
										<i class="icofont-verification-check icofont-3x"></i>

									</div>
									<div>
										<div className="">Magic Login Used</div>
										<div className="text-2xl">{statsCounter?.magic_login_used ?? 0}</div>
									</div>
								</div>

							</div>



							<div className="text-2xl mb-3">Email OTP</div>


							<div className="grid grid-cols-3 gap-5 text-white  my-5">
								<div className="bg-blue-800	 p-3  space-y-3 flex items-center gap-3 rounded-sm">
									<div>
										<i class="icofont-send-mail icofont-3x"></i>
									</div>
									<div>
										<div className="">Email OTP Sent</div>
										<div className="text-2xl">{statsCounter?.email_otp_sent ?? 0}</div>
									</div>
								</div>
								<div className="bg-blue-800	 p-3  space-y-3 flex items-center gap-3 rounded-sm">
									<div>
										<i class="icofont-verification-check icofont-3x"></i>

									</div>
									<div>
										<div className="">Email OTP Used</div>
										<div className="text-2xl">{statsCounter?.email_otp_used ?? 0}</div>
									</div>
								</div>

							</div>

							<div className="text-2xl mb-3">Email Validation</div>


							<div className="grid grid-cols-3 gap-5 text-white  my-5">
								<div className="bg-blue-800	 p-3  space-y-3 flex items-center gap-3 rounded-sm">
									<div>
										<i class="icofont-send-mail icofont-3x"></i>
									</div>
									<div>
										<div className="">Request Sent</div>
										<div className="text-2xl">{statsCounter?.email_validation_request ?? 0}</div>
									</div>
								</div>
								<div className="bg-blue-800	 p-3  space-y-3 flex items-center gap-3 rounded-sm">
									<div>
										<i class="icofont-verification-check icofont-3x"></i>

									</div>
									<div>
										<div className="">Validation Success</div>
										<div className="text-2xl">{statsCounter?.email_validation_success ?? 0}</div>
									</div>
								</div>
								<div className="bg-blue-800	 p-3  space-y-3 flex items-center gap-3 rounded-sm">
									<div>
										<i class="icofont-verification-check icofont-3x"></i>
									</div>
									<div>
										<div className="">Validation Failed</div>
										<div className="text-2xl">{statsCounter?.email_validation_failed ?? 0}</div>
									</div>
								</div>

							</div>





							<div className="text-2xl mb-3">Spam Protection</div>


							<div className="grid grid-cols-2 gap-5 text-white  my-5">
								<div className="bg-blue-800	 p-3  space-y-3 flex items-center gap-3 rounded-sm">
									<div>
										<i class="icofont-bug icofont-3x"></i>
									</div>
									<div>
										<div className="">Spam Login Blocked </div>
										<div className="text-2xl">{statsCounter?.spam_login_blocked ?? 0}</div>
									</div>
								</div>
								<div className="bg-blue-800	 p-3  space-y-3 flex items-center gap-3 rounded-sm">
									<div>
										<i class="icofont-bug icofont-3x"></i>

									</div>
									<div>
										<div className="">Spam Registration Blocked</div>
										<div className="text-2xl">{statsCounter?.spam_registration_blocked ?? 0}</div>
									</div>
								</div>
								<div className="bg-blue-800	 p-3  space-y-3 flex items-center gap-3 rounded-sm">
									<div>
										<i class="icofont-bug icofont-3x"></i>

									</div>
									<div>
										<div className="">Spam Comment Blocked</div>
										<div className="text-2xl">{statsCounter?.spam_comment_blocked ?? 0}</div>
									</div>
								</div>
								<div className="bg-blue-800	 p-3  space-y-3 flex items-center gap-3 rounded-sm">
									<div>
										<i class="icofont-bug icofont-3x"></i>

									</div>
									<div>
										<div className="">Spam Comment Report</div>
										<div className="text-2xl">{statsCounter?.spam_comment_report ?? 0}</div>
									</div>
								</div>




							</div>











						</div>
					</PGtab>
					<PGtab name="tabHelp">
						<div className="">
							<div className="text-2xl font-bold mb-2">
								{__("Get support", "user-verification")}
							</div>
							<p className="text-base mb-7">
								{__(
									"Use following to get help and support from our expert team.",
									"user-verification"
								)}
							</p>
							<div className="mb-8">
								<div className="mb-4">
									<div className="text-[14px]">Ask question</div>
									<p>
										Ask question for free on our forum and get quick reply from
										our expert team members.
									</p>
									<a
										className=" no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white "
										href="https://www.pickplugins.com/create-support-ticket/">
										Create support ticket
									</a>
								</div>
								<div className="mb-4">
									<p>Read our documentation before asking your question.</p>
									<a
										className=" no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white "
										href="https://pickplugins.com/documentation/user-verification/">
										Documentation
									</a>
								</div>
								<div className="mb-4">
									<p>Watch video tutorials.</p>
									<a
										className=" no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white "
										href="https://www.youtube.com/playlist?list=PL0QP7T2SN94bJmrpEqtjsj9nnR6jiKTDt">
										Watch video tutorials.
									</a>
								</div>
							</div>
							<div className="text-[14px]">Submit reviews</div>
							<p>
								We wish your 2 minutes to write your feedback about the Post
								Grid plugin. give us{" "}
								<span className="text-[#ffae19]">
									<i class="fas fa-star"></i>
									<i class="fas fa-star"></i>
									<i class="fas fa-star"></i>
									<i class="fas fa-star"></i>
									<i class="fas fa-star"></i>
								</span>
							</p>
							<a
								className=" no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white "
								href="https://wordpress.org/support/plugin/user-verification/reviews/#new-post">
								<i className="fab fa-wordpress"></i>
								Write a review
							</a>
						</div>
					</PGtab>
					<PGtab name="tabEmailTemplates">
						<div className="flex mb-5  justify-start gap-2 items-center ">
							<EmailTemplates
								options={optionData}
								onChange={onChangeEmailTemplates}
							/>
						</div>
					</PGtab>
					<PGtab name="tabTools">
						<div className="flex mb-5  justify-start gap-2 items-center ">
							<Tools options={optionData} onChange={onChangeTools} />
						</div>
					</PGtab>
					<PGtab name="tabreCAPTCHA">
						<div className="flex mb-5  justify-start gap-2 items-center ">
							<ReCaptcha
								options={optionData.recaptcha}
								onChange={onChangeReCaptcha}
							/>
						</div>
					</PGtab>
					<PGtab name="tabEmailOTP">
						<div className="flex mb-5  justify-start gap-2 items-center ">
							<EmailOtp
								options={optionData.email_otp}
								onChange={onChangeEmailOTP}
							/>
						</div>
					</PGtab>
					<PGtab name="tabSpam">
						<div className="flex mb-5  justify-start gap-2 items-center ">
							{optionData?.spam_protection && (
								<SpamProtection
									options={optionData.spam_protection}
									onChange={onChangeSpamProtection}
								/>
							)}
						</div>
					</PGtab>
					<PGtab name="tabIsSpammy">
						<div className="flex mb-5  justify-start gap-2 items-center ">
							<IsSpammy
								options={optionData.isspammy}
								onChange={onChangeIsSpammy}
							/>
						</div>
					</PGtab>
					<PGtab name="magicLogin">
						<div className="flex mb-5  justify-start gap-2 items-center ">
							<MagicLogin
								options={optionData.magicLogin}
								onChange={onChangeMagicLogin}
								pageList={pageList}
							/>
						</div>
					</PGtab>
					<PGtab name="emailValidation">
						<div className="flex mb-5  justify-start gap-2 items-center ">
							<EmailValidation
								options={optionData.emailValidation}
								onChange={onChangeEmailValidation}
								pageList={pageList}
								roles={roles}
							/>
						</div>
					</PGtab>

					<PGtab name="tabEmailVerification">
						<div className="flex mb-5  justify-start gap-2 items-center ">
							<EmailVerification
								options={optionData.email_verification}
								onChange={onChangeEmailVerification}
								pageList={pageList}
								roles={roles}
							/>
						</div>
						<div className="flex mb-5  justify-start gap-2 items-center ">
							<ErrorMessage
								options={optionData.messages}
								onChange={onChangeErrorMessages}
							/>
						</div>

						<div className="flex mb-5  justify-start gap-2 items-center ">
							<ThirdParty
								options={optionData}
								onChange={onChangeUserVerificationSettings}
							/>
						</div>
					</PGtab>

					<PGtab name="export/import">
						<div>
							<div className="text-2xl font-bold mb-7">
								{__("Export/Import Settings", "user-verification")}
							</div>
							<div className="flex gap-4">
								<h3 className="text-lg w-[300px] m-0">
									{__("Import", "user-verification")}
								</h3>
								<div className="flex flex-col gap-4 items-start ">
									<p className="!m-0 ">
										{__(
											"Please select the data file to import",
											"user-verification"
										)}
										:{" "}
									</p>
									<div className="flex items-start">
										<div className="flex flex-col">
											<input
												type="file"
												name=""
												id=""
												accept=".json"
												onChange={handleFileChange}
											/>
											<p className="text-[#ec942c] text-xs ">
												{__("Supported file type", "user-verification")}: .json
											</p>
										</div>
										<div>
											<button
												className="pg-font flex gap-2 justify-center cursor-pointer py-2 px-4 capitalize bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
												onClick={handleImport}>
												{importStatus === "run" ? "Importing..." : "Import"}
											</button>
											{importStatus === "stop" && (
												<p className="text-emerald-500 m-0 ">
													{__("Imported", "user-verification")}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="flex gap-4">
								<h3 className="text-lg w-[300px] m-0 ">
									{__("Export", "user-verification")}
								</h3>
								<div className="flex gap-4 items-center ">
									<p className="!m-0 ">
										{__("Export settings", "user-verification")}:{" "}
									</p>
									<ExportButton />
								</div>
							</div>
						</div>
					</PGtab>
				</PGtabs>
			</div>
		</div>
	);
}
class PGDashboard extends Component {
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
		var { onChange, setEnable } = this.props;
		return <Html setEnable={setEnable} warn={this.state.showWarning} />;
	}
}
export default PGDashboard;
