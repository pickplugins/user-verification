const { Component } = wp.element;
import { applyFilters } from "@wordpress/hooks";
import apiFetch from "@wordpress/api-fetch";
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
	ToggleControl,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";

import { memo, useMemo, useState, useEffect } from "@wordpress/element";
import {
	Icon,
	styles,
	close,
	settings,
	download,
	plusCircle,
	arrowRight,
} from "@wordpress/icons";
import PGDropdown from "../../components/dropdown";
import PGinputText from "../../components/input-text";
import PGRequestTemplate from "../../components/request-a-template";

import Masonry from "masonry-layout";

import imagesLoaded from "imagesloaded";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	const [searchPrams, setsearchPrams] = useState({
		keyword: "",
		categories: [],
		page: 1,
		myTemplates: false,
	});
	var [templateLibrary, settemplateLibrary] = useState({ items: [] });

	var [templateLibraryCats, settemplateLibraryCats] = useState([]);
	var [templateType, settemplateType] = useState("section"); // section, fullpage, bundle, archive

	var [debounce, setDebounce] = useState(null); // Using the hook.
	var [isLoading, setIsLoading] = useState(false);
	var [customTemplate, setcustomTemplate] = useState(false);

	let isProFeature = applyFilters("isProFeature", true);

	var templateTypes = {
		section: { label: "Sections", value: "section" },
		fullpage: { label: "Full pages", value: "fullpage" },
		// bundle: { label: "Bundles", value: "bundle" },
	};

	// useEffect(() => {
	// 	fetchCss();
	// }, [searchPrams]);

	useEffect(() => {
		settemplateLibrary({ items: [] });

		fetchCss();
	}, [templateType]);

	function loadMasonry() {
		var elem = document.querySelector("#itemsWrap");

		if (elem != null) {
			imagesLoaded(elem, function () {
				var msnry = new Masonry(elem, {
					// options
					itemSelector: ".item",
					gutter: 15,
					horizontalOrder: true,
					percentPosition: true,
					fitWidth: true,
				});
			});
		}
	}

	function fetchCss() {
		setIsLoading(true);

		var postData = {
			keyword: searchPrams.keyword,
			page: searchPrams.page,
			categories: searchPrams.categories,
		};
		postData = JSON.stringify(postData);

		if (templateType == "section") {
			fetch("https://comboblocks.com/server/wp-json/post-grid/v2/get_post_section", {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: postData,
			})
				.then((response) => {
					if (response.ok && response.status < 400) {
						response.json().then((res) => {
							var items = templateLibrary.items;

							if (res.posts.length > 0) {
								res.posts.map((x) => {
									return items.push(x);
								});

								settemplateLibrary({ items: items });
							}

							var cats = res.terms.map((x) => {
								return {
									label:
										x.count == undefined
											? x.label
											: x.label + " (" + x.count + ")",
									value: x.value,
								};
							});

							settemplateLibraryCats(cats);
							setIsLoading(false);

							setTimeout(() => {
								loadMasonry();
							}, 500);
						});
					}
				})
				.catch((_error) => {
					//this.saveAsStatus = 'error';
					// handle the error
				});
		}

		if (templateType == "fullpage") {
			fetch("https://comboblocks.com/server/wp-json/post-grid/v2/get_post_fullpage", {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: postData,
			})
				.then((response) => {
					if (response.ok && response.status < 400) {
						response.json().then((res) => {
							var items = templateLibrary.items;

							if (res.posts.length > 0) {
								res.posts.map((x) => {
									return items.push(x);
								});

								settemplateLibrary({ items: items });
							}

							var cats = res.terms.map((x) => {
								return {
									label:
										x.count == undefined
											? x.label
											: x.label + " (" + x.count + ")",
									value: x.value,
								};
							});

							settemplateLibraryCats(cats);
							setIsLoading(false);

							setTimeout(() => {
								loadMasonry();
							}, 500);
						});
					}
				})
				.catch((_error) => {
					//this.saveAsStatus = 'error';
					// handle the error
				});
		}
	}

	return (
		<div
			id="pgTemplates-items"
			className="pg-setting-input-text pgTemplates-items pl-[160px] pr-[320px] mt-[70px] fixed z-[999] top-6 left-0 w-full h-full overflow-y-scroll pb-[200px]">
			<div className="bg-gray-400 ">
				<div className="flex justify-between items-center p-3 bg-white ">
					<div className="flex  items-center ">
						<div className="px-4">
							{isLoading && (
								<span className="text-center">
									<Spinner /> {templateType}
								</span>
							)}

							{!isLoading && (
								<span className="text-center">
									<PGDropdown
										position="bottom right"
										variant="secondary"
										options={templateTypes}
										buttonTitle={
											templateTypes[templateType] == undefined
												? "Categories"
												: templateTypes[templateType].label
										}
										onChange={(option, index) => {
											settemplateLibrary({ items: [] });
											setsearchPrams({ ...searchPrams, page: 0 });
											settemplateType(option.value);
										}}
										values={[]}></PGDropdown>
								</span>
							)}
						</div>
						<div>
							<Icon icon={arrowRight} />
						</div>
						<div>
							<InputControl
								className="w-60 !px-3 !py-2 !rounded-none !text-lg"
								type="text"
								placeholder="Search..."
								value={searchPrams.keyword}
								onChange={(newVal) => {
									clearTimeout(debounce);
									debounce = setTimeout(() => {
										//var newVal = ev.target.value;
										settemplateLibrary({ items: [] });
										setsearchPrams({ ...searchPrams, keyword: newVal });
									}, 1000);
								}}
							/>
						</div>

						<div className="px-2">
							<PGDropdown
								position="bottom right"
								variant="secondary"
								options={templateLibraryCats}
								buttonTitle="Categories"
								onChange={(option, index) => {
									if (searchPrams.categories.includes(option.value)) {
										var categoriesX = searchPrams.categories.splice(
											option.value,
											1
										);
									} else {
										var categoriesX = searchPrams.categories.concat(
											option.value
										);
									}

									setsearchPrams({ ...searchPrams, categories: categoriesX });

									settemplateLibrary({ items: [] });
								}}
								values={[]}></PGDropdown>
						</div>

						<div className="px-4 flex items-center">
							{searchPrams.categories.length > 0 &&
								searchPrams.categories.map((x, index) => {
									return (
										<div className="flex items-center mx-1 text-sm  bg-slate-500 text-white">
											<span
												className="cursor-pointer p-1 bg-red-500 inline-block"
												onClick={() => {
													settemplateLibrary({ items: [] });

													var categoriesX = searchPrams.categories.splice(
														index,
														1
													);

													setsearchPrams({
														...searchPrams,
														categories: searchPrams.categories,
													});
												}}>
												<Icon icon={close} />
											</span>{" "}
											<span className="px-2 inline-block">
												{
													templateLibraryCats[
														templateLibraryCats.findIndex((p) => p.value == x)
													].label
												}
											</span>
										</div>
									);
								})}
						</div>
						<ToggleControl
							className="!mb-0 hidden"
							label={
								searchPrams.myTemplates
									? "Loaded Your Teplates?"
									: "My Teplates?"
							}
							checked={searchPrams.myTemplates ? true : false}
							onChange={(e) => {
								setsearchPrams({
									...searchPrams,
									myTemplates: !searchPrams.myTemplates,
								});
							}}
						/>
					</div>
					<div className="flex items-center">
						<div
							className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
							// className="bg-blue-600 flex items-center cursor-pointer hover:bg-blue-500 text-lg text-white px-4 py-1 rounded-sm hover:text-white"
							onClick={() => {
								setcustomTemplate(!customTemplate);

								setTimeout(() => {
									loadMasonry();
								}, 500);
							}}>
							<span className="dashicons dashicons-slides mr-2"></span>
							<span>Request a Template</span>
						</div>

						<div className="px-4">
							<span
								className="cursor-pointer rounded-sm p-1 bg-red-500 hover:bg-red-600 inline-block"
								onClick={() => {
									props.setEnable(false);
								}}>
								<Icon icon={close} className="fill-white" />
							</span>
						</div>
					</div>
				</div>

				<div className="p-5 ">
					{customTemplate && <PGRequestTemplate />}

					{!customTemplate && (
						<>
							<div id="itemsWrap" className="m-auto">
								{templateLibrary.items.map((x, index) => {
									return (
										<div
											className="bg-white inline-block relative pb-16 item mb-3 w-[24%]"
										// onMouseEnter={() => {
										// 	setIsHovered(true);
										// 	setHoverValue(index);
										// }}
										// onMouseLeave={() => {
										// 	setIsHovered(false);
										// 	setHoverValue("");
										// }}
										>
											<div className="relative">
												<img
													className="!shadow-none p-3"
													src={x.thumb_url}
													alt=""
												/>
												{isProFeature && (
													<div className="absolute top-2 right-2">
														{!x.is_pro && (
															<span className=" bg-lime-600 text-white text-xs px-2 rounded-sm py-1">
																Free
															</span>
														)}
														{x.is_pro && (
															<span className=" bg-orange-500 text-white text-xs px-2 rounded-sm py-1">
																Pro
															</span>
														)}
													</div>
												)}
											</div>
											{(!x.is_pro || (x.is_pro && !isProFeature)) && (
												<div className="flex items-center absolute bottom-0 left-0 w-full p-2 bg-slate-600 bg-opacity-80">
													<div
														className="pg-bg-color text-white p-1 px-3 cursor-pointer rounded-sm flex items-center "
														onClick={(ev) => {
															var content = x.post_content;

															var wp_editor = wp.data.dispatch("core/editor");
															var wp_insertBlocks = wp_editor.insertBlocks;
															wp_insertBlocks(wp.blocks.parse(content));

															props.setEnable(false);
														}}>
														<span className="inline-block">
															<Icon icon={download} className="fill-white	" />
														</span>
													</div>

													<a
														className="inline-block pg-font mx-2 text-white no-underline font-medium text-lg hover:text-white "
														target="_blank"
														href={x.url}>
														{x.post_title}
													</a>
												</div>
											)}

											{x.is_pro && isProFeature && (
												// <div
												// 	className={`${
												// 		// isHovered && hoverValue == index
												// 		// 	?
												// 		"opacity-100 flex items-center absolute bottom-0 left-0 w-full p-2 bg-slate-600  "
												// 		// : "opacity-0"
												// 	} `}>
												<a
													className=" text-lg flex gap-2 justify-center text-amber-500 no-underline font-medium transition-colors duration-300  hover:text-white pg-font  absolute bottom-0 left-0 w-full p-2 bg-slate-600 "
													href="https://comboblocks.com/pricing/">
													<span>Subscribe to Import</span>
													<span>
														<Icon fill="white" icon={plusCircle} />
													</span>
												</a>
												// </div>
											)}
										</div>
									);
								})}
							</div>
							<div className="my-5 p-5  text-center">
								<div
									className="inline-block pg-font pg-bg-color rounded-md relative p-3 px-5 cursor-pointer  text-white font-bold "
									onClick={(ev) => {
										var pageX = parseInt(searchPrams.page) + 1;
										setsearchPrams({ ...searchPrams, page: pageX });
										fetchCss();
									}}>
									<span className="animate-ping absolute -top-1 -right-1 h-3 w-3 rounded-full pg-bg-color "></span>
									<span className="flex items-center justify-center gap-2">
										{isLoading && (
											<span className="text-center">
												<Spinner />
											</span>
										)}
										<span>Load More</span>
									</span>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

class PGTemplates extends Component {
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

export default PGTemplates;
