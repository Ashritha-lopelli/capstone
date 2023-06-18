import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { Alert } from "reactstrap";

import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import { register } from "../utils/api";

const Register = () => {
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();

      const res = await register(credentials);

      console.log(res);
    } catch (err) {
      const { status, data } = err.response;

      if (status === 400) {
        setError(data.message);
      } else {
        setError("Something went wrong, Try again later.");
      }
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      id="username"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="E-mail"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="PASSWORD"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Create account
                  </Button>
                </Form>
                <p>
                  <Alert color="danger" isOpen={error}>
                    {error}
                  </Alert>
                </p>
                <p>
                  Already have an account <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
