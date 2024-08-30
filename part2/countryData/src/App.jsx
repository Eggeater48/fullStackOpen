import {useEffect, useState} from "react";
import coolServices from "./services/coolServices.js";

import Filter from "./components/Filter.jsx";
import Countries from "./components/Countries.jsx";


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
    : countries.filter(country => country.name.common.toLowerCase().includes(currentSearch.toLowerCase()))

  return (
    <div>
      <Filter value={currentSearch} onChange={handleChange} />

      <Countries filter={dataFilter} />

    </div>
  )
}

export default App
