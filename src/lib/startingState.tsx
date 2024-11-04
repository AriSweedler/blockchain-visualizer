const startingState = {
  meta: {
    delay: 100,
    head: "start",
    nonce: "00",
  },
  data: "startingData",
  miners: {
    ari: {
      salt: "salt1",
    },
    jake: {
      salt: "salt2",
    },
    kurt: {
      salt: "salt3",
    },
  },
  blocks: {},
};

export default startingState;
