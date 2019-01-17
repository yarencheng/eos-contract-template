const { execSync } = require('child_process');
var tmp = require('tmp');

exports.Cleos = class Cleos {
    constructor(keosdURL, nodeosURL, debug) {

        this.cleosCommand = "cleos --no-auto-keosd --url="

        if (nodeosURL) {
            this.cleosCommand += nodeosURL
        } else {
            this.cleosCommand += 'http://nodeos/'
        }

        this.cleosCommand += " --wallet-url="

        if (keosdURL) {
            this.cleosCommand += keosdURL
        } else {
            this.cleosCommand += 'http://keosd/'
        }

        if (debug) {
            this.cleosCommand += " --verbose --print-request --print-response"
        }

        this.cleosCommand += " "
    }
    execJson(cmd) {
        var buf = execSync(cmd)

        var str = buf.toString("UTF-8")

        var json = JSON.parse(str)

        return json
    }
    getInfo() {
        return this.execJson(this.cleosCommand + "get info")
    }
    createWallet(name) {

        var command = this.cleosCommand + "wallet create "

        if (name) {
            command += "--name " + name + " "
        }

        var tmpobj = tmp.fileSync();
        console.log('File: ', tmpobj.name);

        command += "--file " + tmpobj.name

        execSync(command)

        var buf = execSync('cat ' + tmpobj.name)
        var key = buf.toString("UTF-8")

        tmpobj.removeCallback()

        return key
    }
    openWallet(name) {
        var command = this.cleosCommand + "wallet open "

        if (name) {
            command += "--name " + name + " "
        }

        execSync(command)
    }
    unlockWallet(key, name) {
        var command = this.cleosCommand + "wallet unlock "

        if (name) {
            command += "--name " + name + " "
        }

        command += "--password " + key

        execSync(command)
    }
    createWalletKey(name) {
        var command = this.cleosCommand + "wallet create_key "

        if (name) {
            command += "--name " + name + " "
        }

        var buf = execSync(command)
        var str = buf.toString("UTF-8")

        var key = str.substring(str.indexOf('"') + 1)
        key = key.substring(0, key.indexOf('"'))

        return key
    }
    importWalletKey(key, name) {
        var command = this.cleosCommand + "wallet import "

        if (name) {
            command += "--name " + name + " "
        }

        command += "--private-key " + key

        execSync(command)
    }
    createAccount(creator, name, ownerKey) {
        var command = this.cleosCommand + "create account --json "
        command += creator + " " + name + " " + ownerKey

        return this.execJson(command)
    }
    setContract(account, contractDir, wasmFile, abiFile) {
        var command = this.cleosCommand + "set contract --json "
        command += account + " " + contractDir + " " + wasmFile + " " + abiFile
        return this.execJson(command)
    }
    pushAction(account, action, data, permission) {
        var command = this.cleosCommand + "push action --json "
        command += account + " " + action + " '" + JSON.stringify(data) + "' --permission " + permission
        return this.execJson(command)
    }
};

