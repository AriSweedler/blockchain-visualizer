import { randomSalt } from "./blockchain.tsx";

const startingState = {
  meta: {
    systemSaltDelay: 100,
    validBlockStartPrefix: "0",
    blockchainHead: "start",
  },
  data: {
    "k": "v",
  },
  miners: {
    ari: {
      salt: "0000",
    },
    jake: {
      salt: randomSalt(),
    },
    kurt: {
      salt: randomSalt(),
    },
  },
  blocks: {},
};

export default startingState;
