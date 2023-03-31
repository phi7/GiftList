const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";
const MerkleTree = require("../utils/MerkleTree");
const niceList = require("../utils/niceList");
const verifyProof = require("../utils/verifyProof");

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const merkleTree = new MerkleTree(niceList);

  const root = merkleTree.getRoot();

  const name = "Sidney Kertzmann";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name,
    proof,
    root,
  });

  console.log({ gift });
}

main();
