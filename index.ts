import * as crypto from "crypto";
interface Block {
  index: number;
  timeStamp: number;
  transactions: string;
  prevHash: string;
}

interface Transaction {
  sender: string;
  receiver: string;
  amount: number;
}

class BlockChain {
  constructor(
    private chain?: any,
    private currentTransaction?: any,
    private hash?: string
  ) {}

  objectHasher(object: object) {
    let stringifedObj = JSON.stringify(object);
    return crypto.createHash("sha256").update(stringifedObj).digest("hex");
  }

  validateHash(hash: string) {}

  addNewBlock(previousHash: string) {
    //create the block object
    let block: Block = {
      index: this.chain.length + 1, // get the current length of the chains and increament by 1
      timeStamp: Date.now(),
      transactions: this.currentTransaction,
      prevHash: previousHash,
    };
    this.hash = this.objectHasher(block);
    //push block to chain
    this.chain.push(block);
    this.currentTransaction = [];
    return block;
  }

  addNewTransaction(transaction: Transaction) {
    this.currentTransaction.push(transaction);
  }

  isChainEmpty() {
    return this.chain.length === 0; // this returns a boolean if it passes the condition;
  }
  getLastBlock() {
    return this.chain(this.chain.length - 1);
  }
}

let blockChain = new BlockChain();

let objHasher = blockChain.objectHasher({ name: "This is the name", age: 3 });
console.log(objHasher);

// module.exports = BlockChain;
