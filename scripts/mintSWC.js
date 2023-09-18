const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  // Function to prompt user for input
  function promptInput(question) {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpclink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpclink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0x5A1bA95A7a360c9825aAc51F11ab33253Eb6545D";
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("SwissCheese");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "mintSwc";
  const amount = await promptInput('Enter the amount of tokens to mint in SWC: ');
  const functionArgs = [BigInt(amount*10**18)];
  const setMessageTx = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName, functionArgs), 0);
  await setMessageTx.wait();
  console.log("Transaction Receipt: ", setMessageTx);
  rl.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});