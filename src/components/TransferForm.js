import { Typography } from "@mui/material";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const TransferForm = ({
  ongetGUSDApproval,
  account,
  balance,
  gusdSpendApproval,
  errorMessage,
  successMessage,
  onTransferToSurplusBuffer,
  gusdBalance,
}) => {
  return (
    <>
      {gusdSpendApproval === "Yes" ? (
        <Stack spacing={2}>
          <div className="row">
            <div className="offset-2 col-md-8">
              <Form>
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
          <div className="clear-row">
            <br />
          </div>
        </Stack>
      ) : (
        <Button
          onClick={ongetGUSDApproval}
          className="btn btn-primary col-md-6"
          style={{ marginTop: "20px" }}
        >
          {" "}
          Appove GUSD{" "}
        </Button>
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
        <div className="offset-1 col-9">
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
                  <Typography variant="h6"> Approval</Typography>
                </td>
                <td>
                  {" "}
                  <Typography variant="h6">{gusdSpendApproval}</Typography>
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
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default TransferForm;
