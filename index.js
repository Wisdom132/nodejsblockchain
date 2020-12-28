"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var BlockChain = /** @class */ (function () {
    function BlockChain(chain, currentTransaction, hash) {
        this.chain = chain;
        this.currentTransaction = currentTransaction;
        this.hash = hash;
    }
    BlockChain.prototype.objectHasher = function (data) {
        var payload;
        typeof data === "object"
            ? (payload = JSON.stringify(data))
            : (payload = data);
        // let stringifedObj = JSON.stringify(object);
        return crypto.createHash("sha256").update(payload).digest("hex");
    };
    // stringHasher(hash: string) {
    //       return crypto.createHash("sha256").update(hash).digest("hex");
    // }
    BlockChain.prototype.addNewBlock = function (previousHash) {
        //create the block object
        var block = {
            index: this.chain.length + 1,
            timeStamp: Date.now(),
            transactions: this.currentTransaction,
            prevHash: previousHash
        };
        // this will has hash the block data
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
        return this.chain[this.chain.length - 1];
    };
    return BlockChain;
}());
var blockChain = new BlockChain();
var hasher = blockChain.objectHasher({ name: "jgjg", data: "jdfbj" });
console.log(hasher);
// Mining is the process of adding transaction records to a crypto currency public ledger of past transactions.
var PROOF = "123";
// let validateProof = proof => {
//   let hash =
// }
