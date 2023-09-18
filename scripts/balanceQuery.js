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
  

const sendShieldedQuery = async (provider, destination, data) => {
  const rpclink = hre.network.config.url;
  const [encryptedData, usedEncryptedKey] = await encryptDataField(rpclink, data);
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });
  return await decryptNodeResponse(rpclink, response, usedEncryptedKey);
};

async function main() {
  const contractAddress = "0x5A1bA95A7a360c9825aAc51F11ab33253Eb6545D";
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("SwissCheese");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "balanceOf";
  const address = await promptInput('Enter the address for balance query: ');
  const responseMessage = await sendShieldedQuery(signer.provider, contractAddress,contract.interface.encodeFunctionData(functionName,[address]));
  const decodedResp = contract.interface.decodeFunctionResult(functionName, responseMessage)[0];
  console.log("Balance is:", (decodedResp/BigInt(10**18)).toString(),'SWC');
  rl.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
