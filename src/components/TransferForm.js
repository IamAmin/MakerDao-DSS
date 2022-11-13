import { Typography } from "@mui/material";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const TransferForm = ({
  ongetGUSDApproval,
  account,
  balance,
  gusdSpendApproval,
  errorMessage,
  successMessage,
  onTransferToSurplusBuffer,
  gusdBalance,
  surplusBalance,
}) => {
  return (
    <>
      {gusdSpendApproval > 0 ? (
        <Stack spacing={2}>
          <div className="row">
            <div className="offset-2 col-md-8">
              <Form id="surplusBufferForm">
                <Form.Group className="mb-3" controlId="enteredAmount">
                  <Form.Control
                    className="form-control"
                    type="number"
                    placeholder="Enter Amount"
                    name="enteredAmount"
                  ></Form.Control>
                </Form.Group>
              </Form>
            </div>
          </div>

          <div className="row">
            <div className="">
              <Button
                className="btn btn-primary col-md-6"
                onClick={onTransferToSurplusBuffer}
              >
                {" "}
                Send{" "}
              </Button>
            </div>
          </div>
          <div className="clearfix">
            <br />
          </div>
        </Stack>
      ) : (
        <div className="row">
          <div className="offset-2 col-md-8">
            <Button
              onClick={ongetGUSDApproval}
              className="btn btn-primary col-md-6"
              style={{ marginTop: "20px" }}
            >
              {" "}
              Approve GUSD{" "}
            </Button>
          </div>
          <div className="col-12 mt-3">
            <i style={{ marginTop: "10px" }}>
              (To transfer GUSD to the Surplus Buffer, we require one time
              approval. Please click the above button to provide us the
              permission.)
            </i>
          </div>
          <div className="clearfix">
            <br />
          </div>
        </div>
      )}
      <div className="clear-fix">
        <br />

        {errorMessage ? (
          <Typography variant="body1" color="red">
            Error: {errorMessage}
          </Typography>
        ) : null}

        {successMessage ? (
          <Typography variant="body1" color="green">
            Success: {successMessage}
          </Typography>
        ) : null}
        <br />
      </div>
      <div className="row">
        <div className="col-12">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>
                  <Typography variant="h6"> Account</Typography>
                </th>
                <th>
                  <Typography variant="h6"> {account} </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Typography variant="h6"> Balance</Typography>
                </td>
                <td>
                  <Typography variant="h6">
                    {balance} {balance ? "ETH" : null}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> Approved GUSD Amount</Typography>
                </td>
                <td>
                  {" "}
                  <Typography variant="h6">
                    {gusdSpendApproval === "0" ? (
                      gusdSpendApproval
                    ) : (
                      <span style={{ fontSize: "2.5rem" }}>∞</span>
                    )}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> GUSD Balance</Typography>
                </td>
                <td>
                  {" "}
                  <Typography variant="h6">{gusdBalance}</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> Surplus Buffer</Typography>
                </td>
                <td>
                  {" "}
                  <Typography variant="h6">
                    {formatter.format(surplusBalance)}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default TransferForm;
