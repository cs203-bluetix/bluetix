import ('dotenv/config');
require('hardhat/config');
require('hardhat-abi-exporter');
const {TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS } = require("hardhat/builtin-tasks/task-names");
require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");


subtask(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS).setAction(async (_, __, runSuper) => {
  // Get the list of source paths that would normally be passed to the Solidity compiler
  const paths = await runSuper();

  // Apply a filter function to exclude paths that contain the string "ignore"
  return paths.filter((p) => !p.includes("ignore"));
});


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
    },
    polygon_mumbai: { 
      url: process.env.NEXT_PUBLIC_MUMBAI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia:{
      url: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL,
      accounts:[process.env.PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: "0.8.19",
  paths: {
    artifacts: "./compiledContract",
    cache:"./compiledContract"
  },
  abiExporter: {
    path: "./src/abi",
    runOnCompile: true,
    clear: true,
    pretty: true
  }
};
