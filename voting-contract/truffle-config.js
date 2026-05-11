module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      gas: 6721975,
      gasPrice: 20000000000,
    },
    ganache_gui: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
    }
  },

  contracts_directory: './contracts/',
  contracts_build_directory: './src/abis/',

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.20",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "paris"
      }
    }
  },

  // This plugin helps with verifying contracts on Etherscan later
  // plugins: ['truffle-plugin-verify'],
  // api_keys: { etherscan: 'YOUR_ETHERSCAN_API_KEY' }
};