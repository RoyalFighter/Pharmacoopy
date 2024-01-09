// import React from 'react';
// import { useOidc } from '@axa-fr/react-oidc';
// import './App.css'
// import { useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';

// const SignIn = () => {
//     const { login, isAuthenticated, signOut, oidcUser, logout } = useOidc();
//     // const navigate = useNavigate();
    
//     const handleLogin = async () => {
//         await login();
//       };

//       const handleLogout = async () => {
//         await logout();
//         // navigate('/dashboard');
//       };

//     useEffect(() => {
//         if (isAuthenticated) 
//         {}
//       }, [isAuthenticated, oidcUser]);
//     return (
//         <div>
//             {isAuthenticated ? (
//                 <div>
//                     <p>Signed in successfully! </p>
//                     <button className='sign-in' onClick={handleLogout}>Logout</button>
//                 </div>

//             ) : (
//                 <div>
//                     <div>
//                         <img src='https://pharma-release.server247.info/assets/Amnil%20Logo-548bea27.png' alt='logo'/>
//                     </div>
//                     <button className='sign-in' onClick={handleLogin}>Login With SSO</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SignIn;