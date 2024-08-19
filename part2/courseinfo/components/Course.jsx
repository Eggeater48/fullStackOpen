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
			{props.map((part) =>
				<p key={part.id}>{part.name} {part.exercises}</p>
			)}
		</div>

	)
}

// Armageddon starts when you put PartDisplay in there
const Course = (props) => {

	return (
		<div>
			{props.courses.map((course) =>
				<div key={course.id}>
					<h2>{course.name}</h2>
					<div></div>

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