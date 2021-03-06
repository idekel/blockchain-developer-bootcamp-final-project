# Point of Sale (POS)
Allows for business and people in general to accept payments for goods and services by just sending an invoice 

## Description
### Introduction
In order for a business or person to formally accept a Payment they have to use a centralize services like Stripe, PayPal, Payoneer, etc. POS will allow for anyone to create an invoice and send it to anyone. The invoice could contain product or services.

### Order uses that could result of this project are: 
1. Creating a decentralized history of prices for goods and services that could serve as a source of information for calculating inflation
2. That history could also serve as proves of income for anyone as long as he/she can proves that own the account of the beneficiary for each invoice. This information could be used for institutions willing to lend money for businesses

***Note: This additional use cases are not part of the project***

### What is this project about?
A decentralized point of sale (POS) 

### How will this Project work?
The project will have 3 actors:
1. The Owner of the invoice: The account that created the Invoice. Can be same as Beneficiary/Merchant.
2. The Beneficiary or Merchant: The account that will receive the funds once the invoice is paid. This account could the same owner account but having a different field for that allows the flexibility to intermediary e-commerce platforms to set a different account as the beneficiary of the funds if desired.
3. The client, buyer or consumer which is the person receiving the goods and services and the one who is going to pay the invoice 


## Screen Cast
https://www.loom.com/share/2e623c04beb24d8f87984855e09964a9

## Frontend public URL
https://idekel.github.io/blockchain-developer-bootcamp-final-project/

## Project directory structure
 The project contain 3 main directories.
 * The contracts directory: This is where all the solidity code lives. Here you can find the POS.sol which is where the POS contract is. The POS contract is the heart of the system.
 * The client directory: Here you can find the frontend code. This Application allows for merchant to create invoices and for clients to pay them. For the sake of simplicity there is only App for both client and merchants. At the home page one can decide between being a client or a merchant
 * The test directory: Contain all unit tests for the POS contract

 ## Running the project
 1. Install truffle v5.4.11 and ganache v2.5.4
 2. Run ganache and create a new network on port 8545
 3. Cd to project root
 4. Install openzeppelin/contracts version 4.3.2. Run: `npm install @openzeppelin/contracts` 
 5. Run: `truffle console --network development`
 6. Inside truffle console run: `test` to run unit tests
 7. Cd to client directory
 8. Run: `npm install` to install React dependencies
 9. Run: `npm run start` to run the UI


 ## Public address for certification
 `0xc0DD99B1a16b6d29Da933a56777fE590a0EeA2FF`

 # Notes:
 * If you have Mac OS Version 12.0.1 the frontend won't compile since scss does not support this version yet