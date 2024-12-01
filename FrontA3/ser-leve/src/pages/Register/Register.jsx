import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Register.css";

const Register = () => {
 
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
  },
  form: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '975px',
    width: '100%',
  },
  title: {
    marginBottom: '20px',
    fontSize: '1.5rem',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginTop: '5px',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#74a201',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  success: {
    color: 'green',
    marginBottom: '10px',
  },
  register: {
    marginTop: '15px',
    textAlign: 'center',
  },
  registerLink: {
    color: '#74a201',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

  const [formData, setFormData] = useState({
    NameTag: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [errors, setErrors] = useState({
    NameTag: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 

  const navigate = useNavigate(); // Initialize useNavigate hook

  const validate = () => {
    let isValid = true;
    let errorMessages = {
      NameTag: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    };

    if (!formData.NameTag) {
      errorMessages.NameTag = "NameTag is required.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.Email) {
      errorMessages.Email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.Email)) {
      errorMessages.Email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.Password) {
      errorMessages.Password = "Password is required.";
      isValid = false;
    }

    if (formData.Password !== formData.ConfirmPassword) {
      errorMessages.ConfirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/usuario/auth/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NameTag: formData.NameTag,
          Email: formData.Email,
          Password: formData.Password,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Registration successful!");
        setFormData({ NameTag: "", Email: "", Password: "", ConfirmPassword: "" });
        setTimeout(() => {
          navigate("/Login"); // Redirect to Login after successful registration
        }, 2000); // Delay to show success message
      } else {
        setSuccessMessage("");
        console.error("Error registering user:", response.statusText);
      }
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container} >
      <div className="flex items-center justify-center">
        <img
          src="Logotipo marca nutricionista veganismo saúde maçã verde_processed.png"
          alt="Logo"
          style={styles.logo}
        />
      </div>
      <h2 style={styles.title}>Registrar</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="NameTag" style={styles.label}>NameTag:</label>
          <input
            type="text"
            id="NameTag"
            name="NameTag"
            value={formData.NameTag}
            onChange={handleChange}
            required
            style={styles.input}
          />
          {errors.NameTag && <span style={styles.errorText}>{errors.NameTag}</span>}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="Email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          {errors.Email && <span style={styles.errorText}>{errors.Email}</span>}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="Password" style={styles.label}>Senha:</label>
          <input
            type="password"
            id="Password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          {errors.Password && <span style={styles.errorText}>{errors.Password}</span>}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="ConfirmPassword" style={styles.label}>Confirmar Senha:</label>
          <input
            type="password"
            id="ConfirmPassword"
            name="ConfirmPassword"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />
          {errors.ConfirmPassword && <span style={styles.errorText}>{errors.ConfirmPassword}</span>}
        </div>
        <button type="submit" disabled={isLoading} style={isLoading ? {...styles.button, ...styles.buttonDisabled} : styles.button}>
          {isLoading ? "Registrando..." : "Registrar"}
        </button>
      </form>
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      <p style={styles.paragraph}>
        Já tem uma conta? <a href="/login" style={styles.link}>Login</a>
      </p>
    </div>
  );

  
};

export default Register;