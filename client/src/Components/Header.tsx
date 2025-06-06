import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../interface/interface";
import { logout } from "../store/loginSlice";

function Header() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { isLoggedIn, profile } = useSelector(
    (state: RootState) => state.login
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand mb-0 h1">
          Shopping Website
        </Link>
        <div className="d-flex align-items-center gap-3">
          {isLoggedIn && (
            <span className="text-success mb-0">
              Welcome {profile?.last_name}, {profile?.first_name}
            </span>
          )}
          {isLoggedIn ? (
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
