import React, { useState } from 'react'

const Bloggable = (( { blog, likeHandler  } ) => {
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
			</div>
		</>
	)
})

export default Bloggable