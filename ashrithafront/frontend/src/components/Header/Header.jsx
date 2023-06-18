import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./header.css";
import { useAuth } from "../../hooks/auth";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Header = () => {
  const [name, setName] = useState(null);
  const headerRef = useRef(null);

  const { cookies, logout } = useAuth();

  useEffect(() => {
    if (cookies && cookies.name && cookies.token) setName(cookies.name);
  }, [cookies]);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="" />
            </div>

            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
                {!name ? (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                ) : (
                  <Button className="btn secondary__btn" onClick={logout}>
                    <Link>Logout</Link>
                  </Button>
                )}
              </ul>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
