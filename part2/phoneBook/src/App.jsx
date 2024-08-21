import { useState } from 'react'
import Filter from "./components/Filter.jsx";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [input, setInput] = useState('')
  const filterThing = ""

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: phoneNumber,
      id: persons.length + 1
    }

    if (persons.some(e => e.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else if (persons.some(e => e.name === phoneNumber)) {
      window.alert(`The number : ${phoneNumber} is already in the phone book`)
    } else {
      setPersons(persons.concat(personObject))
    }

    setNewName('')
  }

  const handleInputChanges = (event) => {
    setNewName(event.target.value)
  }

  const inputHandler = (event) => {
    setPhoneNumber(event.target.value)
  }

  const dataFilter = filterThing
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(input))

  const filterInputChange = (event) => {
    setInput(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter inputter={input} handleChange={filterInputChange}/>

      <h2>Add new</h2>

      <h2>Numbers</h2>

    </div>
  )
}

export default App