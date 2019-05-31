import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./AddProduct.scss";
import "../styles/forms.scss"
import { runInThisContext } from "vm";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: false,
      name: "",
      price: null,
      description: null,
      reserved: null,
      stock: null,
      image: null
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleFileChange = event => {
    this.file = event.target.files[0]
  }

   
  getProductObject = (obj) => {
    delete obj.isLoading
    Object.keys(obj).forEach((key) => (obj[key] == null) && delete obj[key]);
    return obj;
  }

  handleProductAdded = () => {
    alert('Product added')
    window.location.reload()
  }


  handleSubmit = async event => {
    event.preventDefault();

    if(this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("File size too large")
      return
    } 

    this.setState({ isLoading: true })
    try {
      this.setState({ image: this.file ? await s3Upload(this.file) : null }) 
      const productObject = this.getProductObject(this.state)
      await API.post('products', "/products", { body: productObject })
      this.setState({ isLoading: false })
      this.handleProductAdded();
    } catch(e) {
      alert(e.message)
    }
  }

  validateForm() {
    return this.state.name !== "" && this.state.price !== null && this.state.stock !== null
  }

  renderForm() {
    return (
    <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="name" bsSize="large">
        <ControlLabel className="form__text">Product Name</ControlLabel>
        <FormControl
            className="form__input-text"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
      </FormGroup>
      <FormGroup controlId="description" bsSize="small">
        <ControlLabel className="form__text">Description</ControlLabel>
        <FormControl
            className="form__input-text add-product__description"
            componentClass="textarea"
            value={this.state.description}
            onChange={this.handleChange}
          />
      </FormGroup>
      <FormGroup controlId="price" bsSize="large">
        <ControlLabel className="form__text">Price (£)</ControlLabel>
        <FormControl
            className="form__input-text"
            type="number"
            value={this.state.price}
            onChange={this.handleChange}
          />
      </FormGroup>
      <FormGroup controlId="stock" bsSize="large">
        <ControlLabel className="form__text">In Stock</ControlLabel>
        <FormControl
            className="form__input-text"
            type="number"
            value={this.state.stock}
            onChange={this.handleChange}
          />
      </FormGroup>
      <FormGroup controlId="reserved" bsSize="large">
        <ControlLabel className="form__text">Number Reserved</ControlLabel>
        <FormControl
            className="form__input-text"
            type="number"
            value={this.state.reserved}
            onChange={this.handleChange}
          />
      </FormGroup>
        <FormGroup controlId="file">
            <ControlLabel className="form__text">Upload Image</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
      <div className="add-product__button_wrapper">
      <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Add Product"
            className="form__button add-product__button"
            loadingText="Adding Product…"
          />
          </div>
    </form>
    )
  }


  render() {
    return (
      <div className="add-product">
       {this.renderForm()}
      </div>
    );
  }
}
