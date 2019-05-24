import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./AddProduct.css";

export default class AddProduct extends Component {
  render() {
    return (
      <div className="AddProduct">
       <p>ADD PRODUCT</p>
      </div>
    );
  }
}
