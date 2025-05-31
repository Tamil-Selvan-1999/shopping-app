import { FormEvent, ChangeEvent, useState } from "react";
import { AppDispatch, LoginData } from "../interface/interface";
import { useDispatch } from "react-redux";
import { loginAuthentication } from "../store/loginSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginAuthentication(formData));
    navigate("/");
  };
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (formData.username.length > 0 && formData.password.length > 0) {
      setIsDisabled(false);
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column text-center"
      style={{ minHeight: "100vh" }}
    >
      <h3 className="mb-4">Login Page</h3>
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
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isDisabled}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
