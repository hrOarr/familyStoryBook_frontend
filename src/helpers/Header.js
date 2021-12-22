import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import NavLink from './NavLink';
import "./Header.css";

const Header = () => {
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
              <NavLink className="nav-link" to="/family/events">Events</NavLink>
              <NavLink className="nav-link" to="/family/show_tree">Show Tree</NavLink>
              <NavLink className="nav-link" to="/family/members">Show-Members</NavLink>
              <NavLink className="nav-link" to="/family/miscelleneous_info">Miscelleneous-Info</NavLink>
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

            <Nav
              className="mr-auto my-2 pl-2 my-lg-0"
              style={{ color: "white" }}
            >
              <Nav.Link href="#">Logged-In User</Nav.Link>

              <Nav.Link href="#">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
