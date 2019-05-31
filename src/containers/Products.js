import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { ListGroup, PageHeader, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./Products.scss";
import { linkSync } from "fs";
import { notEqual } from "assert";

export default class Products extends Component {
  constructor(props) {
   super(props);

   this.state = {
     isLoading: true,
     products: []
   }
  }

  async componentDidMount() {
    try {
      const products = await API.get("products", "/products")
      this.setState({ products })
    } catch (e) {
      alert(e.message)
    }
    this.setState({ isLoading: false })
  }

  renderProduct(product) {
    return (
      <div>
        <LinkContainer key={product.productId} to={`/products/${product.productId}`}>
          <ListGroupItem header = {product.name}></ListGroupItem>
        </LinkContainer>
      </div>
    )
  }

  renderNewProductLink() {
    return (
      <div>
        <LinkContainer key="new" to="/products/new">
          <ListGroupItem>
            <h4><b>Add Product</b></h4>
          </ListGroupItem>
        </LinkContainer>
      </div>
    )
  }

  renderProductsList(products) {
    return[{}].concat(products).map(
      (product, i) => 
      i !== 0 ? this.renderProduct(product) : this.renderNewProductLink()
    )
  }



  render() {
    return (
      <div className="products">
      <PageHeader>Products</PageHeader>
      <ListGroup>{!this.state.isLoading && this.renderProductsList(this.state.products)} </ListGroup>
    </div>
    );
  }
}
