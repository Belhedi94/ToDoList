import React, { useState } from "react";
import axios from "../../api/axios";
import "../../styles/register.css";
//import logo from "../../assets/img/to-do.png";
//import { Link } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(
      "/signup",
      JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
        passwordConfirmation,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  };
  return (
    <div>
      <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div className="wrapper wrapper--w680">
          <div className="card card-4">
            <div className="card-body">
              <h2 className="title">Registration Form</h2>
              <form method="POST">
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label forHtml={"first_name"} className="label">
                        first name
                      </label>
                      <input
                        id={"first_name"}
                        className="input--style-4"
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label for={"last_name"} className="label">
                        last name
                      </label>
                      <input
                        id={"last_name"}
                        className="input--style-4"
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                      />
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
                        className="input--style-4"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label htmlFor={"email"} className="label">
                        email
                      </label>
                      <input
                        id={"email"}
                        className="input--style-4"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label for={"password"} className="label">
                        password
                      </label>
                      <input
                        id={"password"}
                        className="input--style-4"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
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
                        className="input--style-4"
                        type="password"
                        onChange={(e) =>
                          setPasswordConfirmation(e.target.value)
                        }
                      />
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
