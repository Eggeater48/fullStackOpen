const Filter = (props) => {
	return (
		<div>
			Find countries <input value={props.input} onChange={props.onChange}/>
		</div>
	)
}

export default Filter