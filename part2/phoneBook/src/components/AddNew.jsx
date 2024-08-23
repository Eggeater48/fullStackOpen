const AddNew = (props) => {
	return (
		<div>
			<form onSubmit={props.whenSubmit}>

				<div>
					name: <input value={props.name} onChange={props.nameChange}/>
				</div>

				<div>
					number: <input value={props.pNumber} onChange={props.numberChange}/>
				</div>

				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</div>
	)
}

export default AddNew