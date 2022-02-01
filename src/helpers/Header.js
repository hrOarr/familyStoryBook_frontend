import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";
import NavLink from "./NavLink";
import { useAuthState, useAuthDispatch, logout } from "../Context";
import { useAlert } from "react-alert";
import "./Header.css";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

const Header = () => {
  const dispatch = useAuthDispatch();
  const { user, token } = useAuthState();

  const navigate = useNavigate();
  const alert = useAlert();
  const location = useLocation();

  const handleLogout = () => {
    logout(dispatch);
    alert.show("You are logged out successfully");
    navigate("/family");
  };

  useEffect(() => {
    //JWT check if token expired
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
  }, [location]);

  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Link className="navbar-brand" to="/family">
            <span className="brand">FamilyBook</span>
          </Link>
          <Navbar.Toggle className="toggleIcon" aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink className="nav-link" to="/family/events">
                Events
              </NavLink>
              <NavLink className="nav-link" to="/family/show_tree">
                Show Tree
              </NavLink>
              <NavLink className="nav-link" to="/family/members">
                Show-Members
              </NavLink>
              <NavLink className="nav-link" to="/family/miscelleneous_info">
                Miscelleneous-Info
              </NavLink>
            </Nav>

            <Form className="d-flex search-field">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>

            <Nav className="mr-auto my-2 pl-2 my-lg-0">
              {user !== "" && user !== undefined ? (
                <NavLink className="nav-link" to="/">
                  {user.username}
                </NavLink>
              ) : (
                <NavLink className="nav-link" to="/auth/login">
                  Login
                </NavLink>
              )}

              {user !== "" && user !== undefined ? (
                <NavLink className="nav-link" onClick={handleLogout} to="/">
                  Logout
                </NavLink>
              ) : (
                <NavLink className="nav-link" to="/auth/signup">
                  Signup
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
