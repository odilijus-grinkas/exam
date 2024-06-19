import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import LinkButton from "./link-button/LinkButton";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useState(localStorage.getItem("user"));

  const toggle = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    sessionStorage.removeItem("user");
  };

  return (
    <div className="mb-3">
      <Navbar style={{backgroundColor: "coral"}} light expand="md">
        <NavbarBrand tag={Link} to="/">
          City Event Tracker
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="bg-light" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <LinkButton title="Home" path="/" />
            </NavItem>
            { sessionStorage.getItem("user") &&
            JSON.parse(sessionStorage.getItem("user"))?.admin ?
              <NavItem>
                <LinkButton title="Admin" path="/admin" />
              </NavItem>
              : <></>
            }
            {sessionStorage.getItem("user") ? (
              <>
                <NavItem>
                  <LinkButton title="Create Event" path="/post/new" />
                </NavItem>
                <NavItem>
                  <LinkButton title="My Events" path="/post/profile" />
                </NavItem>
                <NavItem onClick={() => sessionStorage.removeItem("user")}>
                  <LinkButton title="Logout" path="/login" />
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <LinkButton title="Login" path="/login" />
                </NavItem>
                <NavItem>
                  <LinkButton title="Register" path="/register" />
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
