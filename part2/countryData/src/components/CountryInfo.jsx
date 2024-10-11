import {useState} from "react";
import Country from "./Country.jsx";

const CountryInfo = (props) => {
	const [show, setShow] = useState(false)

	const handleClick = () => {
		setShow(!show)
	}

	return (
		<div key={props.country.tld[0]}>
			<p>
				{props.country.name.common}
				<button onClick={handleClick}>show</button>
			</p>
			{show ? <Country country={props.country}/> : ''}
		</div>
	)
}

export default CountryInfo