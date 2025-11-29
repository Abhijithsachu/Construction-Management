import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import api from "../../api";
import { useNavigate } from "react-router-dom";

function Registration_wrk() {
  const [image, setimage] = useState(null);
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [qualification, setQualification] = useState("");
  const [jobrole, setjobrole] = useState("Engineer");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const navigate= useNavigate()

  const validate = () => {
    if (!image) return "Please upload a photo.";
    if (!fullname.trim()) return "Full name is required.";
    if (!email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email.";
    if (!phone.trim()) return "Phone is required.";
    if (!/^[0-9]{10}$/.test(phone)) return "Phone must be 10 digits.";
    if (!qualification.trim()) return "Qualification is required.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password too short.";
    if (password !== confirmpassword) return "Passwords do not match.";
    return null;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return alert(error);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("qualification", qualification);
    formData.append("jobrole", jobrole);
    formData.append("password", password);

    try {
      const res = await api.post("/worker/wrk_register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Registration Successful!");
navigate('/')
      setfullname("");
      setemail("");
      setphone("");
      setQualification("");
      setjobrole("Engineer");
      setpassword("");
      setconfirmpassword("");
      setimage(null);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg p-4">
            <h2 className="text-center mb-4">Worker Registration</h2>

            <Form onSubmit={handlesubmit}>
              {/* Image Upload */}
              <Form.Group className="mb-3">
                <Form.Label>Photo</Form.Label>
                <Form.Control 
                  type="file"
                  onChange={(e) => setimage(e.target.files[0])}
                />
              </Form.Group>

              {/* Full Name */}
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={fullname}
                  onChange={(e) => setfullname(e.target.value)}
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </Form.Group>

              {/* Phone */}
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
              </Form.Group>

              {/* Qualification */}
              <Form.Group className="mb-3">
                <Form.Label>Qualification</Form.Label>
                <Form.Control
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                />
              </Form.Group>

              {/* Job Role */}
              <Form.Group className="mb-3">
                <Form.Label>Job Role</Form.Label>
                <Form.Select
                  value={jobrole}
                  onChange={(e) => setjobrole(e.target.value)}
                >
                  <option value="Engineer">Engineer</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Carpenter">Carpenter</option>
                </Form.Select>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
            </Form>

          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration_wrk;
