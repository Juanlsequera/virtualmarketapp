import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import producto from "../assets/images/producto.png";
import Button from "@mui/material/Button";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";

const OrderCard = () => {
  const totalPrice = useSelector((state) => state.shoppingCart.totalPrice);
  return (
    <Card
      sx={{ display: "flex", flexDirection: "row", height: 300, width: 500 }}
    >
      <Box>
        <CardContent sx={{ flex: "5 0 auto" }}>
          <Typography component="div" variant="h5">
            Resumen de pedido
          </Typography>
        </CardContent>
        <CardContent sx={{ display: "flex", flexDirection: "row" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
          ></TextField>
          <Button
            color="secondary"
            variant="contained"
            //   onClick={}
          >
            Aplicar
          </Button>
        </CardContent>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="subtitle1">
              Materiales
            </Typography>
            <Typography component="div" variant="subtitle1">
              Total
            </Typography>
          </CardContent>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="subtitle1">
              $
            </Typography>
            <Typography component="div" variant="subtitle1">
              $
            </Typography>
          </CardContent>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="subtitle1">
              {totalPrice}
            </Typography>
            <Typography component="div" variant="subtitle1">
              {totalPrice}
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
};

export default OrderCard;
