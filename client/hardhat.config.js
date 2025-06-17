/* eslint-disable no-undef */
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const { API_URL, PRIVATE_KEY } = process.env;

// console.log("API_URL:", API_URL);
// console.log("PRIVATE_KEY:", PRIVATE_KEY ? PRIVATE_KEY.slice(0, 6) + "..." : "No PRIVATE_KEY");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    // mumbai: {
    //   url: API_URL,
    //   accounts: [PRIVATE_KEY],
    // },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
  paths: {
    artifacts: "./src/components/artifacts",
  },
};
