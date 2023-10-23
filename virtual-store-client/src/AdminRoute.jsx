const AdminRoute = ({ comp, isAdmin }) => {
  const goToHome = () => {
    window.location.href = "/";
  };

  return !isAdmin ? goToHome() : comp;
};

export default AdminRoute;
