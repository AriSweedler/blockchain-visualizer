export default function Data({state}) {
  const dataWrapperStyle = {
    border: "0.25em solid green",
    margin: "1em",
  }

  const dataStyle = {
    backgroundColor: "#333",
    margin: "1em",
  }

  return (
    <div style={dataWrapperStyle}>
      <h2>Data</h2>
      <p style={dataStyle}>{state.data}</p>
    </div>
  )
}
