import React from "react";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
function Navigation() {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  async function handleLogout(e) {
    e.preventDefault();
    await logoutUser(user);
    // redirect to home page
    window.location.replace("/");
  }
  return (
    <div className="  w-full  h-fit bg-[#1f1e1e] ">
      <div className="flex px-12 py-3 items-center w-full justify-between ">
        <div>
          <Link to="/" className="no-underline text-3xl font-Sedgwick">
            {/*<img
              src={logo}
              style={{ width: 50, height: 50 }}
              alt={"not visible"}
  /> */}{" "}
            Let's Chat
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!user && (
            <Link
              to="/login"
              className=" no-underline border-2 border-red-50 px-4 py-1 rounded text-slate-100"
            >
              <span>Login</span>
            </Link>
          )}
          <Link
            to="/chat"
            className=" no-underline border-2 border-red-50 px-4 py-1 rounded text-slate-100"
          >
            <span>Chat</span>
          </Link>
          {user && (
            <div className="flex items-center gap-2">
              <img src={user.picture} alt=" "></img>
              <span className="text-slate-50 text-lg">
                {user.name || "Susaksham"}
              </span>
            </div>
          )}

          {user && (
            <button
              className="rounded text-slate-50 bg-[#dc3545] px-3 py-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
    // <Navbar bg="light" expand="lg">
    //     <Container>
    //         <LinkContainer to="/">
    //             <Navbar.Brand>
    //                 <img src={logo} style={{ width: 50, height: 50 }} />
    //             </Navbar.Brand>
    //         </LinkContainer>
    //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //         <Navbar.Collapse id="basic-navbar-nav">
    //             <Nav className="ms-auto">
    //                 {!user && (
    //                     <LinkContainer to="/login">
    //                         <Nav.Link>Login</Nav.Link>
    //                     </LinkContainer>
    //                 )}
    //                 <LinkContainer to="/chat">
    //                     <Nav.Link>Chat</Nav.Link>
    //                 </LinkContainer>
    //                 {user && (
    //                     <NavDropdown
    //                         title={
    //                             <>
    //                                 <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} />
    //                                 {user.name}
    //                             </>
    //                         }
    //                         id="basic-nav-dropdown"
    //                     >
    //                         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //                         <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
    //                         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>

    //                         <NavDropdown.Item>
    //                             <Button variant="danger" onClick={handleLogout}>
    //                                 Logout
    //                             </Button>
    //                         </NavDropdown.Item>
    //                     </NavDropdown>
    //                 )}
    //             </Nav>
    //         </Navbar.Collapse>
    //     </Container>
    // </Navbar>
  );
}

export default Navigation;
