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
      id: persons.length.toString() + 1,
    }

    const index_ = persons.findIndex(x => x.name === newName)
    if (persons.some(e => e.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one? `))
        coolServices
          .updateData([persons[index_].id, {name: newName, number: phoneNumber, id: persons[index_].id}])
          .then(() => {
            const newPersons = persons.map((person, i) => {
              if (i === index_) {
                return {name: newName, number: phoneNumber, id: persons[index_].id}
              } else {
                return person
              }})
            setPersons(newPersons)
          })
          .catch(error => {
            console.log(error.response)
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
    } else {
      coolServices.create(personObject)
        .then(() => {
          setPersons(persons.concat(personObject))
          setMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
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

  const dataFilter = ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(input.toLowerCase()))

  const filterInputChange = (event) => {
    setInput(event.target.value)
  }

  const deleteEvent = (event) => {
    if (window.confirm(`Delete ${event.target.value}`)) {
      coolServices.deleteData(event.target.value)
        .then(() => {
          setPersons(
            persons.filter(p => p.id !== event.target.value)
          )
        }).catch(error => {
          console.log('nu uh error : ', error)
        })
    }
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

      <Numbers numberFilter={dataFilter} onClick={deleteEvent} />

    </div>
  )
}

export default App