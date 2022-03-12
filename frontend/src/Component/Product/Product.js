import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productAPI from "../../API/products";
import "./Product.css";
import ProductForm from "../ProductForm/ProductForm";
import bootstrap from "bootstrap";

function Product() {
  const [products, setproducts] = useState([]);
  let location = useLocation();

  async function fetchProductData() {
    let productsList = await productAPI.getProductDataforUser(
      location.state.id
    );
    setproducts(productsList);
    console.log(productsList);
  }

  useEffect(() => {
    fetchProductData();
  }, [location.state.id]);

  const deleteProduct = async (productId) => {

    let response = await productAPI.deleteProduct(productId);
    if(response)
    {
      await fetchProductData()
    }

  }

  return (
    <div className="">
      <ProductForm userid={location.state.id} refreshproductdata={fetchProductData}></ProductForm>
      <button
        type="button"
        class="btn btn-primary d-flex justify-content-center"
        data-bs-toggle="modal"
        data-bs-target="#productformmodal"
      >
        Add Product
      </button>
      <div className="producttable">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Total Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {products ? (
              products.map((product, index) => {
                console.log("Inside product ", index, product);
                return (
                  <tr key={product.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price * product.quantity}</td>
                    <button
                      type="button"
                      class="btn btn-danger deletebtn"
                      id={product.id}
                      onClick={(e)=>{console.log(e); deleteProduct(e.target.id)}}
                    >Delete</button>
                  </tr>
                );
              })
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
