const AddNew = (props) => {
	return (
		<div>
			<form onSubmit={addPerson}>

				<div>
					name: <input value={newName} onChange={handleInputChanges}/>
				</div>

				<div>
					number: <input value={phoneNumber} onChange={inputHandler}/>
				</div>

				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</div>
	)
}

export default AddNew