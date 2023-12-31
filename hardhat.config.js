//require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");
require("@nomicfoundation/hardhat-chai-matchers");

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    goerli: {
      url: GOERLI_RPC_URL || "",
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  solidity: {
    compilers: [{ version: "0.8.20" }, { version: "0.6.6" }],
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY || "",
    noColors: true,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
};
