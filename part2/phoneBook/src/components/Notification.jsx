const Notification = ({ message }) => {
	if (message === null) {
		return null
	}

	return (
		<div className={'added-new'}>
			{message}
		</div>
	)
}

export default Notification
