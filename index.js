"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var BlockChain = /** @class */ (function () {
    function BlockChain(chain, currentTransaction, hash) {
        this.chain = chain;
        this.currentTransaction = currentTransaction;
        this.hash = hash;
    }
    BlockChain.prototype.objectHasher = function (object) {
        var stringifedObj = JSON.stringify(object);
        return crypto.createHash("sha256").update(stringifedObj).digest("hex");
    };
    BlockChain.prototype.validateHash = function (hash) { };
    BlockChain.prototype.addNewBlock = function (previousHash) {
        //create the block object
        var block = {
            index: this.chain.length + 1,
            timeStamp: Date.now(),
            transactions: this.currentTransaction,
            prevHash: previousHash
        };
        this.hash = this.objectHasher(block);
        //push block to chain
        this.chain.push(block);
        this.currentTransaction = [];
        return block;
    };
    BlockChain.prototype.addNewTransaction = function (transaction) {
        this.currentTransaction.push(transaction);
    };
    BlockChain.prototype.isChainEmpty = function () {
        return this.chain.length === 0; // this returns a boolean if it passes the condition;
    };
    BlockChain.prototype.getLastBlock = function () {
        return this.chain(this.chain.length - 1);
    };
    return BlockChain;
}());
var blockChain = new BlockChain();
var objHasher = blockChain.objectHasher({ name: "This is the name", age: 3 });
console.log(objHasher);
// module.exports = BlockChain;
