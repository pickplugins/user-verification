

const { Component, RawHTML, useState, useEffect } = wp.element;

import { ReactSortable } from "react-sortablejs";
import { PanelBody, RangeControl, Button, ButtonGroup, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, Spinner, CustomSelectControl, Popover, __experimentalInputControl as InputControl, } from '@wordpress/components'
import apiFetch from '@wordpress/api-fetch';
import {
	Icon,
	styles,
	close,
	plus,
	key,
	check,
	typography,
	textColor,
	lockSmall,
	category,
	atSymbol,
	settings,
	upload,
	color,
	plusCircle,
	download,
	arrowRight,
	brush,
	code,
} from "@wordpress/icons";

var myStore = wp.data.select('postgrid-shop');



function Html(props) {

	if (!props.warn) {
		return null;
	}

	var isLoaded = props.isLoaded;
	var selectAccordion = props.selectAccordion;
	var activeAccordion = props.activeAccordion;






	var [posts, setPosts] = useState(null); // Using the hook.
	var [pagination, setPagination] = useState({ currentPage: 1 }); // Using the hook.
	var [dataLoaded, setdataLoaded] = useState(false); // Using the hook.
	var [isLoading, setisLoading] = useState(false); // Using the hook.








	var queryArgs = [
		{
			"id": "postType",
			"val": [
				"accordions"
			]
		},
		{
			"id": "postStatus",
			"val": [
				"any"
			]
		},
		{
			"id": "order",
			"val": "DESC"
		},
		{
			"id": "orderby",
			"val": [
				"date"
			]
		},
		{
			"id": "postsPerPage",
			"val": "10"
		},
		{
			"id": "paged",
			"val": "1"
		}
	]


	function Prev() {

	}

	useEffect(() => {

		setisLoading(true);

		queryArgs.map(item => {

			var id = item.id;

			if (id == "paged") {
				item.val = pagination.currentPage;
			}

		})





		apiFetch({
			path: "/accordions/v2/accordions_list",
			method: "POST",
			data: {
				queryArgs: queryArgs,
				_wpnonce: user_verification_editor_js._wpnonce,

			},
		}).then((res) => {



			setisLoading(false);

			setPosts(res.posts);
		});






	}, [isLoaded, pagination.currentPage]);













	return (
		<div className="">
			{(isLoading) && (
				<div className='absolute top-0 left-0 bg-slate-500'>
					<Spinner />
				</div>
			)}


			{posts != null && (
				<>
					{posts.map(item => {

						return (
							<div className='flex justify-between p-3 border-0 border-b border-solid hover:bg-slate-300 cursor-pointer' onClick={ev => {
								selectAccordion(item.ID)
							}}>





								<span>{item.post_title}</span>

								{activeAccordion == item.ID && (
									<span><Icon icon={check} /></span>
								)}



							</div>
						)

					})}
				</>
			)}



			<div className='flex py-5 justify-between px-2'>

				<div className='bg-slate-400 px-5 py-2 cursor-pointer hover:bg-slate-300' onClick={ev => {

					if (pagination.currentPage > 1) {
						var currentPage = pagination.currentPage - 1;
						setPagination({ currentPage: currentPage })
					}


				}}>Prev</div>
				<div className='bg-slate-400 px-5 py-2 cursor-pointer hover:bg-slate-300' onClick={ev => {

					var currentPage = pagination.currentPage + 1;

					setPagination({ currentPage: currentPage })
				}}>Next</div>




			</div>




		</div>
	);






}

class AccordionsList extends Component {

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
			selectAccordion,
			activeAccordion

		} = this.props;







		return (


			<Html selectAccordion={selectAccordion} activeAccordion={activeAccordion} warn={this.state.showWarning} isLoaded={this.state.isLoaded} />


		)
	}
}













export default AccordionsList;