import Hash from './Hash.tsx'
import hash from '../lib/hasher'
import { addBlock, minerBlock } from '../lib/blockchain.tsx'

export default function Miner({state, minerName, setState}) {
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

  const salt = state.miners[minerName].salt
  const minerHash = hash(minerBlock(state, minerName))

  return (
    <div style={minerStyle} key={minerName}>
      <button onClick={
        () => setState(addBlock(state, minerName))
      }>
        <h2 style={minerNameStyle}>{minerName} mines</h2>
      </button>
      <p>Salt: <code>{salt}</code></p>
      <h3>Hash:&nbsp;<Hash hash={minerHash}/></h3>
    </div>
  )
}
