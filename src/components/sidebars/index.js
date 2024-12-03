

const { Component } = wp.element;
import { Icon, close, settings, cloud, plus } from '@wordpress/icons';
import { ReactSortable } from "react-sortablejs";
import { PanelBody, RangeControl, Button, ButtonGroup, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, Spinner, CustomSelectControl, Popover, __experimentalInputControl as InputControl, } from '@wordpress/components'
import apiFetch from '@wordpress/api-fetch';
import { createElement, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { useSelect } from "@wordpress/data";
import { applyFilters } from "@wordpress/hooks";
import PGDropdown from '../../components/dropdown'

import PGcssKeyframes from '../../components/css-keyframes'
import PGcssOpenaiArticleWriter from '../../components/openai-article-writer'
import PGGlobalStyles from '../../components/global-styles'
import PGPageStyles from '../../components/page-styles'

var myStore = wp.data.select('postgrid-shop');



function Html(props) {

  if (!props.warn) {
    return null;
  }

  var isLoaded = props.isLoaded;

  var optionDataDefault = {
    customFonts: [],
    googleFonts: [],
    container: { width: '1150px' },
    breakpoints: [],
    colors: [],
    editor: { width: '1150px' },
    blocks: { disabled: [] },
    blockInserter: { postGridPositon: '' }, // Category positon
    openAI: { apiKey: '' },
    keyframes: {},
    globalStyles: [
      { options: { selector: "a" }, styles: {} },
      { options: { selector: "h1" }, styles: {} },
      { options: { selector: "h2" }, styles: {} },
    ],
    pageStyles: [
      { options: { selector: "a" }, styles: {} },
      { options: { selector: "h1" }, styles: {} },
      { options: { selector: "h2" }, styles: {} },
    ],




  }
  var breakPointX = myStore.getBreakPoint();



  var [optionData, setoptionData] = useState(optionDataDefault); // Using the hook.

  console.log(optionData)


  var [dataLoaded, setdataLoaded] = useState(false); // Using the hook.
  var [isLoading, setisLoading] = useState(false); // Using the hook.

  var [debounce, setDebounce] = useState(null); // Using the hook.
  var [colorPopup, setcolorPopup] = useState(null); // Using the hook.
  var [blockCategories, setblockCategories] = useState(null);
  // Using the hook.


  let isProFeature = applyFilters("isProFeature", true);

  

  var isLoaded = props.isLoaded;


  useEffect(() => {




    apiFetch({
      path: '/post-grid/v2/get_options',
      method: 'POST',
      data: { option: 'post_grid_block_editor' },
    }).then((res) => {

      setdataLoaded(true);
      if (res.length != 0) {
        setoptionData(res)
      }
    })


    apiFetch({
      path: '/post-grid/v2/block_categories',
      method: 'POST',
      data: {},
    }).then((res) => {

      var items = [];
      res.map(x => {
        items.push({ label: x.title, value: x.slug })

      })

      setblockCategories(items)

    })

  }, [isLoaded]);


  useEffect(() => {

    if (optionData != null) {
      clearTimeout(debounce);
      debounce = setTimeout(() => {

        updateOption();


      },
        1000);
    }

  }, [optionData]);






  // useEffect(() => {



  //   wp.domReady(function () {
  //     optionData.blocks.disabled.forEach(function (blockName) {
  //       if (blockName && wp.blocks.getBlockType(blockName) !== undefined) {
  //         wp.blocks.unregisterBlockType(blockName);
  //       }
  //     });
  //   });


  // }, [optionData.blocks.disabled]);




  function updateOption() {

    setisLoading(true)




    apiFetch({
      path: '/post-grid/v2/update_options',
      method: 'POST',
      data: { name: 'post_grid_block_editor', value: optionData },
    }).then((res) => {
      setisLoading(false)

      //setoptionData(res)

    })

  }





  var unitArgs = {
    px: { "label": "PX", "value": "px" },
    em: { "label": "EM", "value": "em" },
    rem: { "label": "REM", "value": "rem" },
    auto: { "label": "AUTO", "value": "auto" },
    "%": { "label": "%", "value": "%" },
    cm: { "label": "CM", "value": "cm" },
    mm: { "label": "MM", "value": "mm" },
    in: { "label": "IN", "value": "in" },
    pt: { "label": "PT", "value": "pt" },
    pc: { "label": "PC", "value": "pc" },
    ex: { "label": "EX", "value": "ex" },
    ch: { "label": "CH", "value": "ch" },
    vw: { "label": "VW", "value": "vw" },
    vh: { "label": "VH", "value": "vh" },
    vmin: { "label": "VMIN", "value": "vmin" },
    vmax: { "label": "VMAX", "value": "vmax" },
  }

  var fontWeightArgs = {
    'normal': { "label": "normal", "value": "normal" },
    'bold': { "label": "bold", "value": "bold" },
    'bolder': { "label": "bolder", "value": "bolder" },
    'lighter': { "label": "lighter", "value": "lighter" },
    '100': { "label": "100", "value": "100" },
    '200': { "label": "200", "value": "200" },
    '300': { "label": "300", "value": "300" },
    '400': { "label": "400", "value": "400" },
    '500': { "label": "500", "value": "500" },
    '600': { "label": "600", "value": "600" },
    '700': { "label": "700", "value": "700" },
    '800': { "label": "800", "value": "800" },
    '900': { "label": "900", "value": "900" },

  }

  var fontStyleArgs = {
    normal: { "label": "normal", "value": "normal" },
    italic: { "label": "italic", "value": "italic" },
    oblique: { "label": "oblique", "value": "oblique" },

  };

  var fontStretchArgs = {
    'ultra-condensed': { "label": "ultra-condensed", "value": "ultra-condensed" },
    'extra-condensed': { "label": "extra-condensed", "value": "extra-condensed" },
    'condensed': { "label": "condensed", "value": "condensed" },
    'semi-condensed': { "label": "semi-condensed", "value": "semi-condensed" },
    'normal': { "label": "normal", "value": "normal" },
    'semi-expanded': { "label": "semi-expanded", "value": "semi-expanded" },
    'expanded': { "label": "expanded", "value": "expanded" },
    'extra-expanded': { "label": "extra-expanded", "value": "extra-expanded" },
    'ultra-expanded': { "label": "ultra-expanded", "value": "ultra-expanded" },
  };



  var pgBlocks = {
    "post-grid/post-grid": { label: "Post Grid", value: "post-grid/post-grid" },
    "post-grid/post-grid-filterable": { label: "Post Grid - Filterable", value: "post-grid/post-grid-filterable" },
    "post-grid/content-slider": { label: "Content Slider", value: "post-grid/content-slider" },
    "post-grid/content-slider-item": { label: "Content Slider Item", value: "post-grid/content-slider-item" },
    "post-grid/popup": { label: "Popup", value: "post-grid/popup" },
    "post-grid/post-title": { label: "Post title", value: "post-grid/post-title" },
    "post-grid/post-excerpt": { label: "Post Excerpt", value: "post-grid/post-excerpt" },
    "post-grid/post-featured-image": { label: "Post Featured Image", value: "post-grid/post-featured-image" },
    "post-grid/image": { label: "Image", value: "post-grid/image" },
    "post-grid/post-author": { label: "Post Author", value: "post-grid/post-author" },
    "post-grid/post-author-fields": { label: "Post Author Fields", value: "post-grid/post-author-fields" },
    "post-grid/post-categories": { label: "Post Categories", value: "post-grid/post-categories" },
    "post-grid/post-tags": { label: "Post Tags", value: "post-grid/post-tags" },
    "post-grid/post-taxonomies": { label: "Post Taxonomies", value: "post-grid/post-taxonomies" },
    "post-grid/post-date": { label: "Post Date", value: "post-grid/post-date" },
    "post-grid/post-meta": { label: "Post Meta", value: "post-grid/post-meta" },
    "post-grid/read-more": { label: "Read More", value: "post-grid/read-more" },
    "post-grid/post-comment-count": { label: "Post Comment Count", value: "post-grid/post-comment-count" },
    "post-grid/progress-bar": { label: "Progress Bar", value: "post-grid/progress-bar" },
    "post-grid/form-wrap": { label: "Form Wrap", value: "post-grid/form-wrap" },
    "post-grid/form-field-input": { label: "Form Field Input", value: "post-grid/form-field-input" },
    "post-grid/form-field-select": { label: "Form Field Select", value: "post-grid/form-field-select" },
    "post-grid/form-field-checkbox": { label: "Form Field Checkbox", value: "post-grid/form-field-checkbox" },
    "post-grid/form-field-radio": { label: "Form Field Radio", value: "post-grid/form-field-radio" },
    "post-grid/form-field-textarea": { label: "Form Field Textarea", value: "post-grid/form-field-textarea" },
    "post-grid/form-field-submit": { label: "Form Field Submit", value: "post-grid/form-field-submit" },
    "post-grid/form-field-file-multi": { label: "Form Field File Multi", value: "post-grid/form-field-file-multi" },
    "post-grid/form-field-file": { label: "Form Field File", value: "post-grid/form-field-file" },
    "post-grid/list": { label: "List", value: "post-grid/list" },
    "post-grid/number-counter": { label: "Number Counter", value: "post-grid/number-counter" },
    "post-grid/icon": { label: "Icon", value: "post-grid/icon" },
    "post-grid/text": { label: "Text", value: "post-grid/text" },
    "post-grid/star-rate": { label: "Star Rate", value: "post-grid/star-rate" },
    "post-grid/breadcrumb": { label: "Breadcrumb", value: "post-grid/breadcrumb" },
    "post-grid/shortcode": { label: "Shortcode", value: "post-grid/shortcode" },
    "post-grid/social-share": { label: "Social Share", value: "post-grid/social-share" },
    "post-grid/terms-list": { label: "Terms List", value: "post-grid/terms-list" },
    "post-grid/layers": { label: "Layers", value: "post-grid/layers" },
    "post-grid/layer": { label: "Layer", value: "post-grid/layer" },
    "post-grid/flex-wrap": { label: "Flex Wrap", value: "post-grid/flex-wrap" },
    "post-grid/flex-wrap-item": { label: "Flex Wrap Item", value: "post-grid/flex-wrap-item" },
    "post-grid/grid-wrap": { label: "Grid Wrap", value: "post-grid/grid-wrap" },
    "post-grid/grid-wrap-item": { label: "Grid Wrap Item", value: "post-grid/grid-wrap-item" },
    "post-grid/image-gallery": { label: "Image Gallery", value: "post-grid/image-gallery" },
    "post-grid/image-gallery-item": { label: "image Gallery Item", value: "post-grid/image-gallery-item" },
    "post-grid/accordion-nested": { label: "Accordion Nested", value: "post-grid/accordion-nested" },
    "post-grid/accordion-nested-item": { label: "Accordion Nested Item", value: "post-grid/accordion-nested-item" },
    "post-grid/tabs-nested": { label: "Tabs Nested", value: "post-grid/tabs-nested" },
    "post-grid/tabs-nested-item": { label: "Tabs Nested Item", value: "post-grid/tabs-nested-item" },
    "post-grid/post": { label: "Post", value: "post-grid/post" },
    "post-grid/accordion": { label: "Accordion", value: "post-grid/accordion" },
    "post-grid/tabs": { label: "Tabs", value: "post-grid/tabs" },

  };



  useEffect(() => {
    var width = optionData.editor.width;

    var str = `body.block-editor-page #editor .wp-block {
    max-width: ${width};
}`;


    var wpfooter = document.getElementById("wpfooter");
    var divWrap = document.getElementById("pg-editor-width");

    if (divWrap != undefined) {
      document.getElementById("pg-editor-width").outerHTML = "";
    }

    var divWrap = '<div id="pg-editor-width"></div>';
    wpfooter.insertAdjacentHTML("beforeend", divWrap);

    var csswrappg = document.getElementById("pg-editor-width");
    var contWidth = "<style>" + str + "</style>";

    csswrappg.insertAdjacentHTML("beforeend", contWidth);
  }, [optionData]);



  return (
		<div className="relative pg-setting-input-text">
			{(!dataLoaded || isLoading) && (
				<div className="absolute w-full text-center p-3 top-0 left-0">
					<Spinner />
				</div>
			)}

			{dataLoaded && (
				<>
					<div className="">
						<div className="p-3">
							<PanelRow>
								<label>Container Width</label>
								<InputControl
									placeholder=""
									type="number"
									value={
										optionData?.container?.width == undefined
											? ""
											: optionData.container.width.match(/-?\d+/g)[0]
									}
									onChange={(newVal) => {
										var container = { ...optionData.container };
										var widthValX =
											container.width == undefined ||
											container.width.match(/-?\d+/g) == null
												? 0
												: container.width.match(/-?\d+/g)[0];
										var widthUnitX =
											container.width == undefined ||
											container.width.match(/[a-zA-Z%]+/g) == null
												? "px"
												: container.width.match(/[a-zA-Z%]+/g)[0];
										var containerX = {
											...optionData.container,
											width: newVal + widthUnitX,
										};

										setoptionData({ ...optionData, container: containerX });
									}}
								/>

								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={unitArgs}
									buttonTitle={
										optionData.container.width.match(/[a-zA-Z%]+/g) == null
											? "Choose"
											: optionData.container.width.match(/[a-zA-Z%]+/g)[0]
									}
									onChange={(option, index) => {
										var container = { ...optionData.container };
										var widthValX =
											container.width == undefined ||
											container.width.match(/-?\d+/g) == null
												? 0
												: container.width.match(/-?\d+/g)[0];
										var widthUnitX =
											container.width == undefined ||
											container.width.match(/[a-zA-Z%]+/g) == null
												? "px"
												: container.width.match(/[a-zA-Z%]+/g)[0];
										var containerX = {
											...optionData.container,
											width: widthValX + option.value,
										};
										setoptionData({ ...optionData, container: containerX });
									}}
									values={""}></PGDropdown>
							</PanelRow>

							<PanelRow>
								<label>Editor Width</label>
								<InputControl
									placeholder=""
									type="number"
									value={optionData.editor.width.match(/-?\d+/g)[0]}
									onChange={(newVal) => {
										var editor = { ...optionData.editor };
										var widthValX =
											editor.width == undefined ||
											editor.width.match(/-?\d+/g) == null
												? 0
												: editor.width.match(/-?\d+/g)[0];
										var widthUnitX =
											editor.width == undefined ||
											editor.width.match(/[a-zA-Z%]+/g) == null
												? "px"
												: editor.width.match(/[a-zA-Z%]+/g)[0];
										var editorX = {
											...optionData.editor,
											width: newVal + widthUnitX,
										};

										setoptionData({ ...optionData, editor: editorX });
									}}
								/>

								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={unitArgs}
									buttonTitle={
										optionData.editor.width.match(/[a-zA-Z%]+/g) == null
											? "Choose"
											: optionData.editor.width.match(/[a-zA-Z%]+/g)[0]
									}
									onChange={(option, index) => {
										var editor = { ...optionData.editor };
										var widthValX =
											editor.width == undefined ||
											editor.width.match(/-?\d+/g) == null
												? 0
												: editor.width.match(/-?\d+/g)[0];
										var widthUnitX =
											editor.width == undefined ||
											editor.width.match(/[a-zA-Z%]+/g) == null
												? "px"
												: editor.width.match(/[a-zA-Z%]+/g)[0];
										var editorX = {
											...optionData.editor,
											width: widthValX + option.value,
										};
										setoptionData({ ...optionData, editor: editorX });
									}}
									values={""}></PGDropdown>
							</PanelRow>
						</div>

						<PanelBody title="Custom Fonts" initialOpen={false}>
							<div className="my-3">
								<div
									// className="inline-block px-4 py-1 my-3 bg-gray-400 text-white rounded-sm cursor-pointer"
									className="pg-font flex gap-2 justify-center my-4 cursor-pointer py-2 px-4 capitalize  bg-gray-800 text-white font-medium rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
									onClick={(ev) => {
										var customFonts = optionData.customFonts;

										customFonts.push({
											family: "Font Family",
											weight: "",
											style: "",
											stretch: "",
											src: [],
										});

										setoptionData({ ...optionData, customFonts: customFonts });
									}}>
									Add
								</div>

								{optionData.customFonts.map((x, i) => {
									return (
										<PanelBody
											title={
												<>
													<span
														className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer "
														onClick={(ev) => {
															var customFonts = optionData.customFonts;

															customFonts.splice(i, 1);
															setoptionData({
																...optionData,
																customFonts: customFonts,
															});
														}}>
														<span className="text-[20px] text-white ">
															&times;
														</span>
													</span>
													<span className="mx-2">{x.family}</span>
												</>
											}
											initialOpen={false}>
											<div className="my-2">
												<div>
													<PanelRow>
														<label>Family Name</label>
														<InputControl
															placeholder=""
															value={x.family}
															onChange={(newVal) => {
																var customFonts = optionData.customFonts;
																customFonts[i].family = newVal;

																clearTimeout(debounce);
																debounce = setTimeout(() => {
																	setoptionData({
																		...optionData,
																		customFonts: customFonts,
																	});
																}, 1000);
															}}
														/>
													</PanelRow>
													<PanelRow>
														<label>Font URL's</label>

														<div
															// className="inline-block px-4 my-3 py-1 bg-gray-400 text-white rounded-sm cursor-pointer"
															className="pg-font flex gap-2 justify-center my-4 cursor-pointer py-2 px-4 capitalize  bg-gray-800 text-white font-medium rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
															onClick={(ev) => {
																var customFonts = optionData.customFonts;
																customFonts[i].src.push({
																	url: "",
																	format: "",
																});

																setoptionData({
																	...optionData,
																	customFonts: customFonts,
																});
															}}>
															Add
														</div>
													</PanelRow>

													{x.src.map((srcArg, j) => {
														var url = srcArg.url;
														var format = srcArg.format;

														return (
															<div className="flex my-2 items-center">
																<InputControl
																	placeholder=""
																	value={url}
																	onChange={(newVal) => {
																		var customFonts = optionData.customFonts;
																		customFonts[i].src[j].url = newVal;

																		clearTimeout(debounce);
																		debounce = setTimeout(() => {
																			setoptionData({
																				...optionData,
																				customFonts: customFonts,
																			});
																		}, 1000);
																	}}
																/>

																<span
																	className="bg-red-500 p-1 cursor-pointer"
																	onClick={(ev) => {
																		var customFonts = optionData.customFonts;
																		customFonts[i].src.splice(1, j);

																		setoptionData({
																			...optionData,
																			customFonts: customFonts,
																		});
																	}}>
																	<Icon fill={"#fff"} icon={close} />
																</span>
															</div>
														);
													})}

													<PanelRow>
														<label>Font Wieght</label>
														<PGDropdown
															position="bottom right"
															variant="secondary"
															options={fontWeightArgs}
															buttonTitle={
																fontWeightArgs[x.weight] == undefined
																	? "Choose"
																	: x.weight
															}
															onChange={(option, index) => {
																var customFonts = optionData.customFonts;
																customFonts[i].weight = option.value;

																setoptionData({
																	...optionData,
																	customFonts: customFonts,
																});
															}}
															values={""}></PGDropdown>
													</PanelRow>

													<PanelRow>
														<label>Font Style</label>
														<PGDropdown
															position="bottom right"
															variant="secondary"
															options={fontStyleArgs}
															buttonTitle={
																fontStyleArgs[x.style] == undefined
																	? "Choose"
																	: x.style
															}
															onChange={(option, index) => {
																var customFonts = optionData.customFonts;
																customFonts[i].style = option.value;

																setoptionData({
																	...optionData,
																	customFonts: customFonts,
																});
															}}
															values={""}></PGDropdown>
													</PanelRow>

													<PanelRow>
														<label>Font Stretch</label>
														<PGDropdown
															position="bottom right"
															variant="secondary"
															options={fontStretchArgs}
															buttonTitle={
																fontStretchArgs[x.stretch] == undefined
																	? "Choose"
																	: x.stretch
															}
															onChange={(option, index) => {
																var customFonts = optionData.customFonts;
																customFonts[i].stretch = option.value;

																setoptionData({
																	...optionData,
																	customFonts: customFonts,
																});
															}}
															values={""}></PGDropdown>
													</PanelRow>
												</div>
											</div>
										</PanelBody>
									);
								})}
							</div>
						</PanelBody>

						{/* <PanelBody title="Block Inserter" initialOpen={false}>

              <PanelRow>
                <label for="">Combo Blcoks Position</label>
                <SelectControl
                  label=""
                  value={optionData.blockInserter == undefined ? '' : optionData.blockInserter.postGridPositon}
                  options={blockCategories}
                  onChange={(newVal) => {
                    var blockInserterX = { ...optionData.blockInserter, postGridPositon: newVal }
                    setoptionData({ ...optionData, blockInserter: blockInserterX })


                  }

                  }
                />
              </PanelRow>

            </PanelBody> */}

						<PanelBody title="Colors" initialOpen={false}>
							<div className="my-3">
								<div
									className="inline-block px-4 py-1 bg-gray-400 text-white rounded-sm cursor-pointer"
									onClick={(ev) => {
										var colors = optionData.colors;

										colors.push("#ffffff");

										setoptionData({ ...optionData, colors: colors });
									}}>
									Add
								</div>

								{optionData.colors.map((x, i) => {
									var placeholderStyle = {
										backgroundImage:
											"repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0),repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0)",
										backgroundPosition: "0 0,10px 10px",
										backgroundSize: "20px 20px",
										boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 20%)",

										cursor: "pointer",
									};

									var btnStyle = {
										backgroundColor: x,
										boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 20%)",
										cursor: "pointer",
									};

									return (
										<div className="flex justify-between items-center border my-2">
											<div className="flex">
												<span
													className="bg-red-500 p-1 cursor-pointer"
													onClick={(ev) => {
														var colors = optionData.colors;

														colors.splice(i, 1);
														setoptionData({ ...optionData, colors: colors });
													}}>
													<Icon fill={"#fff"} icon={close} />
												</span>
												<div className="px-3 py-1 bg-gray-400 text-white rounded-sm">
													{x}
												</div>
											</div>
											<div style={placeholderStyle}>
												<span
													className="w-20 h-9 inline-block border"
													style={btnStyle}
													onClick={(ev) => {
														ev.preventDefault();
														ev.stopPropagation();

														setcolorPopup(colorPopup == null ? i : null);
													}}></span>

												{colorPopup != null && colorPopup == i && (
													<Popover position="bottom right">
														<div className="p-2">
															<ColorPalette
																value={x}
																enableAlpha
																onChange={(newVal) => {
																	var colors = optionData.colors;

																	colors[i] = newVal;
																	setoptionData({
																		...optionData,
																		colors: colors,
																	});
																}}
															/>
														</div>
													</Popover>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</PanelBody>

						<PanelBody
							// title="Global Styles"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full">
									<span>Global Styles</span>
									{isProFeature ? (
										<span
											className="pg-bg-color text-white px-3 py-1 rounded-md"
											onClick={(ev) => {
												window.open(
													"https://comboblocks.com/pricing/",
													"_blank"
												);
											}}>
											Pro
										</span>
									) : (
										""
									)}{" "}
								</span>
							}
							initialOpen={false}>
							<p className="my-3">Global styles will used to all pages.</p>

							<div
								className={`${
									isProFeature ? "pg-blur	pointer-events-none" : ""
								}`}>
								<PGGlobalStyles
									args={
										optionData.globalStyles == undefined
											? optionDataDefault.globalStyles
											: optionData.globalStyles
									}
									onChange={(prams) => {
										setoptionData({ ...optionData, globalStyles: prams });
									}}
								/>
							</div>
						</PanelBody>

						<PanelBody
							// title="Page Styles"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full">
									<span>Page Styles</span>
									{isProFeature ? (
										<span
											className="pg-bg-color text-white px-3 py-1 rounded-md"
											onClick={(ev) => {
												window.open(
													"https://comboblocks.com/pricing/",
													"_blank"
												);
											}}>
											Pro
										</span>
									) : (
										""
									)}{" "}
								</span>
							}
							initialOpen={false}>
							<PGPageStyles
								onChange={(prams) => {
									//setoptionData({ ...optionData, pageStyles: prams })
								}}
							/>
						</PanelBody>
						{/* <PanelBody title="keyframes" initialOpen={false}>
							<div className="text-2xl font-bold mb-7">Keyframes</div>
							<div
								className={`${
									isProFeature ? "pg-blur	pointer-events-none" : ""
								}`}>
								{optionData.keyframes != null && (
									<PGcssKeyframes
										keyframes={optionData.keyframes}
										onChange={(args) => {
											setoptionData({ ...optionData, keyframes: args });
										}}
									/>
								)}
							</div>
						</PanelBody> */}

						{/* <PanelBody title="Article Writer" initialOpen={false}>
              <PGcssOpenaiArticleWriter args={''} onChange={(args) => {




              }} />


            </PanelBody> */}

						{/* <PanelBody title="OpenAI" initialOpen={false}>

              <PanelRow>
                <label>API Key</label>
                <InputControl
                  placeholder=""
                  type="text"
                  value={optionData.openAI == undefined ? '' : optionData.openAI.apiKey}
                  onChange={(newVal) => {

                    var openAI = { ...optionData.openAI, apiKey: newVal }
                    setoptionData({ ...optionData, openAI: openAI })

                  }}
                />



              </PanelRow>



            </PanelBody> */}
					</div>
				</>
			)}
		</div>
	);






}

class PGsidebars extends Component {

  constructor(props) {
    super(props);
    this.state = { showWarning: true, isLoaded: false };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }


  componentDidMount() {
    setTimeout(() => {
      this.setState(state => ({
        isLoaded: !state.isLoaded
      }));
    },
      1000)
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }



  render() {

    var {
      onChange,


    } = this.props;







    return (


      <Html onChange={onChange} warn={this.state.showWarning} isLoaded={this.state.isLoaded} />


    )
  }
}













export default PGsidebars;