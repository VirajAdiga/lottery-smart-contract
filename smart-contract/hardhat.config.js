require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 1337,
      loggingEnabled: true,
      accounts: {
        mnemonic: "test1 test2 test3 test4 test5 test6 test7 test8 test9 test10 test11 test12"
      },
    },
  },
};
