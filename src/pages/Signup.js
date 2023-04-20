import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import botImg from "../assets/bot.jpeg";
// import person from "../assets/person.png";
import cars from "../assets/cars.jpg";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const navigate = useNavigate();
  //image upload states
  const [image, setImage] = useState(null);
  const [upladingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "your-preset-here");
    try {
      setUploadingImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/your-username-here/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!image) return alert("Please upload your profile picture");
    const url = await uploadImage(image);
    console.log(url);
    // signup the user
    signupUser({ name, email, password, picture: url }).then(({ data }) => {
      if (data) {
        console.log(data);
        navigate("/chat");
      }
    });
  }

  return (
    <div
      className="bg-black w-full flex-1 flex items-center justify-center
    "
    >
      <div className="flex   items-center border-2 justify-between  px-24 rounded-lg py-2 ">
        <div className="flex-1 ">
          <form
            className="flex flex-col items-center gap-3  text-slate-50"
            onSubmit={handleSignup}
          >
            <h1 className="text-center"> Create account</h1>
            <div className="w-fit relative rounded-[200%] border-2">
              <img
                src={imagePreview || cars}
                className="signup-profile-pic"
                alt=""
              />
              <label
                htmlFor="image-upload"
                className="absolute top-full right-0"
              >
                <i className="fas fa-plus-circle add-picture-icon rounded-[100%]"></i>
              </label>

              <input
                type="file"
                id="image-upload"
                hidden
                accept="image/png, image/jpeg"
                onChange={validateImg}
              />
            </div>
            {error && (
              <p className=" bg-red-700 text-slate-50 rounded-lg py-2 px-4">
                {error.data}
              </p>
            )}
            <div>
              <input
                type="text"
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="name"
              ></input>
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="email"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="password"
              />
            </div>
            <button
              type="submit"
              className=" py-2 px-8 border-2 border-slate-50 rounded "
            >
              {upladingImg || isLoading ? "Signing you up..." : "Signup"}
            </button>

            <div className="py-4">
              <p className="text-center">
                Already have an account ?{" "}
                <Link to="/login" className="no-underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <Container>
    //     <Row>
    //         <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
    //             <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
    //                 <h1 className="text-center">Create account</h1>
    //                 <div className="signup-profile-pic__container">
    //                     <img src={imagePreview || botImg} className="signup-profile-pic" />
    //                     <label htmlFor="image-upload" className="image-upload-label">
    //                         <i className="fas fa-plus-circle add-picture-icon"></i>
    //                     </label>
    //                     <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
    //                 </div>
    //                 {error && <p className="alert alert-danger">{error.data}</p>}
    //                 <Form.Group className="mb-3" controlId="formBasicName">
    //                     <Form.Label>Name</Form.Label>
    //                     <Form.Control type="text" placeholder="Your name" onChange={(e) => setName(e.target.value)} value={name} />
    //                 </Form.Group>
    //                 <Form.Group className="mb-3" controlId="formBasicEmail">
    //                     <Form.Label>Email address</Form.Label>
    //                     <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
    //                     <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
    //                 </Form.Group>

    //                 <Form.Group className="mb-3" controlId="formBasicPassword">
    //                     <Form.Label>Password</Form.Label>
    //                     <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
    //                 </Form.Group>
    //                 <Button variant="primary" type="submit">
    //                     {upladingImg || isLoading ? "Signing you up..." : "Signup"}
    //                 </Button>
    //                 <div className="py-4">
    //                     <p className="text-center">
    //                         Already have an account ? <Link to="/login">Login</Link>
    //                     </p>
    //                 </div>
    //             </Form>
    //         </Col>
    //         <Col md={5} className="signup__bg"></Col>
    //     </Row>
    // </Container>
  );
}

export default Signup;
