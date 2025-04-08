import React, { useState } from 'react';
import './Login_page.css'; // Your CSS file for styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Make a POST request to the backend login endpoint
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password in request body
      });

      const data = await response.json(); // Parse the JSON response

      // Check if login was successful
      if (response.ok) {
        console.log('Logged in successfully');
        
        // Save the token in localStorage (if needed)
        localStorage.setItem('token', data.token);

        // Redirect the user to the home page with profile
        window.location.href = '/home';
      } else {
        // Show error message if login failed
        setError(data.msg || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
}
export default Login;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login_page.css';  // Include your styles
// import axios from 'axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');  // Error state to handle error messages
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');  // Reset error message on new login attempt

//     if (email && password) {
//       try {
//         // Corrected the API endpoint to match the backend server URL (localhost:5000)
//         const response = await axios.post('http://localhost:5000/register', { // Correct the API endpoint
//           email,
//           password,
//         });

//         // If login is successful, handle the response
//         if (response.status === 201) {  // Status 201 is expected after successful user creation
//           console.log('Login successful');
          
//           // Save user token or session data (if needed)
//           localStorage.setItem('isLoggedIn', 'true');
//           localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user data
//           navigate('/home');  // Redirect to home page after successful login
//         }
//       } catch (err) {
//         // Handle errors
//         if (err.response) {
//           // Show specific message from server
//           setError('Login failed: ' + err.response.data.error || err.response.data.message);
//         } else {
//           // Handle network error or unexpected issues
//           setError('Something went wrong. Please try again.');
//         }
//       }
//     } else {
//       setError('Please fill in both fields.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <h2>Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="input-group">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="input-field"
//               required
//             />
//           </div>
//           <div className="input-group">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="input-field"
//               required
//             />
//           </div>
//           {error && <div className="error-message">{error}</div>} {/* Display error message */}
//           <button type="submit" className="login-button">Login</button>
//         </form>
//         <p className="signup-link">
//           Don't have an account? <a href="/signup">Sign up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
