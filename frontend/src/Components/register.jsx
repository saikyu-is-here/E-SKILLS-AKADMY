import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function RegistrationForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phno: "",
    password: "",
    dob: "",
    gender: "",
    location: "",
    profession: "",
    linkedin_url: "",
    github_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log("Registration successful!");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError("Registration error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="registration-auth">
        <div className="registration-container">
          <h2>Formulaire d'inscription</h2>
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="registration-input-group">
              <div>
                <div className="registration-text-area">
                  <label>Nom :</label>
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="registration-text-area">
                  <label>Email :</label>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="registration-input-group">
              <div>
                <div className="registration-text-area">
                  <label>GSM :</label>
                </div>
                <input
                  type="tel"
                  name="phno"
                  value={formData.phno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="registration-text-area">
                  <label>Password:</label>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="registration-input-group">
              <div>
                <div className="registration-text-area">
                  <label>Age :</label>
                </div>
                <input
                  type="text"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="registration-text-area">
                  <label>Genre :</label>
                </div>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="registration-input-group">
              <div>
                <div className="registration-text-area">
                  <label>Location:</label>
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="registration-text-area">
                  <label>Profession:</label>
                </div>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <span className="registration-error-msg">{error}</span>}
            <div className="registration-btn1">
              <button type="submit">Inscription</button>
            </div>
          </form>
          <span>
            Vous avez déjà un compte ? login
            <Link to="/login"> ici</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
