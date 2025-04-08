// // frontend/Register.js (or whatever file you want)

// import React, { useState } from 'react';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch('http://localhost:5000/api/auth/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name, email, password }),
//     });

//     const data = await response.json();
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="text" 
//         placeholder="Name" 
//         value={name} 
//         onChange={(e) => setName(e.target.value)} 
//       />
//       <input 
//         type="email" 
//         placeholder="Email" 
//         value={email} 
//         onChange={(e) => setEmail(e.target.value)} 
//       />
//       <input 
//         type="password" 
//         placeholder="Password" 
//         value={password} 
//         onChange={(e) => setPassword(e.target.value)} 
//       />
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default Register;
