const { Component, RawHTML, useState } = wp.element;
import { Icon } from "@wordpress/icons";

function MyFunction(props) {
	if (!props.warn) {
		return null;
	}

	var orientation = props.orientation; // vertical, horizontal
	var contentClass = (props.contentClass == undefined) ? "py-3" : props.contentClass;
	var navItemClass = (props.navItemClass == undefined) ? "bg-gray-200" : props.navItemClass;
	var navItemSelectedClass = (props.navItemSelectedClass == undefined) ? "!bg-gray-400" : props.navItemSelectedClass;

	var navItemsWrapClassDef = orientation == "vertical" ? "block w-[200px] " : "flex overflow-hidden tabsNavs cursor-move "

	var navItemsWrapClass = (props.navItemsWrapClass == undefined) ? navItemsWrapClassDef : props.navItemsWrapClass;

	const [selected, setSelected] = useState(props.activeTab);
	const [scrollTo, setscrollTo] = useState(200);
	var content;

	// useEffect(() => {
	// }, [keyword]);

	props.children.map((child) => {
		if (selected == child.props.name) {
			content = child.props.children;
		}
	});

	function scrollPrev() {
		const tabsNavs = document.querySelector(".tabsNavs");
		if (tabsNavs == null) return;

		tabsNavs.scrollBy({
			left: -scrollTo,
			behavior: "smooth",
		});
	}

	function scrollNext() {
		const tabsNavs = document.querySelector(".tabsNavs");
		if (tabsNavs == null) return;

		tabsNavs.scrollBy({
			left: scrollTo,
			behavior: "smooth",
		});
	}
	function onWheel(ev) {
		// ev.preventDefault();
		ev.stopPropagation();

		const tabsNavs = document.querySelector(".tabsNavs");

		tabsNavs?.scrollBy({
			left: ev.deltaY,
			behavior: "smooth",
		});
	}

	return (
		<div className={
			orientation == "vertical"
				? "flex tabsWrapper"
				: "relative tabsWrapper"
		}>

			<div
				className={navItemsWrapClass}



				onWheel={onWheel}>
				{props.tabs.map((tab) => {
					return (
						<div
							className={`${navItemClass} flex justify-between flex-none border-0   items-center grow  font-medium  text-slate-900 p-2 cursor-pointer hover:bg-gray-300 ${tab.name == selected ? navItemSelectedClass : navItemClass
								} ${orientation == "vertical" ? "       " : "flex-col"}`}
							onClick={(ev) => {
								props.onSelect(tab);
								setSelected(tab.name);
							}}>
							<div
								className={`flex ${orientation == "vertical" ? "" : "flex-col"
									} justify-center items-center`}>
								<Icon
									fill="#404040"
									icon={tab.icon}
									size={24}
									// className="mr-2 w-[20px] text-green-500"
									className=" text-green-500"
								/>
								<span className="text-sm">{tab.title}</span>
							</div>

							{tab.isPro != null && tab.isPro && (
								<span
									className="pg-bg-color text-white px-2  text-sm rounded-sm"
									onClick={(ev) => {
										window.open("https://comboblocks.com/pricing/", "_blank");
									}}>
									Pro
								</span>
							)}
							{tab.isNew != null && tab.isNew && (
								<span
									className="pg-bg-color text-white px-2  text-sm rounded-sm"
								>
									New
								</span>
							)}






						</div>
					);
				})}
			</div>

			{orientation != "vertical" && (
				<></>
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
			)}



			<div className={`tabContent  ${contentClass}`}>{content}</div>
		</div>
	);
}

class PGtabs extends Component {
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
			activeTab,
			orientation,
			activeClass,
			contentClass,
			navItemsWrapClass,
			navItemClass,
			navItemSelectedClass,
			onSelect,
			tabs,
			children,
		} = this.props;

		return (
			<div>
				<MyFunction
					children={children}
					tabs={tabs}
					orientation={orientation}
					contentClass={contentClass}
					navItemClass={navItemClass}
					navItemSelectedClass={navItemSelectedClass}
					onSelect={onSelect}
					activeTab={activeTab}
					navItemsWrapClass={navItemsWrapClass}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}

export default PGtabs;


