# SwissCheese(ERC20 Contract) 

This project demonstrates the creation and deployment of a basic ERC20 contract on Swisstronik testnet. 

### Deploying the contract
```
npx hardhat run scripts/deploy.js --network swisstronik
```
### Minting the tokens
```
npx hardhat run scripts/mintSWC.js --network swisstronik
```
### Quering token balance for an address
```
npx hardhat run scripts/balanceQuery.js --network swisstronik
```