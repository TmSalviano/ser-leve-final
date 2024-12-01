  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useLoggedUser } from '../../contexts/LoggedUserContext';

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // To display messages from the server
    const [error, setError] = useState(''); // To display error messages
    const [isLoading, setIsLoading] = useState(false); // To handle loading state

    const navigate = useNavigate();
    const { setUser } = useLoggedUser();

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Clear previous messages
      setMessage('');
      setError('');

      // Form validation
      if (!email || !password) {
        setError('Por favor, preencha todos os campos!');
        return;
      }
      if (!email.includes('@')) {
        setError('Insira um email válido.');
        return;
      }

      setIsLoading(true); // Show loading state

      try {
        // Send login request to the server
        const response = await fetch('http://localhost:3000/api/usuario/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: email,
            Password: password,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success && data.loggedInUser) {
          console.log(data.loggedInUser);
          setUser(data.loggedInUser);  // Ensure that this updates the context state
          setMessage('Login realizado com sucesso!');
          // Optionally, redirect the user after successful login
          setTimeout(() => {
            navigate("/Home"); 
          }, 2000);
        } else {
          setError(data.message || 'Erro desconhecido.');
        }
      } catch (err) {
        setError('Erro de conexão, tente novamente mais tarde.');
      } finally {
        setIsLoading(false); // Hide loading state
      }
    };

    return (
      <div style={styles.container}>
        <img src="./Logotipo marca nutricionista veganismo saúde maçã verde_processed.png" alt="Logo" />
        <h1 className="font-bold text-4xl text-[#74a201]">Já tem uma conta?</h1>
        <h1>Faça seu login:</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Login</h2>

          {/* Display error message */}
          {error && <p style={styles.error}>{error}</p>}

          {/* Display success or general message */}
          {message && <p style={styles.success}>{message}</p>}

          <div style={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>

        <div style={styles.register}>
          <p>Não tem uma conta? <a href="/register" style={styles.registerLink}>Registrar agora</a></p>
        </div>
      </div>
    );
  };

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

  export default Login;
