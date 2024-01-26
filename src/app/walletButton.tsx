// walletButton.tsx
"use client";
import { useState } from "react";
import { ConnectWalletClient, ConnectPublicClient } from "./client";
import Image from "next/image";


export default function WalletButton() {
  //State variables for address & balance
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<BigInt>(BigInt(0));
  // Function requests connection and retrieves the address of wallet
  // Then it retrieves the balance of the address
  // Finally it updates the value for address & balance variable
  async function handleClick() {
    try {
      // Instantiate a Wallet & Public Client
      const walletClient = ConnectWalletClient();
      const publicClient = ConnectPublicClient();

      // Performs Wallet Action to retrieve wallet address
      const [address] = await walletClient.getAddresses();

      // Performs Public Action to retrieve address balance
      const balance = await publicClient.getBalance({ address });
      // Update values for address & balance state variable
      setAddress(address);
      setBalance(balance);
    } catch (error) {
      // Error handling
      alert(`Transaction failed: ${error}`);
    }
  }
  // Unimportant Section Below / Nice to Have UI
  return (
    <>
      <Status address={address} balance={balance} />
      <button
        className="px-8 py-2 rounded-md bg-[#1e2124] flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10"
        onClick={handleClick}
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
          alt="MetaMask Fox"
          width={25}
          height={25}
        />
        <h1 className="mx-auto">Connect Wallet</h1>
      </button>
    </>
  );
}

// Displays the wallet address once it’s successfully connected
// You do not have to read it, it's just frontend stuff

function Status({
  address,
  balance,
}: {
  address: string | null;
  balance: BigInt;
}) {
  if (!address) {
    return (
      <div className="flex items-center">
        <div className="border bg-red-600 border-red-600 rounded-full w-1.5 h-1.5 mr-2"></div>
        <div>Disconnected</div>
      </div>
    );
  }
  return (
    <div className="flex items-center w-full">
      <div className="border bg-green-500 border-green-500 rounded-full w-1.5 h-1.5 mr-2"></div>
      <div className="text-xs md:text-xs">
        {address} <br /> Balance: {balance.toString()}
      </div>
    </div>
  );
}
