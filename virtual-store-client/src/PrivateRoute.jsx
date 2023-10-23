const PrivateRoute = ({ comp, auth }) => {
  const goToLogin = () => {
    window.location.href = "/login";
  };

  return !auth ? goToLogin() : comp;
};

export default PrivateRoute;
