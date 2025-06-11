import { FormEvent, ChangeEvent, useState } from "react";
import { AppDispatch, RegisterData } from "../interface/interface";
import { useDispatch } from "react-redux";
import { registerAuthentication } from "../store/loginSlice";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterData>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerAuthentication(formData));
    navigate("/");
  };
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (
      formData.username.length > 0 &&
      formData.password.length > 0 &&
      formData.firstName.length > 0 &&
      formData.lastName.length > 0
    ) {
      setIsDisabled(false);
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column text-center"
      style={{ minHeight: "100vh" }}
    >
      <h3 className="mb-4">Register Page</h3>
      <div className="card p-4 shadow" style={{ minWidth: "300px" }}>
        <form onSubmit={onFormSubmit}>
          <div className="form-group mb-3 text-start">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={onFormChange}
            />
          </div>
          <div className="form-group mb-3 text-start">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={onFormChange}
            />
          </div>
          <div className="form-group mb-3 text-start">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={onFormChange}
            />
          </div>
          <div className="form-group mb-3 text-start">
            <label htmlFor="username">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={onFormChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isDisabled}
          >
            Submit
          </button>
        </form>
      </div>
      <p>
        Click here to <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
