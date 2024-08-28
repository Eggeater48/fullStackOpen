import {useEffect, useState} from "react";
import Filter from "./components/Filter.jsx";
import coolServices from "./services/coolServices.js";

function App() {
  const [countries, setCountries] = useState([])
  const [currentSearch, setCurrentSearch] = useState('')

  useEffect(() => {
    coolServices.getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setCurrentSearch(event.target.value)
  }

  const dataFilter = ''
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(currentSearch.toLowerCase()))


  return (
    <div>
      <Filter value={currentSearch} onChange={handleChange} />

    </div>
  )
}

export default App
