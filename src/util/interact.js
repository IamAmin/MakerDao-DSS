const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const vowContractAddress = process.env.REACT_APP_VOW_ADDRESS;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const gusdContractABI = require("../gusd-contract-abi.json");
const gusdContractAddress = "0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd";

const glowContractABI = require("../glow-contract-abi.json");
const glowContractAddress = "0x3574DF458a9d3545efC3D81fcBf99C8426bc4b33";

const vatContractABI = require("../vat-contract-abi.json");
const vatContractAddress = "0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B";

export const gusd = new web3.eth.Contract(gusdContractABI, gusdContractAddress);

export const glow = new web3.eth.Contract(glowContractABI, glowContractAddress);

export const vat = new web3.eth.Contract(vatContractABI, vatContractAddress);

export const getAllowancelimit = async (account) => {
  const message = await gusd.methods
    .allowance(account, glowContractAddress)
    .call();
  return message;
};

export const getGUSDCount = async (account) => {
  const message = await gusd.methods.balanceOf(account).call();
  return message;
};

export const getSurplusBalance = async () => {
  const dai = await vat.methods.dai(vowContractAddress).call();
  const sin = await vat.methods.sin(vowContractAddress).call();
  const surplusBalance = (dai - sin) / 10 ** 45;
  return surplusBalance;
};

export const getGUSDApproval = async (address) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  //set up transaction parameters
  const transactionParameters = {
    to: gusdContractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: gusd.methods
      .approve(
        glowContractAddress,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      )
      .encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: "success",
      message: (
        <span>
          ✅{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://etherscan.io/tx/${txHash}`}
          >
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, it will be
          reflected here.
          <br />
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "error",
      message: "😥 " + error.message,
    };
  }
};

export const transferToSurplusBuffer = async (address, amt_) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  //set up transaction parameters
  const transactionParameters = {
    to: glowContractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: glow.methods.glow(amt_).encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: "success",
      message: (
        <span>
          ✅{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://etherscan.io/tx/${txHash}`}
          >
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, it will be
          reflected here.
          <br />
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "error",
      message: "😥 " + error.message,
    };
  }
};
