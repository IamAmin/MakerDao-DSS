import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import TransferForm from "./components/TransferForm.js";

import {
  getAllowancelimit,
  getGUSDCount,
  getGUSDApproval,
  transferToSurplusBuffer,
} from "./util/interact.js";

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [gusdBalance, setGusdBalance] = useState(null);
  const [gusdSpendApproval, setGusdSpendApproval] = useState("No");
  const accountsChanged = async (newAccount) => {
    setAccount(newAccount);
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });
      setBalance(ethers.utils.formatEther(balance));
      setErrorMessage();
      setSuccessMessage();
      const getAllowanceAmt = await getAllowancelimit(newAccount[0]);
      const getGUSDTokens = await getGUSDCount(newAccount[0]);
      getAllowanceAmt > 0
        ? setGusdSpendApproval("Yes")
        : setGusdSpendApproval("No");
      getGUSDTokens > 0
        ? setGusdBalance(getGUSDTokens / 10 ** 2)
        : setGusdBalance("-");
      console.log(getGUSDTokens / 10 ** 2);
    } catch (err) {
      setAccount(null);
      console.error(err);
      setErrorMessage("There was a problem connecting to MetaMask");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const accounts = window.ethereum.request({
        method: "eth_requestAccounts",
      });
      accounts.then((res) => {});

      window.ethereum
        .request({ method: "eth_accounts" })
        .then(accountsChanged)
        .catch(console.error);
      window.ethereum.on("accountsChanged", accountsChanged);
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);
  const ongetGUSDApproval = async () => {
    setErrorMessage();
    setSuccessMessage();
    let gusdApprovalStatus = await getGUSDApproval(account[0]);
    console.log(gusdApprovalStatus);
    if (gusdApprovalStatus.status === "success") {
      setErrorMessage();
      setSuccessMessage(gusdApprovalStatus.message);
    } else {
      setSuccessMessage();
      setErrorMessage(gusdApprovalStatus.message);
    }
  };

  const onTransferToSurplusBuffer = async () => {
    let enteredValue = document.getElementById("enteredAmount").value;
    if (enteredValue < 1) {
      setSuccessMessage();
      setErrorMessage("Atleast 1 GUSD needs to be transferred");
    } else {
      let noOfgusdToken = enteredValue * 10 ** 2;
      setErrorMessage();
      setSuccessMessage();
      let transferToSurplusBufferStatus = await transferToSurplusBuffer(
        account[0],
        noOfgusdToken
      );
      if (transferToSurplusBufferStatus.status === "success") {
        setErrorMessage();
        setSuccessMessage(transferToSurplusBufferStatus.message);
      } else {
        setSuccessMessage();
        setErrorMessage(transferToSurplusBufferStatus.message);
      }
    }
  };

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await accountsChanged(res[0]);
      } catch (err) {
        console.error(err);
        setErrorMessage("There was a problem connecting to MetaMask");
      }
    } else {
      setErrorMessage("Install MetaMask");
    }
  };

  const chainChanged = () => {
    setErrorMessage(null);
    setAccount(null);
    setBalance(null);
  };

  return (
    <div className="container">
      <Stack gap={2} className="col-md-6 mx-auto">
        <div className="col-md-12" style={{ margin: "auto", marginTop: "20%" }}>
          <Card className="text-center " style={{ minHeight: "9rem" }}>
            <Card.Header>MakerDao DSS</Card.Header>
            <Card.Body>
              <Card.Title>Transfer GUSD to MakerDao Surplus Buffer</Card.Title>
              <Card.Text></Card.Text>
              {account ? (
                <TransferForm
                  ongetGUSDApproval={ongetGUSDApproval}
                  account={account}
                  balance={balance}
                  gusdSpendApproval={gusdSpendApproval}
                  errorMessage={errorMessage}
                  successMessage={successMessage}
                  onTransferToSurplusBuffer={onTransferToSurplusBuffer}
                  gusdBalance={gusdBalance}
                ></TransferForm>
              ) : (
                <Button onClick={connectHandler} variant="primary">
                  Connect Wallet
                </Button>
              )}
            </Card.Body>
          </Card>
        </div>
        <div className="row mt-2 p-2"></div>
      </Stack>
    </div>
  );
};

export default WalletCard;
