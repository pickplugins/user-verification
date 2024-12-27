const { Component } = wp.element;

import { useEffect, useState } from "@wordpress/element";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	const [content, setContent] = useState('');

	console.log(props.id);


	useEffect(() => {
		//tinymce.execCommand('mceAddEditor', true, props.id);

		// console.log(props.id);

		// wp.editor.initialize(props.id, {
		//   tinymce: {
		//     wpautop: true,
		//     toolbar1:
		//       "bold italic underline strikethrough | bullist numlist | blockquote hr wp_more | alignleft aligncenter alignright | link unlink | fullscreen | wp_adv",
		//     toolbar2:
		//       "formatselect alignjustify forecolor | pastetext removeformat charmap | outdent indent | undo redo | wp_help",
		//   },
		//   quicktags: true,
		//   mediaButtons: true,
		// });


		// Function to capture content change
		// const updateContent = () => {
		//   const newContent = wp.editor.getContent(props.id);

		//   console.log(newContent);


		//   setContent(newContent);
		// };

		// // Listen for changes in the content
		// document.getElementById(props.id).addEventListener('input', updateContent);

		// Cleanup on unmount
		// return () => {
		//   document.getElementById(props.id).removeEventListener('input', updateContent);
		// };


		tinymce.init({
			selector: "#" + props.id, toolbar:
				"undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent | removeformat", height: "500px", setup: (editor) => {
					editor.on("change", (e) => {
						const newContent = editor.getContent(); // Get the updated content
						console.log(newContent); props.onChange(newContent);
					});
				},
		});
	}, []);





	return (
		<textarea
			className={props.className}
			id={props.id}
			value={props.value}
			type="text"
			size={props.size}
			name={props.name}
			placeholder={props.placeholder}
			minlength={props.minlength}
			maxlength={props.maxlength}
			required={props.required}
			disabled={props.disabled}
			onChange={(e) => {
				props.onChange(e.target.value);
			}}>
			{props.value}
		</textarea>
	);
}

class PGinputTextarea extends Component {
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
		var {
			value, placeholder, className, id, name, size, minlength, maxlength, required, disabled, onChange,
		} = this.props;

		return (
			<Html
				value={value}
				name={name}
				id={id}
				size={size}
				placeholder={placeholder}
				className={className}
				minlength={minlength}
				maxlength={maxlength}
				required={required}
				disabled={disabled}
				onChange={onChange}
				warn={this.state.showWarning}
			/>
		);
	}
}

export default PGinputTextarea;
