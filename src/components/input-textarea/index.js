const { Component } = wp.element;

function Html(props) {
	if (!props.warn) {
		return null;
	}

	return (
		<textarea
			className={props.className}
			id={props.id}
			size={props.size}
			name={props.name}
			placeholder={props.placeholder}
			minlength={props.minlength}
			maxlength={props.maxlength}
			required={props.required}
			disabled={props.disabled}
			onChange={(newVal) => {
				props.onChange(newVal);
			}}
		>
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
			value,
			placeholder,
			className,
			id,
			name,
			size,
			minlength,
			maxlength,
			required,
			disabled,
			onChange,
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
