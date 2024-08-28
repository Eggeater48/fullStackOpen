import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import AddNew from "./components/AddNew.jsx";
import Numbers from "./components/Numbers.jsx";

import coolServices from "./services/coolServices.js";
import Notification from "./components/Notification.jsx";
import ErrorDisplay from "./components/ErrorDisplay.jsx";

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [input, setInput] = useState('')
  const filterThing = ""

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    coolServices.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: phoneNumber,
      id: persons.length.toString(),
    }

    const index_ = persons.findIndex(x => x.name === newName)

    if (persons.some(e => e.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one? `))
        coolServices
          .updateData([index_, {name: newName, number: phoneNumber, id: index_}])
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })

    } else {
      setPersons(persons.concat(personObject))
      coolServices.create(personObject)
        .then(() => {
          setMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
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
    : persons.filter(person => person.name.toLowerCase().includes(input.toLowerCase()))

  const filterInputChange = (event) => {
    setInput(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />
      <ErrorDisplay  errorMessage={errorMessage}/>

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