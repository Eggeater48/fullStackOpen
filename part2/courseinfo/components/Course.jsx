const TotalThing = (props) => {

	const total = props.courses.parts.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.exercises
	}, 0)

	return (
		<div></div>
	)
}

const PartDisplay = (props) => {
	return (
		<div>
			{props.course.things.map((part) =>
				<p key={part.id}>{part.name} {part.exercises}</p>
			)}
		</div>

	)
}



const Course = (props) => {

	return (
		<div>
			{props.courses.map((course) =>
				<div key={course.id}>
					<h1>{course.name}</h1>

					<PartDisplay things={course} />

				</div>
			)}
		</div>

	)
}

export default Course



/*
 			<h1>{props.course["name"]}</h1>

			{props.course["parts"].map((note) =>
				<p key={note.id}>
					{note.name} {note.exercises}
				</p>
			)}
*/