import { useState } from 'react'


const CoolButton = (props) => {
  return (
    <button onClick={props.handleClick}>next anecdote</button>
  )
}

const Anecdote = (props) => {
  return (
    <div>{props.anecdote}</div>
  )
}

const Voter = (props) => {

  return (
    <button onClick={props.handleClick}>vote</button>
  )
}

const VoteCount = (props) => {
    return (
      <div>Current vote count : {props.total}</div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const newArray = new Uint8Array(anecdotes.length);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(...newArray);

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} />
      <VoteCount total={votes[selected]} />
      <Voter handleClick={() => {setVotes(votes[selected] + 1)}} />
      <CoolButton handleClick={() => {setSelected(Math.floor(Math.random() * anecdotes.length))}} />
    </div>
  )
}

export default App