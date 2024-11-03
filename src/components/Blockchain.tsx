import React from 'react'
import hash from '../lib/hasher'


BlockChain = (state) => {
  return (
    <div>
      <h2>BlockChain</h2>
      <button onClick={() => setState(addBlock(state))}>Add Block</button>
      <div>
        {Object.keys(state.blocks).map((hash) => {
          return (
            <div>
              <h3>{hash}</h3>
              <p>Parent: {state.blocks[hash].parent}</p>
              <p>Data: {state.blocks[hash].data}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

