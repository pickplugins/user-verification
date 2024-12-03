const { Component } = wp.element;
import { Button, Dropdown } from "@wordpress/components";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	close,
	edit,
	copy,
	pen,
} from "@wordpress/icons";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { useSelect } from "@wordpress/data";

import {
	__experimentalInputControl as InputControl,
	Popover,
	Spinner,
	PanelBody,
	ToggleControl,
	PanelRow,
	ColorPalette,
	RangeControl,
	TextareaControl,
} from "@wordpress/components";
import PGStyles from "../styles";
import PGDropdown from "../dropdown";

var myStore = wp.data.select("postgrid-shop");

const PGAPIKeys = (props) => {
	// console.log(props)
	const [apiKeys, setapiKeys] = useState(props.args);
	// console.log(apiKeys)

	const keysList = {
		brevo: {
			id: "brevo",
			label: "Brevo",
			args: {
				apikey: "",
			},
		},
		klaviyo: {
			id: "klaviyo",
			label: "Klaviyo",
			args: {
				apikey: "",
			},
		},
		aweber: {
			id: "aweber",
			label: "Aweber API",
			args: {
				accountId: "",
				accessToken: "",
			},
		},
		mailerlite: {
			id: "mailerlite",
			label: "Mailer Lite",
			args: {
				apikey: "",
			},
		},
		emailoctopus: {
			id: "emailoctopus",
			label: "Email Octopus",
			args: {
				apikey: "",
			},
		},
		sender: {
			id: "sender",
			label: "Sender",
			args: {
				apiToken: "",
			},
		},
		constantcontact: {
			id: "constantcontact",
			label: "Constant Contact",
			args: {
				accessToken: "",
			},
		},
		getresponse: {
			id: "getresponse",
			label: "Get Response",
			args: {
				campaignId: "",
			},
		},
		drip: {
			id: "drip",
			label: "Drip",
			args: {
				accountId: "",
				apikey: "",
			},
		},
		mailmodo: {
			id: "mailmodo",
			label: "mailmodo",
			args: {
				apikey: "",
			},
		},
		moosend: {
			id: "moosend",
			label: "Moo Send",
			args: {
				apikey: "",
			},
		},
		hubspot: {
			id: "hubspot",
			label: "Hub Spot",
			args: {
				apikey: "",
			},
		},
		mailjet: {
			id: "mailjet",
			label: "Mailjet",
			args: {
				apikeyPublic: "",
				apikeyPrivate: "",
			},
		},
		mailgun: {
			id: "mailgun",
			label: "Mailgun",
			args: {
				username: "",
				pass: "",
			},
		},
		convertkit: {
			id: "convertkit",
			label: "Convert Kit",
			args: {
				apikey: "",
				apiSecret: "",
			},
		},
		elasticemail: {
			id: "elasticemail",
			label: "Elastice Mail",
			args: {
				apikey: "",
			},
		},
		sendgrid: {
			id: "sendgrid",
			label: "Send Grid",
			args: {
				apikey: "",
			},
		},
		mailchimp: {
			id: "mailchimp",
			label: "Mail Chimp",
			args: {
				apikey: "",
			},
		},
		activeCampaing: {
			id: "activeCampaing",
			label: "Active Campaing",
			args: {
				apikey: "",
				accountName: "",
			},
		},
		zoho: {
			id: "zoho",
			label: "Zoho",
			args: {
				apikey: "",
			},
		},
		netcore: {
			id: "netcore",
			label: "Net Core",
			args: {
				apikey: "",
			},
		},
		postman: {
			id: "postman",
			label: "Postman",
			args: {
				apikey: "",
			},
		},
		reCAPTCHA: {
			id: "reCAPTCHA",
			label: "reCAPTCHA",
			args: {
				site_key: "",
			},
		},
		hCAPTCHA: {
			id: "hCAPTCHA",
			label: "hCAPTCHA",
			args: {
				site_key: "",
			},
		},
		gMAP: {
			id: "gMAP",
			label: "Google Map",
			args: {
				apikey: "",
			},
		},
		openAI: {
			id: "openAI",
			label: "openAI",
			args: {
				apikey: "",
				model: "",
			},
		},
	};

	useEffect(() => {
		props.onChange(apiKeys);
	}, [apiKeys]);
	function handleSetAPIKeys(option, index) {
		const { id, label, args } = option;
		const newApiKeys = {
			...apiKeys,
			[id]: { id, label, args },
		};

		setapiKeys(newApiKeys);
	}
	function handleInputChange(id, field, value) {
		setapiKeys((prevState) => ({
			...prevState,
			[id]: {
				...prevState[id],
				args: {
					...prevState[id].args,
					[field]: value,
				},
			},
		}));
	}
	function handleDeleteKey(id) {
		setapiKeys((prevState) => {
			const newApiKeys = { ...prevState };
			delete newApiKeys[id];
			return newApiKeys;
		});
	}
	return (
		<div className="">
			<div className="flex items-center gap-6 mb-10 ">
				<label for="" className="font-medium text-slate-900  pg-font  ">
					Site Name
				</label>

				<PGDropdown
					position="bottom right"
					// variant="secondary"
					options={keysList}
					buttonTitle="Choose"
					onChange={handleSetAPIKeys}
					values={[]}></PGDropdown>
			</div>
			{Object.entries(apiKeys).map(([key, value]) => {
				console.log(value);
				return (
					<PanelBody
						className="font-medium text-slate-900 "
						title={
							<>
								<span
									className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer"
									onClick={() => handleDeleteKey(key)}>
									<span className="text-[20px] text-white">&times;</span>
								</span>
								<span className="px-3">{value.label}</span>
							</>
						}
						initialOpen={false}>
						{Object.entries(value.args).map(([item, value]) => {
							console.log(item);
							return (
								<div className="pg-setting-input-text flex items-center gap-8 mb-4">
									<label
										htmlFor=""
										className="font-medium text-slate-900 pg-font w-1/6 ">
										{item === "apikey" && <>API Key</>}
										{item === "apiSecret" && <>API Secret</>}
										{item === "username" && <>UserName</>}
										{item === "accountName" && <>Account Name</>}
										{item === "pass" && <>Password</>}
										{item === "accountId" && <>Account Id</>}
										{item === "subscriberId" && <>Subscriber Id</>}
										{item === "listId" && <>List Id</>}
										{item === "apiToken" && <>API Token</>}
										{item === "accessToken" && <>Access Token</>}
										{item === "campaignId" && <>Campaign Id</>}
										{item === "apikeyPrivate" && <>Private Api Key</>}
										{item === "apikeyPublic" && <>Public Api Key</>}
										{item === "site_key" && <>Site Key</>}
										{item === "model" && <>Model</>}
									</label>
									<InputControl
										value={value}
										className="min-w-[320px]"
										onChange={(newVal) => handleInputChange(key, item, newVal)}
									/>
								</div>
							);
						})}
					</PanelBody>
				);
			})}

			{/* {Object.entries(apiKeys).map(([key, value]) => (
				<PanelRow key={key}>
					<div className="api-key-item">
						<strong>{value.label}</strong>
						<pre>{JSON.stringify(value.args, null, 2)}</pre>
					</div>
				</PanelRow>
			))} */}
		</div>
	);
};

export default PGAPIKeys;
