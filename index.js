"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var BlockChain = /** @class */ (function () {
    function BlockChain(chain, currentTransaction, hash) {
        if (chain === void 0) { chain = []; }
        if (currentTransaction === void 0) { currentTransaction = []; }
        this.chain = chain;
        this.currentTransaction = currentTransaction;
        this.hash = hash;
    }
    BlockChain.prototype.dataHasher = function (data) {
        var payload;
        typeof data === "object"
            ? (payload = JSON.stringify(data))
            : (payload = data);
        return crypto.createHash("sha256").update(payload).digest("hex");
    };
    BlockChain.prototype.addNewBlock = function (previousHash) {
        //create the block object
        var block = {
            index: this.chain.length + 1,
            timeStamp: Date.now(),
            transactions: this.currentTransaction,
            prevHash: previousHash
        };
        // this will has hash the block data
        this.hash = this.dataHasher(block);
        //push block to chain
        this.chain.push(block);
        this.currentTransaction = [];
        return block;
    };
    // add a new transaction
    BlockChain.prototype.addNewTransaction = function (transaction) {
        this.currentTransaction.push(transaction);
    };
    // check if chain is empty
    BlockChain.prototype.isChainEmpty = function () {
        return this.chain.length === 0; // this returns a boolean if it passes the condition;
    };
    //get the last block
    BlockChain.prototype.getLastBlock = function () {
        return this.chain[this.chain.length - 1];
    };
    return BlockChain;
}());
var blockChain = new BlockChain();
// Mining is the process of adding transaction records to a crypto currency public ledger of past transactions.
var PROOF = 312;
var validateProof = function (proof) {
    var guessed = blockChain.dataHasher(proof.toString());
    console.log("Hashing", guessed);
    // check if the hash provided matches the defined hash
    return guessed === blockChain.dataHasher(PROOF.toString());
};
var proofChecker = function () {
    var proof = 0;
    while (true) {
        if (!validateProof(proof.toString())) {
            proof++;
        }
        else {
            break;
        }
    }
    return proof;
};
//check if valid proof, then create a new block
if (proofChecker() === PROOF) {
    //add transaction
    blockChain.addNewTransaction({
        sender: "Wisdom",
        receiver: "favour",
        amount: 100
    });
    console.log("Its ok", blockChain.currentTransaction);
    // get the previous hash...
    // grab the last element in the chain
    var previousHash = blockChain.getLastBlock()
        ? blockChain.getLastBlock().hash
        : null;
    blockChain.addNewBlock(previousHash);
}
console.log("Chain", blockChain.chain);
