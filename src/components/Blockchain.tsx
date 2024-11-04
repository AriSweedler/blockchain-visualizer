import Block from './Block.tsx'

export default function Blockchain({state}) {
  const blockWrapperStyle = {
    display: "flex",
    flexDirection: "row",
    border: "1em solid blue",

    height: "300px",
    width: "80vw",
    margin: "-1em",

    overflowX: "scroll",
    whiteSpace: "nowrap",
  };

  const chainStyle = {
    border: "1em solid blue",
  }

  return (
    <div style={chainStyle}>
      <h1>Blockchain</h1>
      <div style={blockWrapperStyle}>
        {Object.keys(state.blocks).reverse().map((hash) =>
          <Block
            key={hash}
            hash={hash}
            state={state.blocks[hash]}
          />
        )}
      </div>
    </div>
  );
}
