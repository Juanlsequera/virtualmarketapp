import { useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"; // Import your CSS file
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { logout } from "../slices/authSlice";
import { reset } from "../slices/shoppingCart";
import { useDispatch } from "react-redux";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const Header = ({ auth, isAdmin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="header">
        {auth ? (
          <>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Home
            </Button>
            {isAdmin && (
              <Button
                variant="outlined"
                onClick={() => navigate("/management")}
                endIcon={<ManageAccountsIcon />}
              >
                Data management
              </Button>
            )}
            <IconButton
              color="primary"
              aria-label="Add to shopping cart"
              onClick={() => navigate("/cart")}
            >
              <AddShoppingCartIcon sx={{ fontSize: 40 }} />
            </IconButton>
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(logout());
                dispatch(reset());
              }}
              endIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            endIcon={<LoginIcon />}
          >
            Login
          </Button>
        )}
      </div>
    </>
  );
};

export default Header;
