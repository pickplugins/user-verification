const { Component, RawHTML, useState, useEffect } = wp.element;

import { Icon, close, settings, cloud, plus } from "@wordpress/icons";
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

var myStore = wp.data.select("postgrid-shop");

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var id = props.id;

	var [isLoading, setisLoading] = useState(false); // Using the hook.
	var [postData, setpostData] = useState(null); // Using the hook.
	var [viewType, setviewType] = useState("accordion"); // Using the hook.
	var [items, setitems] = useState(null); // Using the hook.

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
				enable: false,
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
	};

	useEffect(() => {
		setisLoading(true);

		apiFetch({
			path: "/accordions/v2/accordions_data",
			method: "POST",
			data: {
				postId: id,
				_wpnonce: user_verification_editor_js._wpnonce,
			},
		}).then((res) => {
			setisLoading(false);

			// console.log(res);

			setpostData(res);
			var post_content =
				res.post_content == null || res.post_content.length == 0
					? defaultPostData.items
					: res.post_content;
			setitems(post_content);
		});
	}, [id]);

	var [wrapper, setwrapper] = useState(defaultPostData.wrapper);
	var [header, setheader] = useState(defaultPostData.header);
	var [headerActive, setheaderActive] = useState(defaultPostData.headerActive);
	var [headerLabel, setheaderLabel] = useState(defaultPostData.headerLabel);
	var [labelIcon, setlabelIcon] = useState(defaultPostData.labelIcon);
	var [labelCounter, setlabelCounter] = useState(defaultPostData.labelCounter);
	var [content, setcontent] = useState(defaultPostData.content);
	var [icon, seticon] = useState(defaultPostData.icon);
	var [iconToggle, seticonToggle] = useState(defaultPostData.iconToggle);

	var [active, setactive] = useState("0");
	const handleActive = (index) => {
		setactive(index);
	}

	return (
		<div className="ml-5">
			{isLoading && (
				<div className="absolute top-0 left-0 bg-slate-500">
					<Spinner />
				</div>
			)}

			<div className="flex items-center justify-between align-middle bg-white p-5  mb-5">
				<div className="flex items-center gap-5">
					<div className="pr-5">View Type: </div>

					<div
						className={
							viewType == "accordion"
								? "bg-slate-500 text-white p-3 py-2"
								: "p-3 py-2 bg-slate-400"
						}
						onClick={(ev) => {
							setviewType("accordion");
						}}>
						Accordion
					</div>
					<div
						className={
							viewType == "tabs"
								? "bg-slate-500 text-white p-3 py-2"
								: "p-3 py-2 bg-slate-400"
						}
						onClick={(ev) => {
							setviewType("tabs");
						}}>
						Tabs
					</div>

					<h2>
						{postData?.post_title && (
							<>You are editing: {postData.post_title}</>
						)}
					</h2>
				</div>

				<div>
					<div
						className="p-3 py-2 bg-slate-500 inline-block"
						onClick={(ev) => { }}>
						Add
					</div>
				</div>
			</div>

			<div></div>

			<div className={`my-5 ${wrapper.options.class} `}>
				{items?.map((item, index) => {
					return (
						<>
							<div
								className={`${header.options.class} ${active == index ? headerActive.options.class : ""
									}  p-3 bg-white border-b border-solid border-0`}
								onClick={() => handleActive(index)}>
								{icon.options.position == "before" && <span>Icon</span>}
								<span>
									{labelCounter.enable && labelCounter.position == "before" && (
										<>{index + 1}</>
									)}
									{labelIcon.enable && labelIcon.position == "before" && (
										<>labelIcon</>
									)}
									{item.header.label}
									{labelIcon.enable && labelIcon.position == "after" && (
										<>labelIcon</>
									)}
									{labelCounter.enable && labelCounter.position == "after" && (
										<>{index + 1}</>
									)}
								</span>
								{icon.options.position == "after" && <span>Icon</span>}
							</div>
							<div
								className={`${active == index ? "" : "hidden"} bg-white p-3`}>
								{item.content.text}
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
}

class AccordionsView extends Component {
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
		var { onChange, id } = this.props;

		return <Html onChange={onChange} id={id} warn={this.state.showWarning} />;
	}
}

export default AccordionsView;
