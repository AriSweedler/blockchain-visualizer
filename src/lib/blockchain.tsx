import hash from './hasher'

const addBlock = (stateIn, minerName) => {
  // Marshal the input data into a block
  const newBlock = minerBlock(stateIn, minerName)
  const newHash = hash(newBlock)

  // Deep copy stateIn
  let stateOut = JSON.parse(JSON.stringify(stateIn))

  // Update system level stuff
  stateOut.blocks[newHash] = newBlock
  stateOut.meta.blockchainHead = newHash

  // And get new data to put
  return stateOut
}

const minerBlock = (stateIn, minerName) => {
  const salt = stateIn.miners[minerName].salt

  return {
    parent: stateIn.meta.blockchainHead,
    data: stateIn.data,
    salt: salt,
    miner: minerName,
  }
}

const randomSalt = () => {
  return hash(Math.random().toString()).substring(0, 4)
}

export { addBlock, minerBlock, randomSalt }
