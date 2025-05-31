import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../interface/interface";

function Header() {
  const { isLoggedIn } = useSelector((state: RootState) => state.login);

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand mb-0 h1 text-center">
            Shopping Website
          </Link>
          {isLoggedIn && <p>Welcome! You are logged in</p>}
          <Link to="/login" className="btn btn-primary btn-lg">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
