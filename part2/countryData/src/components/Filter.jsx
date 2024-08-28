const Filter = (props) => {
	return (
		<div>
			Find countries <input value={props.input} onChange={props.handleChange}/>
		</div>
	)
}

export default Filter