const Filter = (props) => {
	return (
		<div>
			Im a filter <input value={props.inputter} onChange={props.handleChange}/>
		</div>
	)
}

export default Filter