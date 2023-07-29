import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
// import { useAuth } from "../context/auth";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

import { Checkbox, Radio } from "antd";
// import { toast } from "react-hot-toast";
// import { Prices } from "../components/Prices";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  // const [Categories, setCategories] = useState([]);
  // const [checked, setChecked] = useState([]);
  // const [radio, setRadio] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="row p-4 mx-auto g-4">
        <div className="col ">
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2 text-center" style={{ width: "20rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">price : Rs.{p.price}</p>
                  <button
                    class="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    View Details
                  </button>
                  <button
                    class="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart,p]))
                      toast.success("Item added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
