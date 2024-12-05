const { Component } = wp.element;
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

import apiFetch from "@wordpress/api-fetch";
import { Spinner } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { settings } from "@wordpress/icons";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import EmailOtp from "./EmailOtp";
import EmailVerification from "./EmailVerification";
import ErrorMessage from "./ErrorMessage";

function Html(props) {
	if (!props.warn) {
		return null;
	}
	var [isLoading, setisLoading] = useState(false); // Using the hook.
	var [needSave, setneedSave] = useState(false); // Using the hook.

	var isProFeature = applyFilters("isProFeature", true);
	var optionDataDefault = {
		apiKeys: {},
	};
	var [optionData, setoptionData] = useState({}); // Using the hook.
	var [optionDataSaved, setoptionDataSaved] = useState({}); // Using the hook.
	var [dashboardTabs, setdashboardTabs] = useState([
		{
			name: "tabEmailVerification",
			title: "Email Verification",
			icon: settings,
			className: "tab-tabEmailVerification",
			hidden: false,
			isPro: false,
		},
		{
			name: "tabEmailOTP",
			title: "Email OTP",
			icon: settings,
			className: "tab-tabEmailOTP",
			hidden: false,
			isPro: false,
		},
		{
			name: "tabIsSpammy",
			title: "IsSpammy Protection",
			icon: settings,
			className: "tab-tabIsSpammy",
			hidden: false,
			isPro: false,
		},
		{
			name: "tabSpam",
			title: "Spam Protection",
			icon: settings,
			className: "tab-tabSpam",
			hidden: false,
			isPro: false,
		},
		{
			name: "tabEmailTemplates",
			title: "Email Templates",
			icon: settings,
			className: "tab-tabEmailTemplates",
			hidden: false,
			isPro: false,
		},
		{
			name: "tabreCAPTCHA",
			title: "reCAPTCHA",
			icon: settings,
			className: "tab-tabreCAPTCHA",
			hidden: false,
			isPro: false,
		},
		{
			name: "tabTools",
			title: "Tools",
			icon: settings,
			className: "tab-tabTools",
			hidden: false,
			isPro: false,
		},
		{
			name: "tabHelp",
			title: "Help & support",
			icon: settings,
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
	useEffect(() => {
		setisLoading(true);
		apiFetch({
			path: "/user-verification/v2/get_options",
			method: "POST",
			data: { option: "user_verification_settings" },
		}).then((res) => {
			if (res.length != 0) {
				var resX = { ...res };

				console.log(resX);

				setoptionDataSaved(resX);
				setoptionData(resX);
			}
			setisLoading(false);
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
	function onChangeErrorMessages(options) {
		var optionDataX = { ...optionData, messages: options };
		setoptionData(optionDataX);
	}

	return (
		<div className="pg-setting-input-text pg-dashboard">
			{isLoading && <Spinner />}

			{!isLoading && (
				<>
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
										{isProFeature && (
											<>
												<a
													href="https://comboblocks.com/pricing/?utm_source=CBDashboard&utm_medium=topNav&utm_campaign=CBPro"
													target="_blank"
													className="bg-amber-500 text-[16px] font-bold no-underline rounded-sm p-2 px-4 whitespace-nowrap cursor-pointer text-white lg:text-lg ">
													{__("Buy Pro", "user-verification")}
												</a>
											</>
										)}
										{isLoading && (
											<span className="">
												<Spinner />
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
										href="https://comboblocks.com/documentations/"
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
										{isLoading && (
											<span className="">
												<Spinner />
											</span>
										)}

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
					{JSON.stringify(optionData.email_otp)}
					<div id="" className="pg-setting-input-text  ">
						<PGtabs
							activeTab="tabEmailVerification"
							orientation="vertical"
							contentClass=" p-5 bg-white w-full"
							navItemClass="bg-gray-500 px-5 py-3 gap-2 border-0 border-b border-solid border-gray-500"
							navItemSelectedClass="bg-gray-700"
							activeClass="active-tab"
							onSelect={(tabName) => {}}
							tabs={dashboardTabs}>
							<PGtab name="overview">
								<div className="flex w-full h-full justify-center items-center font-bold text-3xl text-gray-800 pg-font ">
									{__("Combo Blocks", "user-verification")}
								</div>
							</PGtab>
							<PGtab name="tabEmailOTP">
								<div className="flex mb-5  justify-start gap-2 items-center ">
									<EmailOtp
										options={optionData.email_otp}
										onChange={onChangeEmailVerification}
									/>
								</div>
							</PGtab>
							<PGtab name="tabEmailVerification">
								<div className="flex mb-5  justify-start gap-2 items-center ">
									<EmailVerification
										options={optionData.email_verification}
										onChange={onChangeEmailVerification}
									/>
								</div>
								<div className="flex mb-5  justify-start gap-2 items-center ">
									<ErrorMessage
										options={optionData.messages}
										onChange={onChangeErrorMessages}
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
														{__("Supported file type", "user-verification")}:
														.json
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
				</>
			)}
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
