const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const gusdContractABI = require("../gusd-contract-abi.json");
const gusdContractAddress = "0x67aeF79654D8F6CF44FdC08949c308a4F6b3c45B";

const glowContractABI = require("../glow-contract-abi.json");
const glowContractAddress = "0x9D21f9CC6de1bf9d058B623BA1BD272260D5890C";

export const gusd = new web3.eth.Contract(gusdContractABI, gusdContractAddress);

export const glow = new web3.eth.Contract(glowContractABI, glowContractAddress);

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
    data: gusd.methods.approve(glowContractAddress).encodeABI(),
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
            href={`https://goerli.etherscan.io/tx/${txHash}`}
          >
            View the status of your transaction on Etherscan!
          </a>
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
            href={`https://goerli.etherscan.io/tx/${txHash}`}
          >
            View the status of your transaction on Etherscan!
          </a>
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
