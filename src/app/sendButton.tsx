"use client";
import { parseEther } from "viem";
import { ConnectWalletClient} from "./client";

export default function SendButton() {
     //Send Transaction Function
     async function handleClick() {
        try {
           // Declare wallet client
           const walletClient = ConnectWalletClient();
           // Get the main wallet address
           const [address] = await walletClient.getAddresses();
           // sendTransaction is a Wallet action. 
           // It returns the transaction hash 
           // requires 3 parameters  to transfer cryptocurrency, 
           // account, to and value
           const hash = await walletClient.sendTransaction({
              account: address,
              to: "0x78AB1e3DaB9A53947690483Dda5563f0C17b21f6",
              value: parseEther("0.001"), // send 0.001 matic
            });
            // Display the transaction hash in an alert
            alert(`Transaction successful. Transaction Hash: ${hash}`);
         } catch (error) {
              // Handle Error
              alert(`Transaction failed: ${error}`);
         }
     }
     
     return (
        <button
            className="py-2.5 px-2 rounded-md bg-[#1e2124] flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10"
            onClick={handleClick}>
            Send Transaction
       </button>
    );
}