import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { Alert } from "reactstrap";

import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import { register } from "../utils/api";

const Register = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef();

  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    setIsLoading(true);
    setError(false)
    setSuccess(false)

    try {
      e.preventDefault();

      const { data, status } = await register(credentials);

      if (status === 200 && data.status === "Success") {
        setSuccess("Registered successfully!!")
      }
    } catch (err) {
      const { status, data } = err.response;
      setSuccess(false)
      if (status === 400) {
        setError(data.message);
      } else {
        setError("Something went wrong, Try again later.");
      }
    }
    setIsLoading(false);
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

                <Form ref={formRef} onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      id="username"
                      value={credentials.username}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="E-mail"
                      required
                      id="email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="PASSWORD"
                      required
                      id="password"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    {isLoading ? 'Registering...' : 'Create account'}
                  </Button>
                </Form>
                <p>
                  <Alert color="danger" isOpen={error}>
                    {error}
                  </Alert>
                </p>
                <p>
                  <Alert color="success" isOpen={success}>
                    {success}
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
