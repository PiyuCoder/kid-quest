import React, { useState } from "react";
import "../styles/register.css";
import { registerApi } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    password: "",
  });

  const [registerMsg, setRegisterMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await registerApi(formData);
    console.log(res);

    if (res?.data?.success) {
      setRegisterMsg("Registered successfully!!");
      navigate("/login");
    } else {
      setRegisterMsg(res?.data?.message);
    }
    // Clear the form after submission
    setFormData({
      name: "",
      age: "",
      phone: "",
      password: "",
    });
  };

  return (
    <div className="register-container flexV">
      <div className="register-form-container">
        <h2 className="register-heading">Join KidQuest</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Kid's name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone no."
            maxLength={10}
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-button">
            Register
          </button>
          <div>
            Already registered?<Link to={"/login"}>Login</Link>
          </div>
        </form>
      </div>
      <h2>{registerMsg}</h2>
    </div>
  );
};

export default Register;
