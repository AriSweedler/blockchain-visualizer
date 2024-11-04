import Hash from './Hash.tsx'

export default function Block({hash, state, salt}) {
  const color = `#${hash.slice(0, 6)}`
  const blockStyle = {
    border: `1em solid ${color}`,
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
