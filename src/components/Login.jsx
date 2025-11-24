import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isSignUp) {
                // Create new user
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                onLogin(userCredential.user);
            } else {
                // Sign in existing user
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                onLogin(userCredential.user);
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setError(error.message);
        }
    };

    return (
        <div style={{
            background: '#000',
            borderRadius: '40px',
            padding: '40px',
            width: '100%',
            maxWidth: '380px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '600px',
            border: '8px solid #333',
            color: '#fff',
            textAlign: 'center'
        }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px', fontWeight: '300' }}>
                {isSignUp ? 'Create Account' : 'Welcome'}
            </h2>
            <p style={{ color: '#888', marginBottom: '30px' }}>
                {isSignUp ? 'Sign up to get started' : 'Login to continue'}
            </p>

            {error && (
                <div style={{
                    background: '#ff4444',
                    padding: '10px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    fontSize: '0.9rem'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        background: '#333',
                        border: 'none',
                        padding: '20px',
                        borderRadius: '20px',
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                    style={{
                        background: '#333',
                        border: 'none',
                        padding: '20px',
                        borderRadius: '20px',
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />

                <button
                    type="submit"
                    style={{
                        background: '#ff9f0a',
                        color: '#fff',
                        border: 'none',
                        padding: '20px',
                        borderRadius: '30px',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        marginTop: '10px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                    onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
                    onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                >
                    {isSignUp ? 'Sign Up' : 'Login'}
                </button>
            </form>

            <div style={{ marginTop: '20px', color: '#888' }}>
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <button
                    onClick={() => {
                        setIsSignUp(!isSignUp);
                        setError('');
                    }}
                    style={{
                        background: 'none',
                        color: '#ff9f0a',
                        border: 'none',
                        padding: '0',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}
                >
                    {isSignUp ? 'Login' : 'Sign Up'}
                </button>
            </div>
        </div>
    );
};

export default Login;
