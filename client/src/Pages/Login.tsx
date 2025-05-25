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
    <>
      <div className="container text-center">
        <h3>Login Page</h3>
        <div className="column">
          <div className="row">
            <div className="col-3">
              <form
                className="container-fluid"
                onSubmit={(e) => onFormSubmit(e)}
              >
                <div className="form-group">
                  <label htmlFor="username">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    aria-describedby="username"
                    value={formData.username}
                    onChange={(e) => onFormChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => onFormChange(e)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isDisabled}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
