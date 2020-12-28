import crypto from "crypto";
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
    private chain: any,
    private currentTransaction: any,
    private hash: string
  ) {}

  objectHasher(object: object) {
    let stringifedObj = JSON.stringify(object);
    return crypto.createHash("sha256").update(stringifedObj).digest("hex");
  }

  addNewBlock(previousHash: string) {
    //create the block object
    let block: Block = {
      index: 1, // write an increment method or create use a package
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

module.exports = BlockChain;
