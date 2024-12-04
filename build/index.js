/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/icon/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/icon/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/** @typedef {{icon: JSX.Element, size?: number} & import('@wordpress/primitives').SVGProps} IconProps */

/**
 * Return an SVG icon.
 *
 * @param {IconProps}                                 props icon is the SVG component to render
 *                                                          size is a number specifiying the icon size in pixels
 *                                                          Other props will be passed to wrapped SVG component
 * @param {import('react').ForwardedRef<HTMLElement>} ref   The forwarded ref to the SVG element.
 *
 * @return {JSX.Element}  Icon component
 */
function Icon({
  icon,
  size = 24,
  ...props
}, ref) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon, {
    width: size,
    height: size,
    ...props,
    ref
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(Icon));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/settings.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/settings.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const settings = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "m19 7.5h-7.628c-.3089-.87389-1.1423-1.5-2.122-1.5-.97966 0-1.81309.62611-2.12197 1.5h-2.12803v1.5h2.12803c.30888.87389 1.14231 1.5 2.12197 1.5.9797 0 1.8131-.62611 2.122-1.5h7.628z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "m19 15h-2.128c-.3089-.8739-1.1423-1.5-2.122-1.5s-1.8131.6261-2.122 1.5h-7.628v1.5h7.628c.3089.8739 1.1423 1.5 2.122 1.5s1.8131-.6261 2.122-1.5h2.128z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (settings);
//# sourceMappingURL=settings.js.map

/***/ }),

/***/ "./src/components/dashboard/index.js":
/*!*******************************************!*\
  !*** ./src/components/dashboard/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/settings.js");
/* harmony import */ var _components_dropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/dropdown */ "./src/components/dropdown/index.js");
/* harmony import */ var _components_tab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/tab */ "./src/components/tab/index.js");
/* harmony import */ var _components_tabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/tabs */ "./src/components/tabs/index.js");

const {
  Component
} = wp.element;









function Html(props) {
  if (!props.warn) {
    return null;
  }
  var [dataLoaded, setdataLoaded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(false); // Using the hook.
  var [debounce, setDebounce] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(null); // Using the hook.
  var [isLoading, setisLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(false); // Using the hook.
  var [colorPopup, setcolorPopup] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(null); // Using the hook.
  var [license, setlicense] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(null); // Using the hook.
  var [needSave, setneedSave] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(false); // Using the hook.
  var [licenseError, setlicenseError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(null); // Using the hook.
  var [licenseCheckedData, setlicenseCheckedData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(null); // Using the hook.

  var isProFeature = (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.applyFilters)("isProFeature", true);
  var optionDataDefault = {
    apiKeys: {}
  };
  var [optionData, setoptionData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)({}); // Using the hook.
  var [optionDataSaved, setoptionDataSaved] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)({}); // Using the hook.
  var [dashboardTabs, setdashboardTabs] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)([{
    name: "general",
    title: "General",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"],
    className: "tab-general",
    hidden: false,
    isPro: false
  }]);

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
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    setisLoading(true);
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: "/user-verification/v2/get_options",
      method: "POST",
      data: {
        option: "user_verification_settings"
      }
    }).then(res => {
      console.log(res);
      setisLoading(false);
      setdataLoaded(true);
      if (res.length != 0) {
        var resX = {
          ...res
        };
        setoptionDataSaved(resX);
        setoptionData(resX);
      }
    });
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    if (JSON.stringify(optionData) === JSON.stringify(optionDataSaved)) {
      setneedSave(false);
    } else {
      setneedSave(true);
    }
    //setisProFeature(optionData?.license?.activated ? false : true);
  }, [optionData]);
  function updateOption() {
    setisLoading(true);
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: "/user-verification/v2/update_options",
      method: "POST",
      data: {
        name: "user_verification_settings",
        value: optionData
      }
    }).then(res => {
      setisLoading(false);
      if (res.status) {
        setoptionDataSaved(optionData);
        setneedSave(false);
      }
    });
  }

  //////////////////////////import setting
  const [fileContent, setFileContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(null);
  const [importStatus, setimportStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)("wait");
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (!file) return; // No file selected
    if (!file.name.endsWith(".json")) {
      alert("Please select a JSON file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
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
    element.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  function ExportButton() {
    var optionDataX = {
      ...optionData
    };
    optionDataX.exportReady = true;
    const handleExport = () => {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
      const formattedTime = `${currentDate.getHours().toString().padStart(2, "0")}${currentDate.getMinutes().toString().padStart(2, "0")}${currentDate.getSeconds().toString().padStart(2, "0")}`;
      const filename = `combo-blocks-setting-${formattedDate}-${formattedTime}.json`;
      download(filename, JSON.stringify(optionDataX, null, 2));
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700",
      onClick: handleExport
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Export", "user-verification"));
  }
  var unitArgs = {
    px: {
      label: "PX",
      value: "px"
    },
    em: {
      label: "EM",
      value: "em"
    },
    rem: {
      label: "REM",
      value: "rem"
    },
    auto: {
      label: "AUTO",
      value: "auto"
    },
    "%": {
      label: "%",
      value: "%"
    },
    cm: {
      label: "CM",
      value: "cm"
    },
    mm: {
      label: "MM",
      value: "mm"
    },
    in: {
      label: "IN",
      value: "in"
    },
    pt: {
      label: "PT",
      value: "pt"
    },
    pc: {
      label: "PC",
      value: "pc"
    },
    ex: {
      label: "EX",
      value: "ex"
    },
    ch: {
      label: "CH",
      value: "ch"
    },
    vw: {
      label: "VW",
      value: "vw"
    },
    vh: {
      label: "VH",
      value: "vh"
    },
    vmin: {
      label: "VMIN",
      value: "vmin"
    },
    vmax: {
      label: "VMAX",
      value: "vmax"
    }
  };

  // ! hello
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pg-setting-input-text pg-dashboard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-gray-300 text-white py-5 p-3"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-3 justify-center items-center flex-wrap lg:justify-between"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex justify-center flex-wrap  md:justify-between  "
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: " flex  items-center flex-wrap gap-4 md:flex-nowrap md:justify-between md:gap-6 "
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: " flex gap-4 w-full items-center md:w-auto "
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "flex flex-col w-max"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "text-[32px] md:text-[36px] lg:text-[40px] leading-[32px] md:leading-[36px] lg:leading-[40px] font-extrabold text-white whitespace-nowrap "
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User Verification", "user-verification")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center flex-wrap gap-5 md:gap-4 "
  }, isProFeature && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://comboblocks.com/pricing/?utm_source=CBDashboard&utm_medium=topNav&utm_campaign=CBPro",
    target: "_blank",
    className: "bg-amber-500 text-[16px] font-bold no-underline rounded-sm p-2 px-4 whitespace-nowrap cursor-pointer text-white lg:text-lg "
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Buy Pro", "user-verification"))), isLoading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: ""
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Spinner, null))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: " flex w-full lg:w-auto"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-2 items-center flex-wrap "
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://pickplugins.com/create-support-ticket/",
    target: "_blank",
    className: " no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white "
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Create Support", "user-verification")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://comboblocks.com/documentations/",
    target: "_blank",
    className: " no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white   hover:text-white "
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Documentation", "user-verification")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "bg-amber-500 rounded-sm text-md p-2 px-4 cursor-pointer pg-font text-white ",
    onClick: ev => {
      // resetOptionData();
      handleAlertConfirmation();
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Reset", "user-verification")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-green-700 rounded-sm text-md p-2 px-4 cursor-pointer pg-font text-white flex items-center",
    onClick: ev => {
      updateOption();
    }
  }, isLoading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: ""
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Spinner, null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Save", "user-verification")), needSave && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "w-5 inline-block h-5 ml-3 rounded-xl text-center bg-red-500"
  }, "!")))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "",
    className: "pg-setting-input-text  "
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_tabs__WEBPACK_IMPORTED_MODULE_8__["default"], {
    activeTab: "disableBlocks",
    orientation: "vertical",
    contentClass: " p-5 bg-white w-full",
    navItemClass: "bg-gray-500 px-5 py-3 gap-2 border-0 border-b border-solid border-gray-500",
    navItemSelectedClass: "bg-gray-700",
    activeClass: "active-tab",
    onSelect: tabName => {},
    tabs: dashboardTabs
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_tab__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "overview"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex w-full h-full justify-center items-center font-bold text-3xl text-gray-800 pg-font "
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Combo Blocks", "user-verification"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_tab__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "general"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-2xl font-bold mb-7"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Genral Settings", "user-verification")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex mb-5  justify-start gap-2 items-center "
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: " text-lg w-[300px]"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Container Width", "user-verification")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalInputControl, {
    type: "number",
    value: optionData.container == null || optionData.container.width == undefined ? "" : optionData.container.width.match(/-?\d+/g)[0],
    onChange: newVal => {
      var container = {
        ...optionData.container
      };
      var widthValX = container.width == undefined || container.width.match(/-?\d+/g) == null ? 0 : container.width.match(/-?\d+/g)[0];
      var widthUnitX = container.width == undefined || container.width.match(/[a-zA-Z%]+/g) == null ? "px" : container.width.match(/[a-zA-Z%]+/g)[0];
      var containerX = {
        ...optionData.container,
        width: newVal + widthUnitX
      };
      setoptionData({
        ...optionData,
        container: containerX
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_dropdown__WEBPACK_IMPORTED_MODULE_6__["default"], {
    position: "bottom right",
    variant: "secondary",
    options: unitArgs,
    buttonTitle: optionData?.container?.width.match(/[a-zA-Z%]+/g) == null ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Choose", "user-verification") : optionData.container.width.match(/[a-zA-Z%]+/g)[0],
    onChange: (option, index) => {
      var container = {
        ...optionData.container
      };
      var widthValX = container.width == undefined || container.width.match(/-?\d+/g) == null ? 0 : container.width.match(/-?\d+/g)[0];
      var widthUnitX = container.width == undefined || container.width.match(/[a-zA-Z%]+/g) == null ? "px" : container.width.match(/[a-zA-Z%]+/g)[0];
      var containerX = {
        ...optionData.container,
        width: widthValX + option.value
      };
      setoptionData({
        ...optionData,
        container: containerX
      });
    },
    values: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex mb-5 justify-start gap-2 items-center "
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: " text-lg w-[300px]"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Editor Width", "user-verification")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalInputControl, {
    type: "number",
    value: optionData.editor == null || optionData.editor.width == undefined ? "" : optionData.editor.width.match(/-?\d+/g)[0],
    onChange: newVal => {
      var editor = {
        ...optionData.editor
      };
      var widthValX = editor.width == undefined || editor.width.match(/-?\d+/g) == null ? 0 : editor.width.match(/-?\d+/g)[0];
      var widthUnitX = editor.width == undefined || editor.width.match(/[a-zA-Z%]+/g) == null ? "px" : editor.width.match(/[a-zA-Z%]+/g)[0];
      var editorX = {
        ...optionData.editor,
        width: newVal + widthUnitX
      };
      setoptionData({
        ...optionData,
        editor: editorX
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_dropdown__WEBPACK_IMPORTED_MODULE_6__["default"], {
    position: "bottom right",
    variant: "secondary",
    options: unitArgs,
    buttonTitle: optionData?.editor?.width.match(/[a-zA-Z%]+/g) == null ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Choose", "user-verification") : optionData.editor.width.match(/[a-zA-Z%]+/g)[0],
    onChange: (option, index) => {
      var editor = {
        ...optionData.editor
      };
      var widthValX = editor.width == undefined || editor.width.match(/-?\d+/g) == null ? 0 : editor.width.match(/-?\d+/g)[0];
      var widthUnitX = editor.width == undefined || editor.width.match(/[a-zA-Z%]+/g) == null ? "px" : editor.width.match(/[a-zA-Z%]+/g)[0];
      var editorX = {
        ...optionData.editor,
        width: widthValX + option.value
      };
      setoptionData({
        ...optionData,
        editor: editorX
      });
    },
    values: ""
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_tab__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "export/import"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-2xl font-bold mb-7"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Export/Import Settings", "user-verification")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-4"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "text-lg w-[300px] m-0"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Import", "user-verification")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-col gap-4 items-start "
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "!m-0 "
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Please select the data file to import", "user-verification"), ":", " "), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-start"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-col"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "file",
    name: "",
    id: "",
    accept: ".json",
    onChange: handleFileChange
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-[#ec942c] text-xs "
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Supported file type", "user-verification"), ": .json")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "pg-font flex gap-2 justify-center cursor-pointer py-2 px-4 capitalize bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700",
    onClick: handleImport
  }, importStatus === "run" ? "Importing..." : "Import"), importStatus === "stop" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-emerald-500 m-0 "
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Imported", "user-verification")))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-4"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "text-lg w-[300px] m-0 "
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Export", "user-verification")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-4 items-center "
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "!m-0 "
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Export settings", "user-verification"), ":", " "), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ExportButton, null))))))));
}
class PGDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWarning: true
    };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }
  render() {
    var {
      onChange,
      setEnable
    } = this.props;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Html, {
      setEnable: setEnable,
      warn: this.state.showWarning
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PGDashboard);

/***/ }),

/***/ "./src/components/dropdown/index.js":
/*!******************************************!*\
  !*** ./src/components/dropdown/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/keycodes */ "@wordpress/keycodes");
/* harmony import */ var _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_2__);




function Html(props) {
  if (!props.warn) {
    return null;
  }
  const [pickerOpen, setPickerOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [keyword, setKeyword] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [filteredOptions, setfilteredOptions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  var position = props.position;
  var variant = props.variant;
  var btnClass = props.btnClass;
  var options = props.options;
  console.log(options);
  var buttonTitle = props.buttonTitle;
  var value = props.value == undefined ? "" : props.value;
  var onChange = props.onChange;

  //////////////////
  const firstElementRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (pickerOpen && firstElementRef.current) {
      firstElementRef.current.focus();
    }
  }, [pickerOpen]);
  const handleKeyDown = event => {
    if (!props.warn) return;
    const focusableElements = document.querySelectorAll(".focusable");
    const inputControl = document.querySelector(".pgDropdownSearch");
    switch (event.key) {
      case "ArrowDown":
        // case "ArrowRight":
        event.preventDefault();
        for (let i = 0; i < focusableElements.length; i++) {
          if (focusableElements[i] === document.activeElement) {
            const nextIndex = (i + 1) % focusableElements.length;
            focusableElements[nextIndex].focus();
            break;
          }
        }
        break;
      case "ArrowUp":
        // case "ArrowLeft":
        event.preventDefault();
        for (let i = 0; i < focusableElements.length; i++) {
          if (focusableElements[i] === document.activeElement) {
            const prevIndex = (i - 1 + focusableElements.length) % focusableElements.length;
            focusableElements[prevIndex].focus();
            break;
          }
        }
        break;
      case "/":
        event.preventDefault();
        if (inputControl) inputControl.focus();
        break;
      case "Escape":
        event.preventDefault();
        setPickerOpen(false);
        break;
      default:
        break;
    }
  };

  // Handle focusing on the first element
  // useEffect(() => {
  // 	if (props.warn && firstElementRef.current) {
  // 		firstElementRef.current.focus();
  // 	}
  // }, [props.warn]);
  //////////////////

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "relative"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "",
    onClick: ev => {
      setPickerOpen(prev => !prev);
    }
  }, typeof value == "string" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    className: `${btnClass} pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-800 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700`
    // variant={variant}
  }, options[value] != undefined ? options[value]?.label : buttonTitle), typeof value != "string" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    className: `${btnClass} pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-800 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700`
    // variant={variant}
  }, buttonTitle)), pickerOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Popover, {
    position: position
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "p-2 w-[300px] pg-font pg-setting-input-text max-h-[350px] custom-scrollbar\t",
    onKeyDown: handleKeyDown
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "absolute -top-[15px] -left-[15px] rounded-full  w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer ",
    onClick: ev => {
      setPickerOpen(prev => !prev);
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "text-[20px] text-white "
  }, "\xD7")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "flex flex-col w-full "
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalInputControl, {
    autoComplete: "off",
    className: "p-3 w-full pgDropdownSearch",
    placeholder: props.searchPlaceholder == undefined ? "Search..." : props.searchPlaceholder,
    value: keyword,
    onChange: newVal => {
      var newValX = newVal.replace(/[^a-zA-Z ]/g, "");
      if (newValX.length > 0) {
        setKeyword(newValX);
      }
      if (typeof options == "object") {
        setfilteredOptions({});
        var newOptions = {};
        Object.entries(options).map(args => {
          var index = args[0];
          var x = args[1];
          let position = x.label.toLowerCase().search(newValX.toLowerCase());
          if (position < 0) {
            x.exclude = true;
          } else {
            x.exclude = false;
          }
          newOptions[index] = x;
        });
        setfilteredOptions(newOptions);
      } else {
        setfilteredOptions([]);
        var newOptions = [];
        options.map((x, index) => {
          let position = x.label.toLowerCase().search(newValX.toLowerCase());
          if (position < 0) {
            x.exclude = true;
          } else {
            x.exclude = false;
          }

          //newOptions.push(x);
        });
        setfilteredOptions(newOptions);
      }
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    className: "block w-full text-xs pg-font "
  }, " ", "Press", " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("code", {
    className: "inline-block p-1 px-2 bg-gray-500/60 text-white"
  }, "\u2B7E Tab"), " ", "to access by keyboard.")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, keyword.length == 0 && typeof options == "object" && Object.entries(options).map(args => {
    var index = args[0];
    var x = args[1];
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
      ////
      ref: firstElementRef
      ////
      ,
      className: [typeof value == "object" && value.includes(isNumeric(index) ? parseInt(index) : index) ? "w-full focusable !border-b cursor-pointer bg-slate-200 p-2 block" : "w-full focusable !border-b !border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent !border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:!border-b-0 min-h-[40px] "],
      onClick: ev => {
        if (x.isPro == true) {
          alert("Sorry this feature only available in pro");
        } else {
          onChange(x, index);
        }
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "flex justify-between items-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: [x.isPro ? "text-gray-400 text-left" : "text-left"]
    }, x.icon != undefined && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: ""
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.RawHTML, null, x.icon)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: " text-left"
    }, x.label)), x.isPro &&
    // <span className="pg-bg-color rounded-sm px-3  py-1 no-underline text-white hover:text-white">
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", {
      target: "_blank",
      href: "https://comboblocks.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" + x.label,
      className: "pg-bg-color rounded-sm px-3 inline-block cursor-pointer py-1 no-underline text-white hover:text-white"
    }, "Pro")
    // </span>
    ), x.description != undefined && x.description.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "text-xs text-slate-400 text-left"
    }, x.description));
  }), keyword.length == 0 && typeof options == "array" && options.map((x, index) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
      ////
      ref: firstElementRef
      ////
      ,
      className: [typeof value == "object" && value.includes(IsNumeric(index) ? parseInt(index) : index) ? "border-b cursor-pointer bg-slate-200 p-2 block" : "border-b border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:!border-b-0 min-h-[40px] "],
      onClick: ev => {
        //onChange(x, index)

        if (x.isPro == true) {
          alert("Sorry this feature only available in pro");
        } else {
          onChange(x, index);
        }
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "flex justify-between items-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: [x.isPro ? "text-gray-400  text-left" : "  text-left"]
    }, x.icon != undefined && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: ""
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.RawHTML, null, x.icon)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "  text-left"
    }, x.label, " ")), x.isPro && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", {
      target: "_blank",
      href: "https://comboblocks.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" + x.label,
      className: "pg-bg-color rounded-sm px-3 inline-block cursor-pointer py-1 no-underline text-white hover:text-white"
    }, "Pro")), x.description != undefined && x.description.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "text-xs text-slate-400 text-left"
    }, x.description));
  }), keyword.length > 0 && typeof filteredOptions == "object" && Object.entries(filteredOptions).map(args => {
    var index = args[0];
    var x = args[1];
    if (x.exclude == false) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
        ////
        ref: firstElementRef
        ////
        ,
        className: "w-full focusable !border-b !border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent !border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:!border-b-0 min-h-[40px] ",
        onClick: ev => {
          //onChange(x, index)

          if (x.isPro == true) {
            alert("Sorry this feature only available in pro");
          } else {
            onChange(x, index);
          }
        }
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "flex justify-between items-center"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: [x.isPro ? "text-gray-400  text-left" : "  text-left"]
      }, x.icon != undefined && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: ""
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.RawHTML, null, x.icon)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "  text-left"
      }, x.label, " ")), x.isPro && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", {
        target: "_blank",
        href: "https://comboblocks.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" + x.label,
        className: "pg-bg-color rounded-sm px-3 inline-block cursor-pointer py-1 n  text-lefto-underline text-white hover:text-white"
      }, "Pro")), x.description != undefined && x.description.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "text-xs text-slate-400 text-left"
      }, x.description));
    }
  }), keyword.length > 0 && typeof filteredOptions == "array" && filteredOptions.map((x, index) => {
    if (x.exclude == false) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
        ////
        ref: firstElementRef
        ////
        ,
        className: "w-full focusable !border-b !border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent !border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:!border-b-0 min-h-[40px] ",
        onClick: ev => {
          //onChange(x, index)

          if (x.isPro == true) {
            alert("Sorry this feature only available in pro");
          } else {
            onChange(x, index);
          }
        }
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "flex justify-between items-center"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: [x.isPro ? "text-gray-400  text-left" : "  text-left"]
      }, x.icon != undefined && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: ""
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.RawHTML, null, x.icon)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "  text-left"
      }, x.label, " ")), x.isPro && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", {
        target: "_blank",
        href: "https://comboblocks.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" + x.label,
        className: "pg-bg-color rounded-sm px-3 inline-block cursor-pointer py-1 no-underline text-white hover:text-white"
      }, "Pro")), x.description != undefined && x.description.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "text-xs text-slate-400 text-left"
      }, x.description));
    }
  }), keyword.length > 0 && typeof filteredOptions == "object" && Object.entries(filteredOptions).length == 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "text-center p-2 text-red-500 "
  }, "No options found."), keyword.length > 0 && filteredOptions.length == 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "text-center p-2 text-red-500 "
  }, "No options found.")))));
}
class PGDropdown extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWarning: true
    };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }
  render() {
    const {
      position,
      variant,
      btnClass,
      searchPlaceholder,
      options,
      //[{"label":"Select..","icon":"","value":""}]
      buttonTitle,
      onChange,
      values,
      value
    } = this.props;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Html, {
      value: value,
      position: position,
      searchPlaceholder: searchPlaceholder,
      btnClass: btnClass,
      variant: variant,
      options: options,
      buttonTitle: buttonTitle,
      onChange: onChange,
      warn: this.state.showWarning,
      handleToggleClick: this.handleToggleClick
    }));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PGDropdown);

/***/ }),

/***/ "./src/components/tab/index.js":
/*!*************************************!*\
  !*** ./src/components/tab/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

const {
  Component,
  RawHTML,
  useState
} = wp.element;


class PGtab extends Component {
  render() {
    const {
      children
    } = this.props;
    function MyFunction() {
      //const [selected, setSelected] = useState(activeTab);

      // useEffect(() => {
      // }, [keyword]);

      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "tabContent py-3"
      }, children);
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(MyFunction, null));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PGtab);

/***/ }),

/***/ "./src/components/tabs/index.js":
/*!**************************************!*\
  !*** ./src/components/tabs/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");

const {
  Component,
  RawHTML,
  useState
} = wp.element;


function MyFunction(props) {
  if (!props.warn) {
    return null;
  }
  var orientation = props.orientation; // vertical, horizontal
  var contentClass = props.contentClass == undefined ? "py-3" : props.contentClass;
  var navItemClass = props.navItemClass == undefined ? "bg-gray-200" : props.navItemClass;
  var navItemSelectedClass = props.navItemSelectedClass == undefined ? "!bg-gray-400" : props.navItemSelectedClass;
  const [selected, setSelected] = useState(props.activeTab);
  const [scrollTo, setscrollTo] = useState(200);
  var content;

  // useEffect(() => {
  // }, [keyword]);

  props.children.map(child => {
    if (selected == child.props.name) {
      content = child.props.children;
    }
  });
  function scrollPrev() {
    const tabsNavs = document.querySelector(".tabsNavs");
    if (tabsNavs == null) return;
    tabsNavs.scrollBy({
      left: -scrollTo,
      behavior: "smooth"
    });
  }
  function scrollNext() {
    const tabsNavs = document.querySelector(".tabsNavs");
    if (tabsNavs == null) return;
    tabsNavs.scrollBy({
      left: scrollTo,
      behavior: "smooth"
    });
  }
  function onWheel(ev) {
    // ev.preventDefault();
    ev.stopPropagation();
    const tabsNavs = document.querySelector(".tabsNavs");
    tabsNavs?.scrollBy({
      left: ev.deltaY,
      behavior: "smooth"
    });
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: orientation == "vertical" ? "flex tabsWrapper" : "relative tabsWrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "relative"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: orientation == "vertical" ? "block w-[200px] " : "flex overflow-hidden  tabsNavs cursor-move ",
    onWheel: onWheel
  }, props.tabs.map(tab => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `${navItemClass} flex justify-between flex-none border-0   items-center grow  font-medium  text-slate-900 p-2 cursor-pointer hover:bg-gray-300 ${tab.name == selected ? navItemSelectedClass : navItemClass} ${orientation == "vertical" ? "       " : "flex-col"}`,
      onClick: ev => {
        props.onSelect(tab);
        setSelected(tab.name);
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `flex ${orientation == "vertical" ? "" : "flex-col"} justify-center items-center`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"], {
      fill: "#404040",
      icon: tab.icon,
      size: 24
      // className="mr-2 w-[20px] text-green-500"
      ,
      className: " text-green-500"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "text-sm"
    }, tab.title)), tab.isPro != null && tab.isPro && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "pg-bg-color text-white px-2  text-sm rounded-sm",
      onClick: ev => {
        window.open("https://comboblocks.com/pricing/", "_blank");
      }
    }, "Pro"));
  })), orientation != "vertical" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null)
  // <div className="navs absolute w-full top-1/2 -translate-y-1/2 ">
  // 	<div
  // 		className="navPrev cursor-pointer absolute top-[50%] left-0 -translate-y-2/4  bg-[#ffffff6b]"
  // 		onClick={scrollPrev}>
  // 		<Icon fill="#333" icon={chevronLeft} />
  // 	</div>
  // 	<div
  // 		className="navNext cursor-pointer absolute top-[50%] -translate-y-2/4 right-[-4px]  bg-[#ffffff6b]"
  // 		onClick={scrollNext}>
  // 		<Icon fill="#333" icon={chevronRight} />
  // 	</div>
  // </div>
  ), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `tabContent  ${contentClass}`
  }, content));
}
class PGtabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWarning: true
    };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }
  render() {
    const {
      activeTab,
      orientation,
      activeClass,
      contentClass,
      navItemClass,
      navItemSelectedClass,
      onSelect,
      tabs,
      children
    } = this.props;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(MyFunction, {
      children: children,
      tabs: tabs,
      orientation: orientation,
      contentClass: contentClass,
      navItemClass: navItemClass,
      navItemSelectedClass: navItemSelectedClass,
      onSelect: onSelect,
      activeTab: activeTab,
      warn: this.state.showWarning
    }));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PGtabs);

/***/ }),

/***/ "./src/dashboard.js":
/*!**************************!*\
  !*** ./src/dashboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_dashboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/dashboard */ "./src/components/dashboard/index.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);



function TemplatesBtn(props) {
  // if (!props.warn) {
  //     return null;
  // }

  const [enable, setEnable] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_dashboard__WEBPACK_IMPORTED_MODULE_1__["default"], {
    setEnable: setEnable
  });
}
document.addEventListener("DOMContentLoaded", DOMContentLoadedImport);
function DOMContentLoadedImport() {
  setTimeout(() => {
    var headerSettings = document.querySelector('#cb-dashboard');
    var importEl = document.createElement('div');
    var html = '<div class="pgTemplates" id="pgDashboardBtn"></div>';
    importEl.innerHTML = html;
    if (headerSettings != null) {
      headerSettings.prepend(importEl);
    }
    var pgDashboardBtn = document.querySelector('#pgDashboardBtn');
    if (pgDashboardBtn != null) {
      wp.element.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TemplatesBtn, null), pgDashboardBtn);
    }
  }, 2000);
}

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   store: () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);



const {
  __experimentalSetPreviewDeviceType: setPreviewDeviceType
} = wp.data.dispatch("core/edit-post");

// if (wp.data.dispatch('core/edit-post') != null) {
//   const {
//     __experimentalSetPreviewDeviceType: setPreviewDeviceType,

//   } = wp.data.dispatch('core/edit-post')

// } else {
//   const {
//     __experimentalSetPreviewDeviceType: setPreviewDeviceType,

//   } = wp.data.dispatch('core/edit-widgets')
// }

const DEFAULT_STATE = {
  breakPoint: "Desktop",
  clientdata: {},
  license: {
    license_status: "",
    license_key: ""
  },
  blockCss: "",
  stylesClipboard: null
};
var selectors = {
  getBreakPoint(state) {
    const {
      breakPoint
    } = state;
    return breakPoint;
  },
  getclientdata(state) {
    const {
      clientdata
    } = state;
    return clientdata;
  },
  getLicense(state) {
    const {
      license
    } = state;
    return license;
  },
  getStylesClipboard(state) {
    const {
      stylesClipboard
    } = state;
    return stylesClipboard;
  },
  parseCustomTags(state, str, tags) {
    if (str !== undefined) {
      var strArr = str?.split(" ");
      if (str?.length == 0) return;
      var newStr = strArr.map(item => {
        if (item.indexOf("currentYear") >= 0) {
          return tags.currentYear.value;
        } else if (item.indexOf("currentMonth") >= 0) {
          return tags.currentMonth.value;
        } else if (item.indexOf("currentDay") >= 0) {
          return tags.currentDay.value;
        } else if (item.indexOf("currentDate") >= 0) {
          return tags.currentDate.value;
        } else if (item.indexOf("currentTime") >= 0) {
          return tags.currentTime.value;
        } else if (item.indexOf("postPublishDate") >= 0) {
          return tags.postPublishDate.value;
        } else if (item.indexOf("postModifiedDate") >= 0) {
          return tags.postModifiedDate.value;
        } else if (item.indexOf("termId") >= 0) {
          return tags.termId.value;
        } else if (item.indexOf("termTitle") >= 0) {
          return tags.termTitle.value;
        } else if (item.indexOf("termDescription") >= 0) {
          return tags.termDescription.value;
        } else if (item.indexOf("termPostCount") >= 0) {
          return tags.termPostCount.value;
        } else if (item.indexOf("postTagTitle") >= 0) {
          return tags.postTagTitle.value;
        } else if (item.indexOf("postTagsTitle") >= 0) {
          return tags.postTagsTitle.value;
        } else if (item.indexOf("postCategoryTitle") >= 0) {
          return tags.postCategoryTitle.value;
        } else if (item.indexOf("postCategoriesTitle") >= 0) {
          return tags.postCategoriesTitle.value;
        } else if (item.indexOf("postTermTitle") >= 0) {
          return tags.postTermTitle.value;
        } else if (item.indexOf("postTermsTitle") >= 0) {
          return tags.postTermsTitle.value;
        } else if (item.indexOf("postSlug") >= 0) {
          return tags.postSlug.value;
        } else if (item.indexOf("postId") >= 0) {
          return tags.postId.value;
        } else if (item.indexOf("postStatus") >= 0) {
          return tags.postStatus.value;
        } else if (item.indexOf("authorId") >= 0) {
          return tags.authorId.value;
        } else if (item.indexOf("authorName") >= 0) {
          return tags.authorName.value;
        } else if (item.indexOf("authorFirstName") >= 0) {
          return tags.authorFirstName.value;
        } else if (item.indexOf("authorLastName") >= 0) {
          return tags.authorLastName.value;
        } else if (item.indexOf("authorDescription") >= 0) {
          return tags.authorDescription.value;
        } else if (item.indexOf("excerpt") >= 0) {
          return tags.excerpt.value;
        } else if (item.indexOf("rankmathTitle") >= 0) {
          return tags.rankmathTitle.value;
        } else if (item.indexOf("rankmathDescription") >= 0) {
          return tags.rankmathDescription.value;
        } else if (item.indexOf("rankmathFocusKeyword") >= 0) {
          return tags.rankmathFocusKeyword.value;
        } else if (item.indexOf("rankmathOrgname") >= 0) {
          return tags.rankmathOrgname.value;
        } else if (item.indexOf("rankmathOrgurl") >= 0) {
          return tags.rankmathOrgurl.value;
        } else if (item.indexOf("rankmathOrglogo") >= 0) {
          return tags.rankmathOrglogo.value;
        } else if (item.indexOf("siteTitle") >= 0) {
          return tags.siteTitle.value;
        } else if (item.indexOf("siteDescription") >= 0) {
          return tags.siteDescription.value;
        } else if (item.indexOf("postMeta") >= 0) {
          return tags.currentDay.value;
        } else if (item.indexOf("separator") >= 0) {
          return tags.separator.value;
        } else if (item.indexOf("searchTerms") >= 0) {
          return tags.searchTerms.value;
        }
        // else if (item.indexOf("counter") >= 0) {
        // 	return tags.counter.value;
        // }
        else {
          return item;
        }
      });
      return newStr.join(" ");
    }
  },
  cssAttrParse(state, key) {
    var cssProp = "";
    if (key == "alignContent") {
      cssProp = "align-content";
    } else if (key == "alignItems") {
      cssProp = "align-items";
    } else if (key == "animationName") {
      cssProp = "animation-name";
    } else if (key == "alignSelf") {
      cssProp = "align-self";
    } else if (key == "aspectRatio") {
      cssProp = "aspect-ratio";
    } else if (key == "backfaceVisibility") {
      cssProp = "backface-visibility";
    } else if (key == "backgroundAttachment") {
      cssProp = "background-attachment";
    } else if (key == "backgroundBlendMode") {
      cssProp = "background-blend-mode";
    } else if (key == "backgroundClip") {
      cssProp = "background-clip";
    } else if (key == "bgColor") {
      cssProp = "background-color";
    } else if (key == "backgroundColor") {
      cssProp = "background-color";
    } else if (key == "backgroundOrigin") {
      cssProp = "background-origin";
    } else if (key == "backgroundRepeat") {
      cssProp = "background-repeat";
    } else if (key == "backgroundSize") {
      cssProp = "background-size";
    } else if (key == "backgroundPosition") {
      cssProp = "background-position";
    } else if (key == "backgroundImage") {
      cssProp = "background-image";
    } else if (key == "border") {
      cssProp = "border";
    } else if (key == "borderTop") {
      cssProp = "border-top";
    } else if (key == "borderRight") {
      cssProp = "border-right";
    } else if (key == "borderBottom") {
      cssProp = "border-bottom";
    } else if (key == "borderLeft") {
      cssProp = "border-left";
    } else if (key == "borderRadius") {
      cssProp = "border-radius";
    } else if (key == "borderCollapse") {
      cssProp = "border-collapse";
    } else if (key == "borderSpacing") {
      cssProp = "border-spacing";
    } else if (key == "borderImage") {
      cssProp = "border-image";
    } else if (key == "boxShadow") {
      cssProp = "box-shadow";
    } else if (key == "backdropFilter") {
      cssProp = "backdrop-filter";
    } else if (key == "bottom" || key == "top" || key == "left" || key == "right" || key == "clear" || key == "color" || key == "filter" || key == "float") {
      cssProp = key;
    } else if (key == "boxSizing") {
      cssProp = "box-sizing";
    } else if (key == "cursor") {
      cssProp = "cursor";
    } else if (key == "content") {
      cssProp = "content";
    } else if (key == "counterIncrement") {
      cssProp = "counter-increment";
    } else if (key == "counterReset") {
      cssProp = "counter-reset";
    } else if (key == "counterSet") {
      cssProp = "counter-set";
    } else if (key == "columnCount") {
      cssProp = "column-count";
    } else if (key == "columnRule") {
      cssProp = "column-rule";
    } else if (key == "direction") {
      cssProp = "direction";
    } else if (key == "fontFamily") {
      cssProp = "font-family";
    } else if (key == "fontSize") {
      cssProp = "font-size";
    } else if (key == "fontStyle") {
      cssProp = "font-style";
    } else if (key == "fontStretch") {
      cssProp = "font-stretch";
    } else if (key == "fontWeight") {
      cssProp = "font-weight";
    } else if (key == "fontVariantCaps") {
      cssProp = "font-variant-caps";
    } else if (key == "flexWrap") {
      cssProp = "flex-wrap";
    } else if (key == "flexDirection") {
      cssProp = "flex-direction";
    } else if (key == "flexGrow") {
      cssProp = "flex-grow";
    } else if (key == "flexShrink") {
      cssProp = "flex-shrink";
    } else if (key == "flexBasis") {
      cssProp = "flex-basis";
    } else if (key == "flexFlow") {
      cssProp = "flex-flow";
    } else if (key == "letterSpacing") {
      cssProp = "letter-spacing";
    } else if (key == "gridAutoFlow") {
      cssProp = "grid-auto-flow";
    } else if (key == "gridColumnEnd") {
      cssProp = "grid-column-end";
    } else if (key == "gridColumnStart") {
      cssProp = "grid-column-start";
    } else if (key == "gridRowEnd") {
      cssProp = "grid-row-end";
    } else if (key == "gridRowStart") {
      cssProp = "grid-row-start";
    } else if (key == "gridTemplateColumns") {
      cssProp = "grid-template-columns";
    } else if (key == "gridTemplateRows") {
      cssProp = "grid-template-rows";
    } else if (key == "listStyle") {
      cssProp = "list-style";
    } else if (key == "lineHeight") {
      cssProp = "line-height";
    } else if (key == "justifyContent") {
      cssProp = "justify-content";
    } else if (key == "objectFit") {
      cssProp = "object-fit";
    } else if (key == "opacity") {
      cssProp = "opacity";
    } else if (key == "outline") {
      cssProp = "outline";
    } else if (key == "order") {
      cssProp = "order";
    } else if (key == "outlineOffset") {
      cssProp = "outline-offset";
    } else if (key == "position") {
      cssProp = "position";
    } else if (key == "textIndent") {
      cssProp = "text-indent";
    } else if (key == "textJustify") {
      cssProp = "text-justify";
    } else if (key == "textTransform") {
      cssProp = "text-transform";
    } else if (key == "textDecoration") {
      cssProp = "text-decoration";
    } else if (key == "textOverflow") {
      cssProp = "text-overflow";
    } else if (key == "textShadow") {
      cssProp = "text-shadow";
    } else if (key == "textAlign") {
      cssProp = "text-align";
    } else if (key == "visibility") {
      cssProp = "visibility";
    } else if (key == "wordBreak") {
      cssProp = "word-break";
    } else if (key == "wordSpacing") {
      cssProp = "word-spacing";
    } else if (key == "zIndex") {
      cssProp = "z-index";
    } else if (key == "padding") {
      cssProp = "padding";
    } else if (key == "paddingTop") {
      cssProp = "padding-top";
    } else if (key == "paddingRight") {
      cssProp = "padding-right";
    } else if (key == "paddingBottom") {
      cssProp = "padding-bottom";
    } else if (key == "paddingLeft") {
      cssProp = "padding-left";
    } else if (key == "placeItems") {
      cssProp = "place-items";
    } else if (key == "margin") {
      cssProp = "margin";
    } else if (key == "marginTop") {
      cssProp = "margin-top";
    } else if (key == "marginRight") {
      cssProp = "margin-right";
    } else if (key == "marginBottom") {
      cssProp = "margin-bottom";
    } else if (key == "marginLeft") {
      cssProp = "margin-left";
    } else if (key == "display") {
      cssProp = "display";
    } else if (key == "width") {
      cssProp = "width";
    } else if (key == "height") {
      cssProp = "height";
    } else if (key == "verticalAlign") {
      cssProp = "vertical-align";
    } else if (key == "overflow") {
      cssProp = "overflow";
    } else if (key == "overflowX") {
      cssProp = "overflow-x";
    } else if (key == "overflowY") {
      cssProp = "overflow-y";
    } else if (key == "writingMode") {
      cssProp = "writing-mode";
    } else if (key == "wordWrap") {
      cssProp = "word-wrap";
    } else if (key == "perspective") {
      cssProp = "perspective";
    } else if (key == "minWidth") {
      cssProp = "min-width";
    } else if (key == "minHeight") {
      cssProp = "min-height";
    } else if (key == "maxHeight") {
      cssProp = "max-height";
    } else if (key == "maxWidth") {
      cssProp = "max-width";
    } else if (key == "transition") {
      cssProp = "transition";
    } else if (key == "transform") {
      cssProp = "transform";
    } else if (key == "transformOrigin") {
      cssProp = "transform-origin";
    } else if (key == "tableLayout") {
      cssProp = "table-layout";
    } else if (key == "emptyCells") {
      cssProp = "empty-cells";
    } else if (key == "captionSide") {
      cssProp = "caption-side";
    } else if (key == "gap") {
      cssProp = "gap";
    } else if (key == "rowGap") {
      cssProp = "row-gap";
    } else if (key == "columnGap") {
      cssProp = "column-gap";
    } else if (key == "userSelect") {
      cssProp = "user-select";
    } else if (key == "-webkit-text-fill-color") {
      cssProp = "-webkit-text-fill-color";
    } else {
      cssProp = key;
    }
    return cssProp;
  },
  onAddStyleItem(state, sudoScource, key, obj) {
    const {
      breakPoint
    } = state;
    var path = [sudoScource, key, breakPoint];
    let objX = Object.assign({}, obj);
    const object = selectors.addPropertyDeep(state, objX, path, "");
    return object;
  },
  addPropertyDeep(state, obj, path, value) {
    const [head, ...rest] = path;
    return {
      ...obj,
      [head]: rest.length ? selectors.addPropertyDeep(state, obj[head], rest, value) : value
    };
  },
  updatePropertyDeep(state, obj, path, value) {
    const [head, ...rest] = path;
    return {
      ...obj,
      [head]: rest.length ? selectors.updatePropertyDeep(state, obj[head], rest, value) : value
    };
  },
  setPropertyDeep(state, obj, path, value) {
    const [head, ...rest] = path.split(".");
    return {
      ...obj,
      [head]: rest.length ? selectors.setPropertyDeep(state, obj[head], rest.join("."), value) : value
    };
  },
  deletePropertyDeep(state, object, path) {
    var last = path.pop();
    delete path.reduce((o, k) => o[k] || {}, object)[last];
    return object;
  },
  getElementSelector(state, sudoScource, mainSelector) {
    var elementSelector = mainSelector;
    if (sudoScource == "styles") {
      elementSelector = mainSelector;
    } else if (sudoScource == "hover") {
      elementSelector = mainSelector + ":hover";
    } else if (sudoScource == "after") {
      elementSelector = mainSelector + "::after";
    } else if (sudoScource == "before") {
      elementSelector = mainSelector + "::before";
    } else if (sudoScource == "first-child") {
      elementSelector = mainSelector + ":first-child";
    } else if (sudoScource == "last-child") {
      elementSelector = mainSelector + ":last-child";
    } else if (sudoScource == "visited") {
      elementSelector = mainSelector + ":visited";
    } else if (sudoScource == "selection") {
      elementSelector = mainSelector + "::selection";
    } else if (sudoScource == "first-letter") {
      elementSelector = mainSelector + "::first-letter";
    } else if (sudoScource == "first-line") {
      elementSelector = mainSelector + "::first-line";
    } else {
      elementSelector = mainSelector + ":" + sudoScource;
    }
    return elementSelector;
  },
  // generateElementCss(state, obj, elementSelector) {
  // 	var cssObj = {};

  // 	Object.entries(obj).map((args) => {
  // 		var sudoSrc = args[0];
  // 		var sudoArgs = args[1];
  // 		if (sudoSrc != "options" && sudoArgs != null) {
  // 			var selector = selectors.getElementSelector(
  // 				state,
  // 				sudoSrc,
  // 				elementSelector
  // 			);
  // 			Object.entries(args[1]).map((x) => {
  // 				var attr = x[0];
  // 				var cssPropty = selectors.cssAttrParse(state, attr);

  // 				if (cssObj[selector] == undefined) {
  // 					cssObj[selector] = {};
  // 				}

  // 				if (cssObj[selector][cssPropty] == undefined) {
  // 					cssObj[selector][cssPropty] = {};
  // 				}

  // 				cssObj[selector][cssPropty] = x[1];
  // 			});
  // 		}
  // 	});

  // 	return cssObj;
  // },
  generateElementCss(state, obj, elementSelector) {
    var cssObj = {};
    Object.entries(obj).map(args => {
      var sudoSrc = args[0];
      var sudoArgs = args[1];
      if (sudoSrc != "options" && sudoArgs != null) {
        var selector = selectors.getElementSelector(state, sudoSrc, elementSelector);
        Object.entries(args[1]).map(x => {
          var attr = x[0];
          var propVal = x[1];
          var cssPropty = selectors.cssAttrParse(state, attr);
          var found = Object.entries(propVal).reduce((a, [k, v]) => v ? (a[k] = v, a) : a, {});
          if (Object.keys(found).length > 0) {
            if (cssObj[selector] == undefined) {
              cssObj[selector] = {};
            }
            if (cssObj[selector][cssPropty] == undefined) {
              cssObj[selector][cssPropty] = {};
            }
            cssObj[selector][cssPropty] = x[1];
          }
        });
      }
    });
    return cssObj;
  },
  // getBlockCssRules(state, blockCssObj) {
  // 	var blockCssRules = {};

  // 	Object.entries(blockCssObj).map((args) => {
  // 		var elementSelector = args[0];
  // 		var elementObj = args[1];

  // 		var elementCss = selectors.generateElementCss(
  // 			state,
  // 			elementObj,
  // 			elementSelector
  // 		);

  // 		if (elementCss[elementSelector] == undefined) {
  // 		} else {
  // 			blockCssRules[elementSelector] = elementCss[elementSelector];
  // 		}
  // 	});

  // 	return blockCssRules;
  // },

  getBlockCssRules(state, blockCssObj) {
    var blockCssRules = {};
    Object.entries(blockCssObj).map(args => {
      var elementSelector = args[0];
      var elementObj = args[1];
      var elementCss = selectors.generateElementCss(state, elementObj, elementSelector);
      Object.entries(elementCss).map(sudoCss => {
        var sudoSelector = sudoCss[0];
        var sudoVal = sudoCss[1];
        blockCssRules[sudoSelector] = sudoVal;
      });
    });
    return blockCssRules;
  },
  generateCssFromElementObject(state, obj, selector) {
    var reponsiveCssGroups = {};
  },
  generateBlockCss(state, items, blockId) {
    console.log(items);
    const {
      blockCss
    } = state;
    var reponsiveCssGroups = {};
    for (var selector in items) {
      var attrs = items[selector];
      for (var attr in attrs) {
        var breakpoints = attrs[attr];
        for (var device in breakpoints) {
          var attrValue = breakpoints[device];
          if (reponsiveCssGroups[device] == undefined) {
            reponsiveCssGroups[device] = [];
          }
          if (reponsiveCssGroups[device] == undefined) {
            reponsiveCssGroups[device] = [];
          }
          if (reponsiveCssGroups[device][selector] == undefined) {
            reponsiveCssGroups[device][selector] = [];
          }
          if (typeof attrValue == "string") {
            attrValue = attrValue.replaceAll("u0022", '"');
            reponsiveCssGroups[device][selector].push({
              attr: attr,
              val: attrValue
            });
          }
        }
      }
    }
    var reponsiveCssDesktop = "";
    if (reponsiveCssGroups["Desktop"] != undefined) {
      for (var selector in reponsiveCssGroups["Desktop"]) {
        var attrs = reponsiveCssGroups["Desktop"][selector];
        reponsiveCssDesktop += selector + "{";
        for (var index in attrs) {
          var attr = attrs[index];
          var attrName = attr.attr;
          var attrValue = attr.val;
          reponsiveCssDesktop += attrName + ":" + attrValue + ";";
        }
        reponsiveCssDesktop += "}";
      }
    }
    var reponsiveCssTablet = "";
    if (reponsiveCssGroups["Tablet"] != undefined) {
      reponsiveCssTablet += "@media(max-width: 991px){";
      for (var selector in reponsiveCssGroups["Tablet"]) {
        var attrs = reponsiveCssGroups["Tablet"][selector];
        reponsiveCssTablet += selector + "{";
        for (var index in attrs) {
          var attr = attrs[index];
          var attrName = attr.attr;
          var attrValue = attr.val;
          reponsiveCssTablet += attrName + ":" + attrValue + ";";
        }
        reponsiveCssTablet += "}";
      }
      reponsiveCssTablet += "}";
    }
    var reponsiveCssMobile = "";
    if (reponsiveCssGroups["Mobile"] != undefined) {
      reponsiveCssMobile += "@media(max-width:767px){";
      for (var selector in reponsiveCssGroups["Mobile"]) {
        var attrs = reponsiveCssGroups["Mobile"][selector];
        reponsiveCssMobile += selector + "{";
        for (var index in attrs) {
          var attr = attrs[index];
          var attrName = attr.attr;
          var attrValue = attr.val;
          reponsiveCssMobile += attrName + ":" + attrValue + ";";
        }
        reponsiveCssMobile += "}";
      }
      reponsiveCssMobile += "}";
    }
    var reponsiveCss = reponsiveCssDesktop + reponsiveCssTablet + reponsiveCssMobile;
    console.log(reponsiveCss);
    var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];
    if (iframe) {
      setTimeout(() => {
        var iframeDocument = iframe.contentDocument;
        var body = iframeDocument.body;
        var divWrap = iframeDocument.getElementById("css-block-" + blockId);
        if (divWrap != undefined) {
          iframeDocument.getElementById("css-block-" + blockId).outerHTML = "";
        }
        var divWrap = '<div id="css-block-' + blockId + '"></div>';
        body.insertAdjacentHTML("beforeend", divWrap);
        var csswrappg = iframeDocument.getElementById("css-block-" + blockId);
        var str = "<style>" + reponsiveCss + "</style>";
        csswrappg.insertAdjacentHTML("beforeend", str);
      }, 200);
    } else {
      var wpfooter = document.getElementById("wpfooter");
      var divWrap = document.getElementById("css-block-" + blockId);
      if (divWrap != undefined) {
        document.getElementById("css-block-" + blockId).outerHTML = "";
      }
      var divWrap = '<div id="css-block-' + blockId + '"></div>';
      wpfooter.insertAdjacentHTML("beforeend", divWrap);
      var csswrappg = document.getElementById("css-block-" + blockId);
      var str = "<style>" + reponsiveCss + "</style>";
      csswrappg.insertAdjacentHTML("beforeend", str);
    }
    return blockCss;
  }
};
var resolvers = {
  *getLicense() {
    const path = "/post-grid/v2/get_license";
    const res = yield actions.fetchLicense(path);
    return actions.setLicense(res);
  },
  *getclientdata() {
    const path = "/post-grid/v2/get_site_details";
    const res = yield actions.fetchclientdata(path);
    return actions.setclientdata(res);
  }
};
const actions = {
  setBreakPoint(breakpoint) {
    setPreviewDeviceType(breakpoint);
    return {
      type: "SET_BREAKPOINT",
      breakpoint
    };
  },
  setclientdata(clientdata) {
    return {
      type: "SET_CLIENTDATA",
      clientdata
    };
  },
  setLicense(license) {
    return {
      type: "SET_LICENSE",
      license
    };
  },
  setStylesClipboard(stylesClipboard) {
    return {
      type: "SET_CLIPBOARD",
      stylesClipboard
    };
  },
  fetchLicense(path) {
    return {
      type: "FETCH_LICENSE_FROM_API",
      path
    };
  },
  fetchclientdata(path) {
    return {
      type: "FETCH_CLIENTDATA_FROM_API",
      path
    };
  }
};
var controls = {
  FETCH_LICENSE_FROM_API(action) {
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: action.path,
      method: "POST",
      data: {}
    });
  },
  FETCH_CLIENTDATA_FROM_API(action) {
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: action.path,
      method: "POST",
      data: {}
    });
  },
  FETCH_PRO_INFO_FROM_API(action) {
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: action.path,
      method: "POST",
      data: {}
    });
  }
};
const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.createReduxStore)("postgrid-shop", {
  reducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
      case "SET_BREAKPOINT":
        return {
          ...state,
          breakPoint: action.breakpoint
        };
      case "SET_CLIENTDATA":
        return {
          ...state,
          clientdata: action.clientdata
        };
      case "SET_LICENSE":
        return {
          ...state,
          license: action.license
        };
      case "SET_CLIPBOARD":
        return {
          ...state,
          stylesClipboard: action.stylesClipboard
        };
    }
    return state;
  },
  actions,
  selectors,
  controls,
  resolvers
});
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.register)(store);
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.subscribe)(() => {});


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/keycodes":
/*!**********************************!*\
  !*** external ["wp","keycodes"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["keycodes"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "./src/store.js");
/* harmony import */ var _dashboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard */ "./src/dashboard.js");
// import apiFetch from "@wordpress/api-fetch";
// import { addFilter } from "@wordpress/hooks";
// import { createHigherOrderComponent } from "@wordpress/compose";
// import { subscribe, select } from "@wordpress/data";



})();

/******/ })()
;
//# sourceMappingURL=index.js.map