import hash from './hasher'

const addBlock = (stateIn, miner) => {
  // Marshal the input data into a block
  const newBlock = minerBlock(stateIn, miner)
  const newHash = hash(newBlock)

  // Deep copy stateIn
  let stateOut = JSON.parse(JSON.stringify(stateIn))

  // Update system level stuff
  stateOut.blocks[newHash] = newBlock
  stateOut.meta.head = newHash

  // And get new data to put

  return stateOut
}

const minerBlock = (stateIn, miner) => ({
  parent: stateIn.meta.head,
  data: miner.data,
  salt: miner.salt,
})

export { addBlock, minerBlock }
