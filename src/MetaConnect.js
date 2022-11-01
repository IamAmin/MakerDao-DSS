import { Typography } from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const accountsChanged = async (newAccount) => {
    setAccount(newAccount);
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });
      setBalance(ethers.utils.formatEther(balance));
      setErrorMessage();
    } catch (err) {
      setAccount(null);
      console.error(err);
      setErrorMessage("1There was a problem connecting to MetaMask");
    }
  };
  useEffect(() => {
    if (window.ethereum) {
      // const accounts = window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      // accounts.then((res)=>{
      //   console.log(res.balance);
      // })
      window.ethereum.request({ method: 'eth_accounts' }).then(accountsChanged).catch(console.error);
      window.ethereum.on("accountsChanged", accountsChanged);
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);

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
   
      <Stack gap={2} className="col-md-6 mx-auto">
      <div className='col-md-12' style={{margin:"auto",marginTop:"30%"}}>
      <Card className="text-center " style={{minHeight:"9rem"}}>
      <Card.Header>MakerDao DSS</Card.Header>
      <Card.Body>
        <Card.Title>Transfer GUSD, USDC, and USDP to MakerDao Surplus Buffer</Card.Title>
        <Card.Text>
         
        </Card.Text>
        {account?<Stack spacing={2}>
          <div className="row">
            <div className="offset-3 col-md-4">
              <input className="form-control" type={"number"} placeholder={"Enter Amount"}></input>
            </div>
            <div className="col-md-2">
              <select className="form-control">
                  <option value = "">Select</option>
                  <option value = "GUSD">GUSD</option>
                  <option value = "GUSD">USDC</option>
                  <option value = "GUSD">USDP</option>
              </select>
            </div>
          </div>
          <div className="clear-row"><br/></div>
          <div className="row">
            <div className="">
                <Button className="btn btn-primary col-md-6"> Send </Button>
            </div>
          </div>
          <br/>
          <div className="row">
        <Typography variant="h6"> Account: {account} </Typography>
        <Typography variant="h6">
          Balance: {balance} {balance ? "ETH" : null}
        </Typography>
        </div>
        {errorMessage ? (
          <Typography variant="body1" color="red">
            Error: {errorMessage}
          </Typography>
        ) : null}
      </Stack>:
        <Button onClick={connectHandler} variant="primary">Connect Wallet</Button>
        }
      </Card.Body>
    </Card>
      </div>
      <div className='row mt-2 p-2'>
      
      </div>
    </Stack>
   
  );
};

export default WalletCard;