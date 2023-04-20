import React, { useContext, useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AppContext } from "../context/appContext";
import chattingImage from "../assets/chattingImage.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { socket } = useContext(AppContext);
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  function handleLogin(e) {
    e.preventDefault();
    // login logic
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        // socket work
        socket.emit("new-user");
        // navigate to the chat
        navigate("/chat");
      }
    });
  }
  //bg-[#292929]
  return (
    <div className="w-full h-full flex items-center justify-center bg-black   ">
      <div className="loginContainer">
        <div className="flex-1 h-full  ">
          <img src={chattingImage} className="h-full " alt=""></img>
        </div>
        <div className="flex flex-col flex-1 ">
          <form
            className="flex  items-center justify-center gap-4 mt-4"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col">
              {error && (
                <p className=" bg-red-700 text-slate-50 rounded-lg py-2 px-4">
                  {error.data}
                </p>
              )}

              <input
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required="true"
                className="email "
              />
              <p className="text-lime-600 mt-2">
                We'll never share your email with anyone else.
              </p>

              <input
                className="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required="true"
              />

              <button
                variant="primary"
                type="submit"
                className="w-full py-2 border-2 border-slate-50 rounded mt-5"
              >
                {isLoading ? <Spinner animation="grow" /> : "Login"}
              </button>
              <div className="py-4">
                <p className="text-center">
                  Don't have an account ?{" "}
                  <Link to="/signup" className="no-underline">
                    Signup
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <Container>
    //   <Row>
    //     <Col md={5} className="login__bg"></Col>
    //     <Col
    //       md={7}
    //       className="d-flex align-items-center justify-content-center flex-direction-column"
    //     >
    //       <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}>
    //         <Form.Group className="mb-3" controlId="formBasicEmail">
    //           {error && <p className="alert alert-danger">{error.data}</p>}
    //           <Form.Label>Email address</Form.Label>
    //           <Form.Control
    //             type="email"
    //             placeholder="Enter email"
    //             onChange={(e) => setEmail(e.target.value)}
    //             value={email}
    //             required
    //           />
    //           <Form.Text className="text-muted">
    //             We'll never share your email with anyone else.
    //           </Form.Text>
    //         </Form.Group>

    //         <Form.Group className="mb-3" controlId="formBasicPassword">
    //           <Form.Label>Password</Form.Label>
    //           <Form.Control
    //             type="password"
    //             placeholder="Password"
    //             onChange={(e) => setPassword(e.target.value)}
    //             value={password}
    //             required
    //           />
    //         </Form.Group>
    //         <Button variant="primary" type="submit">
    //           {isLoading ? <Spinner animation="grow" /> : "Login"}
    //         </Button>
    //         <div className="py-4">
    //           <p className="text-center">
    //             Don't have an account ? <Link to="/signup">Signup</Link>
    //           </p>
    //         </div>
    //       </Form>
    //     </Col>
    //   </Row>
    // </Container>
  );
}

export default Login;
