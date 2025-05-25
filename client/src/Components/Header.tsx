import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand mb-0 h1 text-center">
            Shopping Website
          </Link>
          <Link to="/login" className="btn btn-primary btn-lg">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
