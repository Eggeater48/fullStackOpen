import React, { useState, forwardRef, useImperativeHandle } from 'react'

const Bloggable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false)
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility,
		}
	})
	return (
		<div key={props.blog.id} className={'blog'}>
			{props.blog.title} {props.blog.author}
			<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>

			<div style={showWhenVisible}>
				{props.blog.url}<br/>
				likes {props.blog.likes}
				<button onClick={() => console.log(props.blog)}>like</button>
				<br/>
				{props.blog.user}
			</div>
		</div>
	)
})

export default Bloggable