import { useState } from 'react'

const FeedbackButton = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

// Brain keeps thinking abt good bad and ugly when typing these out
const Statistics = (props) => {
  const total = props.feedback.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const average = (props.feedback[0] - props.feedback[2]) / total;
  const positive = props.feedback[0] / total * 100;

  if (total !== 0) {
    return (
      <table>
        <tbody>
        <StatisticLine text={"good"} value={props.feedback[0]} />
        <StatisticLine text={"neutral"} value={props.feedback[1]} />
        <StatisticLine text={"bad"} value={props.feedback[2]} />
        <StatisticLine text={"total"} value={total}/>
        <StatisticLine text={"average"} value={average}/>
        <StatisticLine text={"positive"} value={positive}/>
        </tbody>
      </table>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Gimme feedback</h1>
      <FeedbackButton text={"good"} handleClick={() => {setGood(good + 1)} } />
      <FeedbackButton text={"neutral"} handleClick={() => {setNeutral(neutral + 1)}}/>
      <FeedbackButton text={"bad"} handleClick={() => {setBad(bad + 1)}}/>

      <h1>Statistics</h1>

      <Statistics feedback={[good, neutral, bad]} />

    </div>
  )
}

export default App