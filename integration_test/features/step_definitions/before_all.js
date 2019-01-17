const { BeforeAll } = require('cucumber')
const waitUntil = require('async-wait-until');
const { Cleos } = require('./cleos.js')

BeforeAll(function () {

    var cleos = new Cleos()

    // wait until nodeos server ready
    waitUntil(function () {
        try {
            cleos.getInfo()
            return true
        } catch {
            return false
        }
    }, 10000 /* 10 seconds */)

    var walletKey = cleos.createWallet()
    console.log("walletKey=["+walletKey+"]")

    cleos.openWallet()

    cleos.unlockWallet(walletKey)

    var key = cleos.createWalletKey()
    console.log("key=["+key+"]")

    // import eosio development key
    cleos.importWalletKey("5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3")

    cleos.createAccount("eosio", "myaccount", key)

    // deploy contract
    cleos.setContract("myaccount", "./", "MyContract.wasm", "MyContract.abi")
})
