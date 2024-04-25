require("@nomicfoundation/hardhat-toolbox");

const { privateKey, https } = require('./secrets.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    Sepolia: {
      url: https,
      chainId: 11155111,
      accounts: [privateKey]
    }
  }
};
