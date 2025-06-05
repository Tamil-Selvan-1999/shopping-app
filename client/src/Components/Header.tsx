import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../interface/interface";

function Header() {
  const { isLoggedIn, profile } = useSelector(
    (state: RootState) => state.login
  );

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
          {!isLoggedIn && (
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
