import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false)

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<div>
			{!visible && <div>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			}
			{visible &&
				<div>
					{props.children}
					<button onClick={toggleVisibility}>cancel</button>
				</div>
			}
		</div>
	)
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

export default Togglable