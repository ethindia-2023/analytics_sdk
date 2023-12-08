import Web3 from "web3";

var web3 = new Web3('http://localhost:8545');

export async function init(provider: string) {
    web3.setProvider(provider);
}

export async function sendTxn(from: string, options: any) {
    web3.eth.sendTransaction({ from: from, ...options }).on('transactionHash', async (hash: string) => {
        let chainId: bigint = await web3.eth.getChainId();
        sendData(hash, chainId)
    });
}

function sendData(hash: string, chainId: bigint) {
    
}
