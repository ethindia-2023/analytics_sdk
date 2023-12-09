import ethers, { InterfaceAbi } from 'ethers';

export default async function txn(provider: ethers.JsonRpcProvider, address: string, options: Object, abi: InterfaceAbi) {
    const chainId: bigint = (await provider.getNetwork()).chainId;
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, provider);

    
}