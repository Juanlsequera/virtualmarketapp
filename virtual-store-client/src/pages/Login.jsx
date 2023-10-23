import React from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { setUser } from "../slices/authSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { signIn } from "../services/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Login = () => {
  const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    const { email, password } = data;

    toast.promise(
      signIn(email, password).then((userData) => {
        let { data, token } = userData;
        dispatch(setUser({ ...data, token }));
        navigate("/");
      }),
      {
        pending: "Loading",
        success: "Success",
        error: "Error",
      }
    );
  };

  return (
    <div className="login-view">
      <p className="pageTitles">Sign In</p>
      <div className="login-container">
        <Box
          sx={{
            "& .MuiTextField-root": {
              m: 2,
              width: "25ch",
            },
            boxShadow: 10,
          }}
          noValidate
          autoComplete="off"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div>
              <FormControl sx={{ m: 2, width: "25ch" }} variant="outlined">
                <Controller
                  name="email"
                  required
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      error={errors.email !== undefined}
                    />
                  )}
                />
              </FormControl>
              <FormControl sx={{ m: 4, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      error={errors.password !== undefined}
                      id="outlined-adornment-password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleTogglePassword}
                            //onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      autoComplete="current-password"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </div>
            <FormControl sx={{ m: 4, width: "25ch" }} variant="outlined">
              <Button variant="contained" type="submit">
                Login
              </Button>
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }}>
              <p>Don't have an account yet?</p>
              <Link href="/signup">Sign up now</Link>
            </FormControl>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default Login;
