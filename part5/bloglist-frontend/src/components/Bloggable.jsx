import React, { useState } from 'react'
import PropTypes from "prop-types";

const Bloggable = (( { blog, likeHandler, deleteHandler  } ) => {
	const [visible, setVisible] = useState(false)
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<div>
			<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
			<div style={showWhenVisible}>
				{blog.url}<br/>
				likes {blog.likes}
				<button onClick={() => likeHandler(blog)}>like</button>
				<br/>{blog.user.length > 0 && blog.user[0].name}
				<br/><button onClick={() => deleteHandler(blog)}>remove</button>
			</div>
		</div>
	)
})

Bloggable.propTypes = {
	blog: PropTypes.object.isRequired,
}

export default Bloggable