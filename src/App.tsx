import { useState } from 'react'
import Blockchain from './components/Blockchain.tsx'
import Miners from './components/Miners.tsx'
import startingState from './lib/startingState.tsx'

export default function App() {
  const [state, setState] = useState(startingState)

  const appStyle = {
    border: "1em solid black",
    maxWidth: "90vw",
  }

  return (
    <section style={appStyle}>
      <h1>Blockchain exploration</h1>
      <Blockchain state={state} />
      <Miners state={state} setState={setState} />
    </section>
  );
}
