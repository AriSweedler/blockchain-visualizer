import { useState } from "react";
import Miner from "./Miner.tsx";
import Data from "./Data.tsx";
import hash from "../lib/hasher.tsx";
import { addBlock, minerBlock, randomSalt } from "../lib/blockchain.tsx";

export default function Miners({ state, setState }) {
  const newSalts = () => {
    let newState = JSON.parse(JSON.stringify(state));
    Object.keys(newState.miners).forEach((minerName) => {
      newState.miners[minerName].salt = randomSalt();
    });
    setState(newState);
    return newState;
  };

  // Return an array of miners. Filter out all miners that do not have hashes
  // starting with "0"
  const validMiner = (state) => {
    let validMiners = [];
    Object.keys(state.miners).forEach((minerName) => {
      let miner = state.miners[minerName];
      let newBlock = minerBlock(state, minerName);
      let newHash = hash(newBlock);
      if (newHash.startsWith(state.meta.validBlockStartPrefix)) {
        validMiners.push(minerName);
      }
    });
    return validMiners;
  };

  const [ssh, setSSH] = useState(false);

  const systemSalt = (state) => {
    setTimeout(() => {
      const newState = newSalts();
      const winners = validMiner(newState);
      if (winners.length > 0) {
        const newStateWithBlock = addBlock(newState, winners[0]);
        setState(newStateWithBlock);
        console.log(`Block mined by ${winners[0]}! :D`);
        return;
      }
      console.log("No valid blocks found this time. Trying again.");
      setState(newState);
      systemSalt(newState);
    }, state.meta.systemSaltDelay);
    return;
  };

  const mineWrapperStyle = {
    border: "1em solid green",
  };

  const mineStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#333",
    padding: "1em",
    margin: "1em",
  };

  return (
    <div style={mineWrapperStyle}>
      <h1>Miners</h1>
      <Data state={state} setState={setState} />
      <button onClick={() => newSalts()}>New Salts</button>
      <button
        id="systemSalt"
        onClick={() => systemSalt(state)}
        onMouseEnter={() => setSSH(true)}
        onMouseLeave={() => setSSH(false)}
      >
        System Salts
      </button>
      <div style={mineStyle}>
        {Object.keys(state.miners).map((minerName) => (
          <Miner
            state={state}
            setState={setState}
            minerName={minerName}
            key={minerName}
          />
        ))}
      </div>
    </div>
  );
}
