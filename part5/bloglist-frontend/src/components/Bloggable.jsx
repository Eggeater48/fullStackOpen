import {useState} from "react";

const Bloggable = ( { blog, likeHandler, deleteHandler } ) => {
	const [showDetails, setShowDetails] = useState(false)

	const toggleVisibility = () => {
		setShowDetails(!showDetails)
	}

	return (
		<>
			<button
				onClick={toggleVisibility}
			>{!showDetails ? 'view' : 'hide'}
			</button>

			{showDetails &&
				<div>
					{blog.url}<br/>
					likes {blog.likes}
					<button onClick={() => likeHandler(blog)}>like</button>
					<br/>{blog.user.length > 0 && blog.user[0].name}
					<br/><button onClick={() => deleteHandler(blog)}>remove</button>
				</div>
			}
		</>
	)
}

export default Bloggable