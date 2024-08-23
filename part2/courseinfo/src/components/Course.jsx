const TotalThing = (props) => {
	const total = props.courses.parts.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.exercises
	}, 0)

	return (
		<div>Total count : {total}</div>
	)
}

const PartDisplay = (props) => {
	return (
		<div>
			{props.courses.parts.map((part) =>
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
					<h2>{course.name}</h2>

				<PartDisplay courses={course} />
				<TotalThing courses={course} />

				</div>
			)}
		</div>

	)
}

export default Course
