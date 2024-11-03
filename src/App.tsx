import { useState } from 'react'
import BlockChain from './components/Blockchain.tsx'
import hash from './lib/hasher'
import Hash from './components/Hash.tsx'
import startingState from './lib/startingState.tsx'
import './App.css'

function Block({hash, state, salt}) {
  const blockStyle = {
    border: "1em solid black",
    backgroundColor: "#333",
    padding: "1em",
    margin: "1em",
  }

  return (
    <div style={blockStyle}>
      <h3>THIS <Hash hash={hash} /> </h3>
      <div>Parent: <Hash hash={state.parent} /> </div>
      <p>Data: {state.data}</p>
      <p>Salt: {state.salt}</p>
    </div>
  )
}

function Miners({state, setState}) {
  const MinerBlock = (stateIn, miner) => ({
    parent: state.head,
    data: miner.data,
    salt: miner.salt,
  })

  const addBlock = (stateIn, miner) => {
    // Marshal the input data into a block
    const newBlock = MinerBlock(stateIn, miner)
    const newHash = hash(newBlock)

    // Deep copy stateIn
    let stateOut = JSON.parse(JSON.stringify(stateIn))
    stateOut.blocks[newHash] = newBlock
    stateOut.head = newHash

    return stateOut
  }

  const newSalts = () => {
    let newState = JSON.parse(JSON.stringify(state))
    Object.keys(newState.miners).forEach((minerName) => {
      newState.miners[minerName].salt = hash(Math.random().toString()).substring(0,4)
    })
    setState(newState)
    return newState
  }

  // Return an array of miners. Filter out all miners that dont have hashes
  // starting with "0"
  const validMiner = (nonce, state) => {
    let validMiners = []
    Object.keys(state.miners).forEach((minerName) => {
      let miner = state.miners[minerName]
      let newBlock = MinerBlock(state, miner)
      let newHash = hash(newBlock)
      if (newHash.startsWith(nonce)) {
        validMiners.push(minerName)
      }
      else {
        console.debug(`${minerName} is not a valid miner - ${newHash}`)
      }
    })
    return validMiners
  }

  const [ssh, setSSH] = useState(false)

  const systemSalt = (state) => {
    setTimeout(() => {
      const newState = newSalts();
      const winners = validMiner("00", newState);
      if (winners.length > 0) {
        const winning_miner = newState.miners[winners[0]];
        const newStateWithBlock = addBlock(newState, winning_miner);
        console.log("System Salt won - stopping");
        setState(newStateWithBlock);
        return;
      }
      console.log("System Salt lost - continuing");
      setState(newState);
      systemSalt(newState)
    }, 100);
    return;
  };

  const mineWrapperStyle = {
    border: "1em solid blue",
  }

  const mineStyle = {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#333",
    padding: "1em",
    margin: "1em",
  }

  const minerStyle = {
    border: "0.25em solid green",
    backgroundColor: "#333",
    margin: "0.25em",
    padding: "1em",
    paddingTop: "0",
    paddingBottom: "0",
  }

  const minerNameStyle = {
    color: "green",
    margin: "-0.25em",
    padding: "0em",
  }

  return (
    <div style={mineWrapperStyle} >
      <h1>Miners</h1>
      <button onClick={() => newSalts()}>New Salts</button>
      <button 
        id="systemSalt" 
        onClick={() => systemSalt(state)}
        onMouseEnter={() => setSSH(true)}
        onMouseLeave={() => setSSH(false)}
      >System Salts
      </button>
      <div style={mineStyle}>
        {Object.keys(state.miners).map((minerName) => (
          <div style={minerStyle} key={minerName}>
            <button onClick={() => setState(addBlock(state, state.miners[minerName]))}>
              <h2 style={minerNameStyle}>{minerName} mines</h2>
            </button>
            <p>Salt: <code>{state.miners[minerName].salt}</code></p>
            <h3>Hash:&nbsp;
              <Hash hash={
                hash(MinerBlock(state, state.miners[minerName]))
              } />
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}

function Blockchain({state}) {
  const chainStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  }

  return (
    <div>
      <h1>BlockChain</h1>
      <div style={chainStyle}>
        {Object.keys(state.blocks).map((hash) => (
            <Block key={hash} hash={hash} state={state.blocks[hash]} />
          )
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [state, setState] = useState(startingState)

  return (
    <section>
      <h1>Blockchain</h1>
      <Blockchain state={state} />
      <Miners state={state} setState={setState} />
    </section>
  );
}
