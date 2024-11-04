import { useState } from 'react'
import Blockchain from './components/Blockchain.tsx'
import Miners from './components/Miners.tsx'

import './App.css'

const startingState = {
  head: "start",
  miners: {
    ari: {
      salt: "salt1",
    },
    jake: {
      salt: "salt2",
    },
    kurt: {
      salt: "salt3",
    },
  },
  blocks: {},
}
export default function App() {
  const [state, setState] = useState(startingState)

  const appStyle = {
    border: "1em solid black",
  }

  return (
    <section style={appStyle}>
      <h1>Blockchain exploration</h1>
      <Blockchain state={state} />
      <Miners state={state} setState={setState} />
    </section>
  );
}
