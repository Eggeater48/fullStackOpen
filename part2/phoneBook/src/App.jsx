import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ])
  const [newName, setNewName] = useState('')

  const [phoneNumber, setPhoneNumber] = useState(0)


  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
    }

    if (persons.some(e => e.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setPhoneNumber()
    }

    setNewName('')
  }

  const handleInputChanges = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>

        <div>
          name: <input value={newName} onChange={handleInputChanges}/>
        </div>

        <div>
          number: <input />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person, index) =>
        <p key={index}>{person.name}</p>
      )}
    </div>
  )
}

export default App