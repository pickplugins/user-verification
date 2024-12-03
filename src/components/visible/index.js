import {
	Button,
	PanelRow,
	PanelBody,
	ToggleControl,
	Dropdown,
	Popover,
	SelectControl,
	RangeControl,
	Panel,
	DropdownMenu,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	MenuGroup,
	MenuItem,
	TextareaControl,
	Spinner,
	Tooltip,
	DateTimePicker,
	DatePicker,
} from "@wordpress/components";
import { applyFilters } from "@wordpress/hooks";
import apiFetch from "@wordpress/api-fetch";

import { __experimentalInputControl as InputControl } from "@wordpress/components";

import {
	useState,
	useEffect,
	Component,
	RawHTML,

	////
	useRef,

	////
} from "@wordpress/element";
import { Icon, close } from "@wordpress/icons";
import PGDropdown from "../../components/dropdown";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	const [visible, setVisible] = useState(props.visible);

	var [rules, setrules] = useState(
		visible?.rules == null || visible?.rules == undefined ? [] : visible.rules
	);
	console.log(rules);

	var [enableDatePicker, setenableDatePicker] = useState(false);
	const [userRoles, setuserRoles] = useState({});
	const [taxonomies, settaxonomies] = useState({});
	console.log(taxonomies);
	console.log(userRoles);

	useEffect(() => {
		console.log(visible);

		props.onChange(visible);
	}, [visible]);

	useEffect(() => {
		console.log(rules);

		var visibleX = { ...visible };
		visibleX.rules = rules;

		console.log(visibleX);

		setVisible(visibleX);
	}, [rules]);

	useEffect(() => {
		apiFetch({
			path: "/post-grid/v2/get_site_data",
			method: "POST",
			data: {},
		}).then((res) => {
			console.log(res);
			console.log(res.roles);
			console.log(res.taxonomies);

			var userRolesList = [];

			Object.entries(res.roles).map((args) => {
				var id = args[0];
				var label = args[1];
				userRolesList.push({ label: label, value: id });
			});
			var taxonomiesList = {};

			// Object.entries(res.taxonomies).map((args) => {
			// 	var id = args[0];
			// 	var label = args[1];
			// 	taxonomiesList.push({ label: label, value: id });
			// });

			res?.taxonomies.forEach((tax, index) => {
				taxonomiesList[tax.id] = { label: tax.label, value: tax.id };
			});

			console.log(taxonomiesList);

			setuserRoles(userRolesList);
			settaxonomies(taxonomiesList);
		});
	}, []);

	var monthsNum = {
		1: { label: "January", value: 1 },
		2: { label: "February", value: 2 },
		3: { label: "March", value: 3 },
		4: { label: "April", value: 4 },
		5: { label: "May", value: 5 },
		6: { label: "June", value: 6 },
		7: { label: "July", value: 7 },
		8: { label: "August", value: 8 },
		9: { label: "September", value: 9 },
		10: { label: "October", value: 10 },
		11: { label: "November", value: 11 },
		12: { label: "December", value: 12 },
	};

	var weekDayNumn = {
		0: { label: "Sunday", value: 0 },
		1: { label: "Monday", value: 1 },
		2: { label: "Tuesday", value: 2 },
		3: { label: "Wednesday", value: 3 },
		4: { label: "Thursday", value: 4 },
		5: { label: "Friday", value: 5 },
		6: { label: "Saturday", value: 6 },
	};

	var hoursNum = {
		0: { label: "12AM", value: 0 },
		1: { label: "1AM", value: 1 },
		2: { label: "2AM", value: 2 },
		3: { label: "3AM", value: 3 },
		4: { label: "4AM", value: 4 },
		5: { label: "5AM", value: 5 },
		6: { label: "6AM", value: 6 },
		7: { label: "7AM", value: 7 },
		8: { label: "8AM", value: 8 },
		9: { label: "9AM", value: 9 },
		10: { label: "10AM", value: 10 },
		11: { label: "11AM", value: 11 },
		12: { label: "12PM", value: 12 },
		13: { label: "1PM", value: 13 },
		14: { label: "2PM", value: 14 },
		15: { label: "3PM", value: 15 },
		16: { label: "4PM", value: 16 },
		17: { label: "5PM", value: 17 },
		18: { label: "6PM", value: 18 },
		19: { label: "7PM", value: 19 },
		20: { label: "8PM", value: 20 },
		21: { label: "9PM", value: 21 },
		22: { label: "10PM", value: 22 },
		23: { label: "11PM", value: 23 },
	};

	var countryName = [
		{ label: "Afghanistan", value: "afghanistan" },
		{ label: "Albania", value: "albania" },
		{ label: "Algeria", value: "algeria" },
		{ label: "Andorra", value: "andorra" },
		{ label: "Angola", value: "angola" },
		{ label: "Antigua and Barbuda", value: "antiguaAndBarbuda" },
		{ label: "Argentina", value: "argentina" },
		{ label: "Armenia", value: "armenia" },
		{ label: "Australia", value: "australia" },
		{ label: "Austria", value: "austria" },
		{ label: "Azerbaijan", value: "azerbaijan" },
		{ label: "Bahamas", value: "bahamas" },
		{ label: "Bahrain", value: "bahrain" },
		{ label: "Bangladesh", value: "bangladesh" },
		{ label: "Barbados", value: "barbados" },
		{ label: "Belarus", value: "belarus" },
		{ label: "Belgium", value: "belgium" },
		{ label: "Belize", value: "belize" },
		{ label: "Benin", value: "benin" },
		{ label: "Bhutan", value: "bhutan" },
		{ label: "Bolivia", value: "bolivia" },
		{ label: "Bosnia and Herzegovina", value: "bosniaAndHerzegovina" },
		{ label: "Botswana", value: "botswana" },
		{ label: "Brazil", value: "brazil" },
		{ label: "Brunei", value: "brunei" },
		{ label: "Bulgaria", value: "bulgaria" },
		{ label: "Burkina Faso", value: "burkinaFaso" },
		{ label: "Burundi", value: "burundi" },
		{ label: "Cabo Verde", value: "caboVerde" },
		{ label: "Cambodia", value: "cambodia" },
		{ label: "Cameroon", value: "cameroon" },
		{ label: "Canada", value: "canada" },
		{ label: "Central African Republic", value: "centralAfricanRepublic" },
		{ label: "Chad", value: "chad" },
		{ label: "Chile", value: "chile" },
		{ label: "China", value: "china" },
		{ label: "Colombia", value: "colombia" },
		{ label: "Comoros", value: "comoros" },
		{ label: "Congo", value: "congo" },
		{ label: "Costa Rica", value: "costaRica" },
		{ label: "Croatia", value: "croatia" },
		{ label: "Cuba", value: "cuba" },
		{ label: "Cyprus", value: "cyprus" },
		{ label: "Czechia", value: "czechia" },
		{ label: "Denmark", value: "denmark" },
		{ label: "Djibouti", value: "djibouti" },
		{ label: "Dominica", value: "dominica" },
		{ label: "Dominican Republic", value: "dominicanRepublic" },
		{ label: "Ecuador", value: "ecuador" },
		{ label: "Egypt", value: "egypt" },
		{ label: "El Salvador", value: "elSalvador" },
		{ label: "Equatorial Guinea", value: "equatorialGuinea" },
		{ label: "Eritrea", value: "eritrea" },
		{ label: "Estonia", value: "estonia" },
		{ label: "Eswatini", value: "eswatini" },
		{ label: "Ethiopia", value: "ethiopia" },
		{ label: "Fiji", value: "fiji" },
		{ label: "Finland", value: "finland" },
		{ label: "France", value: "france" },
		{ label: "Gabon", value: "gabon" },
		{ label: "Gambia", value: "gambia" },
		{ label: "Georgia", value: "georgia" },
		{ label: "Germany", value: "germany" },
		{ label: "Ghana", value: "ghana" },
		{ label: "Greece", value: "greece" },
		{ label: "Grenada", value: "grenada" },
		{ label: "Guatemala", value: "guatemala" },
		{ label: "Guinea", value: "guinea" },
		{ label: "Guinea-Bissau", value: "guineaBissau" },
		{ label: "Guyana", value: "guyana" },
		{ label: "Haiti", value: "haiti" },
		{ label: "Honduras", value: "honduras" },
		{ label: "Hungary", value: "hungary" },
		{ label: "Iceland", value: "iceland" },
		{ label: "India", value: "india" },
		{ label: "Indonesia", value: "indonesia" },
		{ label: "Iran", value: "iran" },
		{ label: "Iraq", value: "iraq" },
		{ label: "Ireland", value: "ireland" },
		{ label: "Israel", value: "israel" },
		{ label: "Italy", value: "italy" },
		{ label: "Jamaica", value: "jamaica" },
		{ label: "Japan", value: "japan" },
		{ label: "Jordan", value: "jordan" },
		{ label: "Kazakhstan", value: "kazakhstan" },
		{ label: "Kenya", value: "kenya" },
		{ label: "Kiribati", value: "kiribati" },
		{ label: "Korea, North", value: "koreaNorth" },
		{ label: "Korea, South", value: "koreaSouth" },
		{ label: "Kosovo", value: "kosovo" },
		{ label: "Kuwait", value: "kuwait" },
		{ label: "Kyrgyzstan", value: "kyrgyzstan" },
		{ label: "Laos", value: "laos" },
		{ label: "Latvia", value: "latvia" },
		{ label: "Lebanon", value: "lebanon" },
		{ label: "Lesotho", value: "lesotho" },
		{ label: "Liberia", value: "liberia" },
		{ label: "Libya", value: "libya" },
		{ label: "Liechtenstein", value: "liechtenstein" },
		{ label: "Lithuania", value: "lithuania" },
		{ label: "Luxembourg", value: "luxembourg" },
		{ label: "Madagascar", value: "madagascar" },
		{ label: "Malawi", value: "malawi" },
		{ label: "Malaysia", value: "malaysia" },
		{ label: "Maldives", value: "maldives" },
		{ label: "Mali", value: "mali" },
		{ label: "Malta", value: "malta" },
		{ label: "Marshall Islands", value: "marshallIslands" },
		{ label: "Mauritania", value: "mauritania" },
		{ label: "Mauritius", value: "mauritius" },
		{ label: "Mexico", value: "mexico" },
		{ label: "Micronesia", value: "micronesia" },
		{ label: "Moldova", value: "moldova" },
		{ label: "Monaco", value: "monaco" },
		{ label: "Mongolia", value: "mongolia" },
		{ label: "Montenegro", value: "montenegro" },
		{ label: "Morocco", value: "morocco" },
		{ label: "Mozambique", value: "mozambique" },
		{ label: "Myanmar", value: "myanmar" },
		{ label: "Namibia", value: "namibia" },
		{ label: "Nauru", value: "nauru" },
		{ label: "Nepal", value: "nepal" },
		{ label: "Netherlands", value: "netherlands" },
		{ label: "New Zealand", value: "newZealand" },
		{ label: "Nicaragua", value: "nicaragua" },
		{ label: "Niger", value: "niger" },
		{ label: "Nigeria", value: "nigeria" },
		{ label: "North Macedonia", value: "northMacedonia" },
		{ label: "Norway", value: "norway" },
		{ label: "Oman", value: "oman" },
		{ label: "Pakistan", value: "pakistan" },
		{ label: "Palau", value: "palau" },
		{ label: "Palestine", value: "palestine" },
		{ label: "Panama", value: "panama" },
		{ label: "Papua New Guinea", value: "papuaNewGuinea" },
		{ label: "Paraguay", value: "paraguay" },
		{ label: "Peru", value: "peru" },
		{ label: "Philippines", value: "philippines" },
		{ label: "Poland", value: "poland" },
		{ label: "Portugal", value: "portugal" },
		{ label: "Qatar", value: "qatar" },
		{ label: "Romania", value: "romania" },
		{ label: "Russia", value: "russia" },
		{ label: "Rwanda", value: "rwanda" },
		{ label: "Saint Kitts and Nevis", value: "saintKittsAndNevis" },
		{ label: "Saint Lucia", value: "saintLucia" },
		{
			label: "Saint Vincent and the Grenadines",
			value: "saintVincentAndTheGrenadines",
		},
		{ label: "Samoa", value: "samoa" },
		{ label: "San Marino", value: "sanMarino" },
		{ label: "Sao Tome and Principe", value: "saoTomeAndPrincipe" },
		{ label: "Saudi Arabia", value: "saudiArabia" },
		{ label: "Senegal", value: "senegal" },
		{ label: "Serbia", value: "serbia" },
		{ label: "Seychelles", value: "seychelles" },
		{ label: "Sierra Leone", value: "sierraLeone" },
		{ label: "Singapore", value: "singapore" },
		{ label: "Slovakia", value: "slovakia" },
		{ label: "Slovenia", value: "slovenia" },
		{ label: "Solomon Islands", value: "solomonIslands" },
		{ label: "Somalia", value: "somalia" },
		{ label: "South Africa", value: "southAfrica" },
		{ label: "South Sudan", value: "southSudan" },
		{ label: "Spain", value: "spain" },
		{ label: "Sri Lanka", value: "sriLanka" },
		{ label: "Sudan", value: "sudan" },
		{ label: "Suriname", value: "suriname" },
		{ label: "Sweden", value: "sweden" },
		{ label: "Switzerland", value: "switzerland" },
		{ label: "Syria", value: "syria" },
		{ label: "Taiwan", value: "taiwan" },
		{ label: "Tajikistan", value: "tajikistan" },
		{ label: "Tanzania", value: "tanzania" },
		{ label: "Thailand", value: "thailand" },
		{ label: "Timor-Leste", value: "timorLeste" },
		{ label: "Togo", value: "togo" },
		{ label: "Tonga", value: "tonga" },
		{ label: "Trinidad and Tobago", value: "trinidadAndTobago" },
		{ label: "Tunisia", value: "tunisia" },
		{ label: "Turkey", value: "turkey" },
		{ label: "Turkmenistan", value: "turkmenistan" },
		{ label: "Tuvalu", value: "tuvalu" },
		{ label: "Uganda", value: "uganda" },
		{ label: "Ukraine", value: "ukraine" },
		{ label: "United Arab Emirates", value: "unitedArabEmirates" },
		{ label: "United Kingdom", value: "unitedKingdom" },
		{ label: "United States", value: "unitedStates" },
		{ label: "Uruguay", value: "uruguay" },
		{ label: "Uzbekistan", value: "uzbekistan" },
		{ label: "Vanuatu", value: "vanuatu" },
		{ label: "Vatican City", value: "vaticanCity" },
		{ label: "Venezuela", value: "venezuela" },
		{ label: "Vietnam", value: "vietnam" },
		{ label: "Yemen", value: "yemen" },
		{ label: "Zambia", value: "zambia" },
		{ label: "Zimbabwe", value: "zimbabwe" },
	];

	var capabilities = {
		manage_links: { label: "Manage Links", value: "manage_links" },
		manage_options: { label: "Manage Options", value: "manage_options" },
	};

	function getCountryByValue(value) {
		const foundSize = countryName.find((X) => X.value === value);
		return foundSize ? foundSize.label : null;
	}

	var displaySize = [
		{ label: "Desktop", value: "desktop" },
		{ label: "Tablet", value: "tablet" },
		{ label: "Mobile", value: "mobile" },
	];

	function getDeviceByValue(value) {
		// for (const key in displaySize) {
		// 	if (displaySize[key].value === value) {
		// 		return displaySize[key].label;
		// 	}
		// }
		// return null; // Return null if the value is not found
		const foundSize = displaySize.find((X) => X.value === value);
		return foundSize ? foundSize.label : null;
	}

	var browserList = [
		{
			label: "Google Chrome",
			value: "googleChrome",
		},
		{
			label: "Mozilla Firefox",
			value: "mozillaFirefox",
		},
		{ label: "Safari", value: "safari" },
		{
			label: "Microsoft Edge",
			value: "microsoftEdge",
		},
		{ label: "Opera", value: "opera" },
		{ label: "Brave", value: "brave" },
		{ label: "Vivaldi", value: "vivaldi" },
		{ label: "Tor Browser", value: "torBrowser" },
		{ label: "UC Browser", value: "ucBrowser" },
		{ label: "Chromium", value: "chromium" },
		{ label: "Maxthon", value: "maxthon" },
		{ label: "Pale Moon", value: "paleMoon" },
		{
			label: "Avant Browser",
			value: "avantBrowser",
		},
		{
			label: "Epic Privacy Browser",
			value: "epicPrivacyBrowser",
		},
		{ label: "Waterfox", value: "waterfox" },
	];

	function getBrowserByValue(value) {
		const foundSize = browserList.find((X) => X.value === value);
		return foundSize ? foundSize.label : null;
	}
	var platformList = [
		{
			label: "Google Chrome",
			value: "googleChrome",
		},
		{
			label: "Mozilla Firefox",
			value: "mozillaFirefox",
		},
		{ label: "Safari", value: "safari" },
		{
			label: "Microsoft Edge",
			value: "microsoftEdge",
		},
		{ label: "Opera", value: "opera" },
		{ label: "Brave", value: "brave" },
		{ label: "Vivaldi", value: "vivaldi" },
		{ label: "Tor Browser", value: "torBrowser" },
		{ label: "UC Browser", value: "ucBrowser" },
		{ label: "Chromium", value: "chromium" },
		{ label: "Maxthon", value: "maxthon" },
		{ label: "Pale Moon", value: "paleMoon" },
		{
			label: "Avant Browser",
			value: "avantBrowser",
		},
		{
			label: "Epic Privacy Browser",
			value: "epicPrivacyBrowser",
		},
		{ label: "Waterfox", value: "waterfox" },
	];

	function getPlatformByValue(value) {
		const foundSize = platformList.find((X) => X.value === value);
		return foundSize ? foundSize.label : null;
	}

	var visibleArgsBasic = {
		userLogged: {
			label: "User Logged",
			description: "Show when user logged-in(any user)",
			args: { id: "userLogged", value: "" },
		},
		userNotLogged: {
			label: "User Not Logged",
			description: "Show when user Not logged-in.",
			args: { id: "userNotLogged", value: "" },
		},
		userRoles: {
			label: "User Roles",
			description: "Show when user has specific roles.",
			args: { id: "userRoles", roles: [], compare: "include" },
			isPro: false,
		},
		userIds: {
			label: "User Ids",
			description: "Show when user has specific ids.",
			args: { id: "userIds", value: "", values: [], compare: "=" },
			isPro: true,
		},

		isYears: {
			label: "is Years",
			description: "Show when specific Years",
			args: { id: "isYears", value: "", values: "", compare: "=" },
			isPro: true,
		},
		isMonths: {
			label: "is Months",
			description: "Show when specific months",
			args: { id: "isMonths", value: "", values: [], compare: "=" },
			isPro: true,
		},
		weekDays: {
			label: "is Week day",
			description: "Show when specific week days",
			args: { id: "weekDays", value: "", values: [], compare: "=" },
			isPro: true,
		},
		isHours: {
			label: "is Hours",
			description: "Show when specific hours",
			args: { id: "isHours", value: "", values: [], compare: "=" },
			isPro: true,
		},
		//isMinutes: { label: 'is Minutes', description: 'Show when specific Minutes', args: { id: 'isMinutes', value: '', values: [], compare: '=' }, isPro:true },
		isDate: {
			label: "is Date",
			description: "Show when specific date",
			args: { id: "isDate", value: "", values: [], compare: "=" },
			isPro: true,
		},

		urlString: {
			label: "URL String",
			description: "If URL contain certain string.",
			args: { id: "urlString", value: "" },
			isPro: true,
		},
		urlPrams: {
			label: "URL Prams",
			description:
				"If URL contain certain parameter(ex: domain.com/some-page?urlPram=pramVal)",
			args: { id: "urlPrams", value: "" },
			isPro: true,
		},
		referrerExist: {
			label: "Referrer Exist",
			description: "if visitor come from external website.",
			args: { id: "referrerExist", value: "" },
			isPro: true,
		},

		isDevice: {
			label: "Device",
			description: "Display popup based on device",
			args: { id: "isDevice", value: "", values: [], compare: "include" },
			isPro: false,
		},
		isPlatform: {
			label: "Platform",
			description: "Display popup based on platform",
			args: { id: "isPlatform", value: "", values: [] },
			isPro: true,
		},

		isTaxonomy: {
			label: "Is Taxonomy",
			description: "Display popup based on browsers",
			args: { id: "isTaxonomy", value: "", values: [], compare: "=" },
			isPro: true,
		},
		isCookie: {
			label: "Cookie",
			description: "Display popup based on browsers",
			args: { id: "isCookie", value: "", values: [], compare: "=" },
			isPro: true,
		},
		isUserMeta: {
			label: "User Meta",
			description: "Display popup based on browsers",
			args: { id: "isUserMeta", value: "", values: [], compare: "=" },
			isPro: true,
		},
		isPostMeta: {
			label: "Post Meta",
			description: "Display popup based on browsers",
			args: { id: "isPostMeta", value: "", values: [], compare: "=" },
			isPro: true,
		},
		isPlatforms: {
			label: "Is Platform",
			description: "Display popup based on browsers",
			args: { id: "isPlatforms", value: "", values: [], compare: "=" },
			isPro: true,
		},
		isBrowsers: {
			label: "Is Browsers",
			description: "Display popup based on browsers",
			args: { id: "isBrowsers", value: "", values: [], compare: "include" },
			isPro: false,
		},
		isCountries: {
			label: "Is Country",
			description: "Display popup based on countries",
			args: { id: "isCountries", value: "", values: [], compare: "include" },
			isPro: true,
		},

		userCapabilities: {
			label: "User Capability",
			description: "Show when user has specific capability.",
			args: {
				id: "userCapabilities",
				value: "",
				values: [],
				compare: "exist",
			},
			isPro: true,
		},

		postsIds: {
			label: "Post Ids",
			description: "Display popups on single post/page by ids",
			args: { id: "postsIds", value: "", values: [], compare: "include" },
			isPro: true,
		},
		termIds: {
			label: "Term Ids",
			description: "Display popups on terms page by ids",
			args: { id: "termIds", value: "", values: [], compare: "include" },
			isPro: true,
		},
		authorIds: {
			label: "Author Ids",
			description: "Display popups on author page by ids",
			args: { id: "authorIds", value: "", values: [], compare: "include" },
			isPro: true,
		},
		homePage: {
			label: "Is Home",
			description: "Display popups on home  page",
			args: { id: "homePage", value: "" },
			isPro: true,
		},

		frontPage: {
			label: "Is Front page",
			description: "Display popups on Front page",
			args: { id: "frontPage", value: "" },
			isPro: true,
		},
		postsPage: {
			label: "Is Posts Page",
			description: "Display popups on blog  page",
			args: { id: "postsPage", value: "" },
			isPro: true,
		},
		is404: {
			label: "Is Date Page",
			description: "Display popups on 404 archive page",
			args: { id: "is404", value: "", values: [], compare: "=" },
			isPro: true,
		},

		wcAccount: {
			label: "Is WooCommerce Account",
			description: "Display popups on WooCommerce my account page",
			args: { id: "wcAccount", value: "" },
			isPro: true,
		},
		wcShop: {
			label: "Is WooCommerce Shop",
			description: "Display popups on WooCommerce shop page",
			args: { id: "wcShop", value: "" },
			isPro: true,
		},
		searchPage: {
			label: "Is Search page",
			description: "Display popups on search page",
			args: { id: "searchPage", value: "" },
			isPro: true,
		},
	};

	let visibleArgs = applyFilters("postGridVisibleArgs", visibleArgsBasic);

	var RemoveVisibleGroup = function ({ title, index }) {
		return (
			<>
				<span
					className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
					onClick={(ev) => {
						var rulesX = [...rules];
						console.log(index);
						console.log(rulesX);
						rulesX.splice(index, 1);
						setrules(rulesX);
					}}>
					<Icon icon={close} />
				</span>
				<span>{title}</span>
			</>
		);
	};

	var RemoveVisibleArg = function ({ title, index, groupIndex }) {
		return (
			<>
				<span
					className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
					onClick={(ev) => {
						var rulesX = [...rules];
						rulesX[groupIndex].args.splice(index, 1);

						setrules(rulesX);
					}}>
					<Icon icon={close} />
				</span>

				<span>{title}</span>
			</>
		);
	};

	return (
		<div className="relative">
			<PanelRow className="my-3">
				<div
					// className="bg-blue-500 p-2 px-4 text-white inline-block cursor-pointer rounded-sm"
					className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize  bg-gray-800 text-white font-medium rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
					onClick={(ev) => {
						var rulesX = [...rules];

						rulesX.push({ relation: "OR", title: "", args: [] });

						console.log(rulesX);

						setrules(rulesX);
					}}>
					Add Group
				</div>

				<PanelRow>
					{/* <label>Relation?</label> */}
					<PGDropdown
						position="bottom right"
						variant="secondary"
						buttonTitle={
							visible?.relation == undefined ? "Relation?" : visible.relation
						}
						options={[
							{ label: "OR", value: "OR" },
							{ label: "AND", value: "AND" },
						]}
						onChange={(option, index) => {
							var visibleX = { ...visible };
							visibleX.relation = option.value;
							setVisible(visibleX);
						}}
						values=""></PGDropdown>
				</PanelRow>
			</PanelRow>

			<div className="my-4">
				{rules.map((group, groupIndex) => {
					console.log(group);

					return (
						<PanelBody
							title={
								<RemoveVisibleGroup title={groupIndex} index={groupIndex} />
							}
							initialOpen={false}>
							<PanelRow className="my-3">
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={"Add"}
									options={visibleArgs}
									onChange={(option, index) => {
										var rulesX = [...rules];

										rulesX[groupIndex]["args"].push(option.args);
										setrules(rulesX);
									}}
									values=""></PGDropdown>

								<PanelRow>
									<label>Relation?</label>
									<PGDropdown
										position="bottom right"
										variant="secondary"
										buttonTitle={
											group["relation"] == undefined
												? "Choose"
												: group["relation"]
										}
										options={[
											{ label: "OR", value: "OR" },
											{ label: "AND", value: "AND" },
										]}
										onChange={(option, index) => {
											var rulesX = [...rules];
											rulesX[groupIndex]["relation"] = option.value;
											setrules(rulesX);
										}}
										values=""></PGDropdown>
								</PanelRow>
							</PanelRow>

							{rules[groupIndex]["args"] != undefined &&
								rules[groupIndex]["args"].map((item, index) => {
									var id = item.id;

									return (
										<>
											<PanelBody
												title={
													<RemoveVisibleArg
														title={
															visibleArgs[id] == undefined
																? id
																: visibleArgs[id].label
														}
														index={index}
														groupIndex={groupIndex}
													/>
												}
												initialOpen={false}>
												{/* //*done */}
												{id == "userNotLogged" && (
													<div>No Option available for this condition.</div>
												)}

												{id == "userRoles" && (
													<div>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PGDropdown
															position="bottom right"
															variant="secondary"
															buttonTitle={"Add Role"}
															options={userRoles}
															onChange={(option, i) => {
																var rulesX = [...rules];

																var roles = item.roles;
																roles.push(option.value);
																rulesX[groupIndex]["args"][index].roles = roles;
																setrules(rulesX);
															}}
															value={item.roles}></PGDropdown>

														<div>
															{Object.entries(item.roles).map((x, k) => {
																var roleId = x[1];

																return (
																	<PanelRow className="mb-4">
																		<div>{roleId}</div>

																		<span
																			className="bg-red-500 p-1 cursor-pointer"
																			onClick={(ev) => {
																				var rulesX = [...rules];

																				//var roles = item.roles;
																				//roles.push(option.value);
																				rulesX[groupIndex]["args"][
																					index
																				].roles.splice(k, 1);
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</PanelRow>
																);
															})}
														</div>
													</div>
												)}

												{id == "userLogged" && (
													<>
														<div>No Option available for this condition.</div>
													</>
												)}
												{id == "userIds" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																User IDs
															</label>
															<InputControl
																className="mr-2"
																placeholder="1,2,3"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{id == "termIds" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Term IDs
															</label>
															<InputControl
																className="mr-2"
																placeholder="1,2,3"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{id == "authorIds" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Author IDs
															</label>
															<InputControl
																className="mr-2"
																placeholder="1,2,3"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{id == "postsIds" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Post IDs
															</label>
															<InputControl
																className="mr-2"
																placeholder="1,2,3"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{(id == "isYears" || id == "isMinutes") && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Year
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["value"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{item.compare == "between" && (
															<>
																<p> Please use comma separate values </p>
																<code>Ex: 2022,2023</code>
															</>
														)}

														{item.compare == "exist" && (
															<>
																<p> Please use comma separate values </p>
																<code>Ex: 2022,2023,2025</code>
															</>
														)}

														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: ">", value: ">" },
																	{ label: "<", value: "<" },
																	{ label: ">=", value: ">=" },
																	{ label: "<=", value: "<=" },
																	{
																		label: "between",
																		value: "between",
																	},
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "isMonths" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: ">", value: ">" },
																	{ label: "<", value: "<" },
																	{ label: ">=", value: ">=" },
																	{ label: "<=", value: "<=" },
																	{
																		label: "between",
																		value: "between",
																	},
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{(item.compare == "=" ||
															item.compare == "!=" ||
															item.compare == ">" ||
															item.compare == "<" ||
															item.compare == ">=" ||
															item.compare == "<=") && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={
																			item.value.length == 0
																				? "Choose Month"
																				: monthsNum[item.value].label
																		}
																		options={monthsNum}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];
																			rulesX[groupIndex]["args"][index][
																				"value"
																			] = option.value;
																			setrules(rulesX);
																		}}
																		value={item.value}></PGDropdown>
																</PanelRow>
															</>
														)}

														{/* {(item.compare == "between" ||
															item.compare == "exist") && (
															<>
																 */}
														{item.compare == "exist" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose Month"}
																		options={monthsNum}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];

																			rulesX[groupIndex]["args"][index][
																				"values"
																			].push(option.value);
																			setrules(rulesX);
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>
																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{monthsNum[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						var visibleX = {
																							...visible,
																						};
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
														{item.compare == "between" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose Month"}
																		options={monthsNum}
																		onChange={(option, optionIndex) => {
																			// var rulesX = [...rules];
																			// rulesX[groupIndex]["args"][index][
																			// 	"values"
																			// ].push(option.value);
																			// setrules(rulesX);
																			var rulesX = [...rules];
																			var valuesArray =
																				rulesX[groupIndex]["args"][index][
																					"values"
																				];

																			if (valuesArray.length < 2) {
																				valuesArray.push(option.value);

																				setrules(rulesX);
																			} else {
																				console.log(
																					"Only two values can be selected."
																				);
																			}
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>
																<div>
																	{item.values.slice(0, 2).map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{monthsNum[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						var visibleX = {
																							...visible,
																						};
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
														{/* </>
														)} */}
													</>
												)}

												{(id == "isDate" || id == "is404") && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: ">", value: ">" },
																	{ label: "<", value: "<" },
																	{ label: ">=", value: ">=" },
																	{ label: "<=", value: "<=" },
																	{
																		label: "between",
																		value: "between",
																	},
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{(item.compare == "=" ||
															item.compare == "!=" ||
															item.compare == ">" ||
															item.compare == "<" ||
															item.compare == ">=" ||
															item.compare == "<=") && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>

																	<Button
																		className={`pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-800 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 ${
																			enableDatePicker ? "!bg-gray-400" : ""
																		}`}
																		onClick={(ev) => {
																			setenableDatePicker((prev) => !prev);
																		}}>
																		{item.value.length == 0
																			? "Choose Date"
																			: item.value}
																	</Button>
																</PanelRow>

																{enableDatePicker && (
																	<Popover position="bottom left ">
																		<div className="p-4">
																			<DatePicker
																				onChange={(newDate) => {
																					const dateFull = new Date(newDate);

																					let day = dateFull.getDate();
																					day = day < 10 ? "0" + day : day;

																					let month = dateFull.getMonth() + 1;

																					month =
																						month.length > 1
																							? month
																							: "0" + month;

																					console.log(month);

																					let year = dateFull.getFullYear();

																					var dateStr =
																						year + "-" + month + "-" + day;
																					var rulesX = [...rules];
																					rulesX[groupIndex]["args"][index][
																						"value"
																					] = dateStr;
																					setrules(rulesX);
																				}}
																				is12Hour={true}
																			/>
																		</div>
																	</Popover>
																)}
															</>
														)}

														{item.compare == "between" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>

																	<Button
																		className={`pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-800 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 ${
																			enableDatePicker ? "!bg-gray-400" : ""
																		}`}
																		onClick={(ev) => {
																			setenableDatePicker((prev) => !prev);
																		}}>
																		Choose Date
																	</Button>
																</PanelRow>

																{enableDatePicker && (
																	<Popover position="bottom left ">
																		<div className="p-4">
																			<DatePicker
																				onChange={(newDate) => {
																					const dateFull = new Date(newDate);
																					let day = dateFull.getDate();
																					day = day < 10 ? "0" + day : day;

																					let month = dateFull.getMonth() + 1;
																					month =
																						month.length > 1
																							? month
																							: "0" + month;
																					let year = dateFull.getFullYear();

																					var dateStr =
																						year + "-" + month + "-" + day;

																					var rulesX = [...rules];

																					var valuesArray =
																						rulesX[groupIndex]["args"][index][
																							"values"
																						];

																					if (valuesArray.length < 2) {
																						valuesArray.push(dateStr);
																						setrules(rulesX);
																					} else {
																						console.log(
																							"Only two values can be selected."
																						);
																					}

																					// rulesX[groupIndex]["args"][index][
																					// 	"values"
																					// ].push(dateStr);
																					// setrules(rulesX);
																				}}
																				is12Hour={true}
																			/>
																		</div>
																	</Popover>
																)}

																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{x}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						var visibleX = {
																							...visible,
																						};
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
														{item.compare == "exist" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>

																	<Button
																		className={`pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-800 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 ${
																			enableDatePicker ? "!bg-gray-400" : ""
																		}`}
																		onClick={(ev) => {
																			setenableDatePicker((prev) => !prev);
																		}}>
																		Choose Date
																	</Button>
																</PanelRow>

																{enableDatePicker && (
																	<Popover position="bottom left ">
																		<div className="p-4">
																			<DatePicker
																				onChange={(newDate) => {
																					const dateFull = new Date(newDate);
																					let day = dateFull.getDate();
																					day = day < 10 ? "0" + day : day;

																					let month = dateFull.getMonth() + 1;
																					month =
																						month.length > 1
																							? month
																							: "0" + month;
																					let year = dateFull.getFullYear();

																					var dateStr =
																						year + "-" + month + "-" + day;

																					var rulesX = [...rules];

																					rulesX[groupIndex]["args"][index][
																						"values"
																					].push(dateStr);
																					setrules(rulesX);
																				}}
																				is12Hour={true}
																			/>
																		</div>
																	</Popover>
																)}

																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{x}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						var visibleX = {
																							...visible,
																						};
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
													</>
												)}

												{id == "weekDays" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: ">", value: ">" },
																	{ label: "<", value: "<" },
																	{ label: ">=", value: ">=" },
																	{ label: "<=", value: "<=" },
																	{
																		label: "between",
																		value: "between",
																	},
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{(item.compare == "=" ||
															item.compare == "!=" ||
															item.compare == ">" ||
															item.compare == "<" ||
															item.compare == ">=" ||
															item.compare == "<=") && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={
																			item.value.length == 0
																				? "Choose Day"
																				: weekDayNumn[item.value].label
																		}
																		options={weekDayNumn}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];
																			rulesX[groupIndex]["args"][index][
																				"value"
																			] = option.value;
																			setrules(rulesX);
																		}}
																		value={item.value}></PGDropdown>
																</PanelRow>
															</>
														)}

														{/* {(item.compare == "between" ||
															item.compare == "exist") && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose Days"}
																		options={weekDayNumn}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];

																			rulesX[groupIndex]["args"][index][
																				"values"
																			].push(option.value);
																			setrules(rulesX);
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>

																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{weekDayNumn[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						var visibleX = {
																							...visible,
																						};
																						item.values.splice(i, 1);

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)} */}
														{item.compare == "exist" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose Month"}
																		options={weekDayNumn}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];

																			rulesX[groupIndex]["args"][index][
																				"values"
																			].push(option.value);
																			setrules(rulesX);
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>
																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{weekDayNumn[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						var visibleX = {
																							...visible,
																						};
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
														{item.compare == "between" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose Month"}
																		options={weekDayNumn}
																		onChange={(option, optionIndex) => {
																			// var rulesX = [...rules];

																			// rulesX[groupIndex]["args"][index][
																			// 	"values"
																			// ].push(option.value);
																			// setrules(rulesX);
																			var rulesX = [...rules];
																			var valuesArray =
																				rulesX[groupIndex]["args"][index][
																					"values"
																				];

																			if (valuesArray.length < 2) {
																				valuesArray.push(option.value);

																				setrules(rulesX);
																			} else {
																				console.log(
																					"Only two values can be selected."
																				);
																			}
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>
																<div>
																	{item.values.slice(0, 2).map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{weekDayNumn[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						var visibleX = {
																							...visible,
																						};
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
													</>
												)}
												{id == "isHours" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: ">", value: ">" },
																	{ label: "<", value: "<" },
																	{ label: ">=", value: ">=" },
																	{ label: "<=", value: "<=" },
																	{
																		label: "between",
																		value: "between",
																	},
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{(item.compare == "=" ||
															item.compare == "!=" ||
															item.compare == ">" ||
															item.compare == "<" ||
															item.compare == ">=" ||
															item.compare == "<=") && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={
																			item.value.length == 0
																				? "Choose Hours"
																				: hoursNum[item.value].label
																		}
																		options={hoursNum}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];
																			rulesX[groupIndex]["args"][index][
																				"value"
																			] = option.value;
																			setrules(rulesX);
																		}}
																		value={item.value}></PGDropdown>
																</PanelRow>
															</>
														)}

														{/* {(item.compare == "between" ||
															item.compare == "exist") && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose Month"}
																		options={hoursNum}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];

																			rulesX[groupIndex]["args"][index][
																				"values"
																			].push(option.value);
																			setrules(rulesX);
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>

																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{hoursNum[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						var visibleX = {
																							...visible,
																						};
																						item.values.splice(i, 1);

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)} */}
														{item.compare == "exist" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose Month"}
																		options={hoursNum}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];

																			rulesX[groupIndex]["args"][index][
																				"values"
																			].push(option.value);
																			setrules(rulesX);
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>
																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{hoursNum[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						var visibleX = {
																							...visible,
																						};
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
														{item.compare == "between" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose Month"}
																		options={hoursNum}
																		onChange={(option, optionIndex) => {
																			// var rulesX = [...rules];

																			// rulesX[groupIndex]["args"][index][
																			// 	"values"
																			// ].push(option.value);
																			// setrules(rulesX);
																			var rulesX = [...rules];
																			var valuesArray =
																				rulesX[groupIndex]["args"][index][
																					"values"
																				];

																			if (valuesArray.length < 2) {
																				valuesArray.push(option.value);

																				setrules(rulesX);
																			} else {
																				console.log(
																					"Only two values can be selected."
																				);
																			}
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>
																<div>
																	{item.values.slice(0, 2).map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{hoursNum[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						var visibleX = {
																							...visible,
																						};
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
													</>
												)}

												{/* {id == "cookieExist" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Cookie Name
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{id == "cookieNotExist" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Cookie Name
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)} */}
												{id == "urlPrams" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																URL Parameter
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																placeholder="Use comma(,) to add multiple"
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</div>
													</>
												)}
												{id == "referrerExist" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Referrer Domain
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																placeholder="Use comma(,) to add multiple"
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</div>
													</>
												)}
												{/* //*need to work */}
												{id == "dateTime" && (
													<div>No Option available for this condition.</div>
												)}
												{id == "urlPath" && (
													<div>No Option available for this condition.</div>
												)}
												{id == "isPostTypes" && (
													<div>No Option available for this condition.</div>
												)}
												{id == "isBrowsers" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Browser
															</label>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={"Choose"}
																options={browserList}
																onChange={(option, optionIndex) => {
																	var rulesX = [...rules];

																	rulesX[groupIndex]["args"][index][
																		"values"
																	].push(option.value);
																	setrules(rulesX);
																}}
																value={item.values}></PGDropdown>
														</PanelRow>
														<div>
															{item.values.map((x, i) => {
																var label = getBrowserByValue(x);
																return (
																	<div className="flex items-center justify-between my-1 mt-2">
																		<span>{label}</span>
																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				var rulesX = [...rules];
																				item.values.splice(i, 1);

																				rulesX[groupIndex]["args"][index][
																					"values"
																				] = item.values;
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</div>
																);
															})}
														</div>
													</>
												)}
												{/* //*platform */}

												{id == "isPlatforms" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																	// { label: ">", value: ">" },
																	// { label: "<", value: "<" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Platforms
															</label>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={"Choose Platform"}
																options={platformList}
																onChange={(option, optionIndex) => {
																	var rulesX = [...rules];

																	rulesX[groupIndex]["args"][index][
																		"values"
																	].push(option.value);
																	setrules(rulesX);
																}}
																value={item.values}></PGDropdown>
														</PanelRow>
														<div>
															{item.values.map((x, i) => {
																var label = getPlatformByValue(x);
																return (
																	<div className="flex items-center justify-between my-1 mt-2">
																		<span>{label}</span>
																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				var rulesX = [...rules];
																				item.values.splice(i, 1);

																				rulesX[groupIndex]["args"][index][
																					"values"
																				] = item.values;
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</div>
																);
															})}
														</div>
													</>
												)}
												{/* //*platform */}
												{/* //*userCapabilities */}

												{id == "userCapabilities" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	// { label: "=", value: "=" },
																	// { label: "!=", value: "!=" },
																	// { label: "Contain", value: "contain" },
																	// {
																	// 	label: "Not Contain",
																	// 	value: "notContain",
																	// },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	{ label: "exist", value: "exist" },
																	{ label: "Not Exist", value: "notExist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{/* {(item.compare == "=" || item.compare == "!=") && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={
																			item.value.length == 0
																				? "Choose Taxonomy"
																				: taxonomies[item.value].label
																		}
																		options={taxonomies}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];
																			rulesX[groupIndex]["args"][index][
																				"value"
																			] = option.value;
																			setrules(rulesX);
																		}}
																		value={item.value}></PGDropdown>
																</PanelRow>
															</>
														)} */}

														{(item.compare == "notExist" ||
															item.compare == "exist") && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose Capabilities"}
																		options={capabilities}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];

																			rulesX[groupIndex]["args"][index][
																				"values"
																			].push(option.value);
																			setrules(rulesX);
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>

																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{capabilities[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						var visibleX = {
																							...visible,
																						};
																						item.values.splice(i, 1);

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
													</>
												)}
												{/* //*isTaxonomy */}

												{id == "isTaxonomy" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	// { label: "Contain", value: "contain" },
																	// {
																	// 	label: "Not Contain",
																	// 	value: "notContain",
																	// },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	{ label: "exist", value: "exist" },
																	{ label: "Not Exist", value: "notExist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{(item.compare == "=" || item.compare == "!=") && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={
																			item.value.length == 0
																				? "Choose Taxonomy"
																				: taxonomies[item.value].label
																		}
																		options={taxonomies}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];
																			rulesX[groupIndex]["args"][index][
																				"value"
																			] = option.value;
																			setrules(rulesX);
																		}}
																		value={item.value}></PGDropdown>
																</PanelRow>
															</>
														)}

														{(item.compare == "notExist" ||
															item.compare == "exist") && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose Taxonomies"}
																		options={taxonomies}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];

																			rulesX[groupIndex]["args"][index][
																				"values"
																			].push(option.value);
																			setrules(rulesX);
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>

																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{taxonomies[x]?.label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						var visibleX = {
																							...visible,
																						};
																						item.values.splice(i, 1);

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
													</>
												)}
												{/* //*URL String */}

												{id == "urlString" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	// { label: "=", value: "=" },
																	// { label: "!=", value: "!=" },
																	{ label: "Contain", value: "contain" },
																	{
																		label: "Not Contain",
																		value: "notContain",
																	},
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																String
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{/* //*post meta */}

												{(id == "isPostMeta" ||
													id == "isUserMeta" ||
													id == "isCookie") && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: "Contain", value: "contain" },
																	{
																		label: "Not Contain",
																		value: "notContain",
																	},
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Name
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{/* //*post meta */}
												{id == "isDevice" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Device
															</label>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={"Choose Device"}
																options={displaySize}
																onChange={(option, optionIndex) => {
																	var rulesX = [...rules];

																	rulesX[groupIndex]["args"][index][
																		"values"
																	].push(option.value);
																	setrules(rulesX);
																}}
																value={item.values}></PGDropdown>
														</PanelRow>
														<div>
															{item.values.map((x, i) => {
																var label = getDeviceByValue(x);
																return (
																	<div className="flex items-center justify-between my-1 mt-2">
																		<span>{label}</span>
																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				var visibleX = {
																					...visible,
																				};
																				item.values.splice(i, 1);

																				rulesX[groupIndex]["args"][index][
																					"values"
																				] = item.values;
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</div>
																);
															})}
														</div>
													</>
												)}
												{id == "isCountries" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Country
															</label>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={"Choose Countries"}
																options={countryName}
																onChange={(option, optionIndex) => {
																	var rulesX = [...rules];

																	rulesX[groupIndex]["args"][index][
																		"values"
																	].push(option.value);
																	setrules(rulesX);
																}}
																value={item.values}></PGDropdown>
														</PanelRow>
														<div>
															{item.values.map((x, i) => {
																var label = getCountryByValue(x);
																return (
																	<div className="flex items-center justify-between my-1 mt-2">
																		<span>{label}</span>
																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				var visibleX = {
																					...visible,
																				};
																				item.values.splice(i, 1);

																				rulesX[groupIndex]["args"][index][
																					"values"
																				] = item.values;
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</div>
																);
															})}
														</div>
													</>
												)}
												{/* {id == "userCapabilities" && (
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															Capabilities
														</label>
														<InputControl
															className="mr-2"
															value={item.value}
															onChange={(newVal) => {
																var rulesX = [...rules];
																rulesX[groupIndex]["args"][index][
																	"Capabilities"
																] = newVal;
																setrules(rulesX);
															}}
														/>
													</PanelRow>
												)} */}
												{(id == "homePage" ||
													id == "postsPage" ||
													id == "frontPage") && (
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															Compare
														</label>
														<SelectControl
															label=""
															value={item.compare}
															options={[
																// { label: "Include", value: "include" },
																// { label: "Exclude", value: "exclude" },
																{ label: "=", value: "=" },
																{ label: "!=", value: "!=" },
																// {
																// 	label: "between",
																// 	value: "between",
																// },
																// { label: "exist", value: "exist" },
															]}
															onChange={(newVal) => {
																var rulesX = [...rules];
																rulesX[groupIndex]["args"][index]["compare"] =
																	newVal;
																setrules(rulesX);
															}}
														/>
													</PanelRow>
												)}
												{(id == "wcAccount" || id == "wcShop") && (
													<div>No Option available for this condition.</div>
												)}
												{id == "searchPage" && (
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															Search Value
														</label>
														<InputControl
															className="mr-2"
															value={item.value}
															onChange={(newVal) => {
																var rulesX = [...rules];
																rulesX[groupIndex]["args"][index][
																	"Capabilities"
																] = newVal;
																setrules(rulesX);
															}}
														/>
													</PanelRow>
												)}
												{id == "queryObj" && (
													<div>No Option available for this condition.</div>
												)}
												{id == "srcSize" && (
													<div>No Option available for this condition.</div>
												)}
												{id == "postMeta" && (
													<div>No Option available for this condition.</div>
												)}
												{id == "postType" && (
													<div>No Option available for this condition.</div>
												)}
												{id == "pageType" && (
													<div>No Option available for this condition.</div>
												)}
												{id == "taxonomy" && (
													<div>No Option available for this condition.</div>
												)}
												{id == "archive" && (
													<div>No Option available for this condition.</div>
												)}
												{/* //*done */}
												{id == "initial" && (
													<div>No Option available for this condition.</div>
												)}

												{id == "scrollParcent" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Scroll Minimum
															</label>
															<InputControl
																className="mr-2"
																value={item.min}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].min =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Scroll Max
															</label>
															<InputControl
																className="mr-2"
																value={item.max}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].max =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "scrollFixed" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Scroll Minimum
															</label>
															<InputControl
																className="mr-2"
																value={item.min}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].min =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Scroll Max
															</label>
															<InputControl
																className="mr-2"
																value={item.max}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].max =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "scrollEnd" && (
													<>
														<div>No Option available for this condition.</div>
													</>
												)}

												{id == "scrollElement" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Element Class/ID
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "clickFirst" && (
													<>
														<div>No Option available for this condition.</div>
													</>
												)}

												{id == "clickCount" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Click Count
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "clickRight" && (
													<>
														<ToggleControl
															label="Disabled right menu?"
															help={
																item.value
																	? "Right Menu Disabled "
																	: "Right Menu Enabled."
															}
															checked={item.value ? true : false}
															onChange={(e) => {
																var rulesX = [...rules];
																rulesX[groupIndex]["args"][index].value =
																	item.value ? 0 : 1;
																setrules(rulesX);
															}}
														/>
													</>
												)}

												{id == "onExit" && (
													<>
														<div>No Option available for this condition.</div>
													</>
												)}

												{id == "clickElement" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Element ID/Class", "post-grid")}
															</label>
															<InputControl
																className="mr-2"
																placeholder=".element or #elementId"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "dateCountdownExpired" && (
													<>
														<ToggleControl
															label="Is Once?"
															className="my-4"
															help={
																item.once
																	? "IsOnce is Enable"
																	: "IsOnce is disabled."
															}
															checked={item.once ? true : false}
															onChange={(e) => {
																var rulesX = [...rules];
																rulesX[groupIndex]["args"][index].once =
																	item.once ? 0 : 1;
																setrules(rulesX);
															}}
														/>
														{/* <PanelRow className='mb-4'>
                                <label for=""  className="font-medium text-slate-900 " >{__('Element ID/Class', 'post-grid')}</label>
                                <InputControl
                                  className='mr-2'
                                  placeholder=".element or #elementId"
                                  once={item.value}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    rulesX[groupIndex]['args'][index].value = newVal
                                    setrules( visibleX );
                                  }}
                                />
                              </PanelRow> */}
													</>
												)}

												{/* //*form  */}

												{id == "submitCount" && (
													<div>No Option available for this condition.</div>
												)}
											</PanelBody>
										</>
									);
								})}
						</PanelBody>
					);
				})}
			</div>
		</div>
	);
}

class PGVisible extends Component {
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
		const {
			position,
			variant,
			btnClass,
			searchPlaceholder,
			options, //[{"label":"Select..","icon":"","value":""}]
			buttonTitle,
			onChange,
			visible,
			values,
			value,
		} = this.props;

		return (
			<div>
				<Html
					value={value}
					position={position}
					searchPlaceholder={searchPlaceholder}
					btnClass={btnClass}
					variant={variant}
					options={options}
					buttonTitle={buttonTitle}
					onChange={onChange}
					visible={visible}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}

export default PGVisible;
