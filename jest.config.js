module.exports = {
  setupFiles: ["./tests/setup/setEnvironment.js"],
  transform: {
    "^.+\\.ts?$": "babel-jest",
  },
};
