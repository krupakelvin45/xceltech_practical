import React, { useState } from "react";
import productAPI from "../../API/products";

function ProductForm(props) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQty, setProductQty] = useState("");
  const [productPrice, setProductPrice] = useState("");

  async function addProduct(e){

    e.preventDefault();

    let productData = {
      userid: props.userid,
      name:productName,
      description:productDescription,
      quantity:productQty,
      filename:"file1.png",
      price:productPrice
    }

    const response = await productAPI.addProductAPI(productData);

    if(response)
    {
      console.log("Product Added successfully");
      await props.refreshproductdata()
    }

  };

  return (
    <div class="modal fade" tabIndex={-1} id="productformmodal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productformmodallabel">
              Add Product
            </h5>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="productName" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="productName"
                  aria-describedby="emailHelp"
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="productdescription" class="form-label">
                  Description
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="productdescription"
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="productqty" class="form-label">
                  Qty
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="productqty"
                  onChange={(e) => setProductQty(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="productprice" class="form-label">
                  Price
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="productprice"
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                onClick={(e) => addProduct(e)}
              >
                Ok
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
