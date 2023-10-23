import React from "react";
import producto from "../assets/images/producto.png";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductCard = ({
  brand,
  productInfo,
  image,
  addToCart,
  idProduct,
  productData,
}) => {
  const imageToShow = image !== undefined && image !== null ? image : producto;
  return (
    <div
      key={idProduct}
      style={{
        maxWidth: "200px",
        maxHeight: "450px",
        backgroundColor: "#fff",
        margin: 20,
        padding: 10,
        borderRadius: 10,
      }}>
      <h2>{brand}</h2>
      <h4>{productInfo}</h4>
      <img
        style={{
          maxWidth: "200px",
          maxHeight: "200px",
        }}
        src={imageToShow}
        alt={productInfo}
      />
      <Button
        variant='outlined'
        onClick={() => addToCart(productData)}
        endIcon={<AddShoppingCartIcon />}>
        Agregar al carrito{}
      </Button>
    </div>
  );
};

export default ProductCard;
