import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import {useEffect} from "react";
import {sortAnecdotes} from "./reducers/anecdoteReducer.js";
import {useDispatch} from "react-redux";
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";
import anecdoteService from './services/anecdotes.js'

import { setAnecdotes } from "./reducers/anecdoteReducer.js";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [])

  useEffect(() => { // This doesn't really do anything but i just thought itd be good to have this here
    dispatch(sortAnecdotes())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />

    </div>
  )
}

export default App