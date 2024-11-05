import { useState } from 'react'
import AutoResizeTextArea from './AutoResizeTextArea'

export default function Data({state, setState}) {
  const [jsonText, setJsonText] = useState(JSON.stringify(state.data, null, 2));
  const [isValidJson, setIsValidJson] = useState(true);

  const dataWrapperStyle = {
    border: "0.25em solid green",
    margin: "1em",
  }

  const dataStyle = {
    backgroundColor: "#333",
    marginBottom: "0.3em",
    padding: "0.4em",
    fontSize: "2em",

    // same but a lot darker and closer to #333
    backgroundColor: isValidJson ? '#454' : '#544',

    // Make it only as tall as the text
    width: "95%",
    height: "auto",
    overflow: "hidden",
    resize: "none",
    boxSizing: "border-box",
  }

  const h2Style = {
    padding: "0",
    margin: "0",
  }

  // Make the text box that has the JSON editable and turn nit red or green
  // based on if it is valid JSON
  const handleJsonChange = (e) => {
    const text = e.target.value;
    setJsonText(text);

    try {
      const newData = JSON.parse(text);
      setState((prevState) => ({ ...prevState, data: newData }));
      setIsValidJson(true);
    } catch (error) {
      setIsValidJson(false);
    }
  };

  return (
    <div style={dataWrapperStyle}>
      <h2 style={h2Style}>Data to add</h2>
      <AutoResizeTextArea
        style={dataStyle}
        value={jsonText}
        onChange={handleJsonChange}
      />
    </div>
  )
}
