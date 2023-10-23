import React from "react";
import ProductCardCart from "../components/ProductCardCart";
import OrderCard from "../components/OrderCard";
import { useSelector } from "react-redux";

const Cart = () => {
  const productsSC = useSelector((state) => state.shoppingCart.products);

  return (
    <div className="products-view">
      <p className="pageTitles">Shopping Cart</p>

      <div className="order-container">
        <div className="order-products-container">
          {productsSC?.map((product) => (
            <>
              <ProductCardCart data={product}></ProductCardCart>
            </>
          ))}
        </div>

        <OrderCard></OrderCard>
      </div>
    </div>
  );
};

export default Cart;
