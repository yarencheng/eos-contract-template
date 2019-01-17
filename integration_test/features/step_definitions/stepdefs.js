const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const { Cleos } = require('./cleos.js')

When('{string} give his name', function (name) {
    this.name = name
});

Then('say {string}', function (message) {

    var json = new Cleos().pushAction("myaccount", "hi", [this.name], "myaccount@active")

    var message = json.processed.action_traces[0].console

    assert.equal(message, "Message: Hi: " + this.name)
});
