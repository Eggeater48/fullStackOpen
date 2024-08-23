import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import AddNew from "./components/AddNew.jsx";
import Numbers from "./components/Numbers.jsx";
import axios from "axios";
import coolServices from "./services/coolServices.js";

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [input, setInput] = useState('')
  const filterThing = ""

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      id: (persons.length + 1).toString() ,
      name: newName,
      number: phoneNumber,
    }

    if (persons.some(e => e.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else if (persons.some(e => e.name === phoneNumber)) {
      window.alert(`The number : ${phoneNumber} is already in the phone book`)
    } else {
      setPersons(persons.concat(personObject))
      coolServices.create(personObject)
    }

    setNewName('')
  }

  // Could probably make the code cleaner if i knew how to combine these
  const handleInputChanges = (event) => {
    setNewName(event.target.value)
  }

  const inputHandler = (event) => {
    setPhoneNumber(event.target.value)
  }

  const dataFilter = filterThing
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(input.toLowerCase()))

  const filterInputChange = (event) => {
    setInput(event.target.value)
    console.log(filterThing)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter inputter={input} handleChange={filterInputChange}/>

      <h2>Add new</h2>

      <AddNew
        whenSubmit={addPerson}
        nameChange={handleInputChanges}
        numberChange={inputHandler}
        name={newName}
        pNumber={phoneNumber} />

      <h2>Numbers</h2>

      <Numbers numberFilter={dataFilter} />

    </div>
  )
}

export default App