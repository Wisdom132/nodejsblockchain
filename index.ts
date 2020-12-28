import * as crypto from "crypto";
interface Block {
  index: number;
  timeStamp: number;
  transactions: any;
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

  objectHasher(data: any) {
    let payload;
    typeof data === "object"
      ? (payload = JSON.stringify(data))
      : (payload = data);
    return crypto.createHash("sha256").update(payload).digest("hex");
  }

  addNewBlock(previousHash: string) {
    //create the block object
    let block: Block = {
      index: this.chain.length + 1, // get the current length of the chains and increament by 1
      timeStamp: Date.now(),
      transactions: this.currentTransaction,
      prevHash: previousHash,
    };
    // this will has hash the block data
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
    return this.chain[this.chain.length - 1];
  }
}

let blockChain = new BlockChain();

// Mining is the process of adding transaction records to a crypto currency public ledger of past transactions.

let PROOF: string = "123";

// let validateProof = proof => {
//   let hash =
// }
