import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./Products.css";

export default class Products extends Component {
  render() {
    return (
      <div className="Products">
        PRODUCTS
      </div>
    );
  }
}
