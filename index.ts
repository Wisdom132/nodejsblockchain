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
    public chain?: any,
    private currentTransaction?: any,
    private hash?: string
  ) {}

  dataHasher(data: any) {
    let payload;
    typeof data === "object"
      ? (payload = JSON.stringify(data))
      : (payload = data);
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  addNewBlock(previousHash: string) {
    //create the block object
    let block: Block = {
      index: this.chain.length + 1,
      timeStamp: Date.now(),
      transactions: this.currentTransaction,
      prevHash: previousHash,
    };
    // this will has hash the block data
    this.hash = this.dataHasher(block);
    //push block to chain
    this.chain.push(block);
    this.currentTransaction = [];
    return block;
  }

  // add a new transaction
  addNewTransaction(transaction: Transaction) {
    this.currentTransaction.push(transaction);
  }

  // check if chain is empty
  isChainEmpty() {
    return this.chain.length === 0; // this returns a boolean if it passes the condition;
  }

  //get the last block
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }
}

let blockChain = new BlockChain();
// Mining is the process of adding transaction records to a crypto currency public ledger of past transactions.

let PROOF: number = 312;

let validateProof = (proof: any) => {
  let guessed = blockChain.dataHasher(proof.toString());
  console.log("Hashing", guessed);
  // check if the hash provided matches the defined hash
  return guessed === blockChain.dataHasher(PROOF.toString());
};

let proofChecker = () => {
  let proof: number = 0;
  while (true) {
    if (!validateProof(proof.toString())) {
      proof++;
    } else {
      break;
    }
  }
  return proof;
};

//check if valid proof, then create a new block

if (proofChecker() === PROOF) {
  console.log("Its ok");

  // //add transaction
  // blockChain.addNewTransaction({
  //   sender: "Wisdom",
  //   receiver: "favour",
  //   amount: 100,
  // });

  // // get the previous hash...
  // // grab the last element in the chain
  // let previousHash = blockChain.getLastBlock().hash
  //   ? blockChain.getLastBlock().hash
  //   : null;

  // blockChain.addNewBlock(previousHash);
}

console.log("chain", blockChain.chain);
