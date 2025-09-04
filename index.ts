import { ethers } from "ethers";

async function main(){
    const provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/R8bgMnb8UJ2Q9SqNIt_U1');
    const address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

    const functionSignature = "balanceOf(address)";
    const abiCoder = new ethers.AbiCoder();

    const getFunctionSignature = ethers.id(functionSignature).slice(0,10);

    const letsEncodeTheFunction = abiCoder.encode(["address"], ['0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640']);

    const combineTheDataToSend = getFunctionSignature + letsEncodeTheFunction.slice(2);

    const makeEthCall = await provider.call({
        to: address,
        data: combineTheDataToSend
    });

    const decode = abiCoder.decode(['uint256'], makeEthCall);
    const balance = ethers.formatUnits(decode[0], 6);

    console.log("Raw response:", makeEthCall);
    console.log("Decoded balance (raw units):", decode.toString());
    console.log("Balance in USDC:", balance);



}

main().catch(console.error)