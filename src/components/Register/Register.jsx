import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "../../styles/register.css";
import { useHistory } from "react-router-dom";
//import logo from "../../assets/img/to-do.png";

const Register = () => {
  const initialData = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  const [data, setData] = useState(initialData);
  const [formErrors, setFormErrors] = useState({});
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const checkEmailExistence = () => {
    axios
      .get("/users/email", { params: { email: data.email } })
      .then((res) => {
        if (res.data !== null) setIsEmailTaken(true);
        else setIsEmailTaken(false);
      })
      .catch((err) => console.log(err));
  };

  const checkUsernameExistence = () => {
    axios
      .get("/users/username", { params: { username: data.username } })
      .then((res) => {
        if (res.data !== null) setIsUsernameTaken(true);
        else setIsUsernameTaken(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkEmailExistence();
  }, [data.email]);

  useEffect(() => {
    checkUsernameExistence();
  }, [data.username]);

  const validate = (values) => {
    const errors = {};
    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!values.firstName) {
      errors.firstName = "First name is required";
    } else if (!nameRegex.test(values.firstName))
      errors.firstName = "First name should be valid";
    if (!values.lastName) {
      errors.lastName = "Last name is required!";
    } else if (!nameRegex.test(values.firstName))
      errors.lastName = "Last name should be valid";
    if (!values.username) errors.username = "Username is required!";
    else if (!usernameRegex.test(values.username))
      errors.username = "Username should be valid";
    else if (isUsernameTaken) errors.username = "Username already taken";

    if (!values.email) {
      errors.email = "Email address is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "The email address should be valid";
    } else if (isEmailTaken) errors.email = "Email already taken";
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (!passwordRegex.test(values.password))
      errors.password = "Your password should be strong";
    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = "Confirm password is required";
    } else if (values.password !== values.passwordConfirmation)
      errors.passwordConfirmation = "the confirm password does not match";

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formIsValid = validate(data);
    if (formIsValid) {
      await axios
        .post(
          "/signup",
          JSON.stringify({
            ...data,
          })
        )
        .then(() => {
          history.push("/dashboard");
        });
    }
  };

  return (
    <div>
      <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div className="wrapper wrapper--w680">
          <div className="card card-4">
            <div className="card-body">
              <h2 className="title">Registration Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label htmlFor={"first_name"} className="label">
                        first name
                      </label>
                      <input
                        id={"first_name"}
                        name={"firstName"}
                        className="input--style-4"
                        type="text"
                        value={data.firstName}
                        onChange={handleChange}
                      />
                      <p className={"err-msg"}>{formErrors.firstName}</p>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label htmlFor={"last_name"} className="label">
                        last name
                      </label>
                      <input
                        id={"last_name"}
                        name={"lastName"}
                        className="input--style-4"
                        type="text"
                        value={data.lastName}
                        onChange={handleChange}
                      />
                      <p className={"err-msg"}>{formErrors.lastName}</p>
                    </div>
                  </div>
                </div>
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label htmlFor={"username"} className="label">
                        username
                      </label>
                      <input
                        id={"username"}
                        name={"username"}
                        className="input--style-4"
                        type="text"
                        value={data.username}
                        onChange={handleChange}
                      />
                      <p className={"err-msg"}>{formErrors.username}</p>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label htmlFor={"email"} className="label">
                        email
                      </label>
                      <input
                        id={"email"}
                        name={"email"}
                        className="input--style-4"
                        value={data.email}
                        onChange={handleChange}
                      />
                      <p className={"err-msg"}>{formErrors.email}</p>
                    </div>
                  </div>
                </div>
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label htmlFor={"password"} className="label">
                        password
                      </label>
                      <input
                        id={"password"}
                        name={"password"}
                        className="input--style-4"
                        type="password"
                        value={data.password}
                        onChange={handleChange}
                      />
                      <p className={"err-msg"}>{formErrors.password}</p>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label
                        htmlFor={"password_confirmation"}
                        className="label"
                      >
                        password confirmation
                      </label>
                      <input
                        id={"password_confirmation"}
                        name={"passwordConfirmation"}
                        className="input--style-4"
                        type="password"
                        value={data.passwordConfirmation}
                        onChange={handleChange}
                      />
                      <p className={"err-msg"}>
                        {formErrors.passwordConfirmation}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-t-15">
                  <button className="btn btn--radius-2 btn--blue" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
