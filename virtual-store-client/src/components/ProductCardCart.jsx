import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import producto from "../assets/images/producto.png";
import Button from "@mui/material/Button";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { get } from "../services/apiService";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addProduct,
  deleteItemProduct,
  deleteProduct,
} from "../slices/shoppingCart";
const ProductCardCart = ({ data }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addProduct(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(deleteProduct(product));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(deleteItemProduct(product));
  };

  return (
    <Card sx={{ display: "flex", margin: 1 }}>
      <CardMedia
        component='img'
        sx={{ width: 151 }}
        image={data.imagePath !== null ? data.imagePath : producto}
        alt='Product'
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardContent sx={{ flex: "5 0 auto" }}>
            <Typography component='div' variant='h5'>
              {data.brands[0]}
            </Typography>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              component='div'>
              {data.name}
            </Typography>
          </CardContent>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Button variant='text' onClick={() => handleRemoveFromCart(data)}>
              Delete
            </Button>
          </CardContent>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component='div' variant='subtitle1'>
              PRECIO UNITARIO
            </Typography>
            <Typography component='div' variant='subtitle1'>
              {data.taloPriceWithTaxAndRecharge}
            </Typography>
          </CardContent>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component='div' variant='subtitle1'>
              PRECIO TOTAL
            </Typography>
            <Typography component='div' variant='subtitle1'>
              {data.totalPricePerProduct}
            </Typography>
          </CardContent>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <IconButton
                color='primary'
                aria-label='Delete'
                onClick={() => handleDecreaseQuantity(data)}>
                <RemoveCircleOutlineIcon sx={{ fontSize: 40 }} />
              </IconButton>
              <p>{data.quantity}</p>
              <IconButton
                color='primary'
                aria-label='Add'
                onClick={() => handleAddToCart(data)}>
                <AddCircleOutlineIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCardCart;
