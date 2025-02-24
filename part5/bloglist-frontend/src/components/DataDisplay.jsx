import PropTypes from "prop-types";

const DataDisplay = ({ message }) => {
	if (message.type === 'blog') {
		return (
			<div className={'blog-'}>
				{message.message}
			</div>
		)
	}
	else if (message.type === 'error') {
		return (
			<div className={'error-'}>
				{message.message}
			</div>
		)
	}
}

DataDisplay.propTypes = {
	message: PropTypes.object.isRequired
}

export default DataDisplay