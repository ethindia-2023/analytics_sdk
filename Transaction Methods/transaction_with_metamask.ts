import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";

interface ContractCallOptions {
  gasPrice?: string;
  gasLimit?: number;
  value?: string;
}

interface EventSubscription {
  eventName: string;

  callback: (event: any) => void;
}

interface SDKWrapperOptions {
  chainId: number;
  contractAddress: string;
  abiLink: string;
  contractFunction: string;
  contractFunctionParams?: any[];
  contractCallOptions?: ContractCallOptions;
  fallbackFunction?: () => Promise<void>;
  eventSubscriptions?: EventSubscription[];
}
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

async function sdkWrapper(options: SDKWrapperOptions): Promise<any> {
  if (typeof window.ethereum === "undefined") {
    throw new Error("Please install MetaMask");
  }
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const currentChainId = await window.ethereum.request({
    method: "eth_chainId",
  });
  if (currentChainId !== options.chainId.toString()) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${options.chainId.toString(16)}` }],
    });
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  if (options.fallbackFunction) {
    await options.fallbackFunction();
  }
  if (options.eventSubscriptions) {
    for (const subscription of options.eventSubscriptions) {
      const contract = new ethers.Contract(options.contractAddress, [], signer);
      contract.on(subscription.eventName, subscription.callback);
    }
  }

  const abiResponse = await fetch(options.abiLink);
  const abi = await abiResponse.json();

  const contract = new ethers.Contract(options.contractAddress, abi, signer);

  try {
    const result = await contract[options.contractFunction](
      ...(options.contractFunctionParams ?? []),
      options.contractCallOptions
    );
    return result;
  } catch (error) {
    throw new Error(`Error calling contract function: ${error.message}`);
  }
}
