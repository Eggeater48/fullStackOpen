import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import {useEffect} from "react";
import {sortAnecdotes} from "./reducers/anecdoteReducer.js";
import {useDispatch} from "react-redux";
import Filter from "./components/Filter.jsx";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => { // This doesn't really do anything but i just thought itd be good to have this here
    dispatch(sortAnecdotes())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />

    </div>
  )
}

export default App