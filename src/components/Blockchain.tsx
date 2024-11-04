import Block from './Block.tsx'

export default function Blockchain({state}) {
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
