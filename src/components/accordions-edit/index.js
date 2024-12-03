const { Component, RawHTML, useState, useEffect } = wp.element;

import {
	Icon,
	close,
	settings,
	cloud,
	plus,
	brush,
	mediaAndText,
} from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";
import {
	PanelBody,
	RangeControl,
	Button,
	ButtonGroup,
	Panel,
	PanelRow,
	Dropdown,
	DropdownMenu,
	SelectControl,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	Spinner,
	CustomSelectControl,
	Popover,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";

import PGtabs from "../tabs";
import PGtab from "../tab";
import PGStyles from "../styles";

var myStore = wp.data.select("postgrid-shop");

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;

	var breakPointX = "Desktop";


	var defaultPostData = {
		wrapper: {
			options: {
				class: "wrapper",
			},
			styles: {
				color: {
					Desktop: "#000000",
				},
			},
		},
		header: {
			options: {
				class: "",
			},
			styles: {
				color: {
					Desktop: "#000000",
				},
			},
		},
		headerActive: {
			options: {
				class: "",
			},
			styles: {
				color: {
					Desktop: "#000000",
				},
			},
		},
		headerLabel: {
			options: {
				class: "",
			},
			styles: {
				color: {
					Desktop: "#000000",
				},
			},
		},
		labelIcon: {
			options: {
				enable: true,
				library: "fontAwesome",
				srcType: "class",
				iconSrc: "fas fa-check-circle",
				position: "beforeText",
				class: "text-icon",
			},
			styles: {},
		},
		labelCounter: {
			options: {
				position: "beforeText",
				class: "text-icon",
			},
			styles: {},
		},
		content: {
			options: {
				class: "",
			},
			styles: {
				color: {
					Desktop: "#000000",
				},
			},
		},
		icon: {
			options: {
				enable: true,
				library: "fontAwesome",
				srcType: "class",
				iconSrc: "fas fa-check-circle",
				position: "beforeText",
				class: "text-icon",
			},
			styles: {},
		},
		iconToggle: {
			options: {
				class: "",
			},
			styles: {
				color: {
					Desktop: "#000000",
				},
			},
		},

		items: [
			{
				header: {
					label: "Label 1",
					labelToggle: "Label 1 Toggle",
					icon: "",
					iconToggle: "",
				},
				content: { text: "Accordion content 1" },
			},
			{
				header: { label: "Label 2" },
				content: { text: "Accordion content 3" },
			},
		],
		blockCssY: { items: [] }
	};

	var accordionDataX =
		props.accordionData.post_content == null ||
			props.accordionData.post_content.length == 0
			? defaultPostData
			: props.accordionData;

	var [accordionData, setaccordionData] = useState(accordionDataX); // Using the hook.
	var [wrapper, setwrapper] = useState(accordionData.wrapper); // Using the hook.
	var [header, setheader] = useState(defaultPostData.header);
	var [headerActive, setheaderActive] = useState(defaultPostData.headerActive);
	var [headerLabel, setheaderLabel] = useState(defaultPostData.headerLabel);
	var [labelIcon, setlabelIcon] = useState(defaultPostData.labelIcon);
	var [labelCounter, setlabelCounter] = useState(defaultPostData.labelCounter);
	var [content, setcontent] = useState(defaultPostData.content);
	var [icon, seticon] = useState(defaultPostData.icon);
	var [iconToggle, seticonToggle] = useState(defaultPostData.iconToggle);
	var [blockCssY, setblockCssY] = useState(defaultPostData.blockCssY);

	var wrapperSelector = "." + wrapper.options.class;

	var blockId = '';

	useEffect(() => {

		console.log(blockCssY);


		myStore.generateBlockCss(blockCssY.items, blockId);
	}, [blockCssY]);

	function onChangeStyleWrapper(sudoScource, newVal, attr) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...wrapper };
		const object = myStore.updatePropertyDeep(obj, path, newVal);

		setwrapper(object);

		var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);
		var cssPropty = myStore.cssAttrParse(attr);



		let itemsX = Object.assign({}, blockCssY.items);

		if (itemsX[elementSelector] == undefined) {
			itemsX[elementSelector] = {};
		}



		var cssPath = [elementSelector, cssPropty, breakPointX];
		const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);



		setblockCssY({ items: cssItems });
	}

	// function onRemoveStyleText(sudoScource, key) {
	// 	let obj = { ...text };
	// 	var object = myStore.deletePropertyDeep(obj, [
	// 		sudoScource,
	// 		key,
	// 		breakPointX,
	// 	]);

	// 	var isEmpty =
	// 		Object.entries(object[sudoScource][key]).length == 0 ? true : false;
	// 	var objectX = isEmpty
	// 		? myStore.deletePropertyDeep(object, [sudoScource, key])
	// 		: object;
	// 	setAttributes({ text: objectX });

	// 	var elementSelector = myStore.getElementSelector(sudoScource, textSelector);
	// 	var cssPropty = myStore.cssAttrParse(key);
	// 	var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
	// 		elementSelector,
	// 		cssPropty,
	// 		breakPointX,
	// 	]);

	// 	var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
	// 	var cssObjectX = isEmptyX
	// 		? myStore.deletePropertyDeep(cssObject, [cssPropty])
	// 		: cssObject;

	// 	setAttributes({ blockCssY: { items: cssObjectX } });
	// }

	// function onAddStyleText(sudoScource, key) {
	// 	var path = [sudoScource, key, breakPointX];
	// 	//let objX = Object.assign({}, text);
	// 	let obj = { ...text };

	// 	const object = myStore.addPropertyDeep(obj, path, "");
	// 	setAttributes({ text: object });
	// }

	// function onBulkAddText(sudoScource, cssObj) {
	// 	let obj = Object.assign({}, text);
	// 	obj[sudoScource] = cssObj;

	// 	setAttributes({ text: obj });

	// 	var selector = myStore.getElementSelector(sudoScource, textSelector);
	// 	var stylesObj = {};

	// 	Object.entries(cssObj).map((args) => {
	// 		var attr = args[0];
	// 		var cssPropty = myStore.cssAttrParse(attr);

	// 		if (stylesObj[selector] == undefined) {
	// 			stylesObj[selector] = {};
	// 		}

	// 		if (stylesObj[selector][cssPropty] == undefined) {
	// 			stylesObj[selector][cssPropty] = {};
	// 		}

	// 		stylesObj[selector][cssPropty] = args[1];
	// 	});

	// 	var cssItems = { ...blockCssY.items };
	// 	var cssItemsX = { ...cssItems, ...stylesObj };

	// 	setAttributes({ blockCssY: { items: cssItemsX } });
	// }

	// function onResetText(sudoSources) {
	// 	let obj = Object.assign({}, text);

	// 	Object.entries(sudoSources).map((args) => {
	// 		var sudoScource = args[0];
	// 		if (obj[sudoScource] == undefined) {
	// 		} else {
	// 			obj[sudoScource] = {};
	// 			var elementSelector = myStore.getElementSelector(
	// 				sudoScource,
	// 				textSelector
	// 			);

	// 			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
	// 				elementSelector,
	// 			]);
	// 			setAttributes({ blockCssY: { items: cssObject } });
	// 		}
	// 	});

	// 	setAttributes({ text: obj });
	// }



	return (
		<div className="p-5">

			{JSON.stringify(wrapper)}
			{JSON.stringify(blockCssY)}


			<PanelBody
				className="font-medium text-slate-900 "
				title="Wrapper"
				initialOpen={false}>
				<PGtabs
					activeTab="options"
					orientation="horizontal"
					activeClass="active-tab"
					onSelect={(tabName) => { }}
					tabs={[
						{
							name: "options",
							title: "Options",
							icon: settings,
							className: "tab-settings",
						},
						{
							name: "styles",
							title: "Styles",
							icon: brush,
							className: "tab-style",
						},
						// {
						// 	name: "css",
						// 	title: "CSS Library",
						// 	icon: mediaAndText,
						// 	className: "tab-css",
						// },
					]}>
					<PGtab name="options">
						<div>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Wrapper Class
							</label>
							<InputControl
								value={wrapper.options.class}
								onChange={(newVal) => {
									var accordionDataX = { ...accordionData };

									accordionDataX.wrapper.options.class = newVal;

									setaccordionData(accordionDataX);
								}}
							/>
						</div>
					</PGtab>
					<PGtab name="styles">
						<PGStyles
							obj={wrapper}
							onChange={onChangeStyleWrapper}
						// onAdd={onAddStyleText}
						// onRemove={onRemoveStyleText}
						// onBulkAdd={onBulkAddText}
						// onReset={onResetText}
						/>
					</PGtab>
				</PGtabs>
			</PanelBody>
			<PanelBody
				className="font-medium text-slate-900 "
				title="Header"
				initialOpen={false}>
				<PGtabs
					activeTab="options"
					orientation="horizontal"
					activeClass="active-tab"
					onSelect={(tabName) => { }}
					tabs={[
						{
							name: "options",
							title: "Options",
							icon: settings,
							className: "tab-settings",
						},
						{
							name: "styles",
							title: "Styles",
							icon: brush,
							className: "tab-style",
						},
						// {
						// 	name: "css",
						// 	title: "CSS Library",
						// 	icon: mediaAndText,
						// 	className: "tab-css",
						// },
					]}>
					<PGtab name="options">
						<div>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Header Class
							</label>
							<InputControl
								value={wrapper.options.class}
								onChange={(newVal) => {
									var accordionDataX = { ...accordionData };

									accordionDataX.wrapper.options.class = newVal;

									setaccordionData(accordionDataX);
								}}
							/>
						</div>
					</PGtab>
					<PGtab name="styles">
						<PGStyles
							obj={wrapper}
						// onChange={onChangeStyleText}
						// onAdd={onAddStyleText}
						// onRemove={onRemoveStyleText}
						// onBulkAdd={onBulkAddText}
						// onReset={onResetText}
						/>
					</PGtab>
				</PGtabs>
			</PanelBody>

			{JSON.stringify(accordionData)}
		</div>
	);
}

class AccordionsEdit extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true, isLoaded: false };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState((state) => ({
				isLoaded: !state.isLoaded,
			}));
		}, 1000);
	}

	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}

	render() {
		var { onChange, accordionData } = this.props;

		return (
			<Html
				onChange={onChange}
				accordionData={accordionData}
				warn={this.state.showWarning}
				isLoaded={this.state.isLoaded}
			/>
		);
	}
}

export default AccordionsEdit;
