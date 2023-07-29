import React,{useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [cart, setCart] = useCart();
    useEffect(()=>{
        if(params?.slug) getProduct()
    },[params?.slug])
    //getProduct

    const getProduct = async ()=>{
        try {
           const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Layout>
<div className="row container mt-3">
    <div className="col-md-6">
    <img
                    src={`/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                    height={'450px'}
                    width={'200px'}
                  />
    </div>
    <div className="col-md-6">
    <h1>Product Details</h1>
    <h5>Name : {product.name}</h5>
    <h5>Description : {product.description}</h5>
    <h5>Price : {product.price}</h5>
    <h5>category : {product?.category?.name}</h5>
    <button className='btn btn-secondary ms-1' onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem("cart", JSON.stringify([...cart,product]))
                      toast.success("Item added to cart");
                    }}>ADD TO CART</button>
    </div>
</div>
    </Layout>
  )
}

export default ProductDetails