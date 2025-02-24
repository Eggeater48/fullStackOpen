import React, { useState } from 'react'
import PropTypes from "prop-types";

const Bloggable = (( { blog, likeHandler, deleteHandler  } ) => {
	const [visible, setVisible] = useState(false)
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<>
			<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
			<div style={showWhenVisible}>
				{blog.url}<br/>
				likes {blog.likes}
				<button onClick={() => likeHandler(blog)}>like</button>
				<br/>{blog.user.length > 0 && blog.user[0].name}
				<br/><button onClick={() => deleteHandler(blog)}>remove</button>
			</div>
		</>
	)
})

Bloggable.propTypes = {
	blog: PropTypes.object.isRequired,
	likeHandler: PropTypes.func.isRequired,
	deleteHandler:PropTypes.func.isRequired
}

export default Bloggable