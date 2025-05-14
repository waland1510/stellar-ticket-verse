
import * as freighter from '@stellar/freighter-api';
import * as StellarSdk from '@stellar/stellar-sdk';

// Configure the Stellar network (use testnet for development)
export const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
export const networkPassphrase = StellarSdk.Networks.TESTNET;

// Create a new account on the Stellar testnet
export const createTestnetAccount = async () => {
  try {
    // Create a keypair from random
    const keypair = StellarSdk.Keypair.random();
    
    // Get account address (public key)
    const publicKey = keypair.publicKey();
    
    // Get account seed (secret key)
    const secretKey = keypair.secret();
    
    // Fund the account using Friendbot (only works on testnet)
    await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`);
    
    return {
      publicKey,
      secretKey
    };
  } catch (error) {
    console.error('Error creating testnet account:', error);
    throw error;
  }
};

// Check if an account exists
export const accountExists = async (publicKey: string): Promise<boolean> => {
  try {
    await server.loadAccount(publicKey);
    return true;
  } catch (error) {
    return false;
  }
};

// Create and submit a transaction to sell a ticket
export const listTicketForSale = async (
  ticketDetails: {
    name: string;
    venue: string;
    date: string;
    price: string;
    category: string;
  }
) => {
  try {
    if (!await freighter.isConnected()) {
      throw new Error('Wallet not connected');
    }
    
    const publicKey = await freighter.getPublicKey();
    const sourceAccount = await server.loadAccount(publicKey);
    
    // Convert ticket details to data entry
    const ticketData = JSON.stringify(ticketDetails);
    
    // Create a transaction with a manage data operation
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase
    })
      .addOperation(
        StellarSdk.Operation.manageData({
          name: `ticket:${Date.now()}`,
          value: ticketData
        })
      )
      .setTimeout(30)
      .build();
    
    // Sign the transaction with Freighter
    const signedTransaction = await freighter.signTransaction(
      transaction.toXDR(),
      {
        networkPassphrase,
        accountToSign: publicKey
      }
    );
    
    // Submit the transaction
    const transactionToSubmit = StellarSdk.TransactionBuilder.fromXDR(
      signedTransaction,
      networkPassphrase
    );
    
    const result = await server.submitTransaction(transactionToSubmit);
    return result;
  } catch (error) {
    console.error('Error listing ticket:', error);
    throw error;
  }
};

// Buy a ticket (simplified version)
export const buyTicket = async (sellerPublicKey: string, ticketId: string) => {
  try {
    if (!await freighter.isConnected()) {
      throw new Error('Wallet not connected');
    }
    
    const buyerPublicKey = await freighter.getPublicKey();
    const sourceAccount = await server.loadAccount(buyerPublicKey);
    
    // Create a payment transaction
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: sellerPublicKey,
          asset: StellarSdk.Asset.native(),
          amount: '10' // This would be the ticket price
        })
      )
      .addOperation(
        StellarSdk.Operation.manageData({
          name: `purchase:${ticketId}`,
          value: buyerPublicKey
        })
      )
      .setTimeout(30)
      .build();
    
    // Sign the transaction with Freighter
    const signedTransaction = await freighter.signTransaction(
      transaction.toXDR(),
      {
        networkPassphrase,
        accountToSign: buyerPublicKey
      }
    );
    
    // Submit the transaction
    const transactionToSubmit = StellarSdk.TransactionBuilder.fromXDR(
      signedTransaction,
      networkPassphrase
    );
    
    const result = await server.submitTransaction(transactionToSubmit);
    return result;
  } catch (error) {
    console.error('Error buying ticket:', error);
    throw error;
  }
};
